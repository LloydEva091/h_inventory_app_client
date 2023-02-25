import { MY_CURRENCY } from "../../config/constant";
import useRecipeDetails from "../../hooks/useRecipeDetails";
import { useEffect, useState } from 'react'

function MealForm({ mealType, mealItems, setItem, recipesSelection }) {
  const [itemsChanged, setItemsChanged] = useState(0); // state variable to track changes to mealItems array

  const RecipeInfo = ({ recipe, property}) => {
    const { totalCost, currency, name } = useRecipeDetails(recipe);
    if (property === 'totalCost') {
      return totalCost.toFixed(2)
    } else if (property === 'currency') {
      return currency;
    } else if (property === 'name') {
      return name;
    } else if (property === 'all') {
      return { name, totalCost, currency }
    }
  };

  useEffect(() => {
    // This code will be executed whenever itemsChanged state variable changes
    console.log("Items changed, re-rendering component");
  }, [itemsChanged]);

  const handleItemChange = (index, e) => {
    const newItemArr = [...mealItems];
    newItemArr[index] = { ...newItemArr[index], [e.target.name]: e.target.value };
    setItem(newItemArr);
    setItemsChanged(itemsChanged + 1); // update state variable to force re-render
  };

  const handleAddItem = () => {
    setItem([
      ...mealItems,
      {
        recipe: "",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItemArr = [...mealItems];
    newItemArr.splice(index, 1);
    setItem(newItemArr);
    setItemsChanged(itemsChanged + 1); // update state variable to force re-render
  };


  return (
    <div>
      <label className="form__label" htmlFor="menu-label">
        {mealType.toUpperCase()}
      </label>
      {mealItems.map((item, index) => (
        <div key={index}>
          <label className="form__label p-2" htmlFor="menu-recipe">
            Recipe:
            <select
              id="menu-recipe"
              type="text"
              name="recipe"
              className="form__select text-black rounded-lg m-2 w-full mb-6"
              defaultValue={item.recipe}
              onChange={(e) => {
                handleItemChange(index, e);
              }}
              required
            >
              <option value="" disabled selected>
                Select Recipe
              </option>
              {recipesSelection}
            </select>
          </label>
          <br />
          <label className="form__label p-2" htmlFor="menu-cost">
            Cost:
            <span
              className={`form__input item.id text-black w-full bg-white m-2`}
              id="menu-cost"
              type="number"
              name="cost"
            >
              <RecipeInfo
                recipe={item.recipe}
                property="totalCost"
              ></RecipeInfo>
            </span>
          </label>
          <label className="form__label m-2" htmlFor="menu-currency">
            Currency:
            <span
              className={`form__input  item.id text-black m-2 w-full bg-white`}
              id="menu-currency"
              type="number"
              name="currency"
              value={item.currecy}
              // onChange={(e) => handleItemChange(index, e)}
            >
              <RecipeInfo recipe={item.recipe} property="currency"></RecipeInfo>
            </span>
          </label>
          <button
            type="button"
            className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center mt-6"
            onClick={() => handleRemoveItem(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
        onClick={handleAddItem}
      >
        Add {mealType} Item
      </button>
    </div>
  );
}

export default MealForm;
