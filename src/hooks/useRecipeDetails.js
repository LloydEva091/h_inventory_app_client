// The useRecipeDetails hook is designed to fetch and return details of a recipe with a given ID. It uses the useGetRecipesQuery and selectRecipeById hooks from the recipesApiSlice to fetch and select the recipe details from the Redux store.

import React from "react";
import { useSelector } from "react-redux";
import {
  selectRecipeById,
  useGetRecipesQuery,
} from "../features/recipes/recipesApiSlice";

const useRecipeDetails = (id) => {
  let totalCost = ''
  let name = ''
  let currency = ''

  //   const recipe = useSelector(state => selectRecipeById(state, id))
  const { recipe } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data }) => ({
      recipe: data?.entities[id],
    }),
  });

  if(!recipe){
    totalCost = 0
    name = ""
    currency = ['N/A']
  }else {
    totalCost = recipe.totalCost
    name = recipe.name
    currency = recipe.currency
  }

  return {name,totalCost,currency};
};

export default useRecipeDetails;
