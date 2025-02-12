const find = <T = unknown>(
  arr: T[],
  predicate: (item: T) => boolean | null | undefined
) => {
  const length = arr.length;

  for (let i = 0; i < length; i += 1) {
    const value = arr[i];
    if (predicate(value)) return value;
  }

  return undefined;
};

export default find;
