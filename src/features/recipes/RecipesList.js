import { useGetRecipesQuery } from "./recipesApiSlice";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const RecipesList = () => {
  const { userId } = useAuth();
  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipesQuery("recipessList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

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

    const { ids } = recipes;
    // console.log(ids)

    const tableContent = filteredRecipes?.length
      ? filteredRecipes.map((recipe) => <Recipe key={recipe._id} props={recipe._id} />)
      : null;

    // console.log(tableContent)

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
        </div>
      </>
    );
  }

  return content;
};
export default RecipesList;
