// Can be replaced with padStart after IE deprecation
const zeroify = (value: number) => {
  return value <= 9 && value >= 0 ? `0${value}` : value.toString();
};

export default zeroify;
