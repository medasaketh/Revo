"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatLiveDateTime,
  getBrowserTimeZone,
  getGreetingLabel,
  getGreetingPeriod,
  type GreetingPeriod,
} from "@/lib/datetime/greeting";

interface LiveDateTime {
  greeting: string;
  period: GreetingPeriod;
  dateLabel: string;
  timeLabel: string;
  timeZoneLabel: string;
  timeZone: string;
}

export function useLiveDateTime(timeZone?: string): LiveDateTime {
  const resolvedTimeZone = timeZone ?? getBrowserTimeZone();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    const period = getGreetingPeriod(now, resolvedTimeZone);
    const { dateLabel, timeLabel, timeZoneLabel } = formatLiveDateTime(
      now,
      resolvedTimeZone
    );

    return {
      greeting: getGreetingLabel(period),
      period,
      dateLabel,
      timeLabel,
      timeZoneLabel,
      timeZone: resolvedTimeZone,
    };
  }, [now, resolvedTimeZone]);
}
