import { useGetStocksQuery, selectStockByUserId } from "./stocksApiSlice";
import Stock from "./Stock";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import sortList from "../../utils/sortList";
import { useState } from "react";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stocksFilter = useSelector((state) =>
    selectStockByUserId(state, userId)
  );

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess && stocksFilter) {
    // sort list via name property
    const sortedStock = sortList(stocksFilter, "name");

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
          <Stock key={stock.id} stockId={stock.id} />
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
    content = (
      <>
        <div className="flex flex-col justify-center items-center m-3">
          <div className="w-full p-2">
            <Link
              to="/dash/stocks/new"
              className="flex w-32 mb-3 text-md px-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded "
            >
              NEW
            </Link>
            <div className="overflow-auto w-full flex-shrink">
              <table className="min-w-max w-full table-auto">
                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                  <tr className="text-sm ">
                    <th className="py-3 px-2 text-left">Name</th>
                    <th className="py-3 px-2 text-left">Category</th>
                    <th className="py-3 px-2 text-left">Total Cost</th>
                    <th className="py-3 px-2 text-left">Per Stock Cost</th>
                    <th className="py-3 px-2 text-left">Current Stock</th>
                    <th className="py-3 px-2 text-left">Unit</th>
                    <th className="py-3 px-2 text-left">Per Stock</th>
                    <th className="py-3 px-2 text-left">Per Stock Unit</th>
                    <th className="py-3 px-2 text-left">Min</th>
                    <th className="py-3 px-2 text-left">Max</th>
                    <th className="py-3 px-2 text-left">Status</th>
                    <th className="py-3 px-2 text-left">Updated</th>
                    <th className="py-3 px-2 text-left">Edit</th>
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
