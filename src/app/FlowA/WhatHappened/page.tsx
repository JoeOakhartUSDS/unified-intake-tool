"use client";

import {
  FormGroup,
  Label,
  CharacterCount,
  ErrorMessage,
} from "@trussworks/react-uswds";
import {
  WHAT_HAPPENED,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { WhatHappenedMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";
import RequiredAsterisk from "@/_components/RequiredAsterisk";

export default function WhatHappened() {
  const screenName = WhatHappenedMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(WHAT_HAPPENED, event.target.value);
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
    return userData[WHAT_HAPPENED] && userData[WHAT_HAPPENED].length > 0;
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <FormGroup className="margin-bottom-3" error={validated && !isValid()}>
        <Label htmlFor="whatHappened">
          Describe what happened, step by step, and the timing
          <RequiredAsterisk />
          <br />
          <div className="usa-hint" id="whatHappenedHint">
            When first using the product, how long did it take before problems
            started, and did issues go away after stopping the product?
          </div>
        </Label>
        {validated && !isValid() && (
          <ErrorMessage id="product-type-error">
            Please describe what happened.
          </ErrorMessage>
        )}
        <CharacterCount
          id="whatHappened"
          name="whatHappened"
          isTextArea={true}
          aria-describedby="whatHappened-info whatHappenedHint"
          value={userData[WHAT_HAPPENED]}
          onChange={handleChange}
          maxLength={4000}
          required
          aria-required="true"
        />
      </FormGroup>
    </ScreenWithNavigation>
  );
}
