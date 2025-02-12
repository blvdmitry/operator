import { Responsive, ResponsiveOnly } from "../../types";

const mapProps = <
  Prop1 extends string,
  Prop2 extends string | number | boolean
>(
  prop: Responsive<Prop1> | Responsive<boolean>,
  map: Record<Prop1, Prop2>
) => {
  if (typeof prop === "string" || typeof prop === "boolean") {
    return map[String(prop) as Prop1];
  }

  const keys = Object.keys(prop) as Array<keyof typeof prop>;

  return keys.reduce(
    (acc: ResponsiveOnly<Prop2>, key) => {
      const value = String(prop[key]!) as Prop1;

      acc[key] = map[value];

      return acc;
    },
    { s: map[String(prop.s) as Prop1] }
  );
};

export default mapProps;
