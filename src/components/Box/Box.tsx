import { getClassName } from "../../utils";
import classes from "./Box.module.scss";

const Box = ({
  vacationAmount,
  index,
  onHandleClick,
  fecha,
  tipoId,
  tipoDs,
  color,
}: BoxProps) => (
  <td
    className={classes.Box}
    onClick={() =>
      vacationAmount < 22
        ? tipoId === "" || tipoId === "V"
          ? onHandleClick(fecha, tipoDs, index)
          : undefined
        : vacationAmount >= 22
        ? tipoId === "V"
          ? onHandleClick(fecha, tipoDs, index)
          : undefined
        : undefined
    }
  >
    <span
      className={`${classes[getClassName(color)]} ${
        tipoId === "" && vacationAmount >= 22 ? classes["no-allowed"] : ""
      }`}
    ></span>
  </td>
);

export default Box;
