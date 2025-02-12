/**
 * Utility to keep track of the trigger elements that caused trapFocus and the trapped areas root elements
 * This queue lets us return the focus back to the original trigger at every step of releasing the focus
 * In case previous element no longer exists, we traverse the queue backwards until we find one
 *
 * Example:
 * Button open a dropdown menu on click, dropdown menu item opens a sheet and closes dropdown menu
 * Closing the sheet - should return the focuse to the original button
 */
type ID = number;
type Item = {
    prevId?: ID | null;
    nextId?: ID | null;
    rootEl: HTMLElement;
    triggerEl: HTMLButtonElement | HTMLInputElement;
};
declare class TrapFocusQueue {
    items: Record<ID, Item>;
    tailId: ID | null;
    idCounter: ID;
    generateId(): number;
    get(id: ID): Item;
    isLast(id: ID): boolean;
    add(data: Pick<Item, "rootEl" | "triggerEl">): number;
    remove(id: ID): Item | undefined;
    removeTill(id: ID, condition: (item: Item) => boolean): Item | undefined;
}
export default TrapFocusQueue;
