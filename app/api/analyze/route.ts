import { NextResponse } from "next/server";
import { suggestModules } from "@/lib/analyze";
import { detectKind, extractFromFile } from "@/lib/extract-text";
import type { AnalyzeResponse } from "@/lib/modules";

export const runtime = "nodejs";
export const maxDuration = 60;

// Vercel request bodies cap at 4.5 MB, so stay just under it.
const MAX_BYTES = 4 * 1024 * 1024;

function fail(message: string, status: number) {
  return NextResponse.json<AnalyzeResponse>({ ok: false, message }, { status });
}

export async function POST(req: Request) {
  let file: File | null = null;
  try {
    const form = await req.formData();
    const entry = form.get("file");
    file = entry instanceof File ? entry : null;
  } catch {
    return fail("I couldn't open that upload. Would you mind trying once more?", 400);
  }

  if (!file) return fail("I didn't catch a file there. Want to try again?", 400);

  const kind = detectKind(file);
  if (!kind) {
    return fail("I can read PDF and Word (.docx) files for now. Could you try one of those?", 415);
  }
  if (file.size > MAX_BYTES) {
    return fail("That one's a bit big for me right now. Could you try a file under 4 MB?", 413);
  }

  let text: string;
  try {
    text = await extractFromFile(file, kind);
  } catch {
    return fail("I had trouble opening that file. Is it password-protected, maybe?", 422);
  }

  if (text.length < 200) {
    return fail(
      "I couldn't find much text in there. Is it a scanned document? I can only read typed text for now.",
      422
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return fail("I'm not quite set up to think yet. My team needs to add an API key first.", 503);
  }

  try {
    const result = await suggestModules(text, file.name);
    return NextResponse.json<AnalyzeResponse>({ ok: true, ...result });
  } catch (err) {
    console.error("analyze failed", err);
    return fail("That one stumped me. Want to give it another go?", 502);
  }
}
