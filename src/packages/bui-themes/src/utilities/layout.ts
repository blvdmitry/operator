type Breakpoint = {
  medium: number;
  large: number;
  huge: number;
};

type ZIndex = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
};

type Layout = {
  breakpoints: Breakpoint;
  container: number;
  zIndex: ZIndex;
};

const tokens: Layout = {
  breakpoints: {
    medium: 576,
    large: 1024,
    huge: 1280,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
  },
  container: 1140,
};

export default tokens;
