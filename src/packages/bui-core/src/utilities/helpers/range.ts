// from https://stackoverflow.com/a/45355468
const range = (start: number, end: number) => {
  return new Array(end - start).fill(null).map((_d, i) => i + start);
};

export default range;
