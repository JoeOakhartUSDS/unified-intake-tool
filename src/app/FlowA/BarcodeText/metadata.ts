"use client";

import { ScreenMetadata } from "@/_utils/ScreenMetadata";
import BarcodeTextReview from "./review";

export const BarcodeTextMetadata = {
  name: "BarcodeText",
  route: "/FlowA/BarcodeText",
  title: "Barcode",
  shouldDisplay: () => {
    return true;
  },
  reviewSection: BarcodeTextReview,
} as ScreenMetadata;
