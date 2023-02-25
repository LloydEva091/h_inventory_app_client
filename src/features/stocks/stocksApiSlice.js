import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const stocksAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = stocksAdapter.getInitialState()

export const stocksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStocks: builder.query({
            query: () => '/api/stocks',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedStocks = responseData.map(stock => {
                    stock.id = stock._id
                    return stock
                });
                return stocksAdapter.setAll(initialState, loadedStocks)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Stock', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Stock', id }))
                    ]
                } else return [{ type: 'Stock', id: 'LIST' }]
            }
        }),
        addNewStock: builder.mutation({
            query: initialStock => ({
                url: '/api/stocks',
                method: 'POST',
                body: {
                    ...initialStock,
                }
            }),
            invalidatesTags: [
                { type: 'Stock', id: "LIST" }
            ]
        }),
        updateStock: builder.mutation({
            query: initialStock => ({
                url: '/api/stocks',
                method: 'PATCH',
                body: {
                    ...initialStock,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Stock', id: arg.id }
            ]
        }),
        deleteStock: builder.mutation({
            query: ({ id }) => ({
                url: `/api/stocks`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Stock', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetStocksQuery,
    useAddNewStockMutation,
    useUpdateStockMutation,
    useDeleteStockMutation,
} = stocksApiSlice

// returns the query result object
export const selectStocksResult = stocksApiSlice.endpoints.getStocks.select()

// creates memoized selector
const selectStocksData = createSelector(
    selectStocksResult,
    stocksResult => stocksResult.data // normalized state object with ids & entities
)


// Select only stock with the this user id
export const selectStockByUserId = createSelector(
    [selectStocksData, (state, userId) => userId],
    (stocks, userId) => {
        // console.log(stocks)
        if (!stocks) return []
        let result = Object.values(stocks.entities).filter(stock => stock.user == userId)
        // console.log(result)
        return result
    }
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStocks,
    selectById: selectStockById,
    selectIds: selectStockIds
    // Pass in a selector that returns the stocks slice of state
} = stocksAdapter.getSelectors(state => selectStocksData(state) ?? initialState)