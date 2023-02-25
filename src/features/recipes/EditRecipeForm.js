import { useState, useEffect } from "react";
import {
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useAddNewRecipeMutation
} from "./recipesApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { MY_RECIPE_CATEGORIES, MY_UNIT, MY_CURRENCY } from "../../config/constant";
import {
  useGetStocksQuery,
  selectStockByUserId,
} from "../stocks/stocksApiSlice";
import { useSelector } from "react-redux";
import useStockDetails from "../../hooks/useStockDetails";

const EditRecipeForm = ({ recipe}) => {
  const {
    data: stocks,
    isLoading: stockIsLoading,
    isSuccess: stockIsSuccess,
    isError: stockIsError,
    error: stockError,
  } = useGetStocksQuery("stocksList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });



  const [addNewRecipe, { isLoading:isLoadingAdd, isSuccess:isSuccessAdd, isError:isErrorAdd, error:errorAdd }] =
    useAddNewRecipeMutation();

  const [updateRecipe, { isLoading, isSuccess, isError, error }] =
    useUpdateRecipeMutation();

  const [
    deleteRecipe,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteRecipeMutation();

//   console.log(recipe);

  const navigate = useNavigate();

  const [name, setName] = useState(recipe.name);
  const [categories, setCategories] = useState(recipe.categories[0]);
  const [totalCost, setTotalCost] = useState(recipe.totalCost);
  const [currency, setCurrency] = useState(recipe.currency[0]);
  const [servings, setServings] = useState(recipe.servings);
  const [ingredients, setIngredients] = useState([...recipe.ingredients]);
  const [userId, setUserId] = useState(recipe.user);

  const filterStock = useSelector((state) =>
    selectStockByUserId(state, userId)
  );

  // const [completed, setCompleted] = useState(recipe.completed)

  useEffect(() => {
    const totalICost = ingredients.reduce((accumulator, currentValue) => {
      const icostValue = currentValue.iamount * currentValue.icost || 0;
      return isNaN(icostValue) ? accumulator : accumulator + Number(icostValue);
    }, 0);

    setTotalCost(totalICost);
  }, [ingredients]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setCategories("");
      setTotalCost(0);
      setServings(0);
      setCurrency("");
      setIngredients([]);
      setUserId("");
      navigate("/dash/recipes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onCategoriesChanged = (e) => setCategories(e.target.value);
  const onCurrencyChanged = (e) => setCurrency(e.target.value);
  const onServingsChanged = (e) => setServings(e.target.value)
  const onCancelClick = async (e) => await navigate("/dash/recipes");


const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    setIngredients(prevState => {
      const newIngredients = [...prevState];
      newIngredients[index] = {
        ...newIngredients[index],
        [name]: name === "iunit" ? [value] : name === "iamount" || name === "icost" ? Number(value) : value
      };
      return newIngredients;
    });
  };
  

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        stock: "",
        iamount: 0,
        iunit: MY_UNIT[0].name,
        icurrency: MY_CURRENCY[0].name,
      },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const categorySelection = MY_RECIPE_CATEGORIES.map((opt) => {
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
  const currencySelection = MY_CURRENCY.map((opt) => {
    return (
      <option key={opt.id} value={opt.name}>
        {" "}
        {opt.name}
      </option>
    );
  });
  const ingredientsSelection = filterStock.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });
  // const onCompletedChanged = e => setCompleted(prev => !prev)

  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [name, categories, totalCost, currency,userId, ingredients].every(
      Boolean
    ) && !isLoading;

    // console.log(categories)
  const onSaveRecipeClicked = async (e) => {
    if (canSave) {
      await updateRecipe({
        id: recipe.id,
        user: userId,
        name,
        categories,
        totalCost,
        currency,
        ingredients,
        servings
      });
    }
  };

  const onDeleteRecipeClicked = async () => {
    await deleteRecipe({ id: recipe.id });
  };

  // const created = new Date(recipe.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(recipe.updatedAt).toLocaleString("en-US", {
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

//   const StockName = ({ stock }) => {
//     const stockName = useStockDetails(stock);
//     return stockName.name;
//   };

  const content = (
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center">
      <h2>EDIT RECIPE #{recipe.id}</h2>
      <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-1 p-5">
              <input type="hidden" name="user" value={userId} />

              <label className="form__label m-2" htmlFor="recipe-name">
                Name:
              </label>

              <input
                className={`form__input ${validInputChecker(
                  name
                )} text-black m-2 w-full`}
                id="recipe-name"
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onNameChanged}
              />
              <label className="form__label m-2" htmlFor="recipe-categories">
                Categories:
              </label>
              <select
                id="recipe-categories"
                name="categories"
                className="form__select text-black rounded-lg m-2"
                defaultValue={categories}
                onChange={onCategoriesChanged}
              >
                {categorySelection}
              </select>
              <br />
              <label className="form__label m-2" htmlFor="recipe-cost">
                Total Cost:
              </label>
              <span
                className={`bg-white text-black rounded-lg m-2 p-2`}
                id="recipe-cost"
                name="cost"
                type="number"
                value={totalCost}
              >
                {totalCost}
              </span>
                <br/>
              <label className="form__label m-2" htmlFor="recipe-currency">
                Currency:
              </label>
              <select
                id="recipe-currency"
                name="currency"
                className="form__select text-black rounded-lg m-2"
                defaultValue={currency}
                onChange={onCurrencyChanged}
              >
                {currencySelection}
              </select>
              <br />
              <label className="form__label m-2" htmlFor="recipe-servings">
                Servings:
              </label>
              <input
                className={`form__input ${validInputChecker(
                  servings
                )} text-black m-2 w-full`}
                id="recipe-servings"
                type="number"
                value={servings}
                onChange={onServingsChanged}
              />
            </div>
            <div className="col-span-1">
              <label className="form__label" htmlFor="recipe-ingredients">
                INGREDIENTS:
              </label>
              {ingredients.map((ingredient, index) => (
                <div className="" key={index}>
                  <label className="form__label p-2" htmlFor={`recipe-stock-${index}`}>
                    Stock:
                  </label>
                  <select
                    id="recipe-stock"
                    type="text"
                    name="stock"
                    className="form__select text-black rounded-lg m-2 w-full"
                    defaultValue={ingredient.stock}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required
                  >
                    {ingredientsSelection}
                  </select>
                  <br />

                  <label className="form__label p-2" htmlFor="recipe-iamount">
                    Amount:
                    <input
                      className={`form__input ${validInputChecker(
                        ingredient.iamount
                      )} text-black m-2 w-full`}
                      id="recipe-iamount"
                      type="number"
                      name="iamount"
                      value={ingredient.iamount}
                      onChange={(e) => handleIngredientChange(index, e)}
                      required
                    />
                  </label>
                  <br />
                  <label className="form__label p-2" htmlFor="recipe-iunit">
                    Unit:
                    <select
                      className={`form__input ${validInputChecker(
                        ingredient.iunit
                      )} text-black m-2 w-full`}
                      type="text"
                      name="iunit"
                      defaultValue={ingredient.iunit[0]}
                      onChange={(e) => handleIngredientChange(index, e)}
                      required
                    >
                      {unitSelection}
                    </select>
                  </label>
                  <br />
                  <label className="form__label p-2" htmlFor="recipe-icost">
                    Cost:
                    <input
                      className={`form__input ${validInputChecker(
                        ingredient.icost
                      )} text-black m-2 w-full`}
                      id="recipe-icost"
                      type="number"
                      name="icost"
                      value={ingredient.icost}
                      onChange={(e) => handleIngredientChange(index, e)}
                      required
                    />
                  </label>
                  <br />
                  <label className="form__label m-2" htmlFor="recipe-icurrency">
                    Currency:
                  </label>
                  <select
                    id="recipe-icurrency"
                    name="icurrency"
                    className="form__select text-black rounded-lg m-2"
                    defaultValue={ingredient.icurrency[0]}
                    onChange={(e) => handleIngredientChange(index, e)}
                  >
                    {currencySelection}
                  </select>
                  <button
                    type="button"
                    className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Remove Ingredient
                  </button>
                </div>
              ))}
              <br />
              <button
                type="button"
                className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </button>
              <br />
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-3 gap-2 w-full p-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                title="Save"
                onClick={onSaveRecipeClicked}
                disabled={!canSave}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                title="Delete"
                onClick={onDeleteRecipeClicked}
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
        </form>
      </div>
    </div>
  );

  return content;
};

export default EditRecipeForm;
