import { Link } from "react-router-dom";
import BarChart from "./BarChart";
import WeeklyDisplay from "./WeeklyDisplay";
import getWeekNumber from "../utils/getWeekNumber";
import getYear from "../utils/getYear";
import getDayOfWeek from "../utils/getDayOfWeek";
import useGetWeeklyMenuForDash from "../hooks/useGetWeeklyMenuForDash";
import useMenuDetails from "../hooks/useMenuDetails";
import useWeeklyMenuDetails from "../hooks/useWeeklyMenuDetails";
import { useSelector } from "react-redux";
import { selectAllWeeklyMenus } from "../features/weekly/weeklyMenusApiSlice";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { userId } = useAuth();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasWeeklyMenus, setHasWeeklyMenus] = useState(false);

  const today = new Date();

  // Get current week number
  const currentWeekNumber = getWeekNumber(today);
  // console.log("wknum", currentWeekNumber)

  // Get current year
  const currentYear = getYear(today);
  // console.log("year", currentYear)

  // Get all weekly menus from the Redux state
  const allWklyMenus = useSelector(selectAllWeeklyMenus);
  const filteredWeeklyMenus = allWklyMenus.filter(
    (menu) => menu.year === currentYear && menu.user === userId
  );

  useEffect(() => {
    if (filteredWeeklyMenus.length > 0) {
      setIsDataLoaded(true);
      setHasWeeklyMenus(true);
    } else {
      setHasWeeklyMenus(false);
    }
  }, [filteredWeeklyMenus]);

  console.log("this year", filteredWeeklyMenus);

  // Get current day
  const currentDay = getDayOfWeek(today);
  // console.log("dayy", currentDay)

  // Using this info current week number, day and year fetch the currentWeeklyMenu for today, this will return a menu id
  const weeklyMenuInfo = useGetWeeklyMenuForDash({
    weekNumber: currentWeekNumber,
    year: currentYear,
    dayOfWeek: currentDay,
  });

  // console.log(weeklyMenuInfo)
  const wklyMenu = useWeeklyMenuDetails(weeklyMenuInfo[0]?.id);
  // console.log("23432",wklyMenu.monday[0].menu)

  const monday = useMenuDetails(wklyMenu?.monday[0].menu);
  // console.log("mon",monday);
  const tuesday = useMenuDetails(wklyMenu?.tuesday[0].menu);
  // console.log(tuesday);
  const wednesday = useMenuDetails(wklyMenu?.wednesday[0].menu);
  // console.log(wednesday);
  const thursday = useMenuDetails(wklyMenu?.thursday[0].menu);
  // console.log(thursday);
  const friday = useMenuDetails(wklyMenu?.friday[0].menu);
  // console.log(friday);
  const saturday = useMenuDetails(wklyMenu?.saturday[0].menu);
  // console.log(saturday);
  const sunday = useMenuDetails(wklyMenu?.sunday[0].menu);
  // console.log(sunday);

  const content = (
    <>
      <div className="flex flex-wrap w-screen">
        <div className="grid gap-2 sm:grid-rows-1 w-full">
          {/* Weekly Menu Section */}
          <div className="w-full h-full bg-slate-500 bg-opacity-40 mb-2">
            <div className="grid md:grid-cols-7 gap-2 sm:grid-cols-2 w-full p-2">
              <WeeklyDisplay props={monday} day={"Monday"}></WeeklyDisplay>
              <WeeklyDisplay props={tuesday} day={"Tuesday"}></WeeklyDisplay>
              <WeeklyDisplay
                props={wednesday}
                day={"Wednesday"}
              ></WeeklyDisplay>
              <WeeklyDisplay props={thursday} day={"Thursday"}></WeeklyDisplay>
              <WeeklyDisplay props={friday} day={"Friday"}></WeeklyDisplay>
              <WeeklyDisplay props={saturday} day={"Saturday"}></WeeklyDisplay>
              <WeeklyDisplay props={sunday} day={"Sunday"}></WeeklyDisplay>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-1 sm:grid-cols-1 w-full">
            <div className="w-full h-72 bg-slate-500 bg-opacity-40 mb-2 justify-center items-center">
              <div className="flex items-center justify-center m-5">
                <div className="grid grid-cols-1 w-full">
                  <div className="bg-slate-200 h-10 w-full rounded-t-md">
                    <span className="flex px-3 py-2 text-black font-semibold z-10 pointer-events-none">
                      Statistics
                    </span>
                  </div>
                  <div className="flex w-full h-48 bg-white rounded-b-md">
                    {hasWeeklyMenus ? (
                      isDataLoaded ? (
                        <BarChart
                          props={filteredWeeklyMenus}
                          className="flex item-center"
                        />
                      ) : (
                        <div className="flex justify-center text-black w-full">
                          Loading data...
                        </div>
                      )
                    ) : (
                      <div className="flex justify-center py-10 text-gray-500 w-full">
                        No weekly menus cost to display.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="w-full h-50 bg-slate-500 bg-opacity-40">
            <div className="flex items-center justify-center m-5">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                <Link
                  to={`/dash/checkout`}
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-green-700 to-green-400 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Confirm Todays Menu
                  </span>
                </Link>
                <Link
                  to="/dash/stocks"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Manage Stocks
                  </span>
                </Link>
                <Link
                  to="/dash/recipes"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Manage Recipes
                  </span>
                </Link>
                <Link
                  to="/dash/menus"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Manage Menus
                  </span>
                </Link>

                <Link
                  to="/dash/orders"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Create Order List
                  </span>
                </Link>
                <Link
                  to="/dash/weekly"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Manage Weekly Menu Plan
                  </span>
                </Link>
                <Link
                  to="/dash/weekly/new"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Create Weekly Menu Plan
                  </span>
                </Link>

                <Link
                  to="/dash/checks"
                  className="b mx-auto h-16 w-64 flex justify-center items-center"
                >
                  <div className="i h-20 w-64 bg-gradient-to-br from-yellow-600 to-orange-400 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                  <span className="text-center text-white font-semibold z-10 pointer-events-none">
                    Stock Check
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return content;
};
export default Dashboard;
