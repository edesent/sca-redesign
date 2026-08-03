"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

// The "Request a Tour" form in the homepage's `#tour` section. It posts to
// `/api/tour`, which forwards it into the school's Slack channel — the same
// place the chat bubble's messages land.
//
// To change the questions, edit GRADES and TIMES below. To change where it
// goes, edit `src/app/api/tour/route.ts`.

const GRADES = [
  "The Children's Ark (6 weeks - 3 years)",
  "Preschool / Pre-K",
  "Kindergarten",
  "1st - 2nd grade",
  "3rd - 5th grade",
  "6th - 8th grade",
  "9th - 10th grade",
  "11th - 12th grade",
  "More than one student",
];

const TIMES = [
  "A weekday morning",
  "A weekday afternoon",
  "Whenever works for you",
];

const DISPLAY = "[font-family:var(--font-sca-display)]";

const labelClass =
  "mb-2 block text-xs font-black uppercase tracking-[0.14em] text-white/62";

const fieldClass =
  "h-12 w-full rounded-sm border border-white/18 bg-white px-4 text-[15px] text-[#27183b] outline-none transition placeholder:text-[#9a97a4] focus:border-[#fdc10e] focus:ring-2 focus:ring-[#fdc10e]/40";

export default function TourForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    try {
      const response = await fetch("/api/tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          grade: value("grade"),
          timing: value("timing"),
          message: value("message"),
          botcheck: value("botcheck"),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-white/15 bg-white/8 p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-sm bg-[#fdc10e] text-[#27183b]">
          <Check className="size-7" aria-hidden />
        </span>
        <h3 className={`${DISPLAY} mt-6 text-3xl text-white`}>Thank you — we have it.</h3>
        <p className="mt-4 text-[15px] leading-7 text-white/72">
          Someone from the school office will reach out shortly to set a time that
          works for your family. If you&apos;d rather talk now, call{" "}
          <a href="tel:+12486259760" className="font-bold text-[#fdc10e] hover:underline">
            248-625-9760
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-sm border border-white/15 bg-white/8 p-6 backdrop-blur-sm sm:p-8"
    >
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tour-name" className={labelClass}>
            Parent or guardian
          </label>
          <input
            id="tour-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="First and last name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="tour-email" className={labelClass}>
            Email
          </label>
          <input
            id="tour-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tour-phone" className={labelClass}>
            Phone <span className="font-bold normal-case tracking-normal text-white/45">(optional)</span>
          </label>
          <input
            id="tour-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="248-555-0100"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="tour-grade" className={labelClass}>
            Grade for next year
          </label>
          <select id="tour-grade" name="grade" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a grade…
            </option>
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tour-timing" className={labelClass}>
          Best time to visit
        </label>
        <select id="tour-timing" name="timing" defaultValue={TIMES[2]} className={fieldClass}>
          {TIMES.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tour-message" className={labelClass}>
          Anything you&apos;d like us to know{" "}
          <span className="font-bold normal-case tracking-normal text-white/45">(optional)</span>
        </label>
        <textarea
          id="tour-message"
          name="message"
          rows={4}
          placeholder="Questions about tuition, athletics, the robotics team, moving mid-year — whatever is on your mind."
          className={`${fieldClass} h-auto resize-none py-3 leading-7`}
        />
      </div>

      {error && (
        <p className="rounded-sm border border-[#fdc10e]/40 bg-[#fdc10e]/12 px-4 py-3 text-sm font-bold text-[#fdc10e]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#fdc10e] px-6 text-sm font-black uppercase tracking-[0.1em] text-[#27183b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request a Tour"}
          {status !== "sending" && <ArrowRight className="size-4" aria-hidden />}
        </button>
        <p className="text-xs leading-5 text-white/50">
          No obligation. We&apos;ll never share your information.
        </p>
      </div>
    </form>
  );
}
