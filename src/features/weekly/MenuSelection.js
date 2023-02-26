import { useState, useEffect } from "react";
import useRecipeDetails from "../../hooks/useRecipeDetails";
import { useGetMenusQuery } from "../menus/menusApiSlice";

function MenuSelection({ item }) {
  const { menu } =
    useGetMenusQuery("getMenus", {
      selectFromResult: ({ data }) => ({
        menu: data?.entities[item],
      }),
    }) || {};

  //   console.log("menu  ",menu?.menuCost)
  const RecipeInfo = ({ recipe, property }) => {
    const { totalCost, currency, name } = useRecipeDetails(recipe);
    if (property === "totalCost") {
      return totalCost.toFixed(2);
    } else if (property === "currency") {
      return currency;
    } else if (property === "name") {
      return name;
    } else if (property === "all") {
      return { name, totalCost, currency };
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl m-2 p-2">
        {menu && (
          <div>
            <span
              className={`form__label item.id text-black w-80 bg-white m-2`}
              id="menu-selections"
              type="text"
              name="selections"
            >
              <h4 className="form__label text-purple-600">BREAKFASTS</h4>
              <ul className="px-4">
                {menu.breakfasts.map((recipeId) => (
                  <li
                    key={recipeId._id}
                    className="hover:text-teal-700 list-disc "
                  >
                    <RecipeInfo recipe={recipeId.recipe} property="name" />
                  </li>
                ))}
              </ul>
              <h4 className="form__label text-purple-600">LUNCHES</h4>
              <ul className="px-4">
                {menu.lunches.map((recipeId) => (
                  <li
                    key={recipeId._id}
                    className="hover:text-teal-700 list-disc"
                  >
                    <RecipeInfo recipe={recipeId.recipe} property="name" />
                  </li>
                ))}
              </ul>
              <h4 className="form__label text-purple-600">DINNERS</h4>
              <ul className="px-4">
                {menu.dinners.map((recipeId) => (
                  <li
                    key={recipeId._id}
                    className="hover:text-teal-700 list-disc"
                  >
                    <RecipeInfo recipe={recipeId.recipe} property="name" />
                  </li>
                ))}
              </ul>
            </span>
          </div>
        )}
      </div>
      <div className="mt-5">
        <label className="form__label p-2" htmlFor="menu-cost">
          Cost:
          <span
            className={`form__input item.id text-black w-full bg-white m-2`}
            id="menu-cost"
            type="number"
            name="cost"
          >
            {menu?.menuCost || 0}
          </span>
        </label>
        <label className="form__label m-2" htmlFor="menu-currency">
          Currency:
          <span
            className={`form__input  item.id text-black m-2 w-full bg-white`}
            id="menu-currency"
            type="number"
            name="currency"
          >
            {menu?.currency || "N/A"}
          </span>
        </label>
      </div>
    </>
  );
}  

export default MenuSelection;
