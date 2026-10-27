export type ModuleSuggestion = {
  title: string;
  hook: string;
  takeaway: string;
  minutes: number;
  question: string;
};

export type AnalyzeResponse =
  | { ok: true; documentTitle: string; modules: ModuleSuggestion[] }
  | { ok: false; message: string };
