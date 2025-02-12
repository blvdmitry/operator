const nextFrame = (fn: FrameRequestCallback) => {
  const raf = window.requestAnimationFrame;
  raf(() => raf(fn));
};

export default nextFrame;
