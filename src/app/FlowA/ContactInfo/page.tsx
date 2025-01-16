"use client";

import {
  TextInput,
  FormGroup,
  ErrorMessage,
  Label,
  TextInputMask,
  Fieldset,
  Radio,
} from "@trussworks/react-uswds";
import {
  CONTACT_FIRST_NAME,
  CONTACT_LAST_NAME,
  CONTACT_EMAIL,
  useUserDataContext,
  CONTACT_PHONE,
  CONTACT_PERMISSION,
  CONTACT_PERMISSION_SHARE,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { z } from "zod";
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

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(CONTACT_PHONE, event.target.value);
  };

  const handleContactPermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(CONTACT_PERMISSION, event.target.value);
  };

  const handleShareContactPermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(CONTACT_PERMISSION_SHARE, event.target.value);
  };

  const validate = (event: React.ChangeEvent) => {
    if (!isValid() || !isPhoneValid()) {
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

  const phoneSchema = z.string().regex(/^\d{3}-\d{3}-\d{4}$/);

  const isPhoneValid = () => {
    return (
      !userData[CONTACT_PHONE] ||
      phoneSchema.safeParse(userData[CONTACT_PHONE]).success
    );
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <div>How to reach you (optional)</div>
      <FormGroup>
        <Label htmlFor="contactPermission">
          Would you like to provide contact information? (optional)
          <div className="usa-hint">
            We will only contact you to ask questions about this product
            complaint.
          </div>
        </Label>
        <Fieldset
          legend="Would you like to provide contact information?"
          legendStyle="srOnly"
        >
          <Radio
            id="contactPermissionYes"
            name="contactPermission"
            value="Yes"
            label="Yes"
            checked={userData[CONTACT_PERMISSION] === "Yes"}
            onChange={handleContactPermissionChange}
          />
          <Radio
            id="contactPermissionNo"
            name="contactPermission"
            value="No"
            label="No, I'll remain anonymous"
            checked={userData[CONTACT_PERMISSION] === "No"}
            onChange={handleContactPermissionChange}
          />
        </Fieldset>
      </FormGroup>
      {userData[CONTACT_PERMISSION] === "Yes" && (
        <>
          <FormGroup className="margin-top-2 margin-bottom-2">
            <Label htmlFor="shareContactPermission">
              Can we share your contact information with the manufacturer so
              they may reach out? (optional)
            </Label>
            <Fieldset
              legend="Would you like to provide contact information?"
              legendStyle="srOnly"
            >
              <Radio
                id="shareContactPermissionYes"
                name="shareContactPermission"
                value="Yes"
                label="Yes"
                checked={userData[CONTACT_PERMISSION_SHARE] === "Yes"}
                onChange={handleShareContactPermissionChange}
              />
              <Radio
                id="shareContactPermissionNo"
                name="shareContactPermission"
                value="No"
                label="No"
                checked={userData[CONTACT_PERMISSION_SHARE] === "No"}
                onChange={handleShareContactPermissionChange}
              />
            </Fieldset>
          </FormGroup>
          <FormGroup className="margin-top-2 margin-bottom-2">
            <Label htmlFor="firstName">
              First or given name (optional)
              <br />
              <span className="usa-hint">
                For example, Jose, Darren, or Mai
              </span>
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
          <div>
            Provide your email or phone number
            <abbr
              title="required"
              className="usa-hint usa-hint--required text-no-underline"
            >
              *
            </abbr>
          </div>
          <FormGroup error={validated && !isValid()}>
            <Label htmlFor="email">
              Email
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
          <FormGroup error={validated && !isPhoneValid()}>
            <Label htmlFor="email">
              Phone number
              <br />
              <span className="usa-hint">For example, 555-555-5555</span>
            </Label>
            {validated && !isPhoneValid() && (
              <ErrorMessage id="email-error">
                Please provide a valid phone number.
              </ErrorMessage>
            )}
            <TextInputMask
              id="phone"
              name="phone"
              type="tel"
              value={userData[CONTACT_PHONE]}
              onChange={handlePhoneChange}
              mask="___-___-____"
              pattern="\d{3}-\d{3}-\d{4}"
            />
          </FormGroup>
        </>
      )}
    </ScreenWithNavigation>
  );
}
