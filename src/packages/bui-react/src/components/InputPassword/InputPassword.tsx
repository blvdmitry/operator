import React from "react";
import EyeIcon from "@bookingcom/bui-assets-react/streamline/EyeIcon";
import EyeCrossedOutIcon from "@bookingcom/bui-assets-react/streamline/EyeCrossedOutIcon";
import Button from "components/Button";
import InputText from "components/InputText";
import useId from "hooks/useId";
import type * as T from "./InputPassword.types";

const InputPassword = (props: T.Props) => {
  const { showPasswordAriaLabel, mixin } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const id = useId(props.id);

  const endSlot = (
    <Button.Aligner alignment="end">
      <Button
        variant="tertiary-neutral"
        size={props.size}
        icon={showPassword ? EyeCrossedOutIcon : EyeIcon}
        onClick={() => setShowPassword(!showPassword)}
        disabled={props.disabled}
        attributes={{
          "aria-label": showPasswordAriaLabel,
          "aria-controls": id,
          "aria-pressed": showPassword,
        }}
      />
    </Button.Aligner>
  );

  return (
    <InputText
      {...props}
      type={showPassword ? "text" : "password"}
      endSlot={endSlot}
      id={id}
      mixin={mixin}
    />
  );
};

export default InputPassword;
