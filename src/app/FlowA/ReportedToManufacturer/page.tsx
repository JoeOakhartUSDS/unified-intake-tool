"use client";

import { Fieldset, FormGroup, Label, Radio } from "@trussworks/react-uswds";
import {
  PREVIOUSLY_REPORTED_TO_MANUFACTURER,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { ReportedToManufacturerMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function ReportedToManufacturer() {
  const screenName = ReportedToManufacturerMetadata.name;
  const { userData, updateUserData } = useUserDataContext();

  const handlePreviouslyReportedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(PREVIOUSLY_REPORTED_TO_MANUFACTURER, event.target.value);
  };

  return (
    <ScreenWithNavigation userData={userData} screenName={screenName}>
      <FormGroup>
        <Label htmlFor="previouslyReportedToggle">
          Did you already report this problem to the company that makes this
          product? (optional)
        </Label>
        <Fieldset
          legend="Did you already report this problem to the company that makes this product?"
          legendStyle="srOnly"
        >
          <Radio
            id="previouslyReportedToggleYes"
            name="previouslyReportedToggle"
            value="truePreviouslyReported"
            label="Yes"
            checked={
              userData[PREVIOUSLY_REPORTED_TO_MANUFACTURER] ===
              "truePreviouslyReported"
            }
            onChange={handlePreviouslyReportedChange}
          />
          <Radio
            id="previouslyReportedToggleNo"
            name="previouslyReportedToggle"
            value="falsePreviouslyReported"
            label="No"
            checked={
              userData[PREVIOUSLY_REPORTED_TO_MANUFACTURER] ===
              "falsePreviouslyReported"
            }
            onChange={handlePreviouslyReportedChange}
          />
        </Fieldset>
      </FormGroup>
    </ScreenWithNavigation>
  );
}
