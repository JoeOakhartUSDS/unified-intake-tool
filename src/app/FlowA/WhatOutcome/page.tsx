"use client";

import {
  FormGroup,
  Label,
  CharacterCount,
  Fieldset,
  Checkbox,
} from "@trussworks/react-uswds";
import {
  WHAT_HAPPENED_OUTCOME,
  WHAT_HAPPENED_DIAGNOSIS,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { WhatOutcomeMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function WhatOutcome() {
  const screenName = WhatOutcomeMetadata.name;
  const { userData, updateUserData } = useUserDataContext();

  const handleWhatHappenedDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(WHAT_HAPPENED_DIAGNOSIS, event.target.value);
  };

  const handleWhatHappenedOutcomeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (typeof userData[WHAT_HAPPENED_OUTCOME] === "object") {
      const previous = userData[WHAT_HAPPENED_OUTCOME];
      const indexOfValue = previous.indexOf(event.target.value);
      if (indexOfValue >= 0) {
        previous.splice(indexOfValue, 1);
        updateUserData(WHAT_HAPPENED_OUTCOME, previous);
      } else {
        updateUserData(WHAT_HAPPENED_OUTCOME, [
          ...previous,
          event.target.value,
        ]);
      }
    } else {
      updateUserData(WHAT_HAPPENED_OUTCOME, [event.target.value]);
    }
  };

  return (
    <ScreenWithNavigation userData={userData} screenName={screenName}>
      <FormGroup>
        <Label htmlFor="whatHappenedOutcome">
          Did any of the following happen? (optional)
          <br />
          <span className="usa-hint">Select all that apply</span>
        </Label>
        <Fieldset
          legend="Did any of the following happen?"
          legendStyle="srOnly"
          className="margin-bottom-3"
        >
          <Checkbox
            id="hospitalizationWhatHappenedOutcome"
            value="Hospitalization"
            name="whatHappenedOutcome"
            label="Hospitalization"
            checked={userData[WHAT_HAPPENED_OUTCOME]?.includes(
              "Hospitalization",
            )}
            onChange={handleWhatHappenedOutcomeChange}
            tile
          />
          <Checkbox
            id="deathWhatHappenedOutcome"
            value="Death"
            name="whatHappenedOutcome"
            label="Death"
            checked={userData[WHAT_HAPPENED_OUTCOME]?.includes("Death")}
            onChange={handleWhatHappenedOutcomeChange}
            tile
          />
        </Fieldset>
      </FormGroup>
      {userData[WHAT_HAPPENED_OUTCOME]?.includes("Death") && (
        <FormGroup className="margin-bottom-3">
          <Label htmlFor="whatHappenedDiagnosis">
            What was the diagnosis and how was it treated? (optional)
          </Label>
          <CharacterCount
            id="whatHappenedDiagnosis"
            name="whatHappenedDiagnosis"
            isTextArea={true}
            value={userData[WHAT_HAPPENED_DIAGNOSIS]}
            onChange={handleWhatHappenedDiagnosisChange}
            maxLength={4000}
          />
        </FormGroup>
      )}
    </ScreenWithNavigation>
  );
}
