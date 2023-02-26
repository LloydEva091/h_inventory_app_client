import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGetWeeklyMenusQuery } from "./weeklyMenusApiSlice";

import { MY_CURRENCY } from "../../config/constant";

import useMenuDetails from "../../hooks/useMenuDetails";
import useRecipeDetails from "../../hooks/useRecipeDetails";
import { useEffect, useState } from "react";
import MenuSelection from "./MenuSelection";


const WeeklyMenu = ({ props }) => {
  // const stock = useSelector(state => selectMenuById(state, props))

  const { weeklyMenu } = useGetWeeklyMenusQuery("getWeeklyMenus", {
    selectFromResult: ({ data }) => ({
      weeklyMenu: data?.entities[props],
    }),
  });

  const currencySign = (currency) => {
    let currSign =
      currency == MY_CURRENCY[0].name
        ? MY_CURRENCY[0].sign
        : currency == MY_CURRENCY[1].name
        ? MY_CURRENCY[1].sign
        : currency == MY_CURRENCY[2].name
        ? MY_CURRENCY[2].sign
        : null;
    return currSign;
  };

  const MenuInfo = ({ menuIds, property }) => {
    const { name, menuCost, currency, breakfasts, lunches, dinners } =
      useMenuDetails(menuIds);
    if (property === "name") {
      return name;
    } else if (property === "menuCost") {
      return menuCost;
    } else if (property === "currency") {
      return currency;
    } else if (property === "breakfasts") {
      return breakfasts;
    } else if (property === "lunches") {
      return lunches;
    } else if (property === "dinners") {
      return dinners;
    } else if (property === "all") {
      return { name, menuCost, currency, breakfasts, lunches, dinners };
    }
  };

  const RecipeInfo = ({ recipe }) => {
    const { name } = useRecipeDetails(recipe);
    return <p>{name}</p>;
  };

  const disclosureContent = (data, day) => {
    let content = (
      <>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{day.toUpperCase()}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                {data[day.toLowerCase()].map((item) => {
                  return (
                    <span
                      className="hover:text-teal-700 w-full"
                      key={item.menu}
                    >
                      <MenuSelection item={item.menu}></MenuSelection>
                    </span>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </>
    );
    return content;
  };

  const navigate = useNavigate();

  const getDateDisplay = (tdate) => {
    const displayDate = new Date(tdate).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return displayDate;
  };


  // console.log("weeklyMenu", weeklyMenu);

  if (weeklyMenu) {
    const handleEdit = () => navigate(`/dash/weekly/${props}`);

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className=" py-3 px-2 text-left">{weeklyMenu.weekNumber}</td>
        <td className=" py-3 px-2 text-left">
          {getDateDisplay(weeklyMenu.startDate)}
        </td>
        <td className=" py-3 px-2 text-left">{`${currencySign(
          weeklyMenu.currency
        )} ${weeklyMenu.weeklyMenuCost}`}</td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Monday")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Tuesday")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Wednesday")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Thursday")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Friday")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Saturday")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(weeklyMenu, "Sunday")}
        </td>

        <td className=" py-3 px-2 text-left">
          {getDateDisplay(weeklyMenu.updatedAt)}
        </td>

        <td className="table__cell">
          <button className="py-3 px-6 text-center" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default WeeklyMenu;
