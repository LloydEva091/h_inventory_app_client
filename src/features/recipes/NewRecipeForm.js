import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewRecipeMutation } from "./recipesApiSlice";
import {
  useGetStocksQuery,
  selectStockByUserId,
} from "../stocks/stocksApiSlice";
import {
  MY_RECIPE_CATEGORIES,
  MY_CURRENCY,
  MY_UNIT,
} from "../../config/constant";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const NewRecipeForm = ({ users }) => {
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

  const [addNewRecipe, { isLoading, isSuccess, isError, error }] =
    useAddNewRecipeMutation();

  const [userId, setUserId] = useState(users._id);
  // Filter all stock by current user and use this as a selection
  const filterStock = useSelector((state) =>
    selectStockByUserId(state, userId)
  );
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState(MY_RECIPE_CATEGORIES[0].name);
  const [servings, setServings] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [currency, setCurrency] = useState(MY_CURRENCY[0].name);
  const [ingredients, setIngredients] = useState([
    {
      stock: filterStock[0].id,
      iamount: '',
      iunit: MY_UNIT[0].name,
      icost: '',
      icurrency: MY_CURRENCY[0].name,
    },
  ]);

  // console.log(userId)

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setCategories("");
      setTotalCost("");
      setCurrency("");
      setIngredients([]);
      // setUserId('')
      navigate("/dash/recipes");
    }
  }, [isSuccess, navigate]);

  // Get total cost of recipe, check if the current ingredient cost is empty if so return 0, also checks if the value is not a number if so return current value or 0
  useEffect(() => {
    const totalICost = ingredients.reduce((accumulator, currentValue) => {
      const icostValue = currentValue.iamount * currentValue.icost || 0;
      return isNaN(icostValue) ? accumulator : accumulator + Number(icostValue);
    }, 0);

    setTotalCost(totalICost);
  }, [ingredients]);

  const onNameChanged = (e) => setName(e.target.value);
  const onCategoriesChanged = (e) => setCategories(e.target.value);
  const onCurrencyChanged = (e) => setCurrency(e.target.value);
  const onServingsChanged = (e) => setServings(e.target.value);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        stock: filterStock[0].id,
        iamount: 0, 
        iunit: MY_UNIT[0].name,
        icost: 0, 
        icurrency: MY_CURRENCY[0].name,
      },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const canSave =
    [
      userId,
      name,
      categories,
      servings,
      currency,
      totalCost,
      ingredients,
    ].every(Boolean) && !isLoading;

  const onAddRecipeClicked = async (e) => {
    e.preventDefault();
    console.log(canSave);
    if (canSave) {
      await addNewRecipe({
        user: userId,
        name,
        categories,
        servings,
        currency,
        totalCost,
        ingredients,
      });
    }
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

  //console.log(filterStock[0]._id)
  const ingredientsSelection = filterStock.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });

  // const onResetClick = async (e) => {
  //     setName('')
  //     setCategories('')
  //     setCost('')
  //     setCurrency('')
  //     setCurrentRecipe('')
  //     setMinRecipe('')
  //     setMaxRecipe('')
  //     setUnit('')
  //     setImage('')
  // }
  // const options = users.map(user => {
  //     return (
  //         <option
  //             key={user.id}
  //             value={user.id}
  //         > {user.username}</option >
  //     )
  // })

  // console.log(totalCost)
  const errClass = isError ? "errmsg" : "offscreen";

  const validInputChecker = (props) => {
    return !props ? "form__input--incomplete" : "";
  };
  // console.log(filterStock[0]._id)
  const content = (
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
      <h2 className="uppercase">Add New Recipe </h2>
      <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onAddRecipeClicked}>
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
                defaultValue={categories[0]}
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

              <label className="form__label m-2" htmlFor="recipe-currency">
                Currency:
              </label>
              <select
                id="recipe-currency"
                name="currency"
                className="form__select text-black rounded-lg m-2"
                defaultValue={MY_CURRENCY[0].name}
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
                  <label className="form__label p-2" htmlFor="recipe-stock">
                    Stock:
                  </label>
                  <select
                    id="recipe-stock"
                    type="text"
                    name="stock"
                    className="form__select text-black rounded-lg m-2 w-full"
                    defaultValue={filterStock[0].id.toString()}
                    // defaultValue={firstStock.id}
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
                      defaultValue={ingredient.iunit}
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
                    defaultValue={ingredient.icurrency}
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

          <div className="grid grid-cols-1 gap-1 w-full m-1">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
              title="submit"
              type="submit"
              onClick={onAddRecipeClicked}
            >
              Add
            </button>
            <Link
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
              to="/dash/recipes"
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

export default NewRecipeForm;
