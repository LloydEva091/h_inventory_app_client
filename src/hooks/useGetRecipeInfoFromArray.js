import React, { useCallback} from 'react';
import { useGetRecipesQuery } from "../features/recipes/recipesApiSlice";
import { useState, useEffect } from 'react';

const useGetRecipeInfoFromArray = ({ itemArrays, setItem }) => {
  // Call the useGetRecipesQuery hook from Redux Toolkit to fetch all recipes
  const {
    data: recipes,
    isLoading: recipeIsLoading,
    isSuccess: recipeIsSuccess,
    isError: recipeIsError,
    error: recipeError,
  } = useGetRecipesQuery("recipesList", {
    pollingInterval: 30000,  // Polling interval in milliseconds
    refetchOnFocus: true,  // Refetch data when the window/tab is focused
    refetchOnMountOrArgChange: true,  // Refetch data when the component mounts or its arguments change
  });

  const memoizedSetItem = useCallback(setItem, [setItem]);
  // When the recipes and itemArrays change, filter the recipes to find only those whose IDs are in itemArrays and set them to the state via the setItem function
  useEffect(() => {
    if (recipes && itemArrays) {
      // Get all values from the recipes.entities object and filter them based on whether the recipe ID is in the itemArrays array
      const matchedRecipes = Object.values(recipes.entities).filter((recipe) =>
        itemArrays.some((item) => item.recipe === recipe.id)
      );
      // Set the matched recipes to the state via the setItem function
      memoizedSetItem(matchedRecipes);
    }
  }, [recipes, itemArrays, memoizedSetItem]);

  // Return null because this hook doesn't render anything
  return null;
};

export default useGetRecipeInfoFromArray;
