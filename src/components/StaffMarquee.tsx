import Image from "next/image";
import Link from "next/link";

import { STAFF_WITH_PHOTOS, type StaffMember } from "../lib/staff";

/**
 * Continuously panning row of staff photos.
 *
 * The roster is rendered twice so the track can loop seamlessly — the CSS
 * animation slides it exactly -50%, at which point the second copy sits where
 * the first began. The spacing is `pr-4` on each card rather than a flex `gap`
 * on purpose: with a gap, half the track width is one gap short of a whole
 * number of cards and the loop visibly jumps.
 *
 * Panning pauses on hover/focus, and `prefers-reduced-motion` turns it into an
 * ordinary horizontal scroller (see `.sca-marquee` in globals.css).
 */
export default function StaffMarquee() {
  return (
    <div className="sca-marquee relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
      {/* No horizontal padding on the track: `w-max` would include it, and then
          -50% no longer lands on a whole number of cards. */}
      <div className="sca-marquee-track flex w-max">
        {STAFF_WITH_PHOTOS.map((person) => (
          <StaffPhotoCard key={person.name} person={person} />
        ))}
        {STAFF_WITH_PHOTOS.map((person) => (
          <StaffPhotoCard key={`repeat-${person.name}`} person={person} duplicate />
        ))}
      </div>

      {/* Soften both edges so cards fade out instead of being sliced off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[linear-gradient(90deg,#f7f8fa,rgba(247,248,250,0))] sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[linear-gradient(270deg,#f7f8fa,rgba(247,248,250,0))] sm:w-20" />
    </div>
  );
}

function StaffPhotoCard({
  person,
  duplicate = false,
}: {
  person: StaffMember & { image: NonNullable<StaffMember["image"]> };
  duplicate?: boolean;
}) {
  return (
    <div className="w-[220px] shrink-0 pr-4 sm:w-[250px]" aria-hidden={duplicate || undefined}>
      <Link
        href="/staff"
        tabIndex={duplicate ? -1 : undefined}
        className="group block overflow-hidden rounded-sm border border-[#d8dde6] bg-white transition hover:-translate-y-1 hover:border-[#d6a102] hover:shadow-[0_18px_40px_rgba(39,24,59,0.16)]"
      >
        <div className="relative aspect-4/5 overflow-hidden bg-[#27183b]">
          <Image
            src={person.image}
            alt={duplicate ? "" : person.name}
            fill
            sizes="250px"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#fdc10e]" />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-extrabold leading-5 text-[#27183b]">{person.name}</h3>
          <p className="mt-1 text-xs leading-5 text-[#6b6965]">{person.role}</p>
        </div>
      </Link>
    </div>
  );
}
