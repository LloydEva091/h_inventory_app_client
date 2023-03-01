import { useGetRecipesQuery } from "./recipesApiSlice";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import sortList from "../../utils/sortList";
const RecipesList = () => {
  const { userId } = useAuth();
  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipesQuery("recipessList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { entities } = recipes;
    const recipesArray = Object.values(entities);
    const filteredRecipes = recipesArray.filter(
      (recipe) => recipe.user === userId
    );

     // sort list via name property
     const sortedRecipes = sortList(filteredRecipes, "name");

     // Calculate the index of the first and last item to display
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 
     // Slice the array to display only the items for the current page
     const recipesToDisplay = sortedRecipes.slice(
       indexOfFirstItem,
       indexOfLastItem
     );

     const tableContent = recipesToDisplay?.length
     ? recipesToDisplay.map((recipe) => <Recipe key={recipe._id} props={recipe._id} />)
     : null;

    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage);

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
        <div className="flex flex-col justify-center items-center">
          <div className="w-full p-2">
            <Link
              to="/dash/recipes/new"
              className="flex w-32 mb-3 text-md px-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded "
            >
              NEW
            </Link>
            <div className="flex-shrink-2 sm:overflow-auto">
              <table className=" w-full table-auto">
                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                  <tr className="text-sm ">
                    <th className="py-3 px-2 text-left">Name</th>
                    <th className="py-3 px-2 text-left">Category</th>
                    <th className="py-3 px-2 text-left">Total Cost</th>
                    <th className="py-3 px-2 text-left">Servings</th>
                    <th className="py-3 px-2 text-left">Ingredients</th>
                    <th className="py-3 px-2 text-left">Updated</th>
                    <th className="py-3 px-2 text-left">Action</th>
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
export default RecipesList;
