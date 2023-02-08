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

const Table = ({
  employees,
  calendar,
  yearMonthArr,
  datesArr,
  onHandleClick,
}: TableProps) => (
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
      {employees.map(({ id, first_name, last_name, total_holidays }, index) => (
        <tr className={classes["employee-row"]} key={`employee-row-${id}`}>
          <th scope="row">
            <img src={user} alt="User" />
            <span>{`${first_name} ${last_name}`}</span>
          </th>
          <td>
            <span>{`${
              total_holidays < 10 ? `0${total_holidays}` : total_holidays
            } / 22`}</span>
          </td>
          {getNoEqualItemsArray(yearMonthArr).map((month, index2) => (
            <td key={`boxes-${index2}`} className={classes["days"]}>
              <table>
                <tbody>
                  <tr>
                    {calendar[index]
                      .filter(({ fecha }) => getYearMonthDate(fecha) === month)
                      .map(({ fecha, tipoId, tipoDs, color }, index3) => (
                        <td
                          key={`box-${index3}`}
                          onClick={() =>
                            calendar[index].filter(
                              (item) => item.tipoId === "V"
                            ).length < 22
                              ? tipoId === "" || tipoId === "V"
                                ? onHandleClick(fecha, tipoDs, index)
                                : undefined
                              : calendar[index].filter(
                                  (item) => item.tipoId === "V"
                                ).length >= 22
                              ? tipoId === "V"
                                ? onHandleClick(fecha, tipoDs, index)
                                : undefined
                              : undefined
                          }
                        >
                          <span
                            className={`${classes[getClassName(color)]} ${
                              tipoId === "" &&
                              calendar[index].filter(
                                (item) => item.tipoId === "V"
                              ).length >= 22
                                ? classes["no-allowed"]
                                : ""
                            }`}
                          ></span>
                        </td>
                      ))}
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

export default Table;
