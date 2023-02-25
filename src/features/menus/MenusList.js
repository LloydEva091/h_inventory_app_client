import { useGetMenusQuery } from "./menusApiSlice";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const MenusList = () => {
  const { userId } = useAuth();
  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery("menussList", {
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
    const { entities } = menus;

    // console.log("menu list", entities)
    const menusArray = Object.values(entities);


    const filteredMenus = menusArray.filter(
      (menu) => menu.user == userId
    );


    const tableContent = filteredMenus?.length
      ? filteredMenus.map((menu) => <Menu key={menu._id} props={menu._id} />)
      : null;

    // console.log(tableContent)

    content = (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-rows-1 md:w-90 sm:w-full p-2">
            <Link
              to="/dash/menus/new"
              className="flex w-32 mb-3 text-md px-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded "
            >
              NEW
            </Link>
            <div className="flex-shrink-2 sm:overflow-auto">
              <table className=" w-full table-auto">
                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                  <tr className="text-sm ">
                    <th className="py-3 px-2 text-left">Name</th>
                    <th className="py-3 px-2 text-left">Menu Cost</th>
                    <th className="py-3 px-2 text-left">Breakfasts</th>
                    <th className="py-3 px-2 text-left">Lunches</th>
                    <th className="py-3 px-2 text-left">Dinners</th>
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
export default MenusList;
