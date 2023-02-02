import user from "../../assets/icons/user.svg";
import classes from "./Table.module.scss";

const Table = (props: { employees: Array<EmployeesProps> }) => (
  <table className={classes.Table}>
    <thead>
      <tr className={classes["header-row"]}>
        <th>Employees</th>
        <th>Days</th>
      </tr>
    </thead>
    <tbody>
      {props.employees.map(({ id, first_name, last_name, total_holidays }) => (
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

export default Table;
