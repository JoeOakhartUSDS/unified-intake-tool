"use client";

import {
  PRODUCT_PHOTOS,
  PRODUCT_NAME,
  NDC_NUMBER,
  WHAT_HAPPENED,
  WHAT_HAPPENED_DIAGNOSIS,
  WHAT_HAPPENED_OUTCOME,
  EVENT_DATE,
  ADDITIONAL_FILES,
  PRODUCT_TYPE,
  PREVIOUSLY_REPORTED_TO_MANUFACTURER,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { WhatHappenedBMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function WhatHappenedBReview() {
  const { userData } = useUserDataContext();

  return (
    <ReviewSection metadata={WhatHappenedBMetadata}>
      Product photos:{" "}
      {userData[PRODUCT_PHOTOS] ? userData[PRODUCT_PHOTOS] : "None"}
      <br />
      Product name: {userData[PRODUCT_NAME]}
      <br />
      Product type: {PRODUCT_TYPE}
      <br />
      {userData[PRODUCT_TYPE] === "drugProductType" && (
        <>
          NDC number:{" "}
          {userData[NDC_NUMBER] ? userData[NDC_NUMBER] : "Not provided"}
          <br />
        </>
      )}
      Description: {userData[WHAT_HAPPENED]}
      <br />
      Date: {userData[EVENT_DATE]}
      <br />
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
      Additional information:{" "}
      {userData[ADDITIONAL_FILES] ? userData[ADDITIONAL_FILES] : "None"}
      <br />
      {userData[PREVIOUSLY_REPORTED_TO_MANUFACTURER] !== "" && (
        <>
          Reported to manufacturer:{" "}
          {userData[PREVIOUSLY_REPORTED_TO_MANUFACTURER]}
          <br />
        </>
      )}
    </ReviewSection>
  );
}
