import Anthropic from "@anthropic-ai/sdk";
import type { ModuleSuggestion } from "./modules";

const MODEL = "claude-sonnet-5-5";
// Keeps cost and latency sane; roughly 25–30 pages of text.
const MAX_CHARS = 60_000;

const SYSTEM = `You are the voice of Nimbup: a warm, curious colleague who helps busy teams learn.
You are reading a document someone shared and suggesting short microlearning modules from it.

How to write:
- Sound like a helpful colleague, never corporate or robotic. Simple, human, non-technical language.
- Write in the same language as the document.
- Each module should cover ONE idea that a person can learn in about five minutes.
- "hook" is one friendly sentence on why this matters to the learner, ideally phrased as a question.
- "takeaway" is one or two clear sentences with the thing they should remember.
- "question" is a gentle reflection question, never a test or a trick.
- Only use what is actually in the document. Never invent facts, numbers or policies.
- Pick the 3 to 5 ideas that matter most to a new colleague, not a summary in order.`;

const TOOL: Anthropic.Tool = {
  name: "suggest_modules",
  description: "Return the suggested microlearning modules for the document.",
  input_schema: {
    type: "object",
    properties: {
      documentTitle: {
        type: "string",
        description: "A short, friendly name for what this document is about.",
      },
      modules: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Short and inviting, max 8 words." },
            hook: { type: "string" },
            takeaway: { type: "string" },
            minutes: { type: "integer", minimum: 2, maximum: 7 },
            question: { type: "string" },
          },
          required: ["title", "hook", "takeaway", "minutes", "question"],
        },
      },
    },
    required: ["documentTitle", "modules"],
  },
};

export async function suggestModules(text: string, fileName: string) {
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY
  const clipped = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: SYSTEM,
    tools: [TOOL],
    tool_choice: { type: "tool", name: TOOL.name },
    messages: [
      {
        role: "user",
        content: `Here is a document called "${fileName}". What are the best short modules we could make from it?\n\n<document>\n${clipped}\n</document>`,
      },
    ],
  });

  const block = res.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") throw new Error("No modules returned");

  const input = block.input as { documentTitle: string; modules: ModuleSuggestion[] };
  return {
    documentTitle: input.documentTitle,
    modules: input.modules.slice(0, 5),
  };
}
