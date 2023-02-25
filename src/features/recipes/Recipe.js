import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGetRecipesQuery,selectRecipeByUserId } from "./recipesApiSlice";
import { MY_CURRENCY } from "../../config/constant";
import { useSelector } from 'react-redux';


import useStockDetails from "../../hooks/useStockDetails";

const Recipe = ({ props }) => {
  // const recipe = useSelector(state => selectRecipeByUserId(state, props.user))

  const { recipe } = useGetRecipesQuery("getRecipes", {
    selectFromResult: ({ data }) => ({
      recipe: data?.entities[props],
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

  const DisStockName = ({ stock }) => {
    const stockName = useStockDetails(stock);
    return stockName.name;
  };

  const disclosureContent = (data) => {
    let content = (
      <>
        {data.map((item) => (
          <Disclosure key={item.stock}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>
                    {" "}
                    <DisStockName stock={item.stock}></DisStockName> <br />
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <ul className="px-4">
                    <li className="hover:text-teal-700" key={item.stock}>
                      Amount: {item.iamount} <br />
                      Unit: {item.iunit} <br />
                      Cost: {item.icost}
                      <br />
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </>
    );
    return content;
  };

  const navigate = useNavigate();

  if (recipe) {
    // const created = new Date(recipe.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(recipe.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/recipes/${props}`);

    // console.log(recipe.currency)
    // console.log({recipe.name})
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        {/* <td className=" py-3 px-2 text-left">{recipe.id}</td> */}
        <td className=" py-3 px-2 text-left">{recipe.name}</td>
        <td className=" py-3 px-2 text-left">{recipe.categories}</td>
        <td className=" py-3 px-2 text-left">{`${currencySign(
          recipe.currency
        )} ${recipe.totalCost}`}</td>
        <td className=" py-3 px-6 text-left">{recipe.servings}</td>
        <td className=" py-3 px-6 text-left">
          {/* Ingredients */}
          {disclosureContent(recipe.ingredients)}
        </td>

        <td className=" py-3 px-2 text-left">{updated}</td>

        <td className="table__cell">
          <button className="py-3 px-6 text-center" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Recipe;
