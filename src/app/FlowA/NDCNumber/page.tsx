"use client";

import {
  TextInputMask,
  FormGroup,
  ErrorMessage,
  Label,
} from "@trussworks/react-uswds";
import { NDC_NUMBER, useUserDataContext } from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { z } from "zod";
import NavigateSkip from "@/_components/NavigateSkip";
import { NDCNumberMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function NDCNumber() {
  const screenName = NDCNumberMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(NDC_NUMBER, event.target.value.replaceAll("-", ""));
  };

  const validate = (event: React.ChangeEvent) => {
    if (!isValid()) {
      event.preventDefault();
      setValidated(true);
      return false;
    }
    return true;
  };

  // Testing for a string consisting only of digits because the number may contain leading 0's
  const ndcSchema = z
    .string()
    .min(10)
    .max(11)
    .refine((value) => /^[0-9]*$/.test(value ?? ""));

  const isValid = () => {
    return (
      !userData[NDC_NUMBER] || ndcSchema.safeParse(userData[NDC_NUMBER]).success
    );
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <FormGroup className="margin-bottom-3" error={validated && !isValid()}>
        <Label htmlFor="ndcNumber" title="National Drug Code">
          NDC number (optional)
          <br />
          <span className="usa-hint">
            The code is 10 or 11 numbers, such as 12345-6789-01.
          </span>
        </Label>
        {validated && !isValid() && (
          <ErrorMessage id="email-error">
            Please provide a 10 or 11 digit NDC number.
          </ErrorMessage>
        )}
        <TextInputMask
          id="ndcNumber"
          name="ndcNumber"
          type="text"
          mask="_____-____-__"
          pattern="^\d{4,5}-\d{4}-\d{2}$"
          value={userData[NDC_NUMBER]}
          onChange={handleChange}
        />
      </FormGroup>
      <NavigateSkip
        userData={userData}
        screenName={screenName}
        validate={validate}
      />
    </ScreenWithNavigation>
  );
}
