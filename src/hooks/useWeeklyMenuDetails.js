
import {
  useGetWeeklyMenusQuery,
} from "../features/weekly/weeklyMenusApiSlice";

const useWeeklyMenuDetails = (id) => {

  //   const menu = useSelector(state => selectMenuById(state, id))
  const { weeklyMenu } = useGetWeeklyMenusQuery("getWeeklyMenus", {
    selectFromResult: ({ data }) => ({
        weeklyMenu: data?.entities[id],
    }),
  });


  return weeklyMenu;

};

export default useWeeklyMenuDetails;
