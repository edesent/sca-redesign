import Image from "next/image";
import Link from "next/link";
import { Caveat, Graduate, Open_Sans } from "next/font/google";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  RefreshCw,
} from "lucide-react";

import logo from "../../../public/sca-redesign/logo.png";
import headerLogo from "../../../public/sca-redesign/logo-header.png";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sca-sans",
});

const graduate = Graduate({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sca-display",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sca-script",
});

const DISPLAY = "[font-family:var(--font-sca-display)]";
const SCRIPT = "[font-family:var(--font-sca-script)]";
const CALENDAR_FEED = "https://www.scaeagles.org/gencal.cfm?event_category=All";

export const revalidate = 3600;

export const metadata = {
  title: "Calendar - Springfield Christian Academy",
  description:
    "A live calendar concept for Springfield Christian Academy, populated from the school's existing calendar feed.",
  robots: { index: false, follow: false },
};

type IcsDate = {
  date: Date;
  allDay: boolean;
  hour?: number;
  minute?: number;
};

type CalendarEvent = {
  uid: string;
  title: string;
  description: string;
  location: string;
  start: IcsDate;
  end?: IcsDate;
  rrule?: Record<string, string>;
  exdates: string[];
};

type EventOccurrence = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: IcsDate;
  end?: IcsDate;
  category: "School" | "Athletics" | "Church" | "Office" | "General";
};

export default async function ScaCalendarPage() {
  const today = startOfDayUtc(new Date());
  const rangeEnd = addDays(today, 180);
  const activeMonth = today.getUTCDate() > 20 ? addMonths(startOfMonth(today), 1) : startOfMonth(today);
  const monthDays = buildMonthGrid(activeMonth);
  const allEvents = await getCalendarEvents(today, rangeEnd);
  const agenda = allEvents.slice(0, 28);
  const featured = agenda.slice(0, 3);
  const eventsByDay = groupEventsByDay(allEvents);

  return (
    <main
      className={`${openSans.variable} ${graduate.variable} ${caveat.variable} min-h-screen bg-[#f7f8fa] text-[#27183b] antialiased`}
    >
      <Header />
      <section className="relative overflow-hidden bg-[#27183b] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(253,193,14,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(253,193,14,0.55)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white/70 transition hover:text-[#fdc10e]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back home
            </Link>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fdc10e]">Live school calendar</p>
            <h1 className={`${DISPLAY} mt-4 max-w-4xl text-balance text-5xl leading-[0.95] text-white sm:text-7xl`}>
              What&apos;s coming up at SCA.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              This page pulls from Springfield Christian Academy&apos;s existing calendar feed, then presents it as a clean family-facing month view and agenda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`webcal://www.scaeagles.org/gencal.cfm?event_category=All`}
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#fdc10e] px-5 text-sm font-black uppercase tracking-[0.1em] text-[#27183b] transition hover:bg-white"
              >
                Subscribe
                <ExternalLink className="size-4" aria-hidden />
              </a>
              <a
                href={CALENDAR_FEED}
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/25 bg-white/8 px-5 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-[#27183b]"
              >
                Feed
                <RefreshCw className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <aside className="border border-white/15 bg-white/8 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <Image src={logo} alt="" className="h-auto w-28 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]" />
              <span className={`${SCRIPT} text-right text-3xl text-[#fdc10e]`}>Synced events</span>
            </div>
            <div className="mt-5 space-y-3">
              {featured.length > 0 ? (
                featured.map((event) => <FeatureEvent key={event.id} event={event} />)
              ) : (
                <p className="text-sm leading-6 text-white/68">No upcoming events were found in the current feed.</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div className="rounded-sm border border-[#d8dde6] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a37b02]">Month view</p>
                <h2 className={`${DISPLAY} mt-2 text-3xl text-[#27183b] sm:text-4xl`}>{monthLabel(activeMonth)}</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#6b6965]">
                Events refresh from SCA&apos;s feed every hour in production.
              </p>
            </div>
            <div className="grid grid-cols-7 border-y border-l border-[#d8dde6] text-center text-[11px] font-black uppercase tracking-[0.13em] text-[#a37b02]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="border-r border-[#d8dde6] bg-[#f7f8fa] py-3">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 border-l border-[#d8dde6]">
              {monthDays.map((day) => {
                const dayEvents = eventsByDay.get(dayKey(day)) ?? [];
                const muted = day.getUTCMonth() !== activeMonth.getUTCMonth();
                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-28 border-b border-r border-[#d8dde6] p-2 sm:min-h-36 sm:p-3 ${
                      muted ? "bg-[#f7f8fa] text-[#9e9c98]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className={`${DISPLAY} text-lg ${sameDay(day, today) ? "text-[#d6a102]" : "text-[#27183b]"}`}>
                        {day.getUTCDate()}
                      </span>
                      {sameDay(day, today) ? (
                        <span className="rounded-sm bg-[#fdc10e] px-1.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#27183b]">
                          Today
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="truncate rounded-sm bg-[#27183b] px-2 py-1.5 text-[11px] font-bold leading-4 text-white"
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 ? (
                        <div className="text-[11px] font-bold text-[#a37b02]">+{dayEvents.length - 3} more</div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-sm border border-[#d8dde6] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <CalendarDays className="size-6 text-[#d6a102]" aria-hidden />
                <h2 className={`${DISPLAY} text-3xl text-[#27183b]`}>Upcoming</h2>
              </div>
              <div className="mt-6 space-y-3">
                {agenda.map((event) => (
                  <AgendaEvent key={event.id} event={event} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#27183b]/92 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-5 px-4 sm:h-28 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 lg:min-w-[390px] lg:flex-none">
          <span className="relative grid h-20 w-24 shrink-0 place-items-center p-0 drop-shadow-[0_16px_24px_rgba(0,0,0,0.34)] sm:h-24 sm:w-28">
            <Image src={headerLogo} alt="Springfield Christian Academy Eagles logo" className="h-auto w-full" priority />
          </span>
        </Link>

        <a
          href="https://www.scaeagles.org/calendar"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#fdc10e] px-4 text-sm font-black uppercase tracking-[0.08em] text-[#27183b] shadow-[0_10px_25px_rgba(0,0,0,0.22)] transition hover:bg-white"
        >
          <span className="hidden min-[430px]:inline">Original</span>
          <ChevronRight className="size-4" aria-hidden />
        </a>
      </div>
    </header>
  );
}

function FeatureEvent({ event }: { event: EventOccurrence }) {
  return (
    <div className="bg-white/8 p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#fdc10e]">{shortDate(event.start.date)}</p>
      <h3 className="mt-2 font-extrabold leading-6 text-white">{event.title}</h3>
      <p className="mt-2 text-sm text-white/62">{eventTime(event)}</p>
    </div>
  );
}

function AgendaEvent({ event }: { event: EventOccurrence }) {
  return (
    <article className="rounded-sm border border-[#d8dde6] bg-[#f7f8fa] p-4">
      <div className="flex gap-4">
        <div className="w-16 shrink-0 rounded-sm bg-[#27183b] p-2 text-center text-white">
          <div className="text-[11px] font-black uppercase tracking-[0.13em] text-[#fdc10e]">
            {monthShort(event.start.date)}
          </div>
          <div className={`${DISPLAY} mt-1 text-2xl`}>{event.start.date.getUTCDate()}</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-[#fdc10e] px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#27183b]">
              {event.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6b6965]">
              <Clock className="size-3.5" aria-hidden />
              {eventTime(event)}
            </span>
          </div>
          <h3 className="mt-3 font-extrabold leading-6 text-[#27183b]">{event.title}</h3>
          {event.location ? (
            <p className="mt-2 flex gap-2 text-sm leading-6 text-[#6b6965]">
              <MapPin className="mt-1 size-4 shrink-0 text-[#a37b02]" aria-hidden />
              {event.location}
            </p>
          ) : null}
          {event.description ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6b6965]">{event.description}</p> : null}
        </div>
      </div>
    </article>
  );
}

async function getCalendarEvents(start: Date, end: Date): Promise<EventOccurrence[]> {
  try {
    const response = await fetch(CALENDAR_FEED, {
      next: { revalidate },
      headers: { "User-Agent": "Mozilla/5.0 SCA calendar redesign concept" },
    });

    if (!response.ok) {
      return [];
    }

    const ics = await response.text();
    return expandEvents(parseIcs(ics), start, end)
      .filter((event) => overlaps(event.start.date, event.end?.date, start, end))
      .sort((a, b) => a.start.date.getTime() - b.start.date.getTime() || a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

function parseIcs(ics: string): CalendarEvent[] {
  const unfolded = ics
    .replace(/\r\n/g, "\n")
    .split("\n")
    .reduce<string[]>((lines, line) => {
      if (/^[ \t]/.test(line) && lines.length > 0) {
        lines[lines.length - 1] += line.slice(1);
      } else {
        lines.push(line);
      }
      return lines;
    }, []);

  const events: CalendarEvent[] = [];
  let current: Partial<CalendarEvent> | null = null;

  for (const line of unfolded) {
    if (line === "BEGIN:VEVENT") {
      current = { exdates: [] };
      continue;
    }
    if (line === "END:VEVENT") {
      if (current?.start && current.title) {
        events.push({
          uid: current.uid ?? `${current.title}-${current.start.date.toISOString()}`,
          title: current.title,
          description: current.description ?? "",
          location: current.location ?? "",
          start: current.start,
          end: current.end,
          rrule: current.rrule,
          exdates: current.exdates ?? [],
        });
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const parsed = parseLine(line);
    if (!parsed) continue;

    if (parsed.name === "UID") current.uid = parsed.value;
    if (parsed.name === "SUMMARY") current.title = decodeIcsText(parsed.value);
    if (parsed.name === "DESCRIPTION") current.description = cleanDescription(decodeIcsText(parsed.value));
    if (parsed.name === "LOCATION") current.location = decodeIcsText(parsed.value);
    if (parsed.name === "DTSTART") current.start = parseIcsDate(parsed.value, parsed.params);
    if (parsed.name === "DTEND") current.end = parseIcsDate(parsed.value, parsed.params);
    if (parsed.name === "RRULE") current.rrule = parseRule(parsed.value);
    if (parsed.name === "EXDATE") {
      current.exdates = [
        ...(current.exdates ?? []),
        ...parsed.value.split(",").map((value) => dayKey(parseIcsDate(value, parsed.params).date)),
      ];
    }
  }

  return events;
}

function parseLine(line: string) {
  const colon = line.indexOf(":");
  if (colon === -1) return null;
  const left = line.slice(0, colon);
  const value = line.slice(colon + 1);
  const [name, ...paramParts] = left.split(";");
  const params = Object.fromEntries(
    paramParts.map((part) => {
      const [key, val = ""] = part.split("=");
      return [key, val];
    }),
  );
  return { name, params, value };
}

function parseIcsDate(value: string, params: Record<string, string>): IcsDate {
  const allDay = params.VALUE === "DATE" || /^\d{8}$/.test(value);
  const match = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?/);
  if (!match) {
    return { date: new Date(), allDay: true };
  }
  const [, yyyy, mm, dd, hh = "12", min = "00"] = match;
  const hour = allDay ? undefined : Number(hh);
  const minute = allDay ? undefined : Number(min);
  return {
    date: new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd), hour ?? 12, minute ?? 0)),
    allDay,
    hour,
    minute,
  };
}

function parseRule(value: string) {
  return Object.fromEntries(
    value
      .replace(/;$/, "")
      .split(";")
      .map((part) => {
        const [key, val = ""] = part.split("=");
        return [key, val];
      }),
  );
}

function expandEvents(events: CalendarEvent[], start: Date, end: Date): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];

  for (const event of events) {
    const duration = event.end ? event.end.date.getTime() - event.start.date.getTime() : 0;
    const push = (occurrenceStart: IcsDate, index: number) => {
      if (event.exdates.includes(dayKey(occurrenceStart.date))) return;
      const occurrenceEnd = event.end
        ? { ...event.end, date: new Date(occurrenceStart.date.getTime() + duration) }
        : undefined;
      occurrences.push({
        id: `${event.uid}-${index}-${occurrenceStart.date.toISOString()}`,
        title: event.title,
        description: event.description,
        location: event.location,
        start: occurrenceStart,
        end: occurrenceEnd,
        category: categorize(event.title),
      });
    };

    if (!event.rrule) {
      push(event.start, 0);
      continue;
    }

    if (event.rrule.FREQ === "YEARLY") {
      const byMonth = Number(event.rrule.BYMONTH) || event.start.date.getUTCMonth() + 1;
      const byDay = Number(event.rrule.BYMONTHDAY) || event.start.date.getUTCDate();
      for (let year = start.getUTCFullYear(); year <= end.getUTCFullYear(); year += 1) {
        push({ ...event.start, date: withDateParts(event.start, year, byMonth - 1, byDay) }, year);
      }
      continue;
    }

    if (event.rrule.FREQ === "WEEKLY") {
      const weekdays = (event.rrule.BYDAY ?? weekdayCode(event.start.date)).split(",");
      const until = event.rrule.UNTIL ? parseIcsDate(event.rrule.UNTIL, {}).date : end;
      const countLimit = event.rrule.COUNT ? Number(event.rrule.COUNT) : Infinity;
      let cursor = startOfDayUtc(event.start.date);
      let seen = 0;
      let index = 0;

      while (cursor <= end && cursor <= until && seen < countLimit) {
        if (cursor >= startOfDayUtc(event.start.date) && weekdays.includes(weekdayCode(cursor))) {
          seen += 1;
          const occurrenceStart = {
            ...event.start,
            date: new Date(
              Date.UTC(
                cursor.getUTCFullYear(),
                cursor.getUTCMonth(),
                cursor.getUTCDate(),
                event.start.hour ?? 12,
                event.start.minute ?? 0,
              ),
            ),
          };
          push(occurrenceStart, index);
          index += 1;
        }
        cursor = addDays(cursor, 1);
      }
    }
  }

  return occurrences;
}

function categorize(title: string): EventOccurrence["category"] {
  const lower = title.toLowerCase();
  if (/game|sport|soccer|basketball|baseball|golf|athletic|tourney|playoff/.test(lower)) return "Athletics";
  if (/dixie|awana|church|easter|christmas eve|sunday|cantata/.test(lower)) return "Church";
  if (/office|closed/.test(lower)) return "Office";
  if (/school|grade|graduation|exam|conference|spirit|homecoming|teacher|portrait|camp|open house/.test(lower)) return "School";
  return "General";
}

function buildMonthGrid(month: Date) {
  const first = startOfMonth(month);
  const gridStart = addDays(first, -first.getUTCDay());
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function groupEventsByDay(events: EventOccurrence[]) {
  const map = new Map<string, EventOccurrence[]>();
  for (const event of events) {
    const key = dayKey(event.start.date);
    map.set(key, [...(map.get(key) ?? []), event]);
  }
  return map;
}

function eventTime(event: EventOccurrence) {
  if (event.start.allDay) {
    if (event.end && !sameDay(event.start.date, addDays(event.end.date, -1))) {
      return `${shortDate(event.start.date)} - ${shortDate(addDays(event.end.date, -1))}`;
    }
    return "All day";
  }
  return `${timeLabel(event.start.hour ?? 0, event.start.minute ?? 0)}${event.end && !event.end.allDay ? ` - ${timeLabel(event.end.hour ?? 0, event.end.minute ?? 0)}` : ""}`;
}

function timeLabel(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function monthLabel(date: Date) {
  return `${date.toLocaleString("en-US", { month: "long", timeZone: "UTC" })} ${date.getUTCFullYear()}`;
}

function monthShort(date: Date) {
  return date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
}

function shortDate(date: Date) {
  return `${monthShort(date)} ${date.getUTCDate()}`;
}

function cleanDescription(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeIcsText(value: string) {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function withDateParts(source: IcsDate, year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day, source.hour ?? 12, source.minute ?? 0));
}

function overlaps(start: Date, end: Date | undefined, rangeStart: Date, rangeEnd: Date) {
  const actualEnd = end ?? start;
  return actualEnd >= rangeStart && start <= rangeEnd;
}

function sameDay(a: Date, b: Date) {
  return dayKey(a) === dayKey(b);
}

function dayKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function weekdayCode(date: Date) {
  return ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][date.getUTCDay()];
}

function startOfDayUtc(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function addMonths(date: Date, months: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
}
