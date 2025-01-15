"use client";

import {
  CONTACT_PERMISSION,
  CONTACT_FIRST_NAME,
  CONTACT_LAST_NAME,
  CONTACT_EMAIL,
  useUserDataContext,
  CONTACT_PHONE,
} from "@/_contexts/UserDataProvider";
import { ContactInfoBMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function ContactInfoBReview() {
  const { userData } = useUserDataContext();

  const fullName =
    userData[CONTACT_FIRST_NAME] + " " + userData[CONTACT_LAST_NAME];

  return (
    <ReviewSection metadata={ContactInfoBMetadata}>
      {userData[CONTACT_PERMISSION] === "truePermission"
        ? "We may contact you."
        : "We will not contact you."}
      <br />
      {fullName.trim() ? fullName : "Name not provided"}
      <br />
      {userData[CONTACT_EMAIL]
        ? userData[CONTACT_EMAIL]
        : "Email address not provided"}
      {userData[CONTACT_PHONE] && (
        <>
          <br />
          {userData[CONTACT_PHONE]}
        </>
      )}
    </ReviewSection>
  );
}
