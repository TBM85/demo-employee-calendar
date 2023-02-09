import "./App.scss";
import employees from "./data/employees.json";
import calendar from "./data/calendar.json";
import Table from "./components/Table/Table";
import { useEffect, useState } from "react";
import { getArrayGroup, getYearMonthDate } from "./utils";

function App() {
  const [calendarData, setCalendarData] = useState<Array<CalendarProps>[]>(
    getArrayGroup(calendar.datos, employees.data.length - 1)
  );

  const [employeesData, setEmployeesData] = useState<Array<EmployeesProps>>(
    employees.data.map((data) => {
      return { ...data, total_holidays: 0 };
    })
  );

  // Return an array with all the "fechas" key values, showing only the month and year.
  const [yearMonthArr] = useState<number[]>(
    calendar.datos.map(({ fecha }) => {
      return getYearMonthDate(fecha);
    })
  );

  // Return an array with all the "fechas" key values, showing the day, month, and year.
  const [datesArr] = useState<number[]>(
    calendar.datos.map(({ fecha }) => {
      return fecha;
    })
  );

  const [isInitialData, setIsInitialData] = useState<boolean>(true);

  // Replace selected day values when day is clicked
  const handleClick = (fecha: number, tipoDs: string, id: number) => {
    // CALENDAR DATA
    let calendarArr: Array<CalendarProps>[] = [...calendarData];
    const index = calendarArr[id].findIndex((item) => item.fecha === fecha);

    try {
      if (tipoDs === "Dia Laborable") {
        calendarArr[id][index].tipoId = "V";
        calendarArr[id][index].tipoDs = "Vacaciones";
        calendarArr[id][index].color = "VERDE";
      } else if (tipoDs === "Vacaciones") {
        calendarArr[id][index].tipoId = "";
        calendarArr[id][index].tipoDs = "Dia Laborable";
        calendarArr[id][index].color = "BLANCO";
      }

      setCalendarData(calendarArr);

      // Store calendarArr data in localStorage
      localStorage.setItem("newCalendarArr", JSON.stringify(calendarArr));
    } catch (error) {
      console.log(error);
    }

    // EMPLOYEES DATA
    const employeesArr: Array<EmployeesProps> = [...employeesData];
    const totalHolidays = calendarArr[id].filter(
      (item) => item.tipoId === "V"
    ).length;

    try {
      employeesArr[id].total_holidays = totalHolidays;

      // Store employeesData data in localStorage
      localStorage.setItem("newEmployeesArr", JSON.stringify(employeesData));
    } catch (error) {
      console.log(error);
    }
  };

  // Store calendar data in localStorage whenever calendarData changes
  useEffect(() => {
    if (isInitialData && localStorage.length !== 0) {
      return;
    }
    localStorage.setItem("newCalendarArr", JSON.stringify(calendarData));
  }, [calendarData, isInitialData]);

  // Retrieve the value of "newCalendarArr" and "newEmployeesArr" key from the local storage
  useEffect(() => {
    const dataCalendarArr = localStorage.getItem("newCalendarArr");
    if (dataCalendarArr) {
      setCalendarData(JSON.parse(dataCalendarArr));
    }

    const holidayDataArr = localStorage.getItem("newEmployeesArr");
    if (holidayDataArr) {
      setEmployeesData(JSON.parse(holidayDataArr));
    }

    setIsInitialData(false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>employee calendar</h1>
      </header>
      <main className="App-main">
        <Table
          employees={employeesData}
          calendar={calendarData}
          yearMonthArr={yearMonthArr}
          datesArr={datesArr}
          onHandleClick={handleClick}
        />
      </main>
    </div>
  );
}

export default App;
