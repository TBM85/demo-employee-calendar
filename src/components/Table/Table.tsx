import user from "../../assets/icons/user.svg";
import {
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
