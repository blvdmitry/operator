import React from "react";
import { waitFor, screen } from "@testing-library/react";
import { setup } from "tools/jest";
import BUIProvider from "components/BUIProvider";
import useRTL from "hooks/useRTL";

beforeEach(() => {
  document.documentElement.removeAttribute("dir");
});

describe("BUIProvider", () => {
  it("applies dir=rtl", async () => {
    setup(<BUIProvider defaultRTL />);

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("dir", "rtl");
    });
  });

  it("applies dir=ltr", async () => {
    setup(<BUIProvider defaultRTL={false} />);

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("dir", "ltr");
    });
  });

  it("doesn't apply dir", async () => {
    setup(<BUIProvider />);

    waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute("dir");
    });
  });

  it("applies dir from the first provider", async () => {
    setup(
      <>
        <BUIProvider defaultRTL />
        <BUIProvider defaultRTL={false} />
      </>
    );

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("dir", "rtl");
    });
  });

  it("applies dir from the first provider with defined defaultRTL", async () => {
    document.documentElement.setAttribute("dir", "auto");

    setup(
      <>
        <BUIProvider />
        <BUIProvider defaultRTL />
      </>
    );

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("dir", "rtl");
    });
  });

  it("keeps dir from body", async () => {
    const Test = () => {
      const [rtl] = useRTL();
      return <div data-rtl={rtl} data-testid="rtl" />;
    };

    document.documentElement.setAttribute("dir", "rtl");
    setup(
      <BUIProvider defaultRTL={false}>
        <Test />
      </BUIProvider>
    );

    const el = screen.getByTestId("rtl");

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("dir", "rtl");
      expect(el).toHaveAttribute("data-rtl", "true");
    });
  });

  it("overrides dir on body", async () => {
    const Test = () => {
      const [rtl] = useRTL();
      return <div data-rtl={rtl} data-testid="rtl" />;
    };

    document.documentElement.setAttribute("dir", "ltr");
    setup(
      <BUIProvider defaultRTL>
        <Test />
      </BUIProvider>
    );

    const el = screen.getByTestId("rtl");

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("dir", "rtl");
      expect(el).toHaveAttribute("data-rtl", "true");
    });
  });
});
