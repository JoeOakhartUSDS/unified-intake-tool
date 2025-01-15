"use client";

import {
  WHAT_HAPPENED_DIAGNOSIS,
  WHAT_HAPPENED_OUTCOME,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { WhatOutcomeMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function WhatOutcomeReview() {
  const { userData } = useUserDataContext();

  return (
    <ReviewSection metadata={WhatOutcomeMetadata}>
      Did any of the following happen?{" "}
      {userData[WHAT_HAPPENED_OUTCOME]?.length > 0
        ? userData[WHAT_HAPPENED_OUTCOME]
        : "None"}
      <br />
      {userData[WHAT_HAPPENED_DIAGNOSIS] && (
        <>
          Diagnosis and treatment: {userData[WHAT_HAPPENED_DIAGNOSIS]}
          <br />
        </>
      )}
    </ReviewSection>
  );
}
