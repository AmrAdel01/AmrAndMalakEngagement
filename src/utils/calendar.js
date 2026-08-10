/**
 * Builds a minimal, standards-compliant .ics file for "Save the Date" and
 * triggers a browser download. No external dependency needed for this.
 */
export function downloadIcsEvent({ title, description, location, isoDateTime, durationHours = 4 }) {
  const start = new Date(isoDateTime);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const format = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Engagement Website//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@engagement`,
    `DTSTAMP:${format(new Date())}`,
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "save-the-date.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
