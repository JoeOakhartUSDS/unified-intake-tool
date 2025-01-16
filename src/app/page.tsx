"use client";

import { useUserDataContext } from "@/_contexts/UserDataProvider";
import { LandingMetadata } from "./metadata";
import ScreenWithNavigation from "./_components/ScreenWithNavigation";

export default function Landing() {
  const screenName = LandingMetadata.name;
  const { userData } = useUserDataContext();

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      buttonText="Get Started"
      hideBack={true}
    >
      <h1 className="font-ui-xl text-bold">Report a problem to the FDA</h1>
      <div className="margin-bottom-2">
        Your report is critical for ensuring the safety of products for the
        American public.
      </div>
      <div className="margin-bottom-2">
        We will ask you to describe the product, what happened, and optionally,
        who was harmed.
      </div>
      <div className="margin-bottom-2">
        While we review every submission, we are unable to answer questions
        about your individual report. If you choose to provide contact
        information, we may follow up for more details.
      </div>
    </ScreenWithNavigation>
  );
}
