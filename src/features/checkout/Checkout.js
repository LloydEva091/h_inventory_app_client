import React, { useState, useEffect } from "react";
import { useGetWeeklyMenusQuery } from "../weekly/weeklyMenusApiSlice";
import useMenuDetails from "../../hooks/useMenuDetails";
import useRecipeDetails from "../../hooks/useRecipeDetails";
import useStockDetails from "../../hooks/useStockDetails";
import useGetWeeklyMenuByWeekNumber from "../../hooks/useGetWeeklyMenuByWeekNumber";
import getWeekNumber from "../../utils/getWeekNumber";
import getYear from "../../utils/getYear";
import getDayOfWeek from "../../utils/getDayOfWeek";
import CheckoutMenuDisplay from "./CheckoutMenuDisplay";
import useGetRecipeInfoFromArray from "../../hooks/useGetRecipeInfoFromArray";
import useGetStockInfoFromArray from "../../hooks/useGetStockInfoFromArray";
import useGetStockToReduceList from "../../hooks/useGetStockToReduceList";
import CheckoutMenu from './CheckoutMenu'

const Checkout = () => {
  const today = new Date();

  // Get current week number
  const currentWeekNumber = getWeekNumber(today);
  // console.log("wknum", currentWeekNumber)

  // Get current year
  const currentYear = getYear(today);
  // console.log("year", currentYear)

  // Get current day
  const currentDay = getDayOfWeek(today);
  // console.log("dayy", currentDay)

  // Using this info current week number, day and year fetch the currentWeeklyMenu for today, this will return a menu id
  const weeklyMenuInfo = useGetWeeklyMenuByWeekNumber({
    weekNumber: currentWeekNumber,
    year: currentYear,
    dayOfWeek: currentDay,
  });
  // console.log("wekkkk", weeklyMenuInfo)

  // Using this menu id fetch the menu information
  // This will give breakfasts,lunches,dinners with recipe id
  const menuInfo = useMenuDetails(weeklyMenuInfo);

  

  // // Set Menu info using menuInfo
  // // This is in the top level, as we want user to be able to change this if needed
  // const [breakfasts, setBreakfasts] = useState([]);
  // const [lunches, setLunches] = useState([]);
  // const [dinners, setDinners] = useState([]);
  // const [userId, setUserId] = useState('');

  // useEffect(() => {
  //   if (menuInfo) {
  //     setBreakfasts(menuInfo.breakfasts);
  //     setLunches(menuInfo.lunches);
  //     setDinners(menuInfo.dinners);
  //     setUserId(menuInfo.user);
  //   }
  // }, [menuInfo]);

  // console.log("breakfast current",breakfasts)

  // // const handleBreakfastChange = (index, value) => {
  // //   setBreakfasts(prevBreakfasts => {
  // //     const newBreakfasts = [...prevBreakfasts];
  // //     newBreakfasts[index] = value;
  // //     return newBreakfasts;
  // //   });
  // // };

  // // All recipe info from the menu
  // const [brRecipeInfo, setBrRecipeInfo] = useState([])
  // const [luRecipeInfo, setLuRecipeInfo] = useState([])
  // const [dinRecipeInfo, setDinRecipeInfo] = useState([])

  // // This set the state brRecipeInfo above containing all information of all the recipe in the breakfasts array
  // // However to prevent rerendering this functional component return null, therefore the following variable below are all null 
  // const breakInfo = useGetRecipeInfoFromArray({itemArrays: breakfasts,setItem:setBrRecipeInfo})
  // const lunchInfo = useGetRecipeInfoFromArray({itemArrays: lunches,setItem:setLuRecipeInfo})
  // const dinnerInfo = useGetRecipeInfoFromArray({itemArrays: dinners,setItem:setDinRecipeInfo})

  // console.log("wekkkk", brRecipeInfo)

  // // All the stock info with iunit and iamount from recipe
  // const [brStockInfo, setBrStockInfo] = useState([])
  // const [luStockInfo, setLuStockInfo] = useState([])
  // const [dinStockInfo, setDinStockInfo] = useState([])
  // // console.log("break",breakfasts)
  // // console.log("lu",lunches)
  // // console.log("din",dinners)
  // // console.log("din",brRecipeInfo)

  // const breakStockInfo = useGetStockInfoFromArray({itemArrays:brRecipeInfo, setItem:setBrStockInfo})
  // const lunchStockInfo = useGetStockInfoFromArray({itemArrays:luRecipeInfo, setItem:setLuStockInfo})
  // const dinnerStockInfo = useGetStockInfoFromArray({itemArrays:dinRecipeInfo, setItem:setDinStockInfo})

  // console.log("wekkkk2", luStockInfo)

  // const [stockToUpdate, setStockToUpdate] = useState([])

  // const stockToUpdateList = useGetStockToReduceList({stockList: brStockInfo, setItem:setStockToUpdate})

  // console.log("stttooo",stockToUpdate)

  const content = (
    <>
      {/* Using this recipe id fetch the recipe information */}
      <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
        <h2 className="uppercase">Confirm Today Menu Selections </h2>
        <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
          {/* <p className={errClass}>{error?.data?.message}</p> */}
          {/* <CheckoutMenuDisplay
            breakfasts={breakfasts}
            setBreakfasts={setBreakfasts}
            lunches={lunches}
            setLunches={setLunches}
            dinners={dinners}
            setDinners={setDinners}
            user={userId}
          ></CheckoutMenuDisplay> */}
            <CheckoutMenu menuInfo={menuInfo} />
        </div>
      </div>
    </>
  );

  // Using this information populate an array and display to user
  // This array can be edited by user to change recipe on the breakfasts,lunches,dinners
  // Using array recipe Id use information (amount iunit)
  // Check if iunit match stock per_unit field and if not convert the unit to match
  // If match use perStock * currentStock - amount then the result will need to be converted back
  // So result/perUnit = which will be the new current stock
  // Patch this detail to stock api

  return content;
};

export default Checkout;
