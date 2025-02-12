import React from "react";
import env from "@bookingcom/bui-env-react";
import ActionBar from "components/ActionBar";
import SheetContainer from "components/SheetContainer";
import Placeholder from "components/Placeholder";

env.test.vrt({
  bottom: {
    component: (
      <SheetContainer active closeAriaLabel="Close drawer">
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  bottomWithTitle: {
    component: (
      <SheetContainer
        active
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  bottomWithFooter: {
    component: (
      <SheetContainer
        active
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  start: {
    component: (
      <SheetContainer active position="start" closeAriaLabel="Close drawer">
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  startWithTitle: {
    component: (
      <SheetContainer
        active
        position="start"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  startWithFooter: {
    component: (
      <SheetContainer
        active
        position="start"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  end: {
    component: (
      <SheetContainer active position="end" closeAriaLabel="Close drawer">
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  endWithTitle: {
    component: (
      <SheetContainer
        active
        position="end"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  endWithFooter: {
    component: (
      <SheetContainer
        active
        position="end"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  center: {
    component: (
      <SheetContainer active position="center" closeAriaLabel="Close drawer">
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  centerWithTitle: {
    component: (
      <SheetContainer
        active
        position="center"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  centerWithFooter: {
    component: (
      <SheetContainer
        active
        position="center"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  fullScreen: {
    component: (
      <SheetContainer
        active
        position="fullScreen"
        closeAriaLabel="Close drawer"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  fullScreenWithTitle: {
    component: (
      <SheetContainer
        active
        position="fullScreen"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  fullScreenWithFooter: {
    component: (
      <SheetContainer
        active
        position="fullScreen"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  fullScreenWithFullHeightContent: {
    component: (
      <SheetContainer
        active
        position="fullScreen"
        closeAriaLabel="Close drawer"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <div
          style={{
            background: "tomato",
            height: "3000px",
            maxHeight: "100%",
            border: "4px solid",
          }}
        />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  footerWithContentOverflow: {
    component: (
      <SheetContainer
        active
        position="start"
        closeAriaLabel="Close drawer"
        title="Title"
        subtitle="Subtitle"
        footer={<ActionBar button={{ text: "Book Now" }} />}
      >
        <Placeholder height="3000px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  responsive: {
    component: (
      <SheetContainer
        active
        position={{ s: "bottom", m: "center", l: "fullScreen" }}
        size="large"
        closeAriaLabel="Close modal"
        title="Title"
        subtitle="Subtitle"
      >
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    viewports: ["small", "medium", "large"],
    capture: "viewport",
  },
  hideClose: {
    component: (
      <SheetContainer active position="bottom" hideClose closeAriaLabel="">
        <Placeholder height="150px" />
      </SheetContainer>
    ),
    capture: "viewport",
  },
  noOverlay: {
    component: (
      <>
        <Placeholder height="1000px" />
        <SheetContainer
          active
          size={600}
          position="bottom"
          closeAriaLabel="Close modal"
          title="Title"
          subtitle="Subtitle"
          hideOverlay
        >
          <Placeholder />
        </SheetContainer>
      </>
    ),
    capture: "viewport",
  },
  overflowHidden: {
    component: (
      <SheetContainer
        active
        size={300}
        position="bottom"
        closeAriaLabel="Close modal"
        overflow="hidden"
      >
        <div
          style={{
            background: "tomato",
            position: "absolute",
            top: -100,
            height: 200,
            width: "50%",
          }}
        />
      </SheetContainer>
    ),
    capture: "viewport",
  },
});
