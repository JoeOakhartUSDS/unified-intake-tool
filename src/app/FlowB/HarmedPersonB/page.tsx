"use client";

import {
  Checkbox,
  Fieldset,
  ErrorMessage,
  FormGroup,
  TextInput,
  Select,
  CharacterCount,
  Label,
  StepIndicator,
  StepIndicatorStep,
} from "@trussworks/react-uswds";
import {
  HARMED_AGE,
  HARMED_AGE_UNIT,
  HARMED_GENDER,
  HARMED_GENDER_SPECIFY,
  HARMED_MEDICAL,
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

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Special case because NA disables other gender options
    if (event.target.value == "Prefer not to say") {
      if (userData[HARMED_GENDER]?.includes("Prefer not to say")) {
        updateUserData(HARMED_GENDER, []);
      } else {
        updateUserData(HARMED_GENDER, ["Prefer not to say"]);
      }
      return;
    }

    if (typeof userData[HARMED_GENDER] === "object") {
      const previous = userData[HARMED_GENDER];
      const indexOfValue = previous.indexOf(event.target.value);
      if (indexOfValue >= 0) {
        previous.splice(indexOfValue, 1);
        updateUserData(HARMED_GENDER, previous);
      } else {
        updateUserData(HARMED_GENDER, [...previous, event.target.value]);
      }
    } else {
      updateUserData(HARMED_GENDER, [event.target.value]);
    }
  };

  const handleGenderSpecifyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(HARMED_GENDER_SPECIFY, event.target.value);
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
      isBottomBack={true}
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
        <Label htmlFor="gender">
          Gender (optional)
          <br />
          <span className="usa-hint">Select all that apply</span>
        </Label>
        <Fieldset
          legend="Gender"
          legendStyle="srOnly"
          className="margin-bottom-3"
        >
          <Checkbox
            id="femaleGender"
            value="Female"
            name="gender"
            label="Female"
            checked={userData[HARMED_GENDER]?.includes("Female")}
            onChange={handleGenderChange}
            disabled={userData[HARMED_GENDER]?.includes("Prefer not to say")}
            tile
          />
          <Checkbox
            id="maleGender"
            value="Male"
            name="gender"
            label="Male"
            checked={userData[HARMED_GENDER]?.includes("Male")}
            onChange={handleGenderChange}
            disabled={userData[HARMED_GENDER]?.includes("Prefer not to say")}
            tile
          />
          <Checkbox
            id="transGender"
            value="Transgender"
            name="gender"
            label="Transgender"
            checked={userData[HARMED_GENDER]?.includes("Transgender")}
            onChange={handleGenderChange}
            disabled={userData[HARMED_GENDER]?.includes("Prefer not to say")}
            tile
          />
          <Checkbox
            id="anotherGender"
            value="Another gender"
            name="gender"
            label="Another gender (specify)"
            checked={userData[HARMED_GENDER]?.includes("Another gender")}
            onChange={handleGenderChange}
            disabled={userData[HARMED_GENDER]?.includes("Prefer not to say")}
            tile
          />
          <Checkbox
            id="naGender"
            value="Prefer not to say"
            name="gender"
            label="Prefer not to say"
            checked={userData[HARMED_GENDER]?.includes("Prefer not to say")}
            onChange={handleGenderChange}
            tile
          />
        </Fieldset>
      </FormGroup>
      {userData[HARMED_GENDER]?.includes("Another gender") && (
        <FormGroup>
          <Label htmlFor="gender-specify">Specify gender</Label>
          <TextInput
            id="gender-specify"
            name="gender-specify"
            onChange={handleGenderSpecifyChange}
          />
        </FormGroup>
      )}
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
