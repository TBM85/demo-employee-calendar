import user from "../../assets/icons/user.svg";
import {
  getDay,
  getMonth,
  getNoEqualItemsArray,
  getYear,
  getYearMonthDate,
} from "../../utils";
import Box from "../Box/Box";
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
        <th className={classes["fixed-col"]}></th>
        <th className={classes["fixed-col"]}></th>
        {getNoEqualItemsArray(yearMonthArr).map((month, index) => (
          <th scope="col" key={`month-year-${index}`}>
            <span>{`${getMonth(month)} ${getYear(month)}`}</span>
          </th>
        ))}
      </tr>
      <tr className={classes["header-row-days"]}>
        <th className={`${classes["header-col-first"]} ${classes["fixed-col"]}`}>Employees</th>
        <th className={`${classes["header-col-second"]} ${classes["fixed-col"]}`}>Days</th>
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
          <th className={`${classes["body-col-first"]} ${classes["fixed-col"]}`} scope="row">
            <div className={classes["body-col-first-content"]}>
              <img src={user} alt="User" />
              <span>{`${first_name} ${last_name}`}</span>
            </div>
          </th>
          <td className={`${classes["body-col-second"]} ${classes["fixed-col"]}`}>
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
                        <Box
                          key={`box-${index3}`}
                          vacationAmount={total_holidays}
                          index={index}
                          onHandleClick={onHandleClick}
                          fecha={fecha}
                          tipoId={tipoId}
                          tipoDs={tipoDs}
                          color={color}
                        />
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
