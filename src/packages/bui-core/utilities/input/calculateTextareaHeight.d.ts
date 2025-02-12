type TextAreaHeight = {
    height: string;
    minHeight?: string;
};
declare function calculateTextareaHeight(targetElement: HTMLTextAreaElement, minRows?: number, maxRows?: number): TextAreaHeight;
export default calculateTextareaHeight;
