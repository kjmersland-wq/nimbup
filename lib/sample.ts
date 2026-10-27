import type { ModuleSuggestion } from "./modules";

/** A ready-made result, so people can see the outcome without uploading anything. */
export const SAMPLE_FILE = { name: "Acme-welcome-guide.pdf", size: 184_320 };

export const SAMPLE_RESULT: { documentTitle: string; modules: ModuleSuggestion[] } = {
  documentTitle: "Welcome to Acme",
  modules: [
    {
      title: "Choosing your office days",
      hook: "Ever wondered how flexible remote work really is?",
      takeaway:
        "You can work from home up to three days a week. Just let your manager know which days you plan to be in.",
      minutes: 4,
      question: "Which days would work best for you?",
    },
    {
      title: "Keeping your expenses tidy",
      hook: "What happens to a receipt you forget about?",
      takeaway: "Submit receipts within 30 days through the finance portal, so nothing slips away.",
      minutes: 3,
      question: "Where do you usually keep your receipts?",
    },
    {
      title: "Staying safe on public wifi",
      hook: "Would you notice if something looked a little off?",
      takeaway:
        "Always use the company VPN on public wifi, and tell the security team about anything suspicious straight away.",
      minutes: 5,
      question: "What would you do if an email felt strange?",
    },
    {
      title: "Who to ask when you're stuck",
      hook: "Who would you turn to on a tricky day?",
      takeaway: "Your manager is the first stop. For tools and access, the IT desk is happy to help.",
      minutes: 2,
      question: "Who is one person you could ask this week?",
    },
  ],
};
