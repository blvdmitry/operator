const isRTL = () => {
  if (typeof document === "undefined") return;

  return (
    window.getComputedStyle(document.body).getPropertyValue("direction") ===
    "rtl"
  );
};

export default isRTL;
