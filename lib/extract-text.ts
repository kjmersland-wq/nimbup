import { extractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

export type SupportedKind = "pdf" | "docx";

export function detectKind(file: File): SupportedKind | null {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  if (
    name.endsWith(".docx") ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  return null;
}

export async function extractFromFile(file: File, kind: SupportedKind) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (kind === "pdf") {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    return text.trim();
  }

  const { value } = await mammoth.extractRawText({ buffer });
  return value.trim();
}
