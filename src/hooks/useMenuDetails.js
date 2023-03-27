import React from "react";
import { useSelector } from "react-redux";
import {
  selectMenuById,
  useGetMenusQuery,
} from "../features/menus/menusApiSlice";

const useMenuDetails = (menuId) => {
  let menuCost = ''
  let name = ''
  let currency = ''
  let breakfasts = []
  let lunches = []
  let dinners = []
  let user = ''
  let id = ''

  //   const menu = useSelector(state => selectMenuById(state, id))
  const { menu } = useGetMenusQuery("getMenus", {
    selectFromResult: ({ data }) => ({
      menu: data?.entities[menuId],
    }),
  });


  if(!menu){
    menuCost = 0
    name = ""
    currency = ['N/A']
    breakfasts = []
    lunches = []
    dinners = []
    user = ''
    id = ''
  }else {
    user = menu.user
    menuCost = menu.menuCost
    name = menu.name
    currency = menu.currency
    breakfasts = menu.breakfasts
    lunches = menu.lunches
    dinners = menu.dinners
    id = menu.id
  }

  return {user,name,menuCost,currency, breakfasts,lunches, dinners,id};

};

export default useMenuDetails;
