import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const setup = (node: Parameters<typeof render>[0]) => {
  const user = userEvent.setup({ delay: null });
  const output = render(node);

  return { output, user };
};
