import { useState, useEffect } from "react";
import {
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useAddNewMenuMutation,
} from "./menusApiSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  MY_RECIPE_CATEGORIES,
  MY_UNIT,
  MY_CURRENCY,
} from "../../config/constant";
import {
  useGetStocksQuery,
  selectStockByUserId,
} from "../stocks/stocksApiSlice";
import {
  selectRecipeByUserId,
  useGetRecipesQuery,
} from "../recipes/recipesApiSlice";
import ModalView from '../../components/ModalView'
import MealForm from "./MealForm";
import sortList from "../../utils/sortList";

const EditMenuForm = ({ menu }) => {
  const {
    data: recipes,
    isLoading: recipeIsLoading,
    isSuccess: recipeIsSuccess,
    isError: recipeIsError,
    error: recipeError,
  } = useGetRecipesQuery("recipesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [
    addNewMenu,
    {
      isLoading: isLoadingAdd,
      isSuccess: isSuccessAdd,
      isError: isErrorAdd,
      error: errorAdd,
    },
  ] = useAddNewMenuMutation();

  const [updateMenu, { isLoading, isSuccess, isError, error }] =
    useUpdateMenuMutation();

  const [
    deleteMenu,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteMenuMutation();

  //   console.log(menu);

  const navigate = useNavigate();

  const [name, setName] = useState(menu.name);
  const [menuCost, setMenuCost] = useState(menu.menuCost);
  const [currency, setCurrency] = useState(menu.currency[0]);
  const [breakfasts, setBreakfasts] = useState([...menu.breakfasts]);
  const [lunches, setLunches] = useState([...menu.lunches]);
  const [dinners, setDinners] = useState([...menu.dinners]);
  const [userId, setUserId] = useState(menu.user);

  const filterRecipesByUser = Object.values(recipes?.entities ?? {}).filter(
    (recipe) => recipe.user == userId
  );

  // console.log("FFF",menu)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setMenuCost(0);
      setCurrency("");
      setBreakfasts([]);
      setLunches([]);
      setDinners([]);
      setUserId("");
      navigate("/dash/menus");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onCancelClick = async (e) => await navigate("/dash/menus");

  const sortedRecipe = sortList(filterRecipesByUser, 'name') 
  const recipeSelections = sortedRecipe.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });
  // const onCompletedChanged = e => setCompleted(prev => !prev)

  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [name, menuCost, currency, userId, breakfasts, lunches, dinners].every(
      Boolean
    ) && !isLoading;

  // console.log(categories)
  const onSaveMenuClicked = async (e) => {
    if (canSave) {
      await updateMenu({
        id: menu.id,
        user: userId,
        name,
        menuCost,
        currency,
        breakfasts,
        lunches,
        dinners,
      });
    }
  };

  const onDeleteMenuClicked = async () => {
    await deleteMenu({ id: menu.id });
  };

  // const created = new Date(menu.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(menu.updatedAt).toLocaleString("en-US", {
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

  const breakfastContent = (
    <MealForm
      mealType="breakfast"
      setItem={setBreakfasts}
      mealItems={breakfasts}
      recipesSelection={recipeSelections}
    ></MealForm>
  );
  const lunchContent = (
    <MealForm
      mealType="lunch"
      setItem={setLunches}
      mealItems={lunches}
      recipesSelection={recipeSelections}
    ></MealForm>
  );
  const dinnerContent = (
    <MealForm
      mealType="dinner"
      setItem={setDinners}
      mealItems={dinners}
      recipesSelection={recipeSelections}
    ></MealForm>
  );

  const content = (
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center">
      <h2>EDIT MENU #{menu.id}</h2>
      <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-1 p-5">
              <input type="hidden" name="user" value={userId} />

              <label className="form__label m-2" htmlFor="menu-name">
                Name:
              </label>

              <input
                className={`form__input ${validInputChecker(
                  name
                )} text-black m-2 w-full mb-4`}
                id="menu-name"
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onNameChanged}
              />

              <br />
              <label className="form__label m-2" htmlFor="menu-cost">
                Total Menu Cost:
              </label>
              <span
                className={`bg-white text-black rounded-lg m-2 p-2`}
                id="menu-cost"
                name="cost"
                type="number"
                value={menuCost.toFixed(2)}
              >
                {menuCost.toFixed(2)}
              </span>
              <br/><br/>
              <label className="form__label m-2" htmlFor="menu-currency">
                Currency:
              </label>
              <span
                id="menu-currency"
                name="currency"
                className={`text-black bg-white rounded-lg m-2 p-2`}
                value={currency}
              >{currency}</span>
              <br />
            </div>
            <div className="col-span-1">
              <ModalView
                modalContent={breakfastContent}
                label="Breakfast"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={lunchContent}
                label="Lunch"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={dinnerContent}
                label="Dinner"
                action="Edit"
              ></ModalView>
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-3 gap-2 w-full p-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                title="Save"
                onClick={onSaveMenuClicked}
                disabled={!canSave}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                title="Delete"
                onClick={onDeleteMenuClicked}
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

export default EditMenuForm;
