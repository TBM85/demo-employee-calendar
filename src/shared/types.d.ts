interface EmployeesProps {
  id: number;
  first_name: string;
  last_name: string;
  total_holidays: number;
}

interface CalendarProps {
  fecha: number;
  tipoId: string;
  tipoDs: string;
  color: string;
}

interface TableProps {
  employees: Array<EmployeesProps>;
  calendar: Array<CalendarProps>[];
  yearMonthArr: number[];
  datesArr: number[];
  onHandleClick: Function;
}