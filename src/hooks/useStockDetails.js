import React from 'react'
import { useSelector } from 'react-redux'
import { selectStockById,useGetStocksQuery } from '../features/stocks/stocksApiSlice'


const useStockDetails = (id) => {

  const stock = useSelector(state => selectStockById(state, id))
  // const { stock } = useGetStocksQuery("getRecipes", {
  //   selectFromResult: ({ data }) => ({
  //     stock: data?.entities[id],
  //   }),
  // });

  // console.log("useStock",stock)

  return (
    stock
  )
}

export default useStockDetails