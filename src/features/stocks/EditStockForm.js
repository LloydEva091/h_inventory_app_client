import { useState, useEffect } from "react";
import {
  // useUpdateStockMutation,
  useUpdateStockMutation,
  useDeleteStockMutation,
} from "./stocksApiSlice";
import { useNavigate } from "react-router-dom";
import {
  MY_CATEGORY,
  MY_UNIT,
  MY_CURRENCY,
  PER_UNIT,
} from "../../config/constant";

const EditStockForm = ({ stock, users }) => {
  const [updateStock, { isLoading, isSuccess, isError, error }] =
  useUpdateStockMutation();

  const [
    deleteStock,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteStockMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(stock.name);
  const [categories, setCategories] = useState(stock.categories);
  const [cost, setCost] = useState(stock.cost);
  const [currency, setCurrency] = useState(stock.currency);
  const [current_stock, setCurrentStock] = useState(stock.current_stock);
  const [min_stock, setMinStock] = useState(stock.min_stock);
  const [max_stock, setMaxStock] = useState(stock.max_stock);
  const [unit, setUnit] = useState(stock.unit);
  const [stock_status, setStockStatus] = useState(stock.stock_status);
  const [per_unit, setPerUnit] = useState(stock.per_unit);
  const [per_stock, setPerStock] = useState(stock.per_stock);
  const [per_cost, setPerCost] = useState(stock.per_cost || 0);
  const [userId, setUserId] = useState(stock.user);

  useEffect(()=>{
    if(per_cost && current_stock){
      setCost((per_cost*current_stock).toFixed(2))
    }
  },[per_cost, current_stock])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setCategories("");
      setCost("");
      setCurrency("");
      setCurrentStock("");
      setMinStock("");
      setMaxStock("");
      setUnit("");
      setStockStatus("");
      setUserId("");
      setPerUnit("");
      setPerStock("");
      setPerCost("")
      navigate("/dash/stocks");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onCategoriesChanged = (e) => setCategories(e.target.value);
  const onPerCostChanged = (e) => setPerCost(e.target.value);
  const onCurrencyChanged = (e) => setCurrency(e.target.value);
  const onCurrentChanged = (e) => setCurrentStock(e.target.value);
  const onMinChanged = (e) => setMinStock(e.target.value);
  const onMaxChanged = (e) => setMaxStock(e.target.value);
  const onUnitChanged = (e) => setUnit(e.target.value);
  const onPer_unitChanged = (e) => setPerUnit(e.target.value);
  const onPetStockChanged = (e) => setPerStock(e.target.value);
  const onCancelClick = async (e) => await navigate("/dash/stocks");

  const categorySelection = MY_CATEGORY.map((opt) => {
    return (
      <option key={opt.id} value={opt.name}>
        {" "}
        {opt.name}
      </option>
    );
  });
  const unitSelection = MY_UNIT.map((opt) => {
    return (
      <option key={opt.id} value={opt.name}>
        {" "}
        {opt.name}
      </option>
    );
  });
  const per_unitSelection = PER_UNIT.map((opt) => {
    return (
      <option key={opt.id} value={opt.name}>
        {" "}
        {opt.name}
      </option>
    );
  });
  const currencySelection = MY_CURRENCY.map((opt) => {
    return (
      <option key={opt.id} value={opt.name}>
        {" "}
        {opt.name}
      </option>
    );
  });

  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [
      name,
      categories,
      cost,
      currency,
      current_stock,
      min_stock,
      max_stock,
      stock_status,
      unit,
      userId,
      per_stock,
      per_unit,
      per_cost
    ].every(Boolean) && !isLoading;
  const onSaveStockClicked = async (e) => {
    if (canSave) {
      await updateStock({
        id: stock.id,
        user: userId,
        name,
        categories,
        cost,
        currency,
        current_stock,
        min_stock,
        max_stock,
        stock_status,
        unit,
        per_stock,
        per_unit,
        per_cost
      });
    }
  };

  const onDeleteStockClicked = async () => {
    await deleteStock({ id: stock.id });
  };

  const updated = new Date(stock.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const validInputChecker = (props) => {
    return !props ? "form__input--incomplete" : "";
  };

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center">
      <h2>EDIT STOCK #{stock.id}</h2>
      <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="">
            <div className="grid grid-cols-3 gap-2 w-full p-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                title="Save"
                onClick={onSaveStockClicked}
                disabled={!canSave}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                title="Delete"
                onClick={onDeleteStockClicked}
              >
                Delete
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded"
                title="Cancel"
                onClick={onCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
          <label className="form__label" htmlFor="stock-name">
            Name:
            <input
              className={`form__input ${validInputChecker(name)} text-black block w-full`}
              id="stock-name"
              name="name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={onNameChanged}
            />
          </label>
          <label className="form__label" htmlFor="stock-categories">
            Categories:
            <select
              id="stock-categories"
              name="categories"
              className="form__select text-black rounded-lg block w-full" 
              defaultValue={categories.toString()}
              onChange={onCategoriesChanged}
            >
              {categorySelection}
            </select>
          </label>
          <label className="form__label" htmlFor="stock-cost">
            Total Stock Cost:
            <span
              className={` rounded-xl p-2 ${validInputChecker(
                cost
              )} bg-white text-black block w-full`}
              id="stock-cost"
              name="cost"
              type="number"
              autoComplete="off"
              value={cost}
            >{cost || 0}</span>
          </label>
          <label className="form__label" htmlFor="stock-cost">
            Per Stock Cost:
            <input
              className={`form__input ${validInputChecker(
                per_cost
              )} text-black block w-full`}
              id="stock-cost"
              name="cost"
              type="number"
              autoComplete="off"
              value={per_cost}
              onChange={onPerCostChanged}
            />
          </label>
          <label className="form__label" htmlFor="stock-currency">
            Currency:
            <select
              id="stock-currency"
              name="currency"
              className="form__select text-black rounded-lg block w-full"
              defaultValue={currency.toString()}
              onChange={onCurrencyChanged}
            >
              {currencySelection}
            </select>
          </label>
          <label className="form__label" htmlFor="stock-current-stock">
            Current Stock:
            <input
              className={`form__input ${validInputChecker(
                current_stock
              )} text-black block w-full`}
              id="stock-current-stock"
              name="current_stock"
              type="number"
              autoComplete="off"
              value={current_stock}
              onChange={onCurrentChanged}
            />
          </label>
          <label className="form__label" htmlFor="stock-unit">
            Unit:
            <select
              id="stock-unit"
              name="unit"
              className="form__select text-black rounded-lg block w-full"
              defaultValue={unit.toString()}
              onChange={onUnitChanged}
            >
              {unitSelection}
            </select>
          </label>
          <label className="form__label" htmlFor="current-per_stock">
            Per Current Stock:
            <input
              className={`form__input ${validInputChecker(
                per_stock
              )} text-black block w-full`}
              id="current-per_stock"
              name="per_stock"
              type="number"
              autoComplete="off"
              value={per_stock}
              onChange={onPetStockChanged}
            />
          </label>
          <label className="form__label" htmlFor="stock-per_unit">
            Per Unit:
            <select
              id="stock-per_unit"
              name="per_unit"
              className="form__select text-black rounded-lg block w-full"
              defaultValue={per_unit.toString()}
              onChange={onPer_unitChanged}
            >
              {per_unitSelection}
            </select>
          </label>

          <label className="form__label" htmlFor="stock-min-stock">
            Min Stock:
            <input
              className={`form__input ${validInputChecker(
                min_stock
              )} text-black block w-full`}
              id="stock-min-stock"
              name="min_stock"
              type="number"
              autoComplete="off"
              value={min_stock}
              onChange={onMinChanged}
            />
          </label>
          <label className="form__label" htmlFor="stock-max-stock">
            Max Stock:
            <input
              className={`form__input ${validInputChecker(
                max_stock
              )} text-black block w-full`}
              id="stock-max-stock"
              name="max_stock"
              type="number"
              autoComplete="off"
              value={max_stock}
              onChange={onMaxChanged}
            />
          </label>

          <div className="form__row">
            <div className="form__divider">
              <p className="form__updated">
                Updated:
                <br />
                {updated}
              </p>
            </div>
          </div>
         
        </form>
      </div>
    </div>
  );

  return content;
};

export default EditStockForm;
