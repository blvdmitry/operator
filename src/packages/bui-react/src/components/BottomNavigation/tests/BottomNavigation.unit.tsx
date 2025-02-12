import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import { KettleIcon } from "@bookingcom/bui-assets-react/streamline";
import BottomNavigation from "components/BottomNavigation";

describe("BottomNavigation", () => {
  test("renders BottomNavigation", () => {
    const testId = "test-bui-bottom-nav-1";
    const bottomNavClassName = "bottom-nav-classname";
    const items = [
      {
        id: "item-1",
        icon: KettleIcon,
        text: "Label 1",
        ariaLabel: "item 1 aria label",
      },
      {
        id: "item-2",
        icon: KettleIcon,
        text: "Label 2",
        notificationValue: true,
        notificationAriaLabel: "item 2 bubble aria label",
        ariaLabel: "item 2 aria label",
      },
      {
        id: "item-3",
        avatar: {
          icon: KettleIcon,
        },
        text: "Avatar",
        ariaLabel: "item 3 aria label",
      },
    ];

    setup(
      <BottomNavigation
        items={items}
        selectedId="item-2"
        onItemChoose={(item) => console.log(item)}
        attributes={{ "data-testid": testId }}
        className={bottomNavClassName}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveClass(bottomNavClassName);
    expect(screen.getAllByRole("button")).toHaveLength(items.length);
    items.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
      if (item.notificationAriaLabel) {
        expect(
          screen.getByLabelText(item.notificationAriaLabel)
        ).toBeInTheDocument();
      }
      if (item.ariaLabel) {
        expect(screen.getByLabelText(item.ariaLabel)).toBeInTheDocument();
      }
    });
  });
});
