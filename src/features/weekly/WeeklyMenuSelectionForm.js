import useMenuDetails from "../../hooks/useMenuDetails";
import MenuSelection from "./MenuSelection";
import { useEffect, useState } from "react";

function WeeklyMenuSelectionForm({ day, dayItem, setMenu, menusSelection }) {
    const [itemsChanged, setItemsChanged] = useState(0); // state variable to track changes to dayItem array



  const MenuInfo = ({ menuId, property }) => {
    const menu = useMenuDetails(menuId);
    if (property === "menuCost") {
      return menu.menuCost.toFixed(2);
    } else if (property === "currency") {
      return menu.currency;
    } else if (property === "name") {
      return menu.name;
    } else if (property === "all") {
      return menu;
    }
  };

    useEffect(() => {
      // This code will be executed whenever itemsChanged state variable changes
      console.log("Items changed, re-rendering component");
    }, [itemsChanged]);

  const handleItemChange = (index, e) => {
    const newItemArr = [...dayItem];
    newItemArr[index] = {
      ...newItemArr[index],
      [e.target.name]: e.target.value,
    };
    setMenu(newItemArr);
    setItemsChanged(itemsChanged + 1); // update state variable to force re-render
  };


  return (
    <div>
      <label className="form__label" htmlFor="menu-label">
        {day.toUpperCase()}
      </label>
      {dayItem.map((item, index) => (
        <div key={index}>
          <label className="form__label p-2" htmlFor="menu-menu">
            Menu:
            <select
              id="menu-menu"
              type="text"
              name="menu"
              className="form__select text-black rounded-lg m-2 w-full mb-6"
              defaultValue={item.menu}
              onChange={(e) => {
                handleItemChange(index, e);
              }}
              required
            >
              <option value="" disabled selected>
                Select Menu
              </option>
              {menusSelection}
            </select>
          </label>

          <br />
          <MenuSelection item={item.menu} ></MenuSelection>
          <br />

        </div>
      ))}
    </div>
  );
}

export default WeeklyMenuSelectionForm;
