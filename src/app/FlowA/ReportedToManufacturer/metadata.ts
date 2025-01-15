"use client";

import { ScreenMetadata } from "@/_utils/ScreenMetadata";
import ReportedToManufacturerReview from "./review";

export const ReportedToManufacturerMetadata = {
  name: "ReportedToManufacturer",
  route: "/FlowA/ReportedToManufacturer",
  title:
    "Did you already report this problem to the company that makes this product?",
  shouldDisplay: () => {
    return true;
  },
  reviewSection: ReportedToManufacturerReview,
} as ScreenMetadata;
