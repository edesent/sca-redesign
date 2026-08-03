import Image from "next/image";
import Link from "next/link";

import { STAFF_WITH_PHOTOS, type StaffMember } from "../lib/staff";

/**
 * Responsive grid of staff photos on the homepage.
 *
 * Every teacher with a photo is shown at once — no scrolling or animation — so
 * visitors can scan the whole faculty instantly. The full directory (including
 * staff without photos) still lives on the /staff page.
 */
export default function StaffGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {STAFF_WITH_PHOTOS.map((person) => (
        <StaffPhotoCard key={person.name} person={person} />
      ))}
    </div>
  );
}

function StaffPhotoCard({
  person,
}: {
  person: StaffMember & { image: NonNullable<StaffMember["image"]> };
}) {
  return (
    <Link
      href="/staff"
      className="group block overflow-hidden rounded-sm border border-[#d8dde6] bg-white transition hover:-translate-y-1 hover:border-[#d6a102] hover:shadow-[0_18px_40px_rgba(39,24,59,0.16)]"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-[#27183b]">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#fdc10e]" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-extrabold leading-5 text-[#27183b]">{person.name}</h3>
        <p className="mt-1 text-xs leading-5 text-[#6b6965]">{person.role}</p>
      </div>
    </Link>
  );
}
