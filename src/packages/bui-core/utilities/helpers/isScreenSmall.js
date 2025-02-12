import Breakpoints from "../../constants/breakpoints";
const isScreenSmall = () => {
    return (document.documentElement &&
        document.documentElement.offsetWidth < Breakpoints.MEDIUM);
};
export default isScreenSmall;
