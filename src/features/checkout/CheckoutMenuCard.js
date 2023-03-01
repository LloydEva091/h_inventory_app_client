import React, { useState, useEffect } from "react";
import { useGetRecipesQuery } from "../recipes/recipesApiSlice";
const CheckoutMenuCard = (props) => {
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

  // Filter all recipe by current user and use this as a selection
  const filterRecipesByUser = Object.values(recipes?.entities ?? {}).filter(
    (recipe) => recipe.user == props.user
  );


  const handleItemChange = (index, e) => {
    const newItemArr = [...props.items];
    newItemArr[index] = {
      ...newItemArr[index],
      [e.target.name]: e.target.value,
    };
    props.setItem(newItemArr);
  };

  const recipeSelections = filterRecipesByUser.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });

  const content = (
    <>
      <div>
        <label className="form__label" htmlFor="menu-label">
          {props.mealType.toUpperCase()}
        </label>
        {props.items.map((item, index) => (
          <div key={index}>
            <label className="form__label p-2" htmlFor="menu-recipe">
              <select
                id="menu-recipe"
                type="text"
                name="recipe"
                className="form__select text-black rounded-lg m-2 p-2 w-2/3   mb-6"
                defaultValue={item.recipe}
                onChange={(e) => {
                  handleItemChange(index, e);
                }}
                required
              >
                <option value="" disabled selected>
                  Select Recipe
                </option>
                {recipeSelections}
              </select>
            </label>
          </div>
        ))}
      </div>
    </>
  );

  return content;
};

export default CheckoutMenuCard;
