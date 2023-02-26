import React from "react";
import { useSelector } from "react-redux";
import {
  selectMenuById,
  useGetMenusQuery,
} from "../features/menus/menusApiSlice";

const useMenuDetails = (id) => {
  let menuCost = ''
  let name = ''
  let currency = ''
  let breakfasts = []
  let lunches = []
  let dinners = []

  //   const menu = useSelector(state => selectMenuById(state, id))
  const { menu } = useGetMenusQuery("getMenus", {
    selectFromResult: ({ data }) => ({
      menu: data?.entities[id],
    }),
  });


  if(!menu){
    menuCost = 0
    name = ""
    currency = ['N/A']
    breakfasts = []
    lunches = []
    dinners = []
  }else {
    menuCost = menu.menuCost
    name = menu.name
    currency = menu.currency
    breakfasts = menu.breakfasts
    lunches = menu.lunches
    dinners = menu.dinners
  }

  return {name,menuCost,currency, breakfasts,lunches, dinners};

};

export default useMenuDetails;
