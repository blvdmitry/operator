import { Responsive, ResponsiveOnly } from "../../types";
declare const mapProps: <Prop1 extends string, Prop2 extends string | number | boolean>(prop: Responsive<Prop1> | Responsive<boolean>, map: Record<Prop1, Prop2>) => Record<Prop1, Prop2>[Prop1] | ResponsiveOnly<Prop2>;
export default mapProps;
