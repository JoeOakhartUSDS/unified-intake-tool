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
      <h1 className="font-ui-xl text-bold">Report a problem</h1>
      <div className="margin-bottom-2">
        We review every submission. We use this information to monitor the
        safety of FDA-regulated products.
      </div>
      <div className="margin-bottom-2">
        We will ask you for the product information, what happened, and any
        photos of the product.
      </div>
      <div className="margin-bottom-2">
        We are unable to answer questions about submissions. You can check{" "}
        <a href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts">
          the current list of recalled products.
        </a>
      </div>
      <div>We will reach out if we have any questions.</div>
    </ScreenWithNavigation>
  );
}
