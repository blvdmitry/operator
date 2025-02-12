import React from "react";
import EyeIcon from "@bookingcom/bui-assets-react/streamline/EyeIcon";
import EyeCrossedOutIcon from "@bookingcom/bui-assets-react/streamline/EyeCrossedOutIcon";
import Button from "../Button/index.js";
import InputText from "../InputText/index.js";
import useId from "../../hooks/useId.js";
const InputPassword = (props) => {
    const { showPasswordAriaLabel, mixin } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const id = useId(props.id);
    const endSlot = (React.createElement(Button.Aligner, { alignment: "end" },
        React.createElement(Button, { variant: "tertiary-neutral", size: props.size, icon: showPassword ? EyeCrossedOutIcon : EyeIcon, onClick: () => setShowPassword(!showPassword), disabled: props.disabled, attributes: {
                "aria-label": showPasswordAriaLabel,
                "aria-controls": id,
                "aria-pressed": showPassword,
            } })));
    return (React.createElement(InputText, { ...props, type: showPassword ? "text" : "password", endSlot: endSlot, id: id, mixin: mixin }));
};
export default InputPassword;
