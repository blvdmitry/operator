import { keyboardMode } from "../../constants/attributes";
const isKeyboardMode = () => {
    if (typeof document === "undefined")
        return;
    return !!document.querySelector(`[${keyboardMode}]`);
};
export default isKeyboardMode;
