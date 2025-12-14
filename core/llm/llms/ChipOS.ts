import { LLMOptions } from "../../index.js";
import OpenAI from "./OpenAI.js";

/**
 * ChipOS LLM Provider
 * Routes requests through the ChipOS backend at localhost:8181
 * Supports provider/model format for routing to different providers
 */
class ChipOS extends OpenAI {
  static providerName = "chipos";
  static defaultOptions: Partial<LLMOptions> = {
    apiBase: "http://localhost:8181/v1/",
  };

  constructor(options: LLMOptions) {
    super({
      ...options,
      apiBase: options.apiBase ?? "http://localhost:8181/v1/",
    });
  }

  static modelSupportsImages(model: string): boolean {
    // ChipOS routes to various providers, delegate to the underlying model
    const modelLower = model.toLowerCase();
    return (
      modelLower.includes("vision") ||
      modelLower.includes("gpt-4") ||
      modelLower.includes("claude-3") ||
      modelLower.includes("gemini")
    );
  }
}

export default ChipOS;
