import React, { useState } from "react";
import useRecipeDetails from "../../hooks/useRecipeDetails";
import { useGetMenusQuery } from "../menus/menusApiSlice";
import CheckoutMenuCard from "./CheckoutMenuCard";

const CheckoutMenuDisplay = (props) => {

  const content = (
    <>
    <div className="flex items-center rounded-xl m-2 p-2 bg-transparent">
      <CheckoutMenuCard
        items={props.breakfasts}
        setItem={props.setBreakfasts}
        mealType={"breakfasts"}
        user={props.user}
      ></CheckoutMenuCard>
      <CheckoutMenuCard
        items={props.lunches}
        setItem={props.setLunches}
        mealType={"lunches"}
        user={props.user}
      ></CheckoutMenuCard>
      <CheckoutMenuCard
        items={props.dinners}
        setItem={props.setDinners}
        mealType={"dinners"}
        user={props.user}
      ></CheckoutMenuCard>
      </div>
    </>
  );

  return content;
};

export default CheckoutMenuDisplay;
