let hiddenTextarea: HTMLTextAreaElement | undefined;

const HIDDEN_STYLE = `
  height: 0;
  visibility: hidden;
  overflow: hidden;
  position: absolute;
  z-index: -1000;
  top: 0;
  right: 0;
`;

const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "box-sizing",
];

type NodeStyle = {
  contextStyle: string;
  paddingSize: number;
};

type TextAreaHeight = {
  height: string;
  minHeight?: string;
};

function calculateNodeStyling(targetElement: Element): NodeStyle {
  const style = window.getComputedStyle(targetElement);

  const paddingSize =
    Number.parseFloat(style.getPropertyValue("padding-bottom")) +
    Number.parseFloat(style.getPropertyValue("padding-top"));

  const contextStyle = CONTEXT_STYLE.map(
    (name) => `${name}:${style.getPropertyValue(name)}`
  ).join(";");

  return { contextStyle, paddingSize };
}

function calculateTextareaHeight(
  targetElement: HTMLTextAreaElement,
  minRows = 2,
  maxRows?: number
): TextAreaHeight {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }

  const { paddingSize, contextStyle } = calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";

  let height = hiddenTextarea.scrollHeight;
  const result = {} as TextAreaHeight;

  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (typeof minRows === "number") {
    const minHeight = singleRowHeight * minRows + paddingSize;
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }

  if (typeof maxRows === "number") {
    const maxHeight = singleRowHeight * maxRows + paddingSize;
    height = Math.min(maxHeight, height);
  }

  result.height = `${height}px`;
  hiddenTextarea.parentNode?.removeChild(hiddenTextarea);
  hiddenTextarea = undefined;

  return result;
}

export default calculateTextareaHeight;
