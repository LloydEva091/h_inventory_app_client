import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

// define the base query to be used in all endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500", // set the base URL of the API
  credentials: "include", // send cookies along with requests for authentication
  prepareHeaders: (headers, { getState }) => {
    // add authorization header to all requests if a token exists in the Redux store
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// wrap the base query with a function to handle authentication and refresh tokens
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions); // call the base query to send the request
  if (result?.error?.status === 403) {
    // if the response has a 403 status code, it means the access token has expired
    console.log("sending refresh token");
    // send a request to the server to refresh the token
    const refreshResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    ); 
    // if the server returns a new token, update the Redux store with the new token and retry the original request with the new token
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if the server returns an error or does not return a new token, handle the error accordingly
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }
  return result;
};

// create an instance of the API with the wrapped base query and endpoint definitions
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Recipe", "Stock", "User", "Menu", "WeeklyMenu"],
  endpoints: (builder) => ({}),
});
