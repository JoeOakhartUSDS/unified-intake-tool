"use client";

import {
  Checkbox,
  Fieldset,
  ErrorMessage,
  FormGroup,
  Label,
} from "@trussworks/react-uswds";
import {
  SUBMISSION_TYPE,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { SubmissionTypeMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";
import RequiredAsterisk from "@/_components/RequiredAsterisk";

export default function SubmissionType() {
  const screenName = SubmissionTypeMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof userData[SUBMISSION_TYPE] === "object") {
      const previous = userData[SUBMISSION_TYPE];
      const indexOfValue = previous.indexOf(event.target.value);
      if (indexOfValue >= 0) {
        previous.splice(indexOfValue, 1);
        updateUserData(SUBMISSION_TYPE, previous);
      } else {
        updateUserData(SUBMISSION_TYPE, [...previous, event.target.value]);
      }
    } else {
      updateUserData(SUBMISSION_TYPE, [event.target.value]);
    }
  };

  const validate = (event: React.ChangeEvent) => {
    if (!isValid()) {
      event.preventDefault();
      setValidated(true);
      return false;
    }
    return true;
  };

  const isValid = () => {
    return userData[SUBMISSION_TYPE] && userData[SUBMISSION_TYPE].length > 0;
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <FormGroup error={validated && !isValid()}>
        <Label htmlFor="SubmissionType">
          Tell us what happened
          <RequiredAsterisk />
          <br />
          <span className="usa-hint">Select all that apply</span>
        </Label>
        {validated && !isValid() && (
          <ErrorMessage id="submission-type-error">
            Please select one or more of the following options.
          </ErrorMessage>
        )}
        <Fieldset
          legend="Tell us what happened"
          legendStyle="srOnly"
          className="margin-bottom-3"
          requiredMarker
          aria-required="true"
        >
          <Checkbox
            id="someoneWasHarmedSubmissionType"
            value="someoneWasHarmedSubmissionType"
            name="SubmissionType"
            label="Someone was harmed"
            checked={userData[SUBMISSION_TYPE]?.includes(
              "someoneWasHarmedSubmissionType",
            )}
            onChange={handleChange}
            tile
          />
          <Checkbox
            id="someoneUsedAProductIncorrectlySubmissionType"
            value="someoneUsedAProductIncorrectlySubmissionType"
            name="SubmissionType"
            label="Someone used a product incorrectly"
            checked={userData[SUBMISSION_TYPE]?.includes(
              "someoneUsedAProductIncorrectlySubmissionType",
            )}
            onChange={handleChange}
            tile
          />
          <Checkbox
            id="somethingWasWrongWithAProductSubmissionType"
            value="somethingWasWrongWithAProductSubmissionType"
            name="SubmissionType"
            label="Something was wrong with a product"
            checked={userData[SUBMISSION_TYPE]?.includes(
              "somethingWasWrongWithAProductSubmissionType",
            )}
            onChange={handleChange}
            tile
          />
          <Checkbox
            id="illegalActivityOrFraudSubmissionType"
            value="illegalActivityOrFraudSubmissionType"
            name="SubmissionType"
            label="Illegal activity, fraud, or misconduct"
            checked={userData[SUBMISSION_TYPE]?.includes(
              "illegalActivityOrFraudSubmissionType",
            )}
            onChange={handleChange}
            tile
          />
        </Fieldset>
      </FormGroup>
    </ScreenWithNavigation>
  );
}
