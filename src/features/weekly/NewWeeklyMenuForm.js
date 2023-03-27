import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewWeeklyMenuMutation } from "./weeklyMenusApiSlice";
import { useGetMenusQuery } from "../menus/menusApiSlice";
import WeeklyMenuSelectionForm from "./WeeklyMenuSelectionForm";
import ModalView from "../../components/ModalView";
import getWeekNumber from '../../utils/getWeekNumber'
import getYear from '../../utils/getYear'

const NewMenuForm = ({ users }) => {
  const {
    data: menus,
    isLoading: menuIsLoading,
    isSuccess: menuIsSuccess,
    isError: menuIsError,
    error: menuError,
  } = useGetMenusQuery("menusList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [addNewWeeklyMenu, { isLoading, isSuccess, isError, error }] =
    useAddNewWeeklyMenuMutation();

  const [userId, setUserId] = useState(users._id);

  // Filter all menu by current user and use this as a selection
  const filterMenusByUser = Object.values(menus?.entities ?? {}).filter(
    (menu) => menu.user == userId
  );

  // console.log(`test filter`,filterRecipesByUser);

  const navigate = useNavigate();
  const [weekNumber, setWeekNumber] = useState(1);
  const [year, setYear] = useState();
  const [monday, setMonday] = useState([
    {
      menu: "",
    },
  ]);
  const [tuesday, setTuesday] = useState([
    {
      menu: "",
    },
  ]);
  const [wednesday, setWednesday] = useState([
    {
      menu: "",
    },
  ]);
  const [thursday, setThursday] = useState([
    {
      menu: "",
    },
  ]);
  const [friday, setFriday] = useState([
    {
      menu: "",
    },
  ]);
  const [saturday, setSaturday] = useState([
    {
      menu: "",
    },
  ]);
  const [sunday, setSunday] = useState([
    {
      menu: "",
    },
  ]);
  const [startDate, setStartDate] = useState(new Date()); // Set to today

  // if (menuIsLoading) {
  //   <div>Loading...</div>;
  // }
  // if(menuIsError){
  //   <div>{menuError}</div>
  // }

  useEffect(() => {
    if (isSuccess) {
      setWeekNumber("");
      setYear("");
      setMonday("");
      setTuesday("");
      setWednesday("");
      setThursday("");
      setFriday("");
      setSaturday("");
      setSunday("");
      setStartDate("");
      navigate("/dash/weekly");
    }
  }, [isSuccess, navigate]);

  // Set value of weekNumber and year  once startDate is selected or changed
  useEffect(() => {
    setWeekNumber(getWeekNumber(startDate));
    setYear(getYear(startDate));
  }, [startDate]);

  

  const onStartDateChanged = (e) => setStartDate(e.target.value);

  const canSave =
    [
      userId,
      weekNumber,
      year,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    ].every(Boolean) && !isLoading;

  const onAddWeeklyMenuClicked = async (e) => {
    e.preventDefault();
    console.log(canSave);
    if (canSave) {
      await addNewWeeklyMenu({
        user: userId,
        userId,
        weekNumber,
        year,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      });
    }
  };

  const menuSelections = filterMenusByUser.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validInputChecker = (props) => {
    return !props ? "form__input--incomplete" : "";
  };

  const getDateDisplay = (tdate) => {
    const date = new Date(tdate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because getMonth() returns zero-based month index
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };


  const mondayContent = (
    <WeeklyMenuSelectionForm
      day="monday"
      setMenu={setMonday}
      dayItem={monday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );
  const tuesdayContent = (
    <WeeklyMenuSelectionForm
      day="tuesday"
      setMenu={setTuesday}
      dayItem={tuesday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );
  const wednesdayContent = (
    <WeeklyMenuSelectionForm
      day="wednesday"
      setMenu={setWednesday}
      dayItem={wednesday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );
  const thursdayContent = (
    <WeeklyMenuSelectionForm
      day="thursday"
      setMenu={setThursday}
      dayItem={thursday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );
  const fridayContent = (
    <WeeklyMenuSelectionForm
      day="friday"
      setMenu={setFriday}
      dayItem={friday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );
  const saturdayContent = (
    <WeeklyMenuSelectionForm
      day="saturday"
      setMenu={setSaturday}
      dayItem={saturday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );
  const sundayContent = (
    <WeeklyMenuSelectionForm
      day="sunday"
      setMenu={setSunday}
      dayItem={sunday}
      menusSelection={menuSelections}
    ></WeeklyMenuSelectionForm>
  );

  const content = (
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center ">
      <h2 className="uppercase">Add New Weekly Menu Plan </h2>
      <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{error?.data?.message}</p>

        <form className="form" onSubmit={onAddWeeklyMenuClicked}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-1 p-5 sm:w-1/2 md:w-full">
              <input type="hidden" name="user" value={userId} />

              <label className="form__label m-2" htmlFor="menu-start">
                Select Week Date:
                <input
                  className={`form__input ${validInputChecker(
                    startDate
                  )} text-black m-2 w-full`}
                  id="menu-start"
                  name="startDate"
                  type="date"
                  autoComplete="off"
                  value={getDateDisplay(startDate)}
                  onChange={onStartDateChanged}
                />
              </label>

              
              <label
                className="form__label m-2 sm:w-1/2 md:w-full"
                htmlFor="menu-wkNumber"
              >
                Week Number:
                <span
                  className={` ${validInputChecker(
                    weekNumber
                  )} text-black w-full bg-white rounded-xl m-2 p-2 block sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
                  id="menu-wkNumber"
                  name="wkNumber"
                  type="text"
                >
                  {weekNumber || "N/A"}
                </span>
              </label>
              <label className="form__label m-2" htmlFor="menu-year">
                Year:
                <span
                  className={` ${validInputChecker(
                    year
                  )} text-black bg-white w-full p-2 m-2 rounded-xl block`}
                  id="menu-year"
                  name="year"
                  type="year"
                  autoComplete="off"
                >
                  {year || "N/A"}
                </span>
              </label>
            </div>
            <div className="col-span-1">
              <ModalView
                modalContent={mondayContent}
                label="Monday's Menu"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={tuesdayContent}
                label="Tuesday's Menu"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={wednesdayContent}
                label="Wednesday's Menu"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={thursdayContent}
                label="Thursday's Menu"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={fridayContent}
                label="Friday's Menu"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={saturdayContent}
                label="Saturday's Menu"
                action="Add"
              ></ModalView>
              <ModalView
                modalContent={sundayContent}
                label="Sunday's Menu"
                action="Add"
              ></ModalView>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 w-full m-1">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded w-full mb-2"
              title="submit"
              type="submit"
              onClick={onAddWeeklyMenuClicked}
            >
              Add
            </button>
            <Link
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
              to="/dash/weekly"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );

  return content;
};

export default NewMenuForm;
