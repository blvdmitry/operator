type Tokens = {
  "easing-slow-in": string;
  "easing-slow-out": string;
  "easing-slow-in-out": string;
  "easing-subtle-in": string;
  "easing-subtle-out": string;
  "easing-bounce-in": string;
  "easing-bounce-out": string;
  "easing-subtle-in-out": string;

  "timing-instant": string;
  "timing-fast": string;
  "timing-deliberate": string;
  "timing-slow": string;
  "timing-slower": string;
  "timing-slowest": string;
  "timing-paused": string;
};

const tokens: Tokens = {
  "easing-slow-in": "cubic-bezier(0.0, 0.0, 0.2, 1)",
  "easing-slow-out": "cubic-bezier(0.4, 0.0, 1, 1)",
  "easing-slow-in-out": "cubic-bezier(0.4, 0.0, 0.2, 1)",
  "easing-subtle-in": "cubic-bezier(0.0, 0.0, 0.2, 1)",
  "easing-subtle-out": "cubic-bezier(0.4, 0.0, 1, 1)",
  "easing-subtle-in-out": "cubic-bezier(0.4, 0.0, 0.2, 1)",
  "easing-bounce-in": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  "easing-bounce-out": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  "timing-instant": "100ms",
  "timing-fast": "150ms",
  "timing-deliberate": "250ms",
  "timing-slow": "400ms",
  "timing-slower": "600ms",
  "timing-slowest": "1000ms",
  "timing-paused": "1600ms",
};

export default tokens;
