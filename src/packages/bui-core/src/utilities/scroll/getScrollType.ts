// Issue with scrollLeft in rtl can be found here https://github.com/othree/jquery.rtl-scroll-type
let cachedScrollType: "reverse" | "default" | "negative";

const getScrollType = () => {
  if (cachedScrollType) return cachedScrollType;

  const dummy = window.document.createElement("div");

  dummy.appendChild(document.createTextNode("DUMMY"));
  dummy.dir = "rtl";
  dummy.style.width = "4px";
  dummy.style.height = "1px";
  dummy.style.position = "absolute";
  dummy.style.top = "-1000px";
  dummy.style.overflow = "scroll";

  document.body.appendChild(dummy);

  cachedScrollType = "reverse";

  if (dummy.scrollLeft > 0) {
    cachedScrollType = "default";
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft < 1) {
      cachedScrollType = "negative";
    }
  }

  document.body.removeChild(dummy);
  return cachedScrollType;
};

export default getScrollType;
