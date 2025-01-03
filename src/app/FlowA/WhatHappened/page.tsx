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
import NavigateBack from "@/_components/NavigateBack";
import NavigateNext from "@/_components/NavigateNext";

export default function WhatHappened() {
  const screenName = "WhatHappened";
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
    <>
      <NavigateBack userData={userData} screenName={screenName} />
      <FormGroup className="margin-bottom-3" error={validated && !isValid()}>
        <Label htmlFor="whatHappened">
          Describe what happened in detail
          <abbr
            title="required"
            className="usa-hint usa-hint--required text-no-underline"
          >
            *
          </abbr>
          <br />
          <span className="usa-hint">What happened, step by step?</span>
        </Label>
        <p className="usa-hint" id="whatHappenedHint">
          When first using the product, how long did it take before problems
          started, and did issues go away after stopping the product?
          <br />
          <br />
          If the person harmed went to the hospital, what was the diagnosis and
          how was it treated?
        </p>
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
        />
      </FormGroup>
      <NavigateNext
        userData={userData}
        screenName={screenName}
        validate={validate}
      />
    </>
  );
}
