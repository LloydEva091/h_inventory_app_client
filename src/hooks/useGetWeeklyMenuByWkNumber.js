import { useGetWeeklyMenusQuery } from "../features/weekly/weeklyMenusApiSlice";

const useGetWeeklyMenuByWkNumber = ({ weekNumber, year, dayOfWeek }) => {
  const { data: weeklyMenus = {}, isLoading } = useGetWeeklyMenusQuery(
    "getWeeklyMenus",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

 
  const weeklyMenu = Object.values(weeklyMenus?.entities ?? {}).filter(
    (menu) => menu.weekNumber === weekNumber && menu.year === year
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("wweewew",weeklyMenu)
  // Get the Menu id based on the current day were at from the weeklyMenu
  if (weeklyMenu) {
    return weeklyMenu
  }

  return null;
};

export default useGetWeeklyMenuByWkNumber;
