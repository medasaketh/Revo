export type GreetingPeriod = "morning" | "afternoon" | "evening";

export function getBrowserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getHourInTimeZone(date: Date, timeZone: string): number {
  const hour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone,
  }).format(date);

  return Number(hour);
}

export function getGreetingPeriod(
  date: Date = new Date(),
  timeZone?: string
): GreetingPeriod {
  const tz = timeZone ?? getBrowserTimeZone();
  const hour = getHourInTimeZone(date, tz);

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

export function getGreetingLabel(period: GreetingPeriod): string {
  const labels: Record<GreetingPeriod, string> = {
    morning: "Good Morning",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
  };
  return labels[period];
}

export function formatLiveDateTime(
  date: Date = new Date(),
  timeZone?: string
): {
  dateLabel: string;
  timeLabel: string;
  timeZoneLabel: string;
} {
  const tz = timeZone ?? getBrowserTimeZone();

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: tz,
  }).format(date);

  const timeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: tz,
  }).format(date);

  const timeZoneLabel =
    new Intl.DateTimeFormat("en-US", {
      timeZoneName: "short",
      timeZone: tz,
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? tz;

  return { dateLabel, timeLabel, timeZoneLabel };
}
