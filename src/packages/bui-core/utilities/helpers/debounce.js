// from https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
const debounce = (cb, wait = 20) => {
    let timer;
    const callable = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => cb(...args), wait);
    };
    return callable;
};
export default debounce;
