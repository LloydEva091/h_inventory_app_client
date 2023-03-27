import useMenuDetails from "../../hooks/useMenuDetails";
import useGetWeeklyMenuByWeekNumber from "../../hooks/useGetWeeklyMenuByWeekNumber";
import getWeekNumber from "../../utils/getWeekNumber";
import getYear from "../../utils/getYear";
import getDayOfWeek from "../../utils/getDayOfWeek";
import CheckoutMenu from './CheckoutMenu'

const Checkout = () => {
  const today = new Date();
  // Get current week number
  const currentWeekNumber = getWeekNumber(today);
  // Get current year
  const currentYear = getYear(today);
  // Get current day
  const currentDay = getDayOfWeek(today);
  // Using this info current week number, 
  // day and year fetch the currentWeeklyMenu for today, this will return a menu id
  const weeklyMenuInfo = useGetWeeklyMenuByWeekNumber({
    weekNumber: currentWeekNumber,
    year: currentYear,
    dayOfWeek: currentDay,
  });
  // Using this menu id fetch the menu information
  // This will give breakfasts,lunches,dinners with recipe id
  const menuInfo = useMenuDetails(weeklyMenuInfo);
  const content = (
    <>
      {/* Using this recipe id fetch the recipe information */}
      <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
        <h2 className="uppercase">Confirm Today Menu Selections </h2>
        <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
            <CheckoutMenu menuInfo={menuInfo} />
        </div>
      </div>
    </>
  );

  // Using this information populate an array and display to user
  // This array can be edited by user to change recipe on the breakfasts,lunches,dinners
  // Using array recipe Id use information (amount iunit)
  // Check if iunit match stock per_unit field and if not convert the unit to match
  // If match use perStock * currentStock - amount then the result will need to be converted back
  // So result/perUnit = which will be the new current stock
  // Patch this detail to stock api

  return content;
};

export default Checkout;
