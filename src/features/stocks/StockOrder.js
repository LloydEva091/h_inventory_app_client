import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStockById } from "./stocksApiSlice";

import { MY_CURRENCY } from "../../config/constant";

const StockOrder = ({ stockId, orderList, setOrder }) => {
  const stock = useSelector((state) => selectStockById(state, stockId));

  const [amount, setAmount] = useState(Number(stock.min_stock + stock.max_stock) / 2);
  const orderCost = amount * stock.per_cost;

  useEffect(() => {
    if (stock) {
      setOrder((prevOrder) => {
        // filter the existing orderList to only contain the latest unique name
        const filteredOrderList = prevOrder.filter(
          (item) => item.name !== stock.name
        );
        // add the new order item to the filtered orderList
        return [
          ...filteredOrderList,
          {
            name: stock.name,
            category: stock.categories[0],
            amount_to_order: amount,
            unit: stock.unit[0],
            estimated_cost: orderCost,
          },
        ];
      });
    }
  }, [stockId, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  if (stock) {
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
    return (
      <tr
        className="border-b border-gray-200 hover:bg-gray-100"
        key={stock.name}
      >
        <td className=" py-3 px-2 text-left">{stock.name}</td>
        <td className=" py-3 px-2 text-left">{stock.categories}</td>
        <td className=" py-3 px-2 text-left">
          <input type="number" value={amount} onChange={handleAmountChange} />
        </td>
        <td className=" py-3 px-2 text-left">{stock.unit}</td>
        <td className=" py-3 px-2 text-left">{`${currencySign(
          stock.currency
        )} ${orderCost.toFixed(2)}`}</td>
      </tr>
    );
  } else return null;
};

export default StockOrder;
