import user from "../../assets/icons/user.svg";
import {
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

  const yearMonthArr = calendar.map(({ fecha }) => {
    return getYearMonthDate(fecha);
  });

  const datesArr = calendar.map(({ fecha }) => {
    return fecha;
  });

  const yearMonthNoEqualItemsArr = getNoEqualItemsArray(yearMonthArr);

  return (
    <table className={classes.Table}>
      <thead>
        <tr className={classes["header-row"]}>
          <th>Employees</th>
          <th>Days</th>
          {yearMonthNoEqualItemsArr.map((month, index) => (
            <th scope="col" key={`month-year-${index}`}>
              <span>{`${getMonth(month)} ${getYear(month)}`}</span>
            </th>
          ))}
        </tr>
        <tr className={classes["header-row-days"]}>
          <td></td>
          <td></td>
          {yearMonthNoEqualItemsArr.map((month, index) => (
            <th key={`days-${index}`} className={classes["days"]}>
              <table>
                <thead>
                  <tr>
                    {datesArr.filter((date) => getYearMonthDate(date) === month).map((date, index2) => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
