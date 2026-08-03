import Image from "next/image";
import Link from "next/link";
import { Caveat, Graduate, Open_Sans } from "next/font/google";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  GraduationCap,
  MapPin,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";

import SiteHeader from "../components/SiteHeader";
import StaffMarquee from "../components/StaffMarquee";
import logo from "../../public/sca-redesign/logo.png";
import campus from "../../public/sca-redesign/campus-hero-enhanced.jpg";
import lockers from "../../public/sca-redesign/excellence-bg.jpg";
import elementary from "../../public/sca-redesign/elementary.png";
import middleSchool from "../../public/sca-redesign/middle-school.png";
import highSchool from "../../public/sca-redesign/high-school.png";
import chapel from "../../public/sca-redesign/chapel.png";
import patrickWagner from "../../public/sca-redesign/staff/patrick-wagner.jpg";

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

export const metadata = {
  title: "Springfield Christian Academy - Redesign Concept",
  description:
    "A modern website concept for Springfield Christian Academy in Clarkston, Michigan, preserving the SCA Eagles purple, gold, and school identity.",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  {
    label: "Parent Portal",
    text: "Track progress and receive important school updates.",
    href: "https://sca-mi.client.renweb.com/pwr/",
  },
  {
    label: "Inquire",
    text: "Ask a question, schedule a conversation, or start exploring SCA.",
    href: "https://sca-mi.client.renweb.com/oa/inquiry.cfm?memberId=2461&districtCode=sca-mi",
  },
  {
    label: "Apply",
    text: "Ready to become an SCA Eagle? Begin the application.",
    href: "https://accounts.renweb.com/Account/Login",
  },
];

const DISTINCTIVES = [
  "Christ-centered philosophy",
  "Bible-based curriculum",
  "Established in 1972",
  "College preparatory program",
  "Pre-School - 12th grade classes",
  "40 acre scenic campus",
];

const ACADEMICS = [
  {
    title: "Elementary",
    kicker: "Strong foundations",
    image: elementary,
    points: ["Phonics-based reading", "Caring classrooms", "Music and physical education"],
  },
  {
    title: "Middle School",
    kicker: "Confidence for the next step",
    image: middleSchool,
    points: ["Junior high choir", "Band for grades 5-8", "History, math, art, and science"],
  },
  {
    title: "High School",
    kicker: "Prepared for what comes next",
    image: highSchool,
    points: ["AP level courses", "College trips", "Speech, yearbook, and fine arts"],
  },
  {
    title: "Chapel",
    kicker: "A life worth living",
    image: chapel,
    points: ["Regular chapel services", "Biblical worldview", "Student activities and service"],
  },
];

const STATS = [
  { value: "1972", label: "Year founded" },
  { value: "40", label: "Acre campus" },
  { value: "6w-12", label: "Children served" },
  { value: "50%", label: "Tuition support underwritten" },
];

const LIFE = [
  "Junior and senior high camp",
  "Homecoming and Spirit Week",
  "Fine arts competition",
  "Varsity and junior high sports",
  "Track and Field Day",
  "FRC Springfield Robotics Team",
];

const EVENTS = [
  ["Aug 24-28", "Staff In-Service"],
  ["Aug 31", "First Day of School"],
  ["Dec 24", "Christmas Eve Service"],
  ["Feb 14", "Valentine's Day"],
];

/** The "Message from the Principal" video section. Swap `videoId` for the id
 *  in a YouTube link (the part after `v=`) to change the video. */
const PRINCIPAL = {
  name: "Mr. Patrick Wagner",
  role: "Principal | HS Educator",
  videoId: "iOFASa6ipgc",
  title: "Take a few minutes and meet our principal.",
  text: "Before you tour the campus or fill out a single form, hear it in his own words: what a year at SCA actually looks like, what the staff is aiming for in every classroom and chapel service, and why families across Clarkston and Oakland County keep choosing this school.",
};

export default function ScaRedesignPage() {
  return (
    <main
      className={`${openSans.variable} ${graduate.variable} ${caveat.variable} min-h-screen bg-[#f7f8fa] text-[#27183b] antialiased`}
    >
      <SiteHeader />
      <Hero />
      <QuickLinks />
      <Academics />
      <PrincipalMessage />
      <Story />
      <Life />
      <Admissions />
      <Staff />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-[#27183b] pt-32 sm:pt-36">
      <Image
        src={campus}
        alt="Students gathered outside Springfield Christian Academy"
        fill
        priority
        sizes="100vw"
        quality={95}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,24,59,0.94)_0%,rgba(39,24,59,0.76)_38%,rgba(39,24,59,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(0deg,#f7f8fa_0%,rgba(247,248,250,0)_100%)]" />

      <div className="relative mx-auto grid w-[calc(100%-2rem)] max-w-7xl gap-10 pb-14 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] lg:grid-cols-[1fr_360px]">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-sm border border-white/20 bg-white/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#fdc10e] backdrop-blur">
            <Sparkles className="size-4" aria-hidden />
            Clarkston, Michigan
          </div>
          <h1 className={`${DISPLAY} text-balance text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl`}>
            Offering a Life Worth Living.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
            A Christ-centered academy helping students grow in wisdom, character, confidence, and academic strength from the earliest years through high school.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#admissions"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#fdc10e] px-5 text-sm font-black uppercase tracking-[0.1em] text-[#27183b] transition hover:bg-white"
            >
              Schedule a Tour
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="tel:+12486259760"
              className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/25 bg-white/10 px-5 text-sm font-black uppercase tracking-[0.1em] text-white backdrop-blur transition hover:bg-white hover:text-[#27183b]"
            >
              <Phone className="size-4" aria-hidden />
              Call SCA
            </a>
          </div>
        </div>

        <div className="self-end border border-white/18 bg-[#27183b]/82 p-5 text-white shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
            <Image src={logo} alt="" className="h-auto w-24 drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]" />
            <span className={`${SCRIPT} text-right text-3xl text-[#fdc10e]`}>SCA Eagles</span>
          </div>
          <div className="grid grid-cols-2 gap-px pt-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white/8 p-4">
                <div className={`${DISPLAY} text-2xl text-[#fdc10e]`}>{stat.value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/68">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="relative z-10 -mt-5 px-4 sm:px-6 lg:px-8" aria-label="Quick actions">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3">
        {QUICK_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex min-h-32 items-center justify-between gap-5 rounded-sm border border-[#d8dde6] bg-white p-5 shadow-[0_18px_40px_rgba(39,24,59,0.12)] transition hover:-translate-y-1 hover:border-[#d6a102]"
          >
            <span>
              <span className={`${DISPLAY} block text-xl text-[#27183b]`}>{item.label}</span>
              <span className="mt-2 block text-sm leading-6 text-[#5e5c59]">{item.text}</span>
            </span>
            <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-[#27183b] text-[#fdc10e] transition group-hover:bg-[#fdc10e] group-hover:text-[#27183b]">
              <ArrowRight className="size-5" aria-hidden />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Academics() {
  return (
    <section id="academics" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Academics"
          title="A school path that feels personal, spirited, and serious."
          text="SCA pairs rigorous classroom expectations with teachers who know the students in front of them. The redesign brings each program forward with clear next steps for parents."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ACADEMICS.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-sm border border-[#d8dde6] bg-white">
              <div className="bg-[#27183b]">
                <Image
                  src={item.image}
                  alt={`${item.title} at Springfield Christian Academy`}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a37b02]">{item.kicker}</p>
                <h3 className={`${DISPLAY} mt-2 text-2xl text-[#27183b]`}>{item.title}</h3>
                <ul className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#5e5c59]">
                      <Check className="mt-1 size-4 shrink-0 text-[#d6a102]" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="bg-[#27183b] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src={lockers}
            alt="Bright school lockers"
            className="aspect-[4/3] w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 bg-[#27183b]/88 p-5">
            <p className={`${SCRIPT} text-4xl text-[#fdc10e]`}>Cultivating a brighter tomorrow</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fdc10e]">History and philosophy</p>
          <h2 className={`${DISPLAY} mt-4 text-4xl leading-tight sm:text-6xl`}>
            Rooted since 1972. Built for families right now.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/78">
            Springfield Christian Academy began when Dr. Paul Vanaman and Dixie Baptist Church followed a calling toward Christian education. Today the school and The Children&apos;s Ark serve children from 6 weeks through twelfth grade with a unified, Bible-based approach.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {DISTINCTIVES.map((item) => (
              <div key={item} className="flex items-center gap-3 border border-white/12 bg-white/7 p-4">
                <ShieldCheck className="size-5 shrink-0 text-[#fdc10e]" aria-hidden />
                <span className="text-sm font-bold text-white/86">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Life() {
  return (
    <section id="life" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[420px_1fr]">
        <div>
          <SectionIntro
            eyebrow="Student Life"
            title="More than classes on a schedule."
            text="Fine arts, athletics, chapel, camps, robotics, and traditions give students room to discover gifts and learn faithfulness in public."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {["Purple", "Gold", "Eagles", "Robotics", "Fine Arts", "Athletics"].map((chip) => (
              <span key={chip} className="rounded-sm border border-[#d8dde6] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.13em] text-[#27183b]">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {LIFE.map((item, index) => {
            const Icon = [Trophy, UsersRound, Sparkles, GraduationCap, CalendarDays, BookOpen][index];
            return (
              <div key={item} className="rounded-sm border border-[#d8dde6] bg-white p-6 shadow-sm">
                <Icon className="size-7 text-[#d6a102]" aria-hidden />
                <h3 className="mt-5 text-lg font-extrabold text-[#27183b]">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6b6965]">
                  Presented as a living part of campus culture, with clear photos, dates, and parent-friendly details.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Admissions() {
  return (
    <section id="admissions" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-sm border border-[#d8dde6] lg:grid-cols-[1fr_0.85fr]">
          <div className="bg-[#27183b] p-8 text-white sm:p-10 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fdc10e]">Admissions</p>
            <h2 className={`${DISPLAY} mt-4 text-4xl leading-tight sm:text-6xl`}>A New Adventure Awaits.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Tuition and financial aid should be easy to understand. The new admissions section gives families one path for touring, applying, reviewing FACTS, and downloading the school calendar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://sca-mi.client.renweb.com/oa/inquiry.cfm?memberId=2461&districtCode=sca-mi"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#fdc10e] px-5 text-sm font-black uppercase tracking-[0.1em] text-[#27183b] transition hover:bg-white"
              >
                Request Info
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="https://online.factsmgt.com/signin/3YRH9"
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/25 px-5 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-[#27183b]"
              >
                FACTS Login
              </a>
            </div>
          </div>
          <div className="bg-[#f7f8fa] p-8 sm:p-10 lg:p-14">
            <h3 className={`${DISPLAY} text-3xl text-[#27183b]`}>Upcoming dates</h3>
            <div className="mt-7 space-y-3">
              {EVENTS.map(([date, event]) => (
                <div key={event} className="flex items-center gap-4 border-b border-[#d8dde6] pb-3 last:border-0">
                  <div className={`${DISPLAY} w-24 shrink-0 text-xl text-[#a37b02]`}>{date}</div>
                  <div className="font-extrabold text-[#27183b]">{event}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-[#6b6965]">
              SCA partners with FACTS Grant and Aid for financial aid evaluation, while Dixie Baptist Church underwrites nearly half of tuition costs for each child.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Staff() {
  return (
    <section id="staff" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Faculty and Staff"
          title="Experienced people, easier to meet."
          text="The current staff page has strong information. The full redesign turns it into a polished, photo-forward directory with roles parents can understand quickly."
        />
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <StaffMarquee />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mt-10">
          <Link
            href="/staff"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#27183b] px-5 text-sm font-black uppercase tracking-[0.1em] text-[#fdc10e] transition hover:bg-[#fdc10e] hover:text-[#27183b]"
          >
            Meet the Whole Team
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="bg-[#150d20] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Image src={logo} alt="Springfield Christian Academy Eagles logo" className="h-auto w-52 max-w-[72vw] drop-shadow-[0_14px_26px_rgba(0,0,0,0.38)] sm:w-60" />
          <h2 className={`${DISPLAY} mt-8 text-4xl leading-tight text-white`}>Springfield Christian Academy</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/68">
            Personal education. Lifelong success. A cleaner digital front door for families in Clarkston and Oakland County.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <a href="https://maps.google.com/?q=8585+Dixie+Highway,+Clarkston,+MI+48348" className="rounded-sm border border-white/12 bg-white/7 p-5 transition hover:bg-white/12">
              <MapPin className="size-6 text-[#fdc10e]" aria-hidden />
              <span className="mt-5 block text-sm font-extrabold uppercase tracking-[0.14em] text-white/60">Visit</span>
              <span className="mt-2 block text-sm leading-6 text-white">8585 Dixie Highway, Clarkston, MI 48348</span>
            </a>
            <a href="tel:+12486259760" className="rounded-sm border border-white/12 bg-white/7 p-5 transition hover:bg-white/12">
              <Phone className="size-6 text-[#fdc10e]" aria-hidden />
              <span className="mt-5 block text-sm font-extrabold uppercase tracking-[0.14em] text-white/60">Call</span>
              <span className="mt-2 block text-sm leading-6 text-white">248-625-9760</span>
            </a>
            <a href="https://www.facebook.com/scaeagles.org/" className="rounded-sm border border-white/12 bg-white/7 p-5 transition hover:bg-white/12">
              <UsersRound className="size-6 text-[#fdc10e]" aria-hidden />
              <span className="mt-5 block text-sm font-extrabold uppercase tracking-[0.14em] text-white/60">Connect</span>
              <span className="mt-2 block text-sm leading-6 text-white">Follow SCA updates on Facebook</span>
            </a>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-sm border border-white/12 bg-[#27183b] shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
            <iframe
              title="Map to Springfield Christian Academy"
              src="https://www.google.com/maps?q=8585%20Dixie%20Highway%2C%20Clarkston%2C%20MI%2048348&output=embed"
              className="absolute inset-0 h-full w-full scale-[1.02] border-0 opacity-95 [filter:saturate(0.82)_brightness(0.62)_contrast(1.08)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(21,13,32,0.36)_0%,rgba(39,24,59,0.14)_52%,rgba(253,193,14,0.08)_100%)]" />
            <a
              href="https://maps.google.com/?q=8585+Dixie+Highway,+Clarkston,+MI+48348"
              className="absolute bottom-4 left-4 inline-flex h-11 items-center gap-2 rounded-sm bg-[#fdc10e] px-4 text-sm font-black uppercase tracking-[0.1em] text-[#27183b] shadow-lg transition hover:bg-white"
            >
              Open Map
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a37b02]">{eyebrow}</p>
      <h2 className={`${DISPLAY} mt-4 text-balance text-4xl leading-tight text-[#27183b] sm:text-6xl`}>{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#5e5c59]">{text}</p>
    </div>
  );
}
