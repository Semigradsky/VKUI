import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import type { HasRootRef } from "../../types";
import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    HasRootRef<HTMLDivElement> {
  /**
   * Задает расположение элементов внутри группы, вертикальное или горизонтальное.
   */
  mode?: "vertical" | "horizontal";
  /**
   * Выставляет в зависимости от `mode` отступ по вертикали или горизонтали.
   */
  gap?: "none" | "space" | "s" | "m";
  /**
   * Растягивает компонент на всю ширину контейнера.
   *
   * Note: Для потомков соответствующее поведение нужно определять самостоятельно, где это необходимо.
   */
  stretched?: boolean;
}

/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */
export const ButtonGroup = ({
  mode = "horizontal",
  gap = "m",
  stretched = false,
  getRootRef,
  className,
  children,
  ...restProps
}: ButtonGroupProps) => {
  return (
    <div
      className={classNamesString(
        className,
        styles.ButtonGroup,
        styles[`ButtonGroup--mode-${mode}`],
        gap !== "none" && styles[`ButtonGroup--gap-${gap}`],
        stretched && styles["ButtonGroup--stretched"]
      )}
      role="group"
      ref={getRootRef}
      {...restProps}
    >
      {children}
    </div>
  );
};
