import { useGetStocksQuery, selectStockByUserId } from "./stocksApiSlice"
import Stock from "./Stock"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'

const StocksList = () => {
    const { userId } = useAuth()
    const {
        data: stocks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetStocksQuery('stocksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const stocksFilter = useSelector(state => selectStockByUserId(state, userId))

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        // const { ids } = stocks

        // const tableContent = ids?.length
        //     ? ids.map(stockId => <Stock key={stockId} stockId={stockId} />)
        //     : null

        const tableContent = stocksFilter?.length
        ? stocksFilter.map(stock => <Stock key={stock.id} stockId={stock.id} />)
        : null

        // console.log(tableContent)    

        content = (
            <>
                <div className="flex flex-col justify-center items-center m-3">
                    <div className="w-full p-2">
                        <Link to="/dash/stocks/new" className="flex w-32 mb-3 text-md px-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded ">NEW</Link>
                        <div className="overflow-auto w-full flex-shrink">
                            <table className="min-w-max w-full table-auto">
                                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                                    <tr className="text-sm ">
                                        <th className="py-3 px-2 text-left">Name</th>
                                        {/* <th className="py-3 px-6 text-left">User</th> */}
                                        <th className="py-3 px-2 text-left">Category</th>
                                        <th className="py-3 px-2 text-left">Cost</th>
                                        {/* <th className="py-3 px-6 text-left">Currency</th> */}
                                        <th className="py-3 px-2 text-left">Current Stock</th>
                                        <th className="py-3 px-2 text-left">Min</th>
                                        <th className="py-3 px-2 text-left">Max</th>
                                        <th className="py-3 px-2 text-left">Unit</th>
                                        <th className="py-3 px-2 text-left">Status</th>
                                        {/* <th className="py-3 px-6 text-left">Image</th> */}
                                        <th className="py-3 px-2 text-left">Updated</th>
                                        <th className="py-3 px-2 text-left">Edit</th>

                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200 text-gray-600 text-sm font-light w-full">
                                    {tableContent}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return content
}
export default StocksList