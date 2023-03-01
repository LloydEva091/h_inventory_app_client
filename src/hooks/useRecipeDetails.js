// The useRecipeDetails hook is designed to fetch and return details of a recipe with a given ID. It uses the useGetRecipesQuery and selectRecipeById hooks from the recipesApiSlice to fetch and select the recipe details from the Redux store.

import React from "react";
import { useSelector } from "react-redux";
import {
  selectRecipeById,
  useGetRecipesQuery,
} from "../features/recipes/recipesApiSlice";

const useRecipeDetails = (recipeId) => {
  let totalCost = ''
  let name = ''
  let currency = ''
  let ingredients = ''
  let categories = ''
  let servings = ''
  let id = ''

  //   const recipe = useSelector(state => selectRecipeById(state, id))
  const { recipe } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data }) => ({
      recipe: data?.entities[recipeId],
    }),
  });

  if(!recipe){
    totalCost = 0
    name = ""
    currency = ['N/A']
    ingredients = []
    categories = ['N/A']
    servings = 0
    id = ''
  }else {
    id = recipe.id
    totalCost = recipe.totalCost
    name = recipe.name
    currency = recipe.currency
    ingredients = recipe.ingredients
    categories = recipe.categories
    servings = recipe.servings
  }

  return {id,name,totalCost,currency, ingredients, categories,servings};
};

export default useRecipeDetails;
