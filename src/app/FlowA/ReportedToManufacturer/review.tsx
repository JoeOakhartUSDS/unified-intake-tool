"use client";

import {
  PREVIOUSLY_REPORTED_TO_MANUFACTURER,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { ReportedToManufacturerMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function ReportedToManufacturerReview() {
  const { userData } = useUserDataContext();

  return (
    <ReviewSection metadata={ReportedToManufacturerMetadata}>
      {userData[PREVIOUSLY_REPORTED_TO_MANUFACTURER]}
    </ReviewSection>
  );
}
