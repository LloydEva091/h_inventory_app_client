import { useGetWeeklyMenusQuery } from "./weeklyMenusApiSlice";
import WeeklyMenu from "./WeeklyMenu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import getWeekNumber from "../../utils/getWeekNumber";

const WeeklyMenusList = () => {
  const { userId } = useAuth();
  const {
    data: weeklyMenus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWeeklyMenusQuery("weeklyMenusList", {
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
    const { entities } = weeklyMenus;

    const wklyMenusArray = Object.values(entities);

    const filteredWklyMenus = wklyMenusArray.filter(
      (menu) => menu.user.toString() === userId.toString()
    );

    // Get the current week number
    const currentWeekNumber = getWeekNumber(new Date());

    // Separate current and past weeklyMenu objects
    const currentWeeklyMenus = [];
    const futureWeeklyMenus = [];
    const pastWeeklyMenus = [];

    filteredWklyMenus.forEach((weeklyMenu) => {
      if (weeklyMenu.weekNumber === currentWeekNumber) {
        currentWeeklyMenus.push(weeklyMenu);
      } else if (
        weeklyMenu.year > new Date().getFullYear() ||
        (weeklyMenu.year === new Date().getFullYear() &&
          weeklyMenu.weekNumber > currentWeekNumber)
      ) {
        futureWeeklyMenus.push(weeklyMenu);
      } else {
        pastWeeklyMenus.push(weeklyMenu);
      }
    });

    // Sort the futureWeeklyMenus array in ascending order
    futureWeeklyMenus.sort((a, b) => {
      // Sort by year first
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      // If the years are the same, sort by weekNumber in ascending order
      return a.weekNumber - b.weekNumber;
    });

    // Sort the pastWeeklyMenus array in ascending order of year and weekNumber
    pastWeeklyMenus.sort((a, b) => {
      // Sort by year first, in ascending order
      if (a.year !== b.year) {
        return a.year - b.year;
      }

      // If the years are the same, sort by weekNumber in ascending order
      return a.weekNumber - b.weekNumber;
    });

    // Concatenate the arrays with the current week first, then future weeks, and then past weeks
    const sortedWeeklyMenus = [
      ...currentWeeklyMenus,
      ...futureWeeklyMenus,
      ...pastWeeklyMenus,
    ];

    const tableContent = sortedWeeklyMenus?.length
      ? sortedWeeklyMenus.map((menu) => (
          <WeeklyMenu key={menu._id} props={menu._id} />
        ))
      : null;

    // console.log(tableContent)

    content = (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-rows-1 md:w-90 sm:w-full p-2">
            <Link
              to="/dash/weekly/new"
              className="flex w-32 mb-3 text-md px-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded "
            >
              NEW
            </Link>
            <div className="flex-shrink-2 sm:overflow-auto">
              <table className=" w-full table-auto">
                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                  <tr className="text-sm ">
                    <th className="py-3 px-2 text-left">Week Number #</th>
                    <th className="py-3 px-2 text-left">Week Start Date</th>
                    <th className="py-3 px-2 text-left">Weekly Total Cost</th>
                    <th className="py-3 px-2 text-left">Monday</th>
                    <th className="py-3 px-2 text-left">Tuesday</th>
                    <th className="py-3 px-2 text-left">Wednesday</th>
                    <th className="py-3 px-2 text-left">Thursday</th>
                    <th className="py-3 px-2 text-left">Friday</th>
                    <th className="py-3 px-2 text-left">Saturday</th>
                    <th className="py-3 px-2 text-left">Sunday</th>
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
export default WeeklyMenusList;
