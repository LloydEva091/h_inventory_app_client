import { useGetWeeklyMenusQuery } from "../features/weekly/weeklyMenusApiSlice";
import useAuth from "./useAuth";
const useGetWeeklyMenuForDash = ({ weekNumber, year, dayOfWeek }) => {
  const { data: weeklyMenus = {}, isLoading } = useGetWeeklyMenusQuery(
    "getWeeklyMenus",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { userId } = useAuth();

  const weeklyMenusForUser = Object.values(weeklyMenus?.entities ?? {}).filter(
    (menu) => menu.user === userId
  );

  const weeklyMenu = weeklyMenusForUser.filter(
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

export default useGetWeeklyMenuForDash;
