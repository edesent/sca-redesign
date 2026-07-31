"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

import headerLogo from "../../public/sca-redesign/logo-header.png";

/** One nav list for the whole site. Section links are written `/#id` so they
 *  work from the subpages as well as from the homepage. */
const NAV = [
  { href: "/#academics", label: "Academics" },
  { href: "/calendar", label: "Calendar" },
  { href: "/#life", label: "Student Life" },
  { href: "/#admissions", label: "Admissions" },
  { href: "/staff", label: "Staff" },
  { href: "/#contact", label: "Contact" },
];

type Cta = { href: string; label: string };

const DEFAULT_CTA: Cta = { href: "/#admissions", label: "Visit" };

export default function SiteHeader({ cta = DEFAULT_CTA }: { cta?: Cta }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the panel on navigation, and while the viewport is wide enough for
  // the full nav (so resizing mid-menu can't leave an orphaned overlay).
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => href.startsWith("/#") === false && pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#27183b]/92 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-5 px-4 sm:h-28 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="relative grid h-20 w-24 shrink-0 place-items-center drop-shadow-[0_16px_24px_rgba(0,0,0,0.34)] sm:h-24 sm:w-28">
            <Image
              src={headerLogo}
              alt="Springfield Christian Academy Eagles logo"
              className="h-auto w-full"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Primary navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.14em] transition hover:text-[#fdc10e] ${
                isCurrent(item.href) ? "text-[#fdc10e]" : "text-white/78"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={cta.href}
            aria-label={cta.label}
            className="inline-flex h-11 w-12 items-center justify-center gap-1.5 rounded-sm bg-[#fdc10e] px-0 text-sm font-black uppercase tracking-[0.08em] text-[#27183b] shadow-[0_10px_25px_rgba(0,0,0,0.22)] transition hover:bg-white min-[360px]:w-auto min-[360px]:px-3 sm:gap-2 sm:px-4"
          >
            <span className="hidden min-[360px]:inline">{cta.label}</span>
            <ChevronRight className="size-4" aria-hidden />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="sca-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-sm border border-white/25 bg-white/10 text-white transition hover:bg-[#fdc10e] hover:text-[#27183b] lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="sca-mobile-nav"
        hidden={!open}
        className="max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-white/15 bg-[#27183b] lg:hidden"
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`flex items-center justify-between gap-4 border-b border-white/10 py-4 text-sm font-extrabold uppercase tracking-[0.14em] transition last:border-b-0 hover:text-[#fdc10e] ${
                isCurrent(item.href) ? "text-[#fdc10e]" : "text-white/85"
              }`}
            >
              {item.label}
              <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
