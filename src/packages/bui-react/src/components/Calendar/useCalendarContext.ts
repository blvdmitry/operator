import React from "react";
import { Context } from "./Calendar.context";

const useCalendarContext = () => React.useContext(Context);
export default useCalendarContext;
