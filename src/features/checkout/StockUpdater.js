import { useUpdateStockMutation } from "../stocks/stocksApiSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StockUpdater({ stocks }) {
  const [updateStock, { isLoading, isSuccess, isError, error }] =
    useUpdateStockMutation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedStocks, setUpdatedStocks] = useState([]);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const navigate = useNavigate();

  const handleUpdateStock = async (stock) => {
    const { data } = await updateStock(
      {
        url: `/api/stocks/${stock._id}`,
        method: "PATCH",
        body: { ...stock },
      },
      stock.id
    );
    return data;
  };

  useEffect(() => {
    if (isSuccess && updatedStocks.length === stocks.length) {
      setShowUpdateMessage(true);
      setTimeout(() => {
        navigate("/dash");
      }, 3000);
    }
  }, [isSuccess, updatedStocks, stocks, navigate]);

  const handleUpdateStocks = async () => {
    setIsUpdating(true);
    const updatedStocks = [];

    for (const stock of stocks) {
      const updatedStock = await handleUpdateStock(stock);
      updatedStocks.push(updatedStock);
    }

    setUpdatedStocks(updatedStocks);
    setIsUpdating(false);
  };

  return (
    <div>
      <button
        className=" bg-green-500 hover:bg-green-700 text-white font-bold border border-green-700 rounded w-full mb-2 p-3"
        onClick={handleUpdateStocks}
        disabled={isLoading || isUpdating}
      >
        {isLoading ? "Please wait updating each stock..." : "Confirm Today's Menu"}
      </button>
      {isError && <p>Error updating stocks: {error.message}</p>}
      {showUpdateMessage && (
        <p>Stocks updated successfully! Redirecting in 3 seconds...</p>
      )}
    </div>
  );
}

export default StockUpdater;
