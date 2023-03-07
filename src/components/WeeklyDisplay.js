import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import useRecipeDetails from "../hooks/useRecipeDetails";

const WeeklyDisplay = ({ props, day }) => {

  // Extract Recipe information using recipe id and return property that have been ask
  const RecipeInfo = ({ recipe, property }) => {
    const { totalCost, currency, name } = useRecipeDetails(recipe);
    if (property === "totalCost") {
      return totalCost.toFixed(2);
    } else if (property === "currency") {
      return currency;
    } else if (property === "name") {
      return name;
    } else if (property === "all") {
      return { name, totalCost, currency };
    }
  };
  const content = (
    <>
      <div className="mx-auto w-full max-w-md bg-white p-2.5 m-4 rounded-md">
        <div className="h-10 w-full">
          <span className="flex py-2 text-purple-900 font-bold pointer-events-none uppercase justify-center">
            {day}
          </span>
        </div>

        {/* Breakfast */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Breakfast</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <ul className="px-4">
                  {props.breakfasts?.length > 0 ? (
                    props.breakfasts.map((item) => (
                      <li
                        className="hover:text-teal-700 list-disc"
                        key={item._id}
                      >
                        <RecipeInfo
                          recipe={item.recipe}
                          property={"name"}
                        ></RecipeInfo>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No items available</li>
                  )}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* Lunch */}
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Lunch</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <ul className="px-4">
                  {props.lunches?.length > 0 ? (
                    props.lunches.map((item) => (
                      <li
                        className="hover:text-teal-700 list-disc"
                        key={item._id}
                      >
                        <RecipeInfo
                          recipe={item.recipe}
                          property={"name"}
                        ></RecipeInfo>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No items available</li>
                  )}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* Dinner */}
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Dinner</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <ul className="px-4">
                  {props.dinners?.length > 0 ? (
                    props.dinners.map((item) => (
                      <li
                        className="hover:text-teal-700 list-disc"
                        key={item._id}
                      >
                        <RecipeInfo
                          recipe={item.recipe}
                          property={"name"}
                        ></RecipeInfo>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No items available</li>
                  )}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );

  return content;
};

export default WeeklyDisplay;
