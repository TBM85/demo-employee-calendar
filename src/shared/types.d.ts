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

interface ModalProps {
  title: string;
  content: string;
  buttonText: string;
  onCloseModal: Function;
}

interface BoxProps {
  vacationAmount: number;
  index: number;
  onHandleClick: Function;
  fecha: number;
  tipoId: string;
  tipoDs: string;
  color: string;
}