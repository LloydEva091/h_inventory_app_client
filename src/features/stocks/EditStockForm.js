import { useState, useEffect } from "react"
import { useUpdateStockMutation, useDeleteStockMutation } from "./stocksApiSlice"
import { useNavigate } from "react-router-dom"
import { MY_CATEGORY, MY_UNIT, MY_CURRENCY } from "../../config/constant"

const EditStockForm = ({ stock, users }) => {

    const [updateStock, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateStockMutation()

    const [deleteStock, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteStockMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(stock.name)
    const [categories, setCategories] = useState(stock.categories)
    const [cost, setCost] = useState(stock.cost)
    const [currency, setCurrency] = useState(stock.currency)
    const [current_stock, setCurrentStock] = useState(stock.current_stock)
    const [min_stock, setMinStock] = useState(stock.min_stock)
    const [max_stock, setMaxStock] = useState(stock.max_stock)
    const [unit, setUnit] = useState(stock.unit)
    const [stock_status, setStockStatus] = useState(stock.stock_status)

    // const [completed, setCompleted] = useState(stock.completed)
    const [userId, setUserId] = useState(stock.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setCategories('')
            setCost('')
            setCurrency('')
            setCurrentStock('')
            setMinStock('')
            setMaxStock('')
            setUnit('')
            setStockStatus('')
            setUserId('')
            navigate('/dash/stocks')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onCategoriesChanged = e => setCategories(e.target.value)
    const onCostChanged = e => setCost(e.target.value)
    const onCurrencyChanged = e => setCurrency(e.target.value)
    const onCurrentChanged = e => setCurrentStock(e.target.value)
    const onMinChanged = e => setMinStock(e.target.value)
    const onMaxChanged = e => setMaxStock(e.target.value)
    const onUnitChanged = e => setUnit(e.target.value)

    const onCancelClick = async (e) => await navigate("/dash/stocks")


    const categorySelection = MY_CATEGORY.map(opt => {
        return (
            <option
                key={opt.id}
                value={opt.name}
            > {opt.name}</option >
        )
    })
    const unitSelection = MY_UNIT.map(opt => {
        return (
            <option
                key={opt.id}
                value={opt.name}
            > {opt.name}</option >
        )
    })
    const currencySelection = MY_CURRENCY.map(opt => {
        return (
            <option
                key={opt.id}
                value={opt.name}
            > {opt.name}</option >
        )
    })
    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    // const onCompletedChanged = e => setCompleted(prev => !prev)

    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, categories, cost, currency, current_stock, min_stock, max_stock, stock_status, unit, userId].every(Boolean) && !isLoading
    const onSaveStockClicked = async (e) => {
        if (canSave) {
            await updateStock({ id: stock.id, user: userId, name, categories, cost, currency, current_stock, min_stock, max_stock, stock_status, unit })
        }
    }

    const onDeleteStockClicked = async () => {
        await deleteStock({ id: stock.id })
    }

    // const created = new Date(stock.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(stock.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const validInputChecker = (props) => {
        return !props ? "form__input--incomplete" : ""
    }

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center">
            <h2 >EDIT STOCK #{stock.id}</h2>
            <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
                <p className={errClass}>{errContent}</p>

                <form className="form" onSubmit={e => e.preventDefault()}>

                    <label className="form__label" htmlFor="stock-name">
                        Name:</label>
                    <input
                        className={`form__input ${validInputChecker(name)} text-black`}
                        id="stock-name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        value={name}
                        onChange={onNameChanged}
                    />
                    <label className="form__label" htmlFor="stock-categories">
                        Categories:</label>
                    <select
                        id="stock-categories"
                        name="categories"
                        className="form__select text-black rounded-lg"
                        defaultValue={categories.toString()}
                        onChange={onCategoriesChanged}
                    >
                        {categorySelection}
                    </select>

                    <label className="form__label" htmlFor="stock-cost">
                        Cost:</label>
                    <input
                        className={`form__input ${validInputChecker(cost)} text-black`}
                        id="stock-cost"
                        name="cost"
                        type="number"
                        autoComplete="off"
                        value={cost}
                        onChange={onCostChanged}
                    />
                    <label className="form__label" htmlFor="stock-currency">
                        Currency:</label>
                    <select
                        id="stock-currency"
                        name="currency"
                        className="form__select text-black rounded-lg"
                        defaultValue={currency.toString()} 
                        onChange={onCurrencyChanged}
                    >
                        {currencySelection}
                    </select>
                    <label className="form__label" htmlFor="stock-current-stock">
                        Current Stock:</label>
                    <input
                        className={`form__input ${validInputChecker(current_stock)} text-black`}
                        id="stock-current-stock"
                        name="current_stock"
                        type="number"
                        autoComplete="off"
                        value={current_stock}
                        onChange={onCurrentChanged}
                    />
                    <label className="form__label" htmlFor="stock-min-stock">
                        Min Stock:</label>
                    <input
                        className={`form__input ${validInputChecker(min_stock)} text-black`}
                        id="stock-min-stock"
                        name="min_stock"
                        type="number"
                        autoComplete="off"
                        value={min_stock}
                        onChange={onMinChanged}
                    />
                    <label className="form__label" htmlFor="stock-max-stock">
                        Max Stock:</label>
                    <input
                        className={`form__input ${validInputChecker(max_stock)} text-black`}
                        id="stock-max-stock"
                        name="max_stock"
                        type="number"
                        autoComplete="off"
                        value={max_stock}
                        onChange={onMaxChanged}
                    />

                    <label className="form__label" htmlFor="stock-unit">
                        Unit:</label>
                    <select
                        id="stock-unit"
                        name="unit"
                        className="form__select text-black rounded-lg"
                        defaultValue={unit.toString()}
                        onChange={onUnitChanged}
                    >
                        {unitSelection}
                    </select>


                    <div className="form__row">
                        <div className="form__divider">
                            <p className="form__updated">Updated:<br />{updated}</p>
                        </div>
                    </div>
                    <div className="">

                        <div className='grid grid-cols-3 gap-2 w-full p-2'>

                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                                title="Save"
                                onClick={onSaveStockClicked}
                                disabled={!canSave}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                                title="Delete"
                                onClick={onDeleteStockClicked}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded"
                                title="Cancel"
                                onClick={onCancelClick}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )

    return content
}

export default EditStockForm