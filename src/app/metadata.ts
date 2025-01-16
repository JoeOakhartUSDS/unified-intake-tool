"use client";

import { ScreenMetadata } from "@/_utils/ScreenMetadata";

export const LandingMetadata = {
  name: "Landing",
  route: "/",
  title: "Report a problem to the FDA",
  shouldDisplay: () => {
    return true;
  },
} as ScreenMetadata;
