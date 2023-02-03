import { useEffect, useState } from "react";
import user from "../../assets/icons/user.svg";
import {
  getClassName,
  getDay,
  getMonth,
  getNoEqualItemsArray,
  getYear,
  getYearMonthDate,
} from "../../utils";
import classes from "./Table.module.scss";

const Table = (props: {
  employees: Array<EmployeesProps>;
  calendar: Array<CalendarProps>;
}) => {
  const { employees, calendar } = props;
  const [calendarData, setCalendarData] = useState(calendar);
  const [yearMonthArr, setYearMonthArr] = useState<number[]>([]);
  const [datesArr, setDatesArr] = useState<number[]>([]);
  const [typeDaysArr, setTypeDaysArr] = useState<string[]>([]);
  const [holidays, setHolidays] = useState<string>("0");

  const handleClick = (fecha: number, tipoDs: string) => {
    let newArr = [...calendarData];

    const index = newArr.findIndex((item) => item.fecha === fecha);

    try {
      if (tipoDs === "Dia Laborable") {
        newArr[index].tipoId = "V";
        newArr[index].tipoDs = "Vacaciones";
        newArr[index].color = "VERDE";
      } else if (tipoDs === "Vacaciones") {
        newArr[index].tipoId = "";
        newArr[index].tipoDs = "Dia Laborable";
        newArr[index].color = "BLANCO";
      }

      setCalendarData(newArr);
      window.localStorage.setItem("newCalendarArr", JSON.stringify(newArr));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const dataCalendarArr = window.localStorage.getItem("newCalendarArr");
    if (dataCalendarArr) {
      setCalendarData(JSON.parse(dataCalendarArr));
    }
  }, []);

  useEffect(() => {
    try {
      const totalHolidays = typeDaysArr.filter((item) => item === "V").length;
      const displayTotalHolidays =
        totalHolidays < 10 ? `0${totalHolidays}` : totalHolidays;
      setHolidays(displayTotalHolidays.toString());
      window.localStorage.setItem(
        "newTotalHolidays",
        JSON.stringify(displayTotalHolidays)
      );
    } catch (error) {
      console.log(error);
    }

    const holidayDataArr = window.localStorage.getItem("newTotalHolidays");
    if (holidayDataArr) {
      setHolidays(JSON.parse(holidayDataArr));
    }
  }, [typeDaysArr]);

  useEffect(() => {
    setYearMonthArr(
      calendarData.map(({ fecha }) => {
        return getYearMonthDate(fecha);
      })
    );

    setDatesArr(
      calendarData.map(({ fecha }) => {
        return fecha;
      })
    );

    setTypeDaysArr(
      calendarData.map(({ tipoId }) => {
        return tipoId;
      })
    );
  }, [calendarData]);

  return (
    <table className={classes.Table}>
      <thead className={classes["fixed-row"]}>
        <tr className={classes["header-row"]}>
          <th></th>
          <th></th>
          {getNoEqualItemsArray(yearMonthArr).map((month, index) => (
            <th scope="col" key={`month-year-${index}`}>
              <span>{`${getMonth(month)} ${getYear(month)}`}</span>
            </th>
          ))}
        </tr>
        <tr className={classes["header-row-days"]}>
          <th>Employees</th>
          <th>Holidays</th>
          {getNoEqualItemsArray(yearMonthArr).map((month, index) => (
            <th key={`days-${index}`} className={classes["days"]}>
              <table>
                <thead>
                  <tr>
                    {datesArr
                      .filter((date) => getYearMonthDate(date) === month)
                      .map((date, index2) => (
                        <th key={`day-${index2}`}>
                          <span>{getDay(date)}</span>
                        </th>
                      ))}
                  </tr>
                </thead>
              </table>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees.map(({ id, first_name, last_name, total_holidays }) => (
          <tr className={classes["employee-row"]} key={`employee-row-${id}`}>
            <th scope="row">
              <img src={user} alt="User" />
              <span>{`${first_name} ${last_name}`}</span>
            </th>
            <td>
              <span>{`${holidays} / ${total_holidays}`}</span>
            </td>
            {getNoEqualItemsArray(yearMonthArr).map((month, index) => (
              <td key={`boxes-${index}`} className={classes["days"]}>
                <table>
                  <tbody>
                    <tr>
                      {calendarData
                        .filter(
                          ({ fecha }) => getYearMonthDate(fecha) === month
                        )
                        .map(({ fecha, tipoId, tipoDs, color }, index2) => {
                          return (
                            <td
                              key={`box-${index2}`}
                              onClick={() =>
                                Number(holidays) < 22
                                  ? tipoId === "" || tipoId === "V"
                                    ? handleClick(fecha, tipoDs)
                                    : undefined
                                  : Number(holidays) >= 22
                                  ? tipoId === "V"
                                    ? handleClick(fecha, tipoDs)
                                    : undefined
                                  : undefined
                              }
                            >
                              <span
                                className={`${classes[getClassName(color)]} ${
                                  tipoId === "" && Number(holidays) >= 22
                                    ? classes["no-allowed"]
                                    : ""
                                }`}
                              ></span>
                            </td>
                          );
                        })}
                    </tr>
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
