import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const menusAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = menusAdapter.getInitialState();

export const menusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "/api/menus",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedMenus = responseData.map((menu) => {
          menu.id = menu._id;
          return menu;
        });
        return menusAdapter.setAll(initialState, loadedMenus);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Menu", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Menu", id })),
          ];
        } else return [{ type: "Menu", id: "LIST" }];
      },
    }),
    addNewMenu: builder.mutation({
      query: (initialMenu) => ({
        url: "/api/menus",
        method: "POST",
        body: {
          ...initialMenu,
        },
      }),
      invalidatesTags: [{ type: "Menu", id: "LIST" }],
    }),
    updateMenu: builder.mutation({
      query: (initialMenu) => ({
        url: "/api/menus",
        method: "PATCH",
        body: {
          ...initialMenu,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Menu", id: arg.id }],
    }),
    deleteMenu: builder.mutation({
      query: ({ id }) => ({
        url: `/api/menus`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Menu", id: arg.id }],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useAddNewMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menusApiSlice;

// returns the query result object
export const selectMenusResult = menusApiSlice.endpoints.getMenus.select()

// creates memoized selector
const selectMenusData = createSelector(
    selectMenusResult,
    menusResult => menusResult.data // normalized state object with ids & entities
)
//console.log(selectMenusData)

// Select only menu with the this user id
// export const selectMenusByUserId = createSelector(
//     [selectMenusData, (state, userId) => userId],
//     (menus, userId) => {
//         // console.log(menus)
//         if (!menus) return []
//         let result = Object.values(menus).filter(menu => menu.user == userId)
//         // console.log(result)
//         return result
//     }
// )


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMenus,
    selectById: selectMenuById,
    selectIds: selectMenuIds
    // Pass in a selector that returns the menus slice of state
} = menusAdapter.getSelectors(state => selectMenusData(state) ?? initialState)