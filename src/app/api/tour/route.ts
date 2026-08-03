import { sendToSlack } from "../../../lib/slack-form";

// "Request a Tour" (see `src/components/TourForm.tsx`) → the school's Slack
// channel, so the office sees a family's interest while it's still warm.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this; real families never see it. Pretend it worked.
  if (body.botcheck) return Response.json({ success: true });

  const text = (key: string, max = 300) => String(body[key] ?? "").trim().slice(0, max);

  const name = text("name", 120);
  const email = text("email", 160);
  const phone = text("phone", 40);
  const grade = text("grade", 80);
  const timing = text("timing", 80);
  const message = text("message", 1500);

  if (!name || !email || !grade) {
    return Response.json(
      { error: "Please fill in your name, email, and your student's grade." },
      { status: 400 }
    );
  }

  const result = await sendToSlack({
    subject: "🎓 A family requested a campus tour",
    name,
    contact: phone ? `${email} · ${phone}` : email,
    fields: [
      ["Grade for next year", grade],
      ["Best time to visit", timing],
    ],
    message,
  });

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ success: true });
}
