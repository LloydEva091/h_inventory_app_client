import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const weeklyMenusAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = weeklyMenusAdapter.getInitialState();

export const weeklyMenusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyMenus: builder.query({
      query: () => "/api/weekly",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedMenus = responseData.map((menu) => {
          menu.id = menu._id;
          return menu;
        });
        return weeklyMenusAdapter.setAll(initialState, loadedMenus);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "WeeklyMenu", id: "LIST" },
            ...result.ids.map((id) => ({ type: "WeeklyMenu", id })),
          ];
        } else return [{ type: "WeeklyMenu", id: "LIST" }];
      },
    }),
    addNewWeeklyMenu: builder.mutation({
      query: (initialMenu) => ({
        url: "/api/weekly",
        method: "POST",
        body: {
          ...initialMenu,
        },
      }),
      invalidatesTags: [{ type: "WeeklyMenu", id: "LIST" }],
    }),
    updateWeeklyMenu: builder.mutation({
      query: (initialMenu) => ({
        url: "/api/weekly",
        method: "PATCH",
        body: {
          ...initialMenu,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "WeeklyMenu", id: arg.id }],
    }),
    deleteWeeklyMenu: builder.mutation({
      query: ({ id }) => ({
        url: `/api/weekly`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "WeeklyMenu", id: arg.id }],
    }),
  }),
});

export const {
  useGetWeeklyMenusQuery,
  useAddNewWeeklyMenuMutation,
  useUpdateWeeklyMenuMutation,
  useDeleteWeeklyMenuMutation,
} = weeklyMenusApiSlice;

// returns the query result object
export const selectWeeklyMenusResult = weeklyMenusApiSlice.endpoints.getWeeklyMenus.select()

// creates memoized selector
const selectWeeklyMenusData = createSelector(
    selectWeeklyMenusResult,
    weeklyMenusResult => weeklyMenusResult.data // normalized state object with ids & entities
)
//console.log(selectWeeklyMenusData)

// Select only menu with the this user id
export const selectMenusByUserId = createSelector(
    [selectWeeklyMenusData, (state, userId) => userId],
    (menus, userId) => {
        // console.log(menus)
        if (!menus) return []
        let result = Object.values(menus).filter(menu => menu.user == userId)
        // console.log(result)
        return result
    }
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllWeeklyMenus,
    selectById: selectWeeklyMenuById,
    selectIds: selectWeeklyMenuIds
    // Pass in a selector that returns the menus slice of state
} = weeklyMenusAdapter.getSelectors(state => selectWeeklyMenusData(state) ?? initialState)