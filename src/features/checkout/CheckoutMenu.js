import useGetStockInfoFromArray from "../../hooks/useGetStockInfoFromArray";
import useGetRecipeInfoFromArray from "../../hooks/useGetRecipeInfoFromArray";
import useGetStockToReduceList from "../../hooks/useGetStockToReduceList";
import CheckoutMenuCard from "./CheckoutMenuCard";
import { useState, useEffect } from "react";
import StockUpdater from "./StockUpdater";
import useAuth from "../../hooks/useAuth";

const CheckoutMenu = ({ menuInfo }) => {
  const { userId} = useAuth()
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [breakfasts, setBreakfasts] = useState([]);
  const [lunches, setLunches] = useState([]);
  const [dinners, setDinners] = useState([]);
  // const [userId, setUserId] = useState("");

  // Set Menu info using menuInfo
  useEffect(() => {
    if (menuInfo) {
      setBreakfasts(menuInfo.breakfasts);
      setLunches(menuInfo.lunches);
      setDinners(menuInfo.dinners);
      // setUserId(menuInfo.user);
    }
  }, [menuInfo]);

  //   console.log("breakfast current",breakfasts)

  // All recipe info from the menu
  const [brRecipeInfo, setBrRecipeInfo] = useState([]);
  const [luRecipeInfo, setLuRecipeInfo] = useState([]);
  const [dinRecipeInfo, setDinRecipeInfo] = useState([]);

  // This set the state brRecipeInfo above containing all information of all the recipe in the breakfasts array
  // However to prevent rerendering this functional component return null, therefore the following variable below are all null
  const breakInfo = useGetRecipeInfoFromArray({
    itemArrays: breakfasts,
    setItem: setBrRecipeInfo,
  });
  const lunchInfo = useGetRecipeInfoFromArray({
    itemArrays: lunches,
    setItem: setLuRecipeInfo,
  });
  const dinnerInfo = useGetRecipeInfoFromArray({
    itemArrays: dinners,
    setItem: setDinRecipeInfo,
  });

    // console.log("wekkkk", brRecipeInfo);

  // All the stock info with iunit and iamount from recipe
  const [allStockInfo, setAllStockInfo] = useState([]);

  const [allRecipeInfo, setAllRecipeInfo] = useState();

  // Concatanate all the recipe info into 1 state
  useEffect(() => {
    if (brRecipeInfo && luRecipeInfo && dinRecipeInfo) {
      setAllRecipeInfo([...brRecipeInfo, ...luRecipeInfo, ...dinRecipeInfo]);
      setIsLoading(false);
    }
  }, [brRecipeInfo, luRecipeInfo, dinRecipeInfo]);

  const stockInfo = useGetStockInfoFromArray({
    itemArrays: allRecipeInfo,
    setItem: setAllStockInfo,
  });

  // console.log("infooooo", allStockInfo);

  const [stockToUpdate, setStockToUpdate] = useState([]);

  const stockToUpdateList = useGetStockToReduceList({
    stockList: allStockInfo,
    setItem: setStockToUpdate,
  });

  //   console.log("updateinfoooo", stockToUpdate);
  // console.log(allStockInfo.length )

  return (
    <div>
      {isLoading ? (
        <div>Loading Weekly Menu...</div>
      ) : allStockInfo.length <= 0 ? (
        <div>No Weekly Menu to Display for this week....</div>
      ) : (
        <div>
          {/* <CheckoutMenuDisplay
            breakfasts={breakfasts}
            setBreakfasts={setBreakfasts}
            lunches={lunches}
            setLunches={setLunches}
            dinners={dinners}
            setDinners={setDinners}
            user={userId}
          /> */}
          <>
    <div className="flex items-center rounded-xl m-2 p-2 bg-transparent">
      <CheckoutMenuCard
        items={breakfasts}
        setItem={setBreakfasts}
        mealType={"breakfasts"}
        user={userId}
      ></CheckoutMenuCard>
      <CheckoutMenuCard
        items={lunches}
        setItem={setLunches}
        mealType={"lunches"}
        user={userId}
      ></CheckoutMenuCard>
      <CheckoutMenuCard
        items={dinners}
        setItem={setDinners}
        mealType={"dinners"}
        user={userId}
      ></CheckoutMenuCard>
      </div>
    </>

          {/* <button onClick={handleButtonClick}>Update stock</button> */}
          <StockUpdater stocks={stockToUpdate} />
        </div>
      )}
    </div>
  );
};

export default CheckoutMenu;
