import Image from "next/image";
import Link from "next/link";
import { Caveat, Graduate, Open_Sans } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import campus from "../../../public/sca-redesign/campus-hero-enhanced.jpg";
import headerLogo from "../../../public/sca-redesign/logo-header.png";
import logo from "../../../public/sca-redesign/logo.png";

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
  title: "Staff - Springfield Christian Academy",
  description:
    "A photo-forward faculty and staff page concept for Springfield Christian Academy.",
  robots: { index: false, follow: false },
};

const STAFF = [
  {
    name: "Mr. Patrick Wagner",
    role: "Principal | HS Educator",
    group: "Leadership",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0155.jpg",
  },
  {
    name: "Mr. Jim Adams",
    role: "Vice Principal | Athletic Director | HS Educator",
    group: "Leadership",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0002.jpg",
  },
  {
    name: "Mrs. Anna Fleck",
    role: "SCA Administrative Assistant",
    group: "Office",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/img_0381.jpg",
  },
  {
    name: "Mrs. Kim Clark",
    role: "School Secretary",
    group: "Office",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0026.jpg",
  },
  {
    name: "Miss Heather Vanaman",
    role: "Director: The Children's Ark",
    group: "Early Childhood",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/heather_vanaman.jpg",
  },
  {
    name: "Miss Jennifer McKenna",
    role: "Ark: Assistant Director",
    group: "Early Childhood",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/jennifer_mckenna.jpg",
  },
  {
    name: "Mrs. Carol Rinehart",
    role: "1st Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0130.jpg",
  },
  {
    name: "Mrs. LouAnn Holzer",
    role: "2nd Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0082.jpg",
  },
  {
    name: "Mrs. Rebecca Rowan",
    role: "2nd Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0135.jpg",
  },
  {
    name: "Mrs. Nancy Grant",
    role: "3rd Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0057.jpg",
  },
  {
    name: "Mrs. Tina McClaran",
    role: "4th Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0110.jpg",
  },
  {
    name: "Miss. Abigail Molina",
    role: "5th Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/molina_abigail.jpg",
  },
  {
    name: "Mrs. Rory Adams",
    role: "6th Grade Teacher",
    group: "Elementary",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0004.jpg",
  },
  {
    name: "Mrs. Angela Fleck",
    role: "Elementary Music",
    group: "Fine Arts",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0046.jpg",
  },
  {
    name: "Mrs. Annie Allen",
    role: "Elementary Physical Education",
    group: "Student Life",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/allen_annie.jpg",
  },
  {
    name: "Mrs. Julie Jackman",
    role: "JH History Educator",
    group: "Junior High",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0087.jpg",
  },
  {
    name: "Mrs. Rebecca Harless",
    role: "JH Mathematics | JH & SH Art | JH & SH Physical Education",
    group: "Junior/Senior High",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0072.jpg",
  },
  {
    name: "Mr. Jason McClaran",
    role: "CAD Fusion Educator | Robotics",
    group: "Robotics",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0109.jpg",
  },
  {
    name: "Mr. Kevin Moore",
    role: "JH/SH Educator",
    group: "Junior/Senior High",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0119.jpg",
  },
  {
    name: "Mrs. Laurie Moore",
    role: "JH/SH Science Educator",
    group: "Junior/Senior High",
    image: "https://faithconnector.s3.amazonaws.com/1562/images/member/0118.jpg",
  },
  {
    name: "Mrs. Dyanna Papsdorf",
    role: "JH & SH English | Speech Educator | Yearbook Advisor",
    group: "Junior/Senior High",
  },
];

const GROUPS = Array.from(new Set(STAFF.map((person) => person.group)));

export default function ScaStaffPage() {
  const leadership = STAFF.filter((person) => person.group === "Leadership");
  const staff = STAFF.filter((person) => person.group !== "Leadership");

  return (
    <main
      className={`${openSans.variable} ${graduate.variable} ${caveat.variable} min-h-screen bg-[#f7f8fa] text-[#27183b] antialiased`}
    >
      <Header />
      <section className="relative overflow-hidden bg-[#27183b] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
        <Image
          src={campus}
          alt="Springfield Christian Academy campus"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center opacity-38"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,24,59,0.96)_0%,rgba(39,24,59,0.8)_48%,rgba(39,24,59,0.48)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_390px]">
          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white/70 transition hover:text-[#fdc10e]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back home
            </Link>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fdc10e]">Faculty and Staff</p>
            <h1 className={`${DISPLAY} mt-4 max-w-4xl text-balance text-5xl leading-[0.95] text-white sm:text-7xl`}>
              Meet the people shaping life at SCA.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              A warmer, photo-forward staff page that gives families a fast sense of leadership, classroom care, and the people behind the school day.
            </p>
          </div>

          <aside className="self-end border border-white/15 bg-white/8 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <Image src={logo} alt="" className="h-auto w-28 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]" />
              <span className={`${SCRIPT} text-right text-3xl text-[#fdc10e]`}>Known by name</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-px">
              <Stat value={STAFF.length.toString()} label="Staff profiles" />
              <Stat value={GROUPS.length.toString()} label="Team areas" />
              <Stat value="6w-12" label="Students served" />
              <Stat value="1972" label="Founded" />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-2">
            {leadership.map((person) => (
              <StaffCard key={person.name} person={person} featured />
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a37b02]">Directory</p>
              <h2 className={`${DISPLAY} mt-3 text-4xl leading-tight text-[#27183b] sm:text-6xl`}>Faculty and Staff</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {GROUPS.map((group) => (
                <span key={group} className="rounded-sm border border-[#d8dde6] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.13em] text-[#27183b]">
                  {group}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {staff.map((person) => (
              <StaffCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#27183b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fdc10e]">Connect</p>
            <h2 className={`${DISPLAY} mt-4 text-4xl leading-tight sm:text-6xl`}>Questions for the office?</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/72">
              Keep the page practical with clear parent actions at the bottom of the staff directory.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Action href="tel:+12486259760" icon={Phone} label="Call" text="248-625-9760" />
            <Action href="/calendar" icon={CalendarDays} label="Calendar" text="View upcoming events" />
            <Action href="/#contact" icon={MapPin} label="Visit" text="8585 Dixie Highway" />
          </div>
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

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Staff page navigation">
          <Link href="/" className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.14em] text-white/78 transition hover:text-[#fdc10e]">
            Home
          </Link>
          <Link href="/calendar" className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.14em] text-white/78 transition hover:text-[#fdc10e]">
            Calendar
          </Link>
          <Link href="/staff" className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#fdc10e]">
            Staff
          </Link>
        </nav>

        <a
          href="https://www.scaeagles.org/staff"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#fdc10e] px-4 text-sm font-black uppercase tracking-[0.08em] text-[#27183b] shadow-[0_10px_25px_rgba(0,0,0,0.22)] transition hover:bg-white"
        >
          <span className="hidden min-[430px]:inline">Original</span>
          <ChevronRight className="size-4" aria-hidden />
        </a>
      </div>
    </header>
  );
}

function StaffCard({ person, featured = false }: { person: (typeof STAFF)[number]; featured?: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-sm border border-[#d8dde6] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d6a102] hover:shadow-[0_18px_42px_rgba(39,24,59,0.14)] ${
        featured ? "grid sm:grid-cols-[190px_1fr]" : ""
      }`}
    >
      <div className={`relative bg-[#27183b] ${featured ? "min-h-64 sm:min-h-full" : "aspect-[4/5]"}`}>
        {person.image ? (
          <Image
            src={person.image}
            alt={`${person.name}, ${person.role}`}
            fill
            sizes={featured ? "(min-width: 1024px) 260px, 50vw" : "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-80 items-center justify-center bg-[linear-gradient(135deg,#27183b,#4a2c72)] p-8">
            <Image src={logo} alt="" className="h-auto w-36 opacity-80 drop-shadow-xl" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(39,24,59,0.9),rgba(39,24,59,0))] p-4">
          <span className="rounded-sm bg-[#fdc10e] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#27183b]">
            {person.group}
          </span>
        </div>
      </div>
      <div className={featured ? "p-6 sm:p-7" : "p-5"}>
        <h3 className={`${DISPLAY} text-2xl leading-tight text-[#27183b] ${featured ? "sm:text-4xl" : ""}`}>{person.name}</h3>
        <p className="mt-3 text-sm font-bold leading-6 text-[#6b6965]">{person.role}</p>
        <div className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.13em] text-[#a37b02]">
          <ShieldCheck className="size-4" aria-hidden />
          Springfield Christian Academy
        </div>
      </div>
    </article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/8 p-4">
      <div className={`${DISPLAY} text-2xl text-[#fdc10e]`}>{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/68">{label}</div>
    </div>
  );
}

function Action({
  href,
  icon: Icon,
  label,
  text,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  text: string;
}) {
  return (
    <Link href={href} className="rounded-sm border border-white/12 bg-white/7 p-5 transition hover:bg-white/12">
      <Icon className="size-6 text-[#fdc10e]" aria-hidden />
      <span className="mt-5 block text-sm font-extrabold uppercase tracking-[0.14em] text-white/60">{label}</span>
      <span className="mt-2 block text-sm leading-6 text-white">{text}</span>
      <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#fdc10e]">
        Open
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}
