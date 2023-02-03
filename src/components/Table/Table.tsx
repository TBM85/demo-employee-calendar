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

  const handleClick = (index: number, tipoDs: string) => {
    let newArr = [...calendarData];

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
  };

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
  }, [calendarData]);

  return (
    <table className={classes.Table}>
      <thead>
        <tr className={classes["header-row"]}>
          <th>Employees</th>
          <th>Days</th>
          {getNoEqualItemsArray(yearMonthArr).map((month, index) => (
            <th scope="col" key={`month-year-${index}`}>
              <span>{`${getMonth(month)} ${getYear(month)}`}</span>
            </th>
          ))}
        </tr>
        <tr className={classes["header-row-days"]}>
          <td></td>
          <td></td>
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
              <span>{total_holidays}</span>
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
                        .map(({ tipoId, tipoDs, color }, index2) => {
                          return (
                            <td
                              key={`box-${index2}`}
                              onClick={() =>
                                tipoId === "" || tipoId === "V"
                                  ? handleClick(index2, tipoDs)
                                  : undefined
                              }
                            >
                              <span
                                className={classes[getClassName(color)]}
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
