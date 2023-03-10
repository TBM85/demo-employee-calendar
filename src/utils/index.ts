export const getYear = (num: number) => {
  return Number(num.toString().slice(0, 4));
};

export const getMonth = (num: number) => {
  const value = Number(num.toString().slice(4, 6));

  switch (value) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "";
  }
};

export const getDay = (num: number) => {
  return Number(num.toString().slice(6, 8));
};

export const getYearMonthDate = (num: number) => {
  return Number(num.toString().slice(0, 6));
};

export const getNoEqualItemsArray = (arr: number[]) => {
  return Array.from(new Set(arr));
};

export const getClassName = (str: string) => {
  switch (str) {
    case "AZUL":
      return "blue-box";
    case "ROJO":
      return "red-box";
    case "AMARILLO":
      return "yellow-box";
    case "VERDE":
      return "green-box";
    case "GRIS":
      return "gray-box";
    case "BLANCO":
    default:
      return "white-box";
  }
};

export const getArrayGroup = (arr: Array<CalendarProps>, n: number) => {
  let arrayGroup: Array<CalendarProps>[] = [];
  for (let i = 0; i <= n; i++) {
    arrayGroup.push(arr);
  }

  return arrayGroup;
};
