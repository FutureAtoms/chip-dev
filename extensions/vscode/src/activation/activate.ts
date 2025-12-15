import { getContinueRcPath, getTsConfigPath } from "core/util/paths";
import { Telemetry } from "core/util/posthog";
import * as vscode from "vscode";

import { VsCodeExtension } from "../extension/VsCodeExtension";
import { getExtensionVersion, isUnsupportedPlatform } from "../util/util";

import { GlobalContext } from "core/util/GlobalContext";
import { VsCodeContinueApi } from "./api";
import setupInlineTips from "./InlineTipManager";

export async function activateExtension(context: vscode.ExtensionContext) {
  const platformCheck = isUnsupportedPlatform();
  const globalContext = new GlobalContext();
  const hasShownUnsupportedPlatformWarning = globalContext.get(
    "hasShownUnsupportedPlatformWarning",
  );

  if (platformCheck.isUnsupported && !hasShownUnsupportedPlatformWarning) {
    const platformTarget = "windows-arm64";

    globalContext.update("hasShownUnsupportedPlatformWarning", true);
    void vscode.window.showInformationMessage(
      `Continue detected that you are using ${platformTarget}. Due to native dependencies, Continue may not be able to start`,
    );

    void Telemetry.capture(
      "unsupported_platform_activation_attempt",
      {
        platform: platformTarget,
        extensionVersion: getExtensionVersion(),
        reason: platformCheck.reason,
      },
      true,
    );
  }

  // Add necessary files
  getTsConfigPath();
  getContinueRcPath();

  // Register commands and providers
  setupInlineTips(context);

  const vscodeExtension = new VsCodeExtension(context);

  // Load Continue configuration
  if (!context.globalState.get("hasBeenInstalled")) {
    void context.globalState.update("hasBeenInstalled", true);
    void Telemetry.capture(
      "install",
      {
        extensionVersion: getExtensionVersion(),
      },
      true,
    );
  }

  // Ensure Chip view opens in auxiliary bar (secondary sidebar) on startup
  // This uses global state to track if we've already positioned the view,
  // so we only force placement on first activation (respects user preference after)
  const hasPositionedChipView = context.globalState.get<boolean>("chip.hasPositionedInAuxiliaryBar");

  if (!hasPositionedChipView) {
    // First-time setup: ensure Chip opens in secondary sidebar
    // Use multiple attempts with increasing delays to handle VS Code's async layout
    const positionChipView = async (attempt: number = 1) => {
      try {
        // First, make the auxiliary bar visible
        await vscode.commands.executeCommand("workbench.action.toggleAuxiliaryBar");
        // Small delay to let VS Code process
        await new Promise(resolve => setTimeout(resolve, 100));
        // Focus the auxiliary bar
        await vscode.commands.executeCommand("workbench.action.focusAuxiliaryBar");
        // Focus the Chip view specifically
        await vscode.commands.executeCommand("chip.chipGUIView.focus");

        // Mark as positioned so we don't override user preference in future
        await context.globalState.update("chip.hasPositionedInAuxiliaryBar", true);

        console.log("[Chip] Successfully positioned view in secondary sidebar");
      } catch (e) {
        // If first attempts fail, retry with longer delays
        if (attempt < 3) {
          setTimeout(() => positionChipView(attempt + 1), 500 * attempt);
        } else {
          console.warn("[Chip] Could not auto-position view in secondary sidebar:", e);
        }
      }
    };

    // Start positioning after VS Code has fully initialized (1 second delay)
    setTimeout(() => positionChipView(), 1000);
  } else {
    // User has already had Chip positioned once - just focus it if auxiliary bar is visible
    setTimeout(async () => {
      try {
        await vscode.commands.executeCommand("chip.chipGUIView.focus");
      } catch {
        // View may not be visible, that's fine
      }
    }, 500);
  }

  // Register config.yaml schema by removing old entries and adding new one (uri.fsPath changes with each version)
  const yamlMatcher = ".continue/**/*.yaml";
  const yamlConfig = vscode.workspace.getConfiguration("yaml");

  const newPath = vscode.Uri.joinPath(
    context.extension.extensionUri,
    "config-yaml-schema.json",
  ).toString();

  try {
    await yamlConfig.update(
      "schemas",
      { [newPath]: [yamlMatcher] },
      vscode.ConfigurationTarget.Global,
    );
  } catch (error) {
    console.error(
      "Failed to register Continue config.yaml schema, most likely, YAML extension is not installed",
      error,
    );
  }

  const api = new VsCodeContinueApi(vscodeExtension);
  const continuePublicApi = {
    registerCustomContextProvider: api.registerCustomContextProvider.bind(api),
  };

  // 'export' public api-surface
  // or entire extension for testing
  return process.env.NODE_ENV === "test"
    ? {
        ...continuePublicApi,
        extension: vscodeExtension,
      }
    : continuePublicApi;
}
