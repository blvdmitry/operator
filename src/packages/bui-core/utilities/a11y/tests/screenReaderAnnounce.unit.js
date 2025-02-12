import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { screenReaderAnnounce } from "../screenReader";
const text = "LoremIpsum";
test("Triggering the screenReaderAnnounce method will add an element to the DOM", async () => {
    screenReaderAnnounce(text, "polite");
    // we wait for a bit to make sure that the elem is added to the DOM
    await new Promise((r) => setTimeout(r, 100));
    const elem = screen.getByText(text);
    expect(elem).toBeInTheDocument();
});
test("The screenReaderAnnounce method will remove the text after a second has passed", async () => {
    screenReaderAnnounce(text, "polite");
    // we wait for a bit to make sure that the elem is removed from the DOM
    await new Promise((r) => setTimeout(r, 1100));
    const elem = screen.queryByText(text);
    expect(elem).not.toBeInTheDocument();
});
test("The screenReaderAnnounce method should create the div with the correct attributes to be picked up by the SR", async () => {
    screenReaderAnnounce(text, "assertive");
    // we wait for a bit to make sure that the elem is added to the DOM
    await new Promise((r) => setTimeout(r, 100));
    const elem = screen.getByText(text);
    expect(elem).toHaveAttribute("aria-live", "assertive");
    expect(elem).toHaveAttribute("aria-role", "alert");
    expect(elem).toHaveStyle(`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `);
});
