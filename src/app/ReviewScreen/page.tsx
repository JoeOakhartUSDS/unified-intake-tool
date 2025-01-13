"use client";

import { useUserDataContext } from "@/_contexts/UserDataProvider";
import { ReviewScreenMetadata } from "./metadata";
import { screenOrder } from "@/_utils/Navigation";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function ReviewScreen() {
  const screenName = ReviewScreenMetadata.name;
  const { userData } = useUserDataContext();

  const displayedScreens = screenOrder().filter((screen) =>
    screen.shouldDisplay(userData),
  );

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      buttonText="Submit"
    >
      <h1 className="font-ui-lg text-bold">Review your submission</h1>
      <div className="margin-bottom-2">
        Review your information below to make sure it is correct. After you
        submit, you will not be able to update this report.
      </div>
      <div>To make changes, tap on any section to edit.</div>
      {displayedScreens.map((item) => {
        if (item.reviewSection != undefined) {
          return <item.reviewSection key={item.name} />;
        } else {
          return <></>;
        }
      })}
    </ScreenWithNavigation>
  );
}
