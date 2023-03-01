import { useState, useEffect } from "react";
import {
  useUpdateWeeklyMenuMutation,
  useDeleteWeeklyMenuMutation,
  useAddNewWeeklyMenuMutation,
} from "./weeklyMenusApiSlice";
import { useNavigate, Link } from "react-router-dom";
import { useGetMenusQuery } from "../menus/menusApiSlice";
import WeeklyMenuSelectionForm from "./WeeklyMenuSelectionForm";
import ModalView from "../../components/ModalView";
import getWeekNumber from "../../utils/getWeekNumber";

const EditWeeklyMenuForm = ({ weeklyMenu }) => {
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

  const [
    addNewWeeklyMenu,
    {
      isLoading: isLoadingAdd,
      isSuccess: isSuccessAdd,
      isError: isErrorAdd,
      error: errorAdd,
    },
  ] = useAddNewWeeklyMenuMutation();

  const [updateWeeklyMenu, { isLoading, isSuccess, isError, error }] =
    useUpdateWeeklyMenuMutation();

  const [
    deleteWeeklyMenu,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteWeeklyMenuMutation();

  const [userId, setUserId] = useState(weeklyMenu.user);

  // Filter all menu by current user and use this as a selection
  const filterMenusByUser = Object.values(menus?.entities ?? {}).filter(
    (menu) => menu.user?.toString() === userId?.toString()
  );

  // console.log(`test filter`, filterMenusByUser);

  const navigate = useNavigate();
  const [weekNumber, setWeekNumber] = useState(weeklyMenu.weekNumber);
  const [year, setYear] = useState(weeklyMenu.year);
  const [monday, setMonday] = useState(weeklyMenu.monday);
  const [tuesday, setTuesday] = useState(weeklyMenu.tuesday);
  const [wednesday, setWednesday] = useState(weeklyMenu.wednesday);
  const [thursday, setThursday] = useState(weeklyMenu.thursday);
  const [friday, setFriday] = useState(weeklyMenu.friday);
  const [saturday, setSaturday] = useState(weeklyMenu.saturday);
  const [sunday, setSunday] = useState(weeklyMenu.sunday);
  const [startDate, setStartDate] = useState(weeklyMenu.startDate);

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

  const getYear = (startDate) => {
    // Create a new date object from the start date string
    const date = new Date(startDate);
    // Get the year from the date object
    const year = date.getFullYear();
    // Return the year as a number
    return year;
  };

  const onCancelClick = async (e) => await navigate("/dash/weekly");

  const menuSelections = filterMenusByUser.map((opt) => {
    return (
      <option key={opt.id} value={opt.id}>
        {opt.name}
      </option>
    );
  });

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

  // console.log(categories)
  const onSaveMenuClicked = async (e) => {
    if (canSave) {
      await updateWeeklyMenu({
        id: weeklyMenu.id,
        user: userId,
        weekNumber,
        year,
        // startDate,
        // weeklyMenuCost,
        // currency,
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

  const onDeleteMenuClicked = async () => {
    await deleteWeeklyMenu({ id: weeklyMenu.id });
  };


  const getDateDisplay = (tdate) => {
    const date = new Date(tdate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because getMonth() returns zero-based month index
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const validInputChecker = (props) => {
    return !props ? "form__input--incomplete" : "";
  };

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

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
    <div className="min-h-screen px-2 pb-2 flex flex-col items-center justify-center">
      <h2>EDIT MENU #{weeklyMenu.id}</h2>
      <div className="p-4 w-2/3 border rounded bg-slate-500 bg-opacity-25">
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-1 p-5">
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
                  value={weekNumber}
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
                  value={year}
                >
                  {year || "N/A"}
                </span>
              </label>
            </div>
            <div className="col-span-1">
              <ModalView
                modalContent={mondayContent}
                label="Monday's Menu"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={tuesdayContent}
                label="Tuesday's Menu"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={wednesdayContent}
                label="Wednesday's Menu"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={thursdayContent}
                label="Thursday's Menu"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={fridayContent}
                label="Friday's Menu"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={saturdayContent}
                label="Saturday's Menu"
                action="Edit"
              ></ModalView>
              <ModalView
                modalContent={sundayContent}
                label="Sunday's Menu"
                action="Edit"
              ></ModalView>
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-3 gap-2 w-full p-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                title="Save"
                onClick={onSaveMenuClicked}
                disabled={!canSave}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                title="Delete"
                onClick={onDeleteMenuClicked}
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
  );

  return content;
};

export default EditWeeklyMenuForm;
