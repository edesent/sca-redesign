import type { StaticImageData } from "next/image";

import abigailMolina from "../../public/sca-redesign/staff/abigail-molina.jpg";
import angelaFleck from "../../public/sca-redesign/staff/angela-fleck.jpg";
import annaFleck from "../../public/sca-redesign/staff/anna-fleck.jpg";
import annieAllen from "../../public/sca-redesign/staff/annie-allen.jpg";
import carolRinehart from "../../public/sca-redesign/staff/carol-rinehart.jpg";
import heatherVanaman from "../../public/sca-redesign/staff/heather-vanaman.jpg";
import jasonMcClaran from "../../public/sca-redesign/staff/jason-mcclaran.jpg";
import jenniferMcKenna from "../../public/sca-redesign/staff/jennifer-mckenna.jpg";
import jimAdams from "../../public/sca-redesign/staff/jim-adams.jpg";
import julieJackman from "../../public/sca-redesign/staff/julie-jackman.jpg";
import kevinMoore from "../../public/sca-redesign/staff/kevin-moore.jpg";
import kimClark from "../../public/sca-redesign/staff/kim-clark.jpg";
import laurieMoore from "../../public/sca-redesign/staff/laurie-moore.jpg";
import louAnnHolzer from "../../public/sca-redesign/staff/louann-holzer.jpg";
import nancyGrant from "../../public/sca-redesign/staff/nancy-grant.jpg";
import patrickWagner from "../../public/sca-redesign/staff/patrick-wagner.jpg";
import rebeccaHarless from "../../public/sca-redesign/staff/rebecca-harless.jpg";
import rebeccaRowan from "../../public/sca-redesign/staff/rebecca-rowan.jpg";
import roryAdams from "../../public/sca-redesign/staff/rory-adams.jpg";
import tinaMcClaran from "../../public/sca-redesign/staff/tina-mcclaran.jpg";

export type StaffMember = {
  name: string;
  role: string;
  group: string;
  image?: StaticImageData;
};

/** Faculty & staff, in the order the directory should read. */
export const STAFF: StaffMember[] = [
  { name: "Mr. Patrick Wagner", role: "Principal | HS Educator", group: "Leadership", image: patrickWagner },
  {
    name: "Mr. Jim Adams",
    role: "Vice Principal | Athletic Director | HS Educator",
    group: "Leadership",
    image: jimAdams,
  },
  { name: "Mrs. Anna Fleck", role: "SCA Administrative Assistant", group: "Office", image: annaFleck },
  { name: "Mrs. Kim Clark", role: "School Secretary", group: "Office", image: kimClark },
  {
    name: "Miss Heather Vanaman",
    role: "Director: The Children's Ark",
    group: "Early Childhood",
    image: heatherVanaman,
  },
  {
    name: "Miss Jennifer McKenna",
    role: "Ark: Assistant Director",
    group: "Early Childhood",
    image: jenniferMcKenna,
  },
  { name: "Mrs. Carol Rinehart", role: "1st Grade Teacher", group: "Elementary", image: carolRinehart },
  { name: "Mrs. LouAnn Holzer", role: "2nd Grade Teacher", group: "Elementary", image: louAnnHolzer },
  { name: "Mrs. Rebecca Rowan", role: "2nd Grade Teacher", group: "Elementary", image: rebeccaRowan },
  { name: "Mrs. Nancy Grant", role: "3rd Grade Teacher", group: "Elementary", image: nancyGrant },
  { name: "Mrs. Tina McClaran", role: "4th Grade Teacher", group: "Elementary", image: tinaMcClaran },
  { name: "Miss. Abigail Molina", role: "5th Grade Teacher", group: "Elementary", image: abigailMolina },
  { name: "Mrs. Rory Adams", role: "6th Grade Teacher", group: "Elementary", image: roryAdams },
  { name: "Mrs. Angela Fleck", role: "Elementary Music", group: "Fine Arts", image: angelaFleck },
  {
    name: "Mrs. Annie Allen",
    role: "Elementary Physical Education",
    group: "Student Life",
    image: annieAllen,
  },
  { name: "Mrs. Julie Jackman", role: "JH History Educator", group: "Junior High", image: julieJackman },
  {
    name: "Mrs. Rebecca Harless",
    role: "JH Mathematics | JH & SH Art | JH & SH Physical Education",
    group: "Junior/Senior High",
    image: rebeccaHarless,
  },
  { name: "Mr. Jason McClaran", role: "CAD Fusion Educator | Robotics", group: "Robotics", image: jasonMcClaran },
  { name: "Mr. Kevin Moore", role: "JH/SH Educator", group: "Junior/Senior High", image: kevinMoore },
  { name: "Mrs. Laurie Moore", role: "JH/SH Science Educator", group: "Junior/Senior High", image: laurieMoore },
  {
    name: "Mrs. Dyanna Papsdorf",
    role: "JH & SH English | Speech Educator | Yearbook Advisor",
    group: "Junior/Senior High",
  },
];

/** Department headings for the directory, derived from the roster order. */
export const GROUPS = Array.from(new Set(STAFF.map((person) => person.group)));

/** The people shown in the homepage carousel — everyone who has a photo. */
export const STAFF_WITH_PHOTOS = STAFF.filter(
  (person): person is StaffMember & { image: StaticImageData } => Boolean(person.image),
);
