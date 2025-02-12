// from https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
const debounce = <T extends Function>(cb: T, wait = 20) => {
  let timer: ReturnType<typeof setTimeout>;
  const callable = (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
};

export default debounce;
