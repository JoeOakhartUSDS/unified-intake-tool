"use client";

import {
  TextInput,
  FormGroup,
  ErrorMessage,
  Label,
} from "@trussworks/react-uswds";
import {
  CONTACT_FIRST_NAME,
  CONTACT_LAST_NAME,
  CONTACT_EMAIL,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { z } from "zod";
import NavigateSkip from "@/_components/NavigateSkip";
import { ContactInfoMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function ContactInfo() {
  const screenName = ContactInfoMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(CONTACT_FIRST_NAME, event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(CONTACT_LAST_NAME, event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(CONTACT_EMAIL, event.target.value);
  };

  const validate = (event: React.ChangeEvent) => {
    if (!isValid()) {
      event.preventDefault();
      setValidated(true);
      return false;
    }
    return true;
  };

  const emailSchema = z.string().email();

  const isValid = () => {
    return (
      !userData[CONTACT_EMAIL] ||
      emailSchema.safeParse(userData[CONTACT_EMAIL]).success
    );
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <div>
        Can we contact you? (optional)
        <br />
        <span className="usa-hint">
          We will only contact you to ask questions about this product
          complaint. We will not share your information with anyone else.
        </span>
      </div>
      <NavigateSkip
        userData={userData}
        screenName={screenName}
        validate={validate}
      />
      <FormGroup className="margin-top-2 margin-bottom-2">
        <Label htmlFor="firstName">
          First or given name (optional)
          <br />
          <span className="usa-hint">For example, Jose, Darren, or Mai</span>
        </Label>
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          value={userData[CONTACT_FIRST_NAME]}
          onChange={handleFirstNameChange}
        />
      </FormGroup>
      <FormGroup className="margin-top-2 margin-bottom-1">
        <Label htmlFor="lastName">
          Last or family name (optional)
          <br />
          <span className="usa-hint">
            For example, Martinez Gonzalez, Gu, or Smith
          </span>
        </Label>
        <TextInput
          id="lastName"
          name="lastName"
          type="text"
          value={userData[CONTACT_LAST_NAME]}
          onChange={handleLastNameChange}
        />
      </FormGroup>
      <FormGroup error={validated && !isValid()}>
        <Label htmlFor="email">
          Email address (optional)
          <br />
          <span className="usa-hint">For example, Name@domain.com</span>
        </Label>
        {validated && !isValid() && (
          <ErrorMessage id="email-error">
            Please provide a valid email address.
          </ErrorMessage>
        )}
        <TextInput
          id="email"
          name="email"
          type="email"
          value={userData[CONTACT_EMAIL]}
          onChange={handleEmailChange}
        />
      </FormGroup>
    </ScreenWithNavigation>
  );
}
