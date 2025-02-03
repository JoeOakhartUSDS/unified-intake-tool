"use client";

import {
  HARMED_AGE,
  HARMED_AGE_UNIT,
  HARMED_SEX,
  HARMED_MEDICAL,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { HarmedPersonMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function HarmedPersonReview() {
  const { userData } = useUserDataContext();

  return (
    <ReviewSection metadata={HarmedPersonMetadata}>
      {userData[HARMED_AGE]
        ? userData[HARMED_AGE] + " " + userData[HARMED_AGE_UNIT]
        : "Age not provided"}
      <br />
      {userData[HARMED_SEX] ? userData[HARMED_SEX] : "Sex not provided"}
      <br />
      {userData[HARMED_MEDICAL]
        ? userData[HARMED_MEDICAL]
        : "Medical details not provided"}
    </ReviewSection>
  );
}
