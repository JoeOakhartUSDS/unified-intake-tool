"use client";

import { ScreenMetadata } from "@/_utils/ScreenMetadata";
import WhatOutcomeReview from "./review";

export const WhatOutcomeMetadata = {
  name: "WhatOutcome",
  route: "/FlowA/WhatOutcome",
  title: "Did any of the following happen?",
  shouldDisplay: () => {
    return true;
  },
  reviewSection: WhatOutcomeReview,
} as ScreenMetadata;
