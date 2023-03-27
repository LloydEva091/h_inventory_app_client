import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewMenuMutation } from "./menusApiSlice";
import { useGetRecipesQuery } from "../recipes/recipesApiSlice";
import MealForm from "./MealForm";
import ModalView from '../../components/ModalView'
import sortList from '../../utils/sortList'

const NewMenuForm = ({ users }) => {
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

  const [addNewMenu, { isLoading, isSuccess, isError, error }] =
    useAddNewMenuMutation();
  const [userId, setUserId] = useState(users._id);
  // Filter all recipe by current user and use this as a selection
  const filterRecipesByUser = Object.values(recipes?.entities ?? {}).filter(
    (recipe) => recipe.user == userId
  );
  // console.log(`test filter`,filterRecipesByUser);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [allMeals, setAllMeals] = useState([]);



  const [breakfasts, setBreakfasts] = useState([
    {
      recipe: "",
    },
  ]);

  const [lunches, setLunches] = useState([
    {
      recipe: "",
    },
  ]);
  const [dinners, setDinners] = useState([
    {
      recipe: "",
    },
  ]);


  useEffect(() => {
    const concatenated = breakfasts.concat(lunches, dinners);
    setAllMeals(concatenated);
  }, [breakfasts, lunches, dinners]);


  if (recipeIsLoading) {
    <div>Loading...</div>;
  }
  if(recipeIsError){
    <div>{recipeError}</div>
  }

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setLunches("");
      setBreakfasts("");
      setDinners("");
      setAllMeals("");
      navigate("/dash/menus");
    }
  }, [isSuccess, navigate]);


  const onNameChanged = (e) => setName(e.target.value);

  const canSave =
    [userId, name, breakfasts.length>0, lunches.length>0, dinners.length>0].every(
      Boolean
    ) && !isLoading;

  const onAddMenuClicked = async (e) => {
    e.preventDefault();
    console.log(canSave);
    if (canSave) {
      await addNewMenu({
        user: userId,
        name,
        breakfasts,
        lunches,
        dinners
      });
    }
  };


  const sortedRecipe = sortList(filterRecipesByUser, 'name')
  const recipeSelections = sortedRecipe.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });


  const errClass = isError ? "errmsg" : "offscreen";
  const validInputChecker = (props) => {
    return !props ? "form__input--incomplete" : "";
  };

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
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
      <h2 className="uppercase">Add New Menu </h2>
      <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onAddMenuClicked}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-1 p-5">
              <input type="hidden" name="user" value={userId} />

              <label className="form__label m-2" htmlFor="menu-name">
                Name:
              </label>

              <input
                className={`form__input ${validInputChecker(
                  name
                )} text-black m-2 w-full`}
                id="menu-name"
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onNameChanged}
              />

            </div>
            <div className="col-span-1">
              <ModalView
                modalContent={breakfastContent}
                label="Breakfast"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={lunchContent}
                label="Lunch"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={dinnerContent}
                label="Dinner"
                action="Add"
              ></ModalView>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 w-full m-1">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
              title="submit"
              type="submit"
              onClick={onAddMenuClicked}
            >
              Add
            </button>
            <Link
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
              to="/dash/menus"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );

  return content;
};

export default NewMenuForm;
