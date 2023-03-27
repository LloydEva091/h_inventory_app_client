import React, { useCallback } from "react";
import { useGetStocksQuery } from "../features/stocks/stocksApiSlice";
import { useState, useEffect } from "react";
const useGetStockInfoFromArray = ({ itemArrays, setItem }) => {
  const {
    data: stocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStocksQuery("stockList", {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const memoizedSetItem = useCallback(setItem, [setItem]);
  // This useEffect hook will be triggered whenever stocks or itemArrays change
  useEffect(() => {
    // Check if stocks and itemArrays are both not null
    if (stocks && itemArrays) {
      // Filter stocks that have matching ids in any of the itemArrays' ingredients
      // filter() now uses some() to check if any of the ingredients in itemArrays match the stock ID.
      // map() now creates an array of objects for each matched item in itemArrays. This is done using the matchedItems array, which is created using filter() to find all the items in itemArrays that match the stock ID.
      const matchedStocks = Object.values(stocks.entities)
        .filter((stock) =>
          itemArrays.some((item) =>
            item.ingredients.some((ingredient) => ingredient.stock === stock.id)
          )
        )
        .map((stock) => {
          // Find all items in itemArrays that contain the current stock
          const matchedItems = itemArrays.filter((item) =>
            item.ingredients.some((ingredient) => ingredient.stock === stock.id)
          );
          // Calculate the total iamount of the current stock in all matched items
          // Keep a running total of iamount using the reduce() method. If an ingredient is found for the current stock, we add its iamount value to the total.
          const iamountTotal = matchedItems.reduce((total, item) => {
            const ingredient = item.ingredients.find(
              (ingredient) => ingredient.stock === stock.id
            );
            // If the item contains the current stock, add its iamount to the total
            if (ingredient) {
              total += ingredient.iamount;
            }
            return total;
          }, 0);
          // Return a new object with the updated iamount and iunit properties
          return {
            ...stock,
            iamount: iamountTotal || null,
            iunit:
              matchedItems[0].ingredients.find(
                (ingredient) => ingredient.stock === stock.id
              )?.iunit || null,
          };
        })
        .flat(); //flat() is used to flatten the array of arrays created by map(), so that matchedStocks is a single array of objects.
      // Update the state with the matched stocks
      memoizedSetItem(matchedStocks);
    }
  }, [stocks, itemArrays, memoizedSetItem]);
  return memoizedSetItem;
};

export default useGetStockInfoFromArray;
