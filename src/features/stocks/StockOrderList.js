import { useGetStocksQuery, selectStockByUserId } from "./stocksApiSlice";
import StockOrder from "./StockOrder";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import sortList from "../../utils/sortList";
import { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const StocksList = () => {
  const { userId } = useAuth();
  const {
    data: stocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStocksQuery("stocksList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stocksFilter = useSelector((state) =>
    selectStockByUserId(state, userId)
  );

  // Filter out all the stock that have stock status as low
  const lowStocks = stocksFilter.filter((stock) =>
    stock.stock_status.includes("Low")
  );

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess && lowStocks) {
    // sort list via name property
    const sortedStock = sortList(lowStocks, "name");

    // Calculate the index of the first and last item to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Slice the array to display only the items for the current page
    const stocksToDisplay = sortedStock.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const tableContent = stocksToDisplay?.length
      ? stocksToDisplay.map((stock) => (
          <StockOrder
            key={stock.id}
            stockId={stock.id}
            order={orderList}
            setOrder={setOrderList}
          />
        ))
      : null;

    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedStock.length / itemsPerPage);

    // Generate an array of page numbers to display in the pagination control
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const pagination = (
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex">
            {pageNumbers.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  className={`${
                    currentPage === pageNumber ? "bg-blue-300" : "bg-gray-500"
                  } hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handlePageClick(pageNumber)}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );

    const csvData = orderList.map((order) => ({
      'Name': order.name,
      'Category': order.category,
      'Amount to Order': order.amount_to_order,
      'Unit': order.unit,
      'Estimated Cost': order.estimated_cost,
    }));

    // console.log(halfOrderList);
    // console.log(orderList);

    content = (
      <>
        <div className="flex flex-col justify-center items-center m-3">
          <div className="w-full p-2">
            <div className="flex mb-3">
              <CSVLink
                className="flex mb-3 text-md px-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded"
                data={csvData}
                filename="orderList.csv"
              >
                Download Order List
              </CSVLink>
            </div>
            <div className="overflow-auto w-full flex-shrink">
              <table className="min-w-max w-full table-auto">
                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                  <tr className="text-sm">
                    <th className="py-3 px-2 text-left">Name</th>
                    <th className="py-3 px-2 text-left">Category</th>
                    <th className="py-3 px-2 text-left">Amount to Order</th>
                    <th className="py-3 px-2 text-left">Unit</th>
                    <th className="py-3 px-2 text-left">Estimated Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200 text-gray-600 text-sm font-light w-full">
                  {tableContent}
                </tbody>
              </table>
            </div>
          </div>
          {pagination}
        </div>
      </>
    );
  }

  return content;
};
export default StocksList;
