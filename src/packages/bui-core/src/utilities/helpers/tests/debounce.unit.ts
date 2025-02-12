import debounce from "../debounce";

describe("helpers/debounce", () => {
  let func: jest.Mock;
  let debouncedFunc: Function;
  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 100);
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });
  test("executes once", () => {
    for (let i = 0; i < 10; i++) {
      debouncedFunc();
    }

    jest.runAllTimers();
    expect(func).toBeCalledTimes(1);
  });
  test("executes thrice", () => {
    jest.advanceTimersByTime(50);
    for (let i = 0; i < 10; i++) {
      debouncedFunc();
    }
    jest.advanceTimersByTime(150);
    for (let i = 0; i < 10; i++) {
      debouncedFunc();
    }
    jest.advanceTimersByTime(250);
    for (let i = 0; i < 10; i++) {
      debouncedFunc();
    }

    jest.runAllTimers();
    expect(func).toBeCalledTimes(3);
  });
  test("executes multiple times", () => {
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j < 10; j++) {
        debouncedFunc();
      }
      jest.advanceTimersByTime(i * 100);
    }

    jest.runAllTimers();
    expect(func).toBeCalledTimes(5);
  });
});
