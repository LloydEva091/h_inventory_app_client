import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAddNewStockMutation } from "./stocksApiSlice"
import { MY_CATEGORY, MY_CURRENCY, MY_UNIT } from "../../config/constant"


const NewStockForm = ({ users }) => {

    const [addNewStock, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewStockMutation()



    const navigate = useNavigate()
    const [userId, setUserId] = useState(users)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState(MY_CATEGORY[0].name)
    const [cost, setCost] = useState('')
    const [currency, setCurrency] = useState(MY_CURRENCY[0].name)
    const [current_stock, setCurrentStock] = useState('')
    const [min_stock, setMinStock] = useState('')
    const [max_stock, setMaxStock] = useState('')
    const [unit, setUnit] = useState(MY_UNIT[0].name)


    // console.log(userId)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setCategories('')
            setCost('')
            setCurrency('')
            setCurrentStock('')
            setMinStock('')
            setMaxStock('')
            setUnit('')
            // setUserId('')
            navigate('/dash/stocks')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onCategoriesChanged = e => setCategories(e.target.value)
    const onCostChanged = e => setCost(e.target.value)
    const onCurrencyChanged = e => setCurrency(e.target.value)
    const onCurrentChanged = e => setCurrentStock(e.target.value)
    const onMinChanged = e => setMinStock(e.target.value)
    const onMaxChanged = e => setMaxStock(e.target.value)
    const onUnitChanged = e => setUnit(e.target.value)

    // const onTitleChanged = e => setTitle(e.target.value)
    // const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [userId, name, categories, cost, currency, current_stock, min_stock, max_stock, unit].every(Boolean) && !isLoading

    const onAddStockClicked = async (e) => {
        e.preventDefault()
        console.log(canSave)
        if (canSave) {
            await addNewStock({ user: userId, name, categories, cost, currency, current_stock, min_stock, max_stock, unit })
        }
    }

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

    const onResetClick = async (e) => {
        setName('')
        setCategories('')
        setCost('')
        setCurrency('')
        setCurrentStock('')
        setMinStock('')
        setMaxStock('')
        setUnit('')
    }
    // const options = users.map(user => {
    //     return (
    //         <option
    //             key={user.id}
    //             value={user.id}
    //         > {user.username}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"

    const validInputChecker = (props) => {
        return !props ? "form__input--incomplete" : ""
    }

    const content = (
        <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
            <h2 className="uppercase">Add New Stock </h2>
            <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
                <p className={errClass}>{error?.data?.message}</p>

                <form className="form" onSubmit={onAddStockClicked}>
                    <input type="hidden" name="user" value={userId} />

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
                        defaultValue={categories}
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
                        defaultValue={MY_CURRENCY[0]}
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
                        defaultValue={MY_UNIT[0]}
                        onChange={onUnitChanged}
                    >
                        {unitSelection}
                    </select>

                    <div className='grid grid-cols-1 gap-1 w-full m-1'>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
                            title="submit"
                            type="submit"
                            onClick={onAddStockClicked}
                        >
                            Add
                        </button>
                        <Link
                            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
                            to="/dash/stocks"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
                {/* <Link
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                    title="Reset"
                    onClick={onResetClick}
                >
                    Reset
                </Link> */}
            </div>

        </div>
    )

    return content
}

export default NewStockForm