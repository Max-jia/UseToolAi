// Converts ISO dates like "2026-08-17" into human format like "August 17, 2026".
// Pure string handling — no Date objects, so no timezone drift on any server.
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatHumanDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  const m = Number(month);
  if (!year || !month || !day || m < 1 || m > 12) return iso;
  return `${MONTHS[m - 1]} ${Number(day)}, ${year}`;
}
