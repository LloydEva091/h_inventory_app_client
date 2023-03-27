import React, {useCallback} from "react";
import { useEffect } from "react";

const useGetStockToReduceList = ({ stockList, setItem }) => {
  let newAmount;

  const memoizedSetItem = useCallback(setItem, [setItem]);
  useEffect(() => {
    // Check if stocks and itemArrays are both not null
    if (stockList) {
      const reducedList = stockList.map((stock) => {
        // Check if stock per_unit is the same as the item iunit
        if (stock.per_unit.toString() == stock.iunit.toString()) {
          // If they're the same, set newAmount to item amount
          newAmount = stock.iamount;
        } else {
          // If they're not the same, we need to convert
          if (stock.iunit == "g") {
            newAmount = stock.iamount/1000;
          } else if (stock.iunit == "ml") {
            newAmount = stock.iamount/1000;
          } else if(stock.iunit == 'ea'){
            // So if the unit is not correct we are not able to reduce.
            newAmount = 0
          } 
        }


        // Use stock info and multiply the current stock * per_unit then - the newAmount
        // Afterwards the result divide by the per_unit and the result is the new current stock
        const currentStock = stock.current_stock * stock.per_stock;

        // console.log(`perUnit ${stock.per_unit}`)
        // console.log(`stock current ${stock.current_stock} PerSTock ${stock.per_stock} stock iamount ${stock.iamount} `)
        // console.log(`NewAmount ${newAmount} CurrentStockAFter ${currentStock} `)

        const newStock = ((currentStock - newAmount) / stock.per_stock).toFixed(2);

        // Make new object with just the stock id and the new current_stock
        return {
        // name: stock.name,
        //   stock: stock.id,
          ...stock,
          current_stock: Number(newStock) || null,
        };
      });
      memoizedSetItem(reducedList);
    }
  }, [stockList, memoizedSetItem]);

  return memoizedSetItem
};

export default useGetStockToReduceList;
