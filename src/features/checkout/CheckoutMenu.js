import useGetStockInfoFromArray from "../../hooks/useGetStockInfoFromArray";
import useGetRecipeInfoFromArray from "../../hooks/useGetRecipeInfoFromArray";
import useGetStockToReduceList from "../../hooks/useGetStockToReduceList";
import CheckoutMenuDisplay from "./CheckoutMenuDisplay";
import { useUpdateStockMutation, updateMultipleStocks } from "../stocks/stocksApiSlice";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import StockUpdater from "./StockUpdater";

const CheckoutMenu = ({ menuInfo }) => {
  // Define the mutation
  const dispatch = useDispatch();
  const [updateStock, { isLoading: isLoadingUpdate, error, data }] =
    useUpdateStockMutation();

  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [breakfasts, setBreakfasts] = useState([]);
  const [lunches, setLunches] = useState([]);
  const [dinners, setDinners] = useState([]);
  const [userId, setUserId] = useState("");

  // Set Menu info using menuInfo
  useEffect(() => {
    if (menuInfo) {
      setBreakfasts(menuInfo.breakfasts);
      setLunches(menuInfo.lunches);
      setDinners(menuInfo.dinners);
      setUserId(menuInfo.user);
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

//   console.log("wekkkk", brRecipeInfo);

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

//   console.log("infooooo", allStockInfo);

  const [stockToUpdate, setStockToUpdate] = useState([]);

  const stockToUpdateList = useGetStockToReduceList({
    stockList: allStockInfo,
    setItem: setStockToUpdate,
  });

//   console.log("updateinfoooo", stockToUpdate);

  // Define the click handler for the button
//   const handleButtonClick = async () => {
//     // console.log('updateMultipleStock function called');
//     console.log('stockToUpdateList', stockToUpdate);
//     await updateStock(stockToUpdate);
//   };

// // Define the click handler for the button
// const handleButtonClick = async () => {
//     try {
//       // Call the updateMultipleStocks action creator to trigger the update
//       await dispatch(updateMultipleStocks(stockToUpdate));
//       console.log("Stocks updated successfully",stockToUpdate);
//     } catch (error) {
//       console.log("Failed to update stocks", error);
//     }
//   };
  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <CheckoutMenuDisplay
            breakfasts={breakfasts}
            setBreakfasts={setBreakfasts}
            lunches={lunches}
            setLunches={setLunches}
            dinners={dinners}
            setDinners={setDinners}
            user={userId}
          />

          {/* <button onClick={handleButtonClick}>Update stock</button> */}
          <StockUpdater stocks={stockToUpdate}/>
        </div>
      )}
    </div>
  );
};

export default CheckoutMenu;
