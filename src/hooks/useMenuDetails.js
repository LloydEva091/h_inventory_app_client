import React from "react";
import { useSelector } from "react-redux";
import {
  selectMenuById,
  useGetMenusQuery,
} from "../features/menus/menusApiSlice";

const useMenuDetails = (id) => {
  //   const menu = useSelector(state => selectMenuById(state, id))
  const { menu } = useGetMenusQuery("getMenus", {
    selectFromResult: ({ data }) => ({
      menu: data?.entities[id],
    }),
  });

  return menu;
};

export default useMenuDetails;
