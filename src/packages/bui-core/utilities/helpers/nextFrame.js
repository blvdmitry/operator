const nextFrame = (fn) => {
    const raf = window.requestAnimationFrame;
    raf(() => raf(fn));
};
export default nextFrame;
