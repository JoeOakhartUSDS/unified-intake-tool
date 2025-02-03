"use client";

import {
  Fieldset,
  ErrorMessage,
  FormGroup,
  TextInput,
  Select,
  CharacterCount,
  Label,
  StepIndicator,
  StepIndicatorStep,
  Radio,
} from "@trussworks/react-uswds";
import {
  HARMED_AGE,
  HARMED_AGE_UNIT,
  HARMED_MEDICAL,
  HARMED_SEX,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { z } from "zod";
import NavigateSkip from "@/_components/NavigateSkip";
import { HarmedPersonBMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function HarmedPersonB() {
  const screenName = HarmedPersonBMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(HARMED_AGE, event.target.value);
  };

  const handleAgeUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(HARMED_AGE_UNIT, event.target.value);
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(HARMED_SEX, event.target.value);
  };

  const handleMedicalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(HARMED_MEDICAL, event.target.value);
  };

  const validate = (event: React.ChangeEvent) => {
    if (!isValid()) {
      event.preventDefault();
      setValidated(true);
      return false;
    }
    return true;
  };

  const ageSchema = z.number();

  const isValid = () => {
    return (
      !userData[HARMED_AGE] || ageSchema.safeParse(userData[HARMED_AGE]).success
    );
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <StepIndicator
        headingLevel="h1"
        ofText="of"
        stepText="Step"
        className="font-ui-lg text-bold margin-top-3"
        showLabels={false}
      >
        <StepIndicatorStep label="The product" status="complete" />
        <StepIndicatorStep label="What happened" status="complete" />
        <StepIndicatorStep label="Who was harmed (optional)" status="current" />
        <StepIndicatorStep label="How to reach you (optional)" />
      </StepIndicator>
      <NavigateSkip
        userData={userData}
        screenName={screenName}
        validate={validate}
      />
      <div className="usa-hint">
        This information is helpful for tracking product problems and conducting
        investigations.
      </div>
      <FormGroup error={validated && !isValid()} className="margin-bottom-2">
        <Label htmlFor="age-text">Age (optional)</Label>
        {validated && !isValid() && (
          <ErrorMessage id="age-error">Please enter a valid age.</ErrorMessage>
        )}
        <TextInput
          id="age-text"
          name="age-text"
          type="number"
          onChange={handleAgeChange}
          className="usa-input--2xs float-left margin-right-2"
        />
        <Select
          id="age-unit"
          name="age-unit"
          onChange={handleAgeUnitChange}
          className="usa-input--sm"
        >
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="days">Days</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="sex">Sex (optional)</Label>
        <Fieldset legend="Sex" legendStyle="srOnly" className="margin-bottom-3">
          <Radio
            id="femaleSex"
            value="Female"
            name="sex"
            label="Female"
            checked={userData[HARMED_SEX] === "Female"}
            onChange={handleSexChange}
            tile
          />
          <Radio
            id="maleSex"
            value="Male"
            name="sex"
            label="Male"
            checked={userData[HARMED_SEX] === "Male"}
            onChange={handleSexChange}
            tile
          />
          <Radio
            id="naSex"
            value="Prefer not to say"
            name="sex"
            label="Prefer not to say"
            checked={userData[HARMED_SEX] === "Prefer not to say"}
            onChange={handleSexChange}
            tile
          />
        </Fieldset>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="medical-text">
          Provide their medical details (optional)
          <br />
          <span className="usa-hint">
            List any products taken at the same time including over-the-counter
            medications, supplements, and any allergies.
          </span>
        </Label>
        <CharacterCount
          id="medical-text"
          name="medical-text"
          isTextArea={true}
          value={userData[HARMED_MEDICAL]}
          onChange={handleMedicalChange}
          maxLength={4000}
        />
      </FormGroup>
    </ScreenWithNavigation>
  );
}
