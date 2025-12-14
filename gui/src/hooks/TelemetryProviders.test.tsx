import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TelemetryProviders from "./TelemetryProviders";

/**
 * TelemetryProviders tests
 *
 * Note: Telemetry has been disabled for the Chip integration with ChipOS.
 * These tests verify that the component correctly renders children without telemetry.
 */
describe("TelemetryProviders", () => {
  it("should render children without telemetry", () => {
    render(
      <TelemetryProviders>
        <div data-testid="child">Test Child</div>
      </TelemetryProviders>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should not throw when rendering", () => {
    // Since telemetry is disabled, this test just verifies
    // that rendering doesn't throw any errors
    expect(() =>
      render(
        <TelemetryProviders>
          <div>Content</div>
        </TelemetryProviders>
      )
    ).not.toThrow();
  });
});
