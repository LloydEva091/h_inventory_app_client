import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStockById, useCheckStockMutation } from "./stocksApiSlice";

import { MY_CURRENCY } from "../../config/constant";

const StockCheck = ({ stockId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const stock = useSelector((state) => selectStockById(state, stockId));

  const [
    checkStock,
    { isSuccess: isCheckSuccess, isError: isCheckError, error: checkerror },
  ] = useCheckStockMutation();

  useEffect(() => {
    if (isCheckSuccess) {
      navigate("/dash/checks");
    }
  }, [isCheckSuccess]);

  const handleCheck = (id) => {
    checkStock({ id }).then(() => setIsChecked(true));
  };

  if (stock) {
    // const created = new Date(stock.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(stock.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
      // Set the background color based on whether isChecked is true or false
      const stockBgColor = stock.isChecked ? "bg-orange-200" : "";
      const rowClass = isChecked ? "bg-orange-200" : "border-b border-gray-200 hover:bg-gray-100";
    const handleEdit = () => navigate(`/dash/stocks/${stockId}`);

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
    // console.log(stock.currency)
    return (
      <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${stockBgColor} ${rowClass}`}
        key={stock?.name}
      >
        <td className=" py-3 px-2 text-left">{stock.name}</td>
        {/* <td className=" py-3 px-6 text-left">{stock.user}</td> */}
        <td className=" py-3 px-2 text-left">{stock.categories}</td>
        <td className=" py-3 px-2">{stock.current_stock}</td>
        <td className=" py-3 px-2 text-left">{stock.unit}</td>
        <td className=" py-3 px-2">{stock.per_stock}</td>
        <td className=" py-3 px-2 text-left">{stock.per_unit}</td>
        <td className=" py-3 px-2 text-left">{stock.stock_status}</td>
        <td className=" py-3 px-2 text-left">{updated}</td>
        <td className=" py-3 px-2 text-left">
          <button
            type="submit"
            className={`bg-blue-300 hover:bg-blue-300 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full`}
            onClick={() => handleCheck(stock.id)}
            disabled={isChecked}
          >
            Check
          </button>
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
export default StockCheck;
