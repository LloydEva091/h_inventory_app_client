import { useGetWeeklyMenusQuery } from "../features/weekly/weeklyMenusApiSlice";

const useGetWeeklyMenuByWeekNumber = ({ weekNumber, year, dayOfWeek }) => {
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

  // Get the Menu id based on the current day were at from the weeklyMenu
  // console.log("returning",weeklyMenu[0][dayOfWeek.toLowerCase()][0].menu)
  if (weeklyMenu) {
    return weeklyMenu[0][dayOfWeek.toLowerCase()][0].menu
  }

  return null;
};

export default useGetWeeklyMenuByWeekNumber;
