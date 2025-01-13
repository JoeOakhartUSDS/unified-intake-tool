"use client";

import OverviewProcessList from "@/components/OverviewProcessList";
import { useUserDataContext } from "@/_contexts/UserDataProvider";
import { FlowAMetadata } from "./metadata";
import Cookies from "js-cookie";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function FlowA() {
  const screenName = FlowAMetadata.name;
  const { userData } = useUserDataContext();

  Cookies.set("CurrentFlow", "A");

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      buttonText="Next"
      hideBack={true}
    >
      <h1 className="font-ui-xl text-bold">Report a problem</h1>
      <p>Please tell us about</p>
      <OverviewProcessList />
    </ScreenWithNavigation>
  );
}
