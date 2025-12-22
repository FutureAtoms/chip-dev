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
  // Always attempt to position correctly - this ensures Chip stays in the right place
  // even if the user's workspace state gets corrupted
  const positionChipView = async (attempt: number = 1) => {
    try {
      // Check if auxiliary bar is currently visible
      const auxiliaryBarConfig = vscode.workspace.getConfiguration("workbench");
      const isAuxiliaryBarVisible = auxiliaryBarConfig.get<boolean>("auxiliaryBar.visible");

      console.log(`[Chip] Positioning view (attempt ${attempt}), auxiliary bar visible: ${isAuxiliaryBarVisible}`);

      // If auxiliary bar is NOT visible, show it (toggle will show it)
      // If it IS visible, don't toggle (that would hide it!)
      if (!isAuxiliaryBarVisible) {
        console.log("[Chip] Showing auxiliary bar...");
        await vscode.commands.executeCommand("workbench.action.toggleAuxiliaryBar");
        // Wait for the bar to appear
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Now focus the auxiliary bar to ensure it's active
      await vscode.commands.executeCommand("workbench.action.focusAuxiliaryBar");
      await new Promise(resolve => setTimeout(resolve, 100));

      // Focus the Chip view specifically
      await vscode.commands.executeCommand("chip.chipGUIView.focus");
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log("[Chip] Successfully positioned view in auxiliary bar");
    } catch (e) {
      console.warn(`[Chip] Error positioning view (attempt ${attempt}):`, e);

      // Retry with exponential backoff for first few attempts
      if (attempt < 3) {
        const delay = 500 * attempt;
        console.log(`[Chip] Retrying in ${delay}ms...`);
        setTimeout(() => positionChipView(attempt + 1), delay);
      } else {
        console.error("[Chip] Failed to position view in auxiliary bar after 3 attempts");
        void vscode.window.showInformationMessage(
          "Chip: Unable to auto-position in secondary sidebar. You can manually move it by right-clicking the Chip panel header and selecting 'Move View...' → 'Secondary Side Bar'",
        );
      }
    }
  };

  // Start positioning after VS Code has fully initialized
  // Use 1.5 second delay to ensure all views are registered
  setTimeout(() => positionChipView(), 1500);

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
