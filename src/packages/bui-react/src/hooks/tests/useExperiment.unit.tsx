import React from "react";
import { render, screen } from "@testing-library/react";
import BUIProvider from "components/BUIProvider";
import useExperiment from "hooks/useExperiment";
import TravellerTheme from "themes/traveller";

const experimentName = "test_experiment" as const;
const onLabel = "on";
const offLabel = "off";

const Component = () => {
  const isExperiment = useExperiment(experimentName);

  return <div>{isExperiment() ? onLabel : offLabel}</div>;
};

describe("useExperiment", () => {
  test("triggers an experiment", () => {
    render(
      <BUIProvider
        theme={TravellerTheme}
        experiments={{ [experimentName]: () => true }}
      >
        <Component />
      </BUIProvider>
    );

    expect(screen.getByText(onLabel)).toBeInTheDocument();
  });
});
