import find from "../find";

describe("helpers/find", () => {
  const items = [
    {
      id: "item-1",
      value: 1,
    },
    {
      id: "item-2",
      value: 2,
    },
    {
      id: "item-3",
      value: 3,
    },
  ];
  it("finds item by id", () => {
    const foundItem = find(items, (item) => item.id === "item-2");
    expect(foundItem).toEqual(items[1]);
  });
  it("finds item by value", () => {
    const foundItem = find(items, (item) => item.value === 3);
    expect(foundItem).toEqual(items[2]);
  });
  it("does not find item", () => {
    const foundItem = find(items, (item) => item.id === "item-5");
    expect(foundItem).toBeUndefined();
  });
});
