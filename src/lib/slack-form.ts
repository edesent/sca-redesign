// Deliver a website form into the school's Slack channel through the WBC Chat
// backend — the same connection the chat bubble in `src/app/layout.tsx` uses.
//
// Why Slack and not email: this path needs no API key and no verified sending
// domain, so it works the day it ships, and it reaches the office's phones in
// seconds instead of an inbox someone checks on Fridays.

const CHAT = {
  origin: "https://slackwebsitechat.vercel.app",
  apiKey: "wbc_7c0d8ba06143c6163f1cfd7870f0207f47aedbacb1d043b0",
};

const FAILURE =
  "Sorry, that didn't send. Please try again, or call the school office at 248-625-9760.";

type SendResult = { ok: true } | { ok: false; status: number; error: string };

export interface SlackFormPayload {
  /** Bold headline in Slack, e.g. "🎓 Tour request". */
  subject: string;
  name: string;
  /** Email, or "email · phone" — whatever the office should reply to. */
  contact: string;
  /** Label/value pairs printed above the message, in order. */
  fields?: [string, string][];
  /** The family's own words. */
  message?: string;
}

export async function sendToSlack(payload: SlackFormPayload): Promise<SendResult> {
  const lines = [
    ...(payload.fields ?? [])
      .filter(([, value]) => value)
      .map(([label, value]) => `*${label.replace(/\s*\?$/, "")}:* ${value}`),
    ...(payload.message ? ["", payload.message] : []),
  ];

  try {
    const response = await fetch(`${CHAT.origin}/api/chat/contact-form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: CHAT.apiKey,
        subject: payload.subject,
        name: payload.name,
        contact: payload.contact,
        // The backend rejects an empty message.
        message: lines.join("\n").trim() || "No extra details given.",
      }),
    });

    if (!response.ok) {
      console.error("Slack form failed:", response.status, await response.text());
      return { ok: false, status: 502, error: FAILURE };
    }
  } catch (error) {
    console.error("Slack form error:", error);
    return { ok: false, status: 502, error: FAILURE };
  }

  return { ok: true };
}
