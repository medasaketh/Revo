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
  isReady: boolean;
}

const PLACEHOLDER: LiveDateTime = {
  greeting: "Hello",
  period: "morning",
  dateLabel: "",
  timeLabel: "",
  timeZoneLabel: "",
  timeZone: "UTC",
  isReady: false,
};

export function useLiveDateTime(timeZone?: string): LiveDateTime {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    if (!now) {
      return PLACEHOLDER;
    }

    const resolvedTimeZone = timeZone ?? getBrowserTimeZone();
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
      isReady: true,
    };
  }, [now, timeZone]);
}
