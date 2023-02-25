import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewMenuMutation } from "./menusApiSlice";
import { useGetRecipesQuery } from "../recipes/recipesApiSlice";
import { MY_CURRENCY } from "../../config/constant";
// import { useSelector } from "react-redux";
import MealForm from "./MealForm";
import AddMenuModalView from "./AddMenuModalView";
import useRecipeDetails from "../../hooks/useRecipeDetails";

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
  // console.log(allMeals)

  // const { recipesList, isLoading:totalCostLoading } = useTotalCost(allMeals);
  // console.log("total cost",recipesList)

  // Call useRecipeDetails outside of the useEffect callback
  // const recipeDetails = useRecipeDetails(breakfasts.map((meal) => meal.recipe));
  // console.log(recipeDetails)

  // useEffect(() => {
  //   const mealTotal = recipeDetails.length > 0 ? recipeDetails.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue.totalCost,0): 0;
  //   setTotalCosts(mealTotal);
  // }, [recipeDetails]);

  // console.log("totalCost", totalCosts);

  // const totalCost = breakfasts.reduce(
  //   (acc, curr) => acc + parseInt(RecipeCost({ recipeId: curr.recipe })),
  //   0
  // );

  // const [totalCost, setTotalCost] = useState(0);

  // useEffect(() => {
  //   const calculateTotalCost = () => {
  //     let total = 0;
  //     breakfasts.forEach((item) => {
  //       if (item.recipe) {
  //         total += (item.recipe ? Number(<RecipeCost recipeId={item.recipe} />) : 0);
  //       }
  //     });
  //     lunches.forEach((item) => {
  //       if (item.recipe) {
  //         total +=  (item.recipe ? Number(<RecipeCost recipeId={item.recipe} />) : 0);
  //       }
  //     });
  //     dinners.forEach((item) => {
  //       if (item.recipe) {
  //         total +=  (item.recipe ? Number(<RecipeCost recipeId={item.recipe} />) : 0);
  //         // console.log(total)
  //       }
  //     });
  //     setTotalCost(total);
  //   };

  //   calculateTotalCost();
  // }, [breakfasts, lunches, dinners]);

  // let total = 0
  // let test2 = ''
  // let testContent = breakfasts.forEach((item) => {
  //   console.log("inside",item.recipe)
  //   if (item.recipe) {
  //     test2 = <RecipeCost recipeId={item.recipe} />
  //     console.log(test2)
  //     total += (item.recipe ? Number(<RecipeCost recipeId={item.recipe} />) : 0);
  //   }
  // });
  // console.log(testContent)

  // const testContent = <RecipeCost breakfast={breakfasts}></RecipeCost>
  // console.log(testContent)
  //   let total = 0;
  //   const breakfastTotal = breakfasts.map((item) => {
  //     return item.recipe ? <RecipeCost key={item.recipe} recipeId={item.recipe} /> : 0;
  //   }).reduce((acc, cost) => acc + cost, 0);

  //   const lunchTotal = lunches.map((item) => {
  //     return item.recipe ? <RecipeCost key={item.recipe} recipeId={item.recipe} /> : 0;
  //   }).reduce((acc, cost) => acc + cost, 0);

  //   const dinnerTotal = dinners.map((item) => {
  //     return item.recipe ? <RecipeCost key={item.recipe} recipeId={item.recipe} /> : 0;
  //   }).reduce((acc, cost) => acc + cost, 0);
  //   total = breakfastTotal+lunchTotal+dinnerTotal
  //   setTotalCost(total);
  // };

  // if (recipeIsLoading) {
  //   <div>Loading...</div>;
  // }
  // if(recipeIsError){
  //   <div>{recipeError}</div>
  // }

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

  // Get total cost of menu, check if the current breakfast cost is empty if so return 0, also checks if the value is not a number if so return current value or 0
  // useEffect(() => {
  //   const totalICost = breakfasts.reduce((accumulator, currentValue) => {
  //     const icostValue = currentValue.iamount * currentValue.icost || 0;
  //     return isNaN(icostValue) ? accumulator : accumulator + Number(icostValue);
  //   }, 0);

  //   setTotalCost(totalICost);
  // }, [breakfasts]);

  const onNameChanged = (e) => setName(e.target.value);

  const canSave =
  // currency, menuCost,
    [userId, name, breakfasts, lunches, dinners, allMeals].every(
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
        dinners,
        allMeals
      });
    }
  };

  // const currencySelection = MY_CURRENCY.map((opt) => {
  //   return (
  //     <option key={opt.id} value={opt.name}>
  //       {" "}
  //       {opt.name}
  //     </option>
  //   );
  // });

  const recipeSelections = filterRecipesByUser.map((opt) => {
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
  const dinnerConent = (
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
              <AddMenuModalView
                modalContent={breakfastContent}
                mealLabel="Breakfast"
                action="Add"
              ></AddMenuModalView>
              <AddMenuModalView
                modalContent={lunchContent}
                mealLabel="Lunch"
                action="Add"
              ></AddMenuModalView>
              <AddMenuModalView
                modalContent={dinnerConent}
                mealLabel="Dinner"
                action="Add"
              ></AddMenuModalView>
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
