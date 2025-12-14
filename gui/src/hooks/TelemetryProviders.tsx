import { PropsWithChildren } from "react";

/**
 * Telemetry wrapper component
 *
 * Note: Telemetry has been disabled for the Chip integration with ChipOS.
 * This component simply renders its children without any telemetry providers.
 */
const TelemetryProviders = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default TelemetryProviders;
