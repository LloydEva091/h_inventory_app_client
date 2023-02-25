import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGetMenusQuery } from "./menusApiSlice";

import { MY_CURRENCY } from "../../config/constant";

import useStockDetails from "../../hooks/useStockDetails";
import useRecipeDetails from "../../hooks/useRecipeDetails";
import { useEffect,useState } from "react";

const Menu = ({ props }) => {
  // const stock = useSelector(state => selectMenuById(state, props))

  const { menu } = useGetMenusQuery("getMenus", {
    selectFromResult: ({ data }) => ({
      menu: data?.entities[props],
    }),
  });
  // console.log("data", menu);

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

  const StockInfo = ({ stock }) => {
    const stockInfo = useStockDetails(stock);
    return stockInfo;
  };

  const RecipeInfo  = ({ recipe }) => {
    const {name}= useRecipeDetails(recipe);
    // const [recipeName, setRecipeName] = useState('')
    // useEffect(()=>{
    //   setRecipeName(recipeInfo.name)
    // },[recipeInfo,recipe])
    // console.log("recipe name", recipeName);
    return <p>{name}</p>
  };

  const disclosureContent = (data,mealType) => {
    let content = (
      <>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{mealType}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                <ul className="px-4 text-black list-disc">
                  {data[mealType.toLowerCase()].map((item) => {
                    return(<li className="hover:text-teal-700 w-full" key={item.recipe}>
                      <RecipeInfo recipe={item.recipe}></RecipeInfo>
                    </li>)
                  })}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </>
    );
    return content;
  };

  const navigate = useNavigate();

  if (menu) {
    // const created = new Date(menu.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(menu.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/menus/${props}`);

    // console.log(menu.currency)
    // console.log({menu.name})
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        {/* <td className=" py-3 px-2 text-left">{menu.id}</td> */}
        <td className=" py-3 px-2 text-left">{menu.name}</td>
        <td className=" py-3 px-2 text-left">{`${currencySign(menu.currency)} ${
          menu.menuCost
        }`}</td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(menu,"Breakfasts")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(menu,"Lunches")}
        </td>
        <td className=" py-3 px-6 text-left">
          {disclosureContent(menu,"Dinners")}
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
export default Menu;
