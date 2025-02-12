import React from "react";
import env from "@bookingcom/bui-env-react";
import Grid from "components/Grid";

env.test.vrt({
  default: (
    <Grid>
      <Grid.Column size={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={3} offset={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  small: (
    <Grid size="small">
      <Grid.Column size={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={3} offset={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  multiline: (
    <Grid>
      <Grid.Column size={8}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={4}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={5}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={7}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  multilineWithMedia: (
    <Grid>
      <Grid.Column sizeLarge={8}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={6} sizeLarge={4}>
        <div style={{ background: "#2f2f2f", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={6} sizeLarge={5}>
        <div style={{ background: "#bdc3c7", height: 100 }} />
      </Grid.Column>
      <Grid.Column sizeLarge={7}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  customColumns: (
    <Grid columns={9}>
      <Grid.Column size={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={3} offset={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={3}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  bleed: (
    <Grid bleed>
      <Grid.Column size={6}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={6}>
        <div style={{ background: "#bdc3c7", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  reversed: (
    <Grid reversed>
      <Grid.Column size={6}>
        <div style={{ background: "#f3f3f3", height: 100, padding: 10 }}>
          Column one
        </div>
      </Grid.Column>
      <Grid.Column size={6}>
        <div style={{ background: "#bdc3c7", height: 100, padding: 10 }}>
          Column two
        </div>
      </Grid.Column>
    </Grid>
  ),
  alignCenter: (
    <Grid align="center">
      <Grid.Column size={6}>
        <div style={{ background: "#f3f3f3", height: 50 }} />
      </Grid.Column>
      <Grid.Column size={6}>
        <div style={{ background: "#bdc3c7", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  alignEnd: (
    <Grid align="end">
      <Grid.Column size={6}>
        <div style={{ background: "#f3f3f3", height: 50 }} />
      </Grid.Column>
      <Grid.Column size={6}>
        <div style={{ background: "#bdc3c7", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  justifyCenter: (
    <Grid justify="center">
      <Grid.Column size={4}>
        <div style={{ background: "#f3f3f3", height: 100 }} />
      </Grid.Column>
      <Grid.Column size={4}>
        <div style={{ background: "#bdc3c7", height: 100 }} />
      </Grid.Column>
    </Grid>
  ),
  alignSpecificChild: (
    <Grid>
      <Grid.Column align="center" size={4}>
        <div style={{ background: "#f3f3f3", height: 40 }} />
      </Grid.Column>
      <Grid.Column align="end" size={4}>
        <div style={{ background: "#bdc3c7", height: 80 }} />
      </Grid.Column>
      <Grid.Column size={4}>
        <div style={{ background: "#bdc3c7", height: 120 }} />
      </Grid.Column>
    </Grid>
  ),
  offestAuto: (
    <Grid>
      <Grid.Column size={4}>
        <div style={{ background: "#f3f3f3", height: 40 }} />
      </Grid.Column>
      <Grid.Column size={4}>
        <div style={{ background: "#bdc3c7", height: 80 }} />
      </Grid.Column>
      <Grid.Column size={4} offset="auto">
        <div style={{ background: "#bdc3c7", height: 120 }} />
      </Grid.Column>
    </Grid>
  ),
  responsive: {
    component: (
      <Grid reversed gap={{ s: 6, m: 8 }}>
        <Grid.Column size={{ s: 12, m: 4 }}>
          <div
            style={{
              border: "1px solid var(--bui_color_border_alt)",
              height: 100,
            }}
          />
        </Grid.Column>
        <Grid.Column size={{ s: 12, m: 8 }}>
          <div
            style={{
              background: "var(--bui_color_background_alt)",
              height: 100,
            }}
          />
        </Grid.Column>
      </Grid>
    ),
    viewports: ["small", "medium"],
  },
});
