import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { callMultiple } from "../../lib/callMultiple";
import { usePlatform } from "../../hooks/usePlatform";
import { HasRootRef } from "../../types";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import {
  VisuallyHiddenInput,
  VisuallyHiddenInputProps,
} from "../VisuallyHiddenInput/VisuallyHiddenInput";
import { useFocusVisible } from "../../hooks/useFocusVisible";
import { FocusVisible } from "../FocusVisible/FocusVisible";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import "./Switch.css";

export interface SwitchProps
  extends VisuallyHiddenInputProps,
    HasRootRef<HTMLLabelElement> {}

/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */
export const Switch = ({
  style,
  className,
  getRootRef,
  ...restProps
}: SwitchProps) => {
  const platform = usePlatform();
  const { sizeY } = useAdaptivity();
  const { focusVisible, onBlur, onFocus } = useFocusVisible();

  return (
    <label
      vkuiClass={classNames(
        getClassName("Switch", platform),
        getSizeYClassName("Switch", sizeY),
        restProps.disabled && "Switch--disabled",
        focusVisible && "Switch--focus-visible"
      )}
      className={className}
      style={style}
      ref={getRootRef}
      role="presentation"
    >
      <VisuallyHiddenInput
        {...restProps}
        type="checkbox"
        vkuiClass="Switch__self"
        onBlur={callMultiple(onBlur, restProps.onBlur)}
        onFocus={callMultiple(onFocus, restProps.onFocus)}
      />
      <span role="presentation" vkuiClass="Switch__pseudo" />
      <FocusVisible mode="outside" />
    </label>
  );
};
