import { useGetWeeklyMenusQuery } from "../features/weekly/weeklyMenusApiSlice";
import useAuth from "./useAuth";

const useGetWeeklyMenuByWeekNumber = ({ weekNumber, year, dayOfWeek }) => {
  const { data: weeklyMenus = {}, isLoading } = useGetWeeklyMenusQuery(
    "getWeeklyMenus",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { userId } = useAuth();

  // console.log(weeklyMenus)
  const weeklyMenusForUser = Object.values(weeklyMenus?.entities ?? {}).filter(
    (menu) => menu.user === userId
  );

  // console.log(weeklyMenusForUser)

  const weeklyMenu = weeklyMenusForUser.filter(
    (menu) => menu.weekNumber === weekNumber && menu.year === year
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (weeklyMenu.length > 0 && weeklyMenu[0][dayOfWeek.toLowerCase()]) {
    return weeklyMenu[0][dayOfWeek.toLowerCase()][0].menu;
  }

  return [];
};

export default useGetWeeklyMenuByWeekNumber;
