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

class TrapFocusQueue {
  items: Record<ID, Item> = {};

  tailId: ID | null = null;

  idCounter: ID = 0;

  generateId() {
    this.idCounter += 1;
    return this.idCounter;
  }

  get(id: ID) {
    return this.items[id];
  }

  isLast(id: ID) {
    return this.tailId !== null && id === this.tailId;
  }

  add(data: Pick<Item, "rootEl" | "triggerEl">) {
    const prevId = this.tailId;
    const prevItem = prevId && this.get(prevId);
    const id = this.generateId();

    this.items[id] = { prevId, ...data };

    if (prevItem) prevItem.nextId = id;
    this.tailId = id;
    return id;
  }

  remove(id: ID): Item | undefined {
    const target = this.items[id];

    if (!target) return;

    const previousId = target.prevId;
    const previousItem = previousId && this.get(previousId);
    const nextId = target.nextId;
    const nextItem = nextId && this.get(nextId);

    if (previousItem) previousItem.nextId = target.nextId ?? null;
    if (nextItem) nextItem.prevId = target.prevId ?? null;
    if (!nextId) this.tailId = previousId ?? null;

    const item = this.get(id);
    delete this.items[id];

    return item;
  }

  removeTill(id: ID, condition: (item: Item) => boolean): Item | undefined {
    const target = this.get(id);
    const item = this.remove(id);

    if (!target || !target.prevId) return item;

    const keepIterating = !condition(target);
    if (keepIterating) return this.removeTill(target.prevId, condition);

    return item;
  }
}

export default TrapFocusQueue;
