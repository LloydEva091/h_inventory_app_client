import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectStockById } from './stocksApiSlice'
import { MY_CURRENCY } from "../../config/constant"

const Stock = ({ stockId }) => {
    const stock = useSelector(state => selectStockById(state, stockId))
    const navigate = useNavigate()
    if (stock) {
        const updated = new Date(stock.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const handleEdit = () => navigate(`/dash/stocks/${stockId}`)
        const currencySign = (currency) =>{
            let currSign = currency == MY_CURRENCY[0].name ? MY_CURRENCY[0].sign : currency == MY_CURRENCY[1].name ? MY_CURRENCY[1].sign: currency == MY_CURRENCY[2].name ? MY_CURRENCY[2].sign: null 
            return currSign
        } 
        return (
            <tr className="border-b border-gray-200 hover:bg-gray-100" key={stock.name}>
                <td className=" py-3 px-2 text-left">{stock.name}</td>
                <td className=" py-3 px-2 text-left">{stock.categories}</td>
                <td className=" py-3 px-2 text-left">{`${currencySign(stock.currency)} ${stock.cost}`}</td>
                <td className=" py-3 px-2 text-left">{`${currencySign(stock.currency)} ${stock.per_cost}`}</td>
                <td className=" py-3 px-2">{stock.current_stock}</td>
                <td className=" py-3 px-2 text-left">{stock.unit}</td>
                <td className=" py-3 px-2">{stock.per_stock}</td>
                <td className=" py-3 px-2 text-left">{stock.per_unit}</td>
                <td className=" py-3 px-2 text-left">{stock.min_stock}</td>
                <td className=" py-3 px-2 text-left">{stock.max_stock}</td>
                <td className=" py-3 px-2 text-left">{stock.stock_status}</td>
                <td className=" py-3 px-2 text-left">{updated}</td>
                <td className="table__cell">
                    <button
                        className="py-3 px-6 text-center"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}
export default Stock