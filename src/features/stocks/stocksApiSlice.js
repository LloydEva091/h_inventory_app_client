// This code defines a Redux slice for managing stocks data with RTK Query. The slice provides endpoints for querying, creating, updating, and deleting stocks. It also defines selectors for selecting stocks data based on various criteria, including filtering by user ID.

// The code uses createEntityAdapter from @reduxjs/toolkit to create an adapter for managing stocks data in the Redux store. This allows for more efficient updates and lookups of stocks data. The initialState for the adapter is obtained using the getInitialState function provided by the adapter.

// The apiSlice function from @reduxjs/toolkit/query is used to define the endpoints for querying, creating, updating, and deleting stocks. The getStocks endpoint queries for all stocks and transforms the response data to a normalized form using the setAll function provided by the adapter. The addNewStock, updateStock, updateMultipleStock, and deleteStock endpoints correspond to creating, updating, and deleting stocks, respectively. The invalidatesTags option is used to invalidate cache tags for the affected stocks when updates or deletions occur.

// The selectStocksData selector uses createSelector from reselect to memoize the result of selecting the normalized stocks data from the store. The selectStockByUserId selector uses createSelector to filter the stocks data by user ID.

// Finally, the getSelectors function provided by the adapter is used to create selectors for selecting all stocks, a stock by ID, and stock IDs.

import {
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const stocksAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = stocksAdapter.getInitialState();

export const stocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => "/api/stocks",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedStocks = responseData.map((stock) => {
          stock.id = stock._id;
          return stock;
        });
        return stocksAdapter.setAll(initialState, loadedStocks);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Stock", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Stock", id })),
          ];
        } else return [{ type: "Stock", id: "LIST" }];
      },
    }),
    addNewStock: builder.mutation({
      query: (initialStock) => ({
        url: "/api/stocks",
        method: "POST",
        body: {
          ...initialStock,
        },
      }),
      invalidatesTags: [{ type: "Stock", id: "LIST" }],
    }),
    updateStock: builder.mutation({
      query: ({ url, body }) => ({
        url,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Stock", id: arg.id }],
    }),
    deleteStock: builder.mutation({
      query: ({ id }) => ({
        url: `/api/stocks`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Stock", id: arg.id }],
    }),
    updateSingleStock: builder.mutation({
      query: (stockToUpdate) => ({
        url: `/api/stocks/${stockToUpdate._id}`,
        method: "PATCH",
        body: { ...stockToUpdate },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Stock", id: arg.id }],
    }),
    checkStock: builder.mutation({
      query: ({ id }) => ({
        url: `/api/stocks/check/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetStocksQuery,
  useAddNewStockMutation,
  useUpdateStockMutation,
  useUpdateSingleStockMutation,
  useDeleteStockMutation,
  useCheckStockMutation,
} = stocksApiSlice;

// returns the query result object
export const selectStocksResult = stocksApiSlice.endpoints.getStocks.select();

// creates memoized selector
const selectStocksData = createSelector(
  selectStocksResult,
  (stocksResult) => stocksResult.data // normalized state object with ids & entities
);

// Select only stock with the this user id
export const selectStockByUserId = createSelector(
  [selectStocksData, (state, userId) => userId],
  (stocks, userId) => {
    // console.log(stocks)
    if (!stocks) return [];
    let result = Object.values(stocks.entities).filter(
      (stock) => stock.user == userId
    );
    // console.log(result)
    return result;
  }
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStocks,
  selectById: selectStockById,
  selectIds: selectStockIds,
  // Pass in a selector that returns the stocks slice of state
} = stocksAdapter.getSelectors(
  (state) => selectStocksData(state) ?? initialState
);

// This function is used to update multiple stocks asynchronously and is created using the createAsyncThunk tool provided by Redux Toolkit
export const updateMultipleStocks = createAsyncThunk(
  // The first argument of createAsyncThunk is a string that represents the name of the new action created
  "stocks/updateMultipleStocks",
  // The second argument is an async function that takes in the list of stocks to update and the Redux dispatch function
  async (stockList, { dispatch }) => {
    // Log a message to the console to indicate that the updateMultipleStocks request has started and show the stockList being updated
    console.log(
      "updateMultipleStocks request initiated with stockList:",
      stockList
    );
    // Create an array of requests that will be sent to the server to update each stock in the list
    const requests = stockList.map((stockItem) => ({
      url: `/api/stocks/${stockItem.id}`,
      method: "PUT",
      body: { ...stockItem },
    }));
    // Use Promise.all to initiate all requests asynchronously and wait for all responses to resolve
    const responses = await Promise.all(
      // For each request, use the updateStock endpoint provided by the apiSlice to initiate the request
      requests.map((request) =>
        dispatch(apiSlice.endpoints.updateStock.initiate(request))
      )
    );
    // Check if any of the requests failed.
    const isError = responses.some((response) => response.error);
    if (isError) {
      // If any request fails, throw an error indicating that one or more stocks failed to update
      throw new Error("Failed to update one or more stocks.");
    }
    // If all requests were successful, map over the responses and return an array of updated stock data
    return responses.map((response) => response.data);
  }
);
