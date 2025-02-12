import React from "react";
import env from "@bookingcom/bui-env-react";
import FormControl from "components/FormControl";

env.test.vrt({
  note: (
    <FormControl label="Field label" helper="Field note">
      {(attrs) => (
        <input {...attrs} style={{ width: "100%", boxSizing: "border-box" }} />
      )}
    </FormControl>
  ),
  error: (
    <FormControl label="Field label" error="Error">
      {(attrs) => (
        <input {...attrs} style={{ width: "100%", boxSizing: "border-box" }} />
      )}
    </FormControl>
  ),
  success: (
    <FormControl label="Field label" success="Success">
      {(attrs) => (
        <input {...attrs} style={{ width: "100%", boxSizing: "border-box" }} />
      )}
    </FormControl>
  ),
  disabled: (
    <FormControl label="Field label" disabled>
      {(attrs) => (
        <input {...attrs} style={{ width: "100%", boxSizing: "border-box" }} />
      )}
    </FormControl>
  ),
  other: (
    <FormControl
      label="Field label"
      subLabel="(optional)"
      required
      labelEndSlot="22/24"
      helper="Field note"
    >
      {(attrs) => (
        <input {...attrs} style={{ width: "100%", boxSizing: "border-box" }} />
      )}
    </FormControl>
  ),
});
