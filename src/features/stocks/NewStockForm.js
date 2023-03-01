import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewStockMutation } from "./stocksApiSlice";
import {
  MY_CATEGORY,
  MY_CURRENCY,
  MY_UNIT,
  PER_UNIT,
} from "../../config/constant";
import sortList from "../../utils/sortList";

const NewStockForm = ({ users }) => {
  const [addNewStock, { isLoading, isSuccess, isError, error }] =
    useAddNewStockMutation();

  const navigate = useNavigate();
  const [userId, setUserId] = useState(users);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState('');
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState('');
  const [current_stock, setCurrentStock] = useState("");
  const [min_stock, setMinStock] = useState("");
  const [max_stock, setMaxStock] = useState("");
  const [unit, setUnit] = useState('');
  const [per_unit, setPerUnit] = useState('');
  const [per_stock, setPerStock] = useState("");
  const [per_cost, setPerCost] = useState("");

  // console.log(userId)

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setCategories("");
      setCost("");
      setCurrency("");
      setCurrentStock("");
      setMinStock("");
      setMaxStock("");
      setUnit("");
      setPerUnit("");
      setPerStock("");
      setPerCost("")
      navigate("/dash/stocks");
    }
  }, [isSuccess, navigate]);

  useEffect(()=>{
    if(per_cost && current_stock){
      setCost((per_cost*current_stock).toFixed(2))
    }
  },[per_cost, current_stock])


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

  const canSave =
    [
      userId,
      name,
      categories,
      cost,
      currency,
      current_stock,
      min_stock,
      max_stock,
      unit,
      per_stock,
      per_unit,
      per_cost
    ].every(Boolean) && !isLoading;

  const onAddStockClicked = async (e) => {
    e.preventDefault();
    console.log(canSave);
    if (canSave) {
      await addNewStock({
        user: userId,
        name,
        categories,
        cost,
        currency,
        current_stock,
        min_stock,
        max_stock,
        unit,
        per_stock,
        per_unit,
        per_cost
      });
    }
  };

  const sortedCat = sortList(MY_CATEGORY,'name')
  const categorySelection = sortedCat.map((opt) => {
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

  // const onResetClick = async (e) => {
  //     setName('')
  //     setCategories('')
  //     setCost('')
  //     setCurrency('')
  //     setCurrentStock('')
  //     setMinStock('')
  //     setMaxStock('')
  //     setUnit('')
  // }

  const errClass = isError ? "errmsg" : "offscreen";

  const validInputChecker = (props) => {
    return !props ? "form__input--incomplete" : "";
  };

  const content = (
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
      <h2 className="uppercase">Add New Stock </h2>
      <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onAddStockClicked}>
          <input type="hidden" name="user" value={userId} />

          <label className="form__label" htmlFor="stock-name">
            Name:
            <input
              className={`form__input ${validInputChecker(
                name
              )} text-black block w-full`}
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
              <option value="" disabled selected>
                Select Category
              </option>
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
              defaultValue={currency}
              onChange={onCurrencyChanged}
            >
              <option value="" disabled selected>
                Select Currency
              </option>
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
              defaultValue={unit}
              onChange={onUnitChanged}
            >
              <option value="" disabled selected>
                Select Unit
              </option>
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
              defaultValue={per_unit}
              onChange={onPer_unitChanged}
            >
              <option value="" disabled selected>
                Select Per Unit
              </option>
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

          <div className="grid grid-cols-1 gap-1 w-full m-1">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
              title="submit"
              type="submit"
              onClick={onAddStockClicked}
            >
              Add
            </button>
            <Link
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
              to="/dash/stocks"
            >
              Cancel
            </Link>
          </div>
        </form>
        {/* <Link
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                    title="Reset"
                    onClick={onResetClick}
                >
                    Reset
                </Link> */}
      </div>
    </div>
  );

  return content;
};

export default NewStockForm;
