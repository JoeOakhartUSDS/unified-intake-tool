"use client";

import {
  CONTACT_FIRST_NAME,
  CONTACT_LAST_NAME,
  CONTACT_EMAIL,
  useUserDataContext,
  CONTACT_PHONE,
  CONTACT_PERMISSION,
  CONTACT_PERMISSION_SHARE,
} from "@/_contexts/UserDataProvider";
import { ContactInfoMetadata } from "./metadata";
import ReviewSection from "@/_components/ReviewSection";

export default function ContactInfoReview() {
  const { userData } = useUserDataContext();

  const fullName =
    userData[CONTACT_FIRST_NAME] + " " + userData[CONTACT_LAST_NAME];

  return (
    <ReviewSection metadata={ContactInfoMetadata}>
      {userData[CONTACT_PERMISSION] === "Yes"
        ? "We may contact you."
        : "We will not contact you."}
      <br />
      {userData[CONTACT_PERMISSION] === "Yes" && (
        <>
          {userData[CONTACT_PERMISSION_SHARE] === "Yes"
            ? "We may share your contact information with the manufacturer."
            : "We will not share your contact information with the manufacturer."}
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
        </>
      )}
    </ReviewSection>
  );
}
