"use client";

import { BARCODE, useUserDataContext } from "@/_contexts/UserDataProvider";
import { BarcodeTextMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function BarcodTexteReview() {
  const { userData } = useUserDataContext();

  return (
    <ReviewSection metadata={BarcodeTextMetadata}>
      {userData[BARCODE] ? userData[BARCODE] : "None"}
    </ReviewSection>
  );
}
