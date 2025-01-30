"use client";

import {
  FileInput,
  ErrorMessage,
  FormGroup,
  StepIndicator,
  StepIndicatorStep,
  DateInputGroup,
  DateInput,
  Label,
  Select,
  TextInput,
  TextInputMask,
  CharacterCount,
  Fieldset,
  Checkbox,
  Radio,
} from "@trussworks/react-uswds";
import {
  PRODUCT_PHOTOS,
  PRODUCT_NAME,
  NDC_NUMBER,
  WHAT_HAPPENED,
  EVENT_DATE,
  EVENT_DATE_PRECISION,
  ADDITIONAL_FILES,
  PRODUCT_TYPE,
  SUBMISSION_TYPE,
  useUserDataContext,
  WHAT_HAPPENED_OUTCOME,
  WHAT_HAPPENED_DIAGNOSIS,
  PREVIOUSLY_REPORTED_TO_MANUFACTURER,
  BARCODE,
} from "@/_contexts/UserDataProvider";
import { useEffect, useState } from "react";
import { WhatHappenedBMetadata } from "./metadata";
import { z } from "zod";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";
import RequiredAsterisk from "@/_components/RequiredAsterisk";

export default function WhatHappenedB() {
  const screenName = WhatHappenedBMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const isProductNameRequired =
    userData[SUBMISSION_TYPE]?.includes(
      "someoneUsedAProductIncorrectlySubmissionType",
    ) ||
    userData[SUBMISSION_TYPE]?.includes(
      "somethingWasWrongWithAProductSubmissionType",
    );

  const handleProductPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(PRODUCT_PHOTOS, event.target.value);
  };

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(PRODUCT_NAME, event.target.value);
  };

  const handleBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(BARCODE, event.target.value);
  };

  const handleNDCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(NDC_NUMBER, event.target.value.replaceAll("-", ""));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(WHAT_HAPPENED, event.target.value);
  };

  const handleWhatHappenedDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(WHAT_HAPPENED, event.target.value);
  };

  const handleAdditionalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(ADDITIONAL_FILES, event.target.value);
  };

  const handlePreviouslyReportedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(PREVIOUSLY_REPORTED_TO_MANUFACTURER, event.target.value);
  };

  const validate = (event: React.ChangeEvent) => {
    if (
      !isProductNameValid() ||
      !isNDCValid() ||
      !isDescriptionValid() ||
      !isDateValid()
    ) {
      event.preventDefault();
      setValidated(true);
      return false;
    }
    return true;
  };

  const isProductNameValid = () => {
    // Only validate that the product name isn't empty if it's required.
    return (
      !isProductNameRequired ||
      (userData[PRODUCT_NAME] && userData[PRODUCT_NAME].length > 0)
    );
  };

  // Testing for a string consisting only of digits because the number may contain leading 0's
  const ndcSchema = z
    .string()
    .min(10)
    .max(11)
    .refine((value) => /^[0-9]*$/.test(value ?? ""));

  const isNDCValid = () => {
    return (
      !userData[NDC_NUMBER] || ndcSchema.safeParse(userData[NDC_NUMBER]).success
    );
  };

  const isDescriptionValid = () => {
    return userData[WHAT_HAPPENED] && userData[WHAT_HAPPENED].length > 0;
  };

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    // Pre-populate date from existing data if applicable.
    if (userData[EVENT_DATE] && typeof userData[EVENT_DATE] === "string") {
      const currentDate = new Date(userData[EVENT_DATE]);
      switch (userData[EVENT_DATE_PRECISION]) {
        case "day":
          setDay(currentDate.getDate().toString());
        case "month":
          setMonth((currentDate.getMonth() + 1).toString());
        case "year":
          setYear(currentDate.getFullYear().toString());
        default:
      }
    }
  }, [userData]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
    updateUserData(EVENT_DATE, formatDate(day, event.target.value, year));
  };
  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(event.target.value);
    updateUserData(EVENT_DATE, formatDate(event.target.value, month, year));
  };
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
    updateUserData(EVENT_DATE, formatDate(day, month, event.target.value));
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

  const formatDate = (day: string, month: string, year: string) => {
    const result = new Date();
    let precision = "year";
    if (day) {
      result.setDate(parseInt(day));
      precision = "day";
    }
    if (month) {
      result.setMonth(parseInt(month) - 1);
      if (!day) {
        precision = "month";
      }
    }
    if (year) {
      result.setFullYear(parseInt(year));
    }
    updateUserData(EVENT_DATE_PRECISION, precision);
    return result.toDateString();
  };

  const autoCompleteYear = () => {
    // Auto-complete 2-digit years into 4-digit years.
    if (year && year.length < 3) {
      if (parseInt(year) > parseInt(currentYear.slice(2))) {
        // 2-digit years greater than the current 2-digit year are in 1900.
        setYear("19" + year);
      } else {
        // 2-digit years less than the current 2-digit year are in 2000.
        setYear("20" + year);
      }
    }
  };

  // The FDA cannot accept complaints occuring before the agency was founded.
  // Or complaints from the future.
  const yearSchema = z.coerce.number().min(1906).max(parseInt(currentYear));
  const dateSchema = z.coerce
    .date()
    .min(new Date("1906-06-30"))
    .max(new Date());

  const isDateValid = () => {
    // If a day is provided, ensure that the date is valid.
    if (day) {
      return (
        month &&
        year &&
        dateSchema.safeParse(formatDate(day, month, year)).success
      );
    } else {
      // If a day is not provided, require a valid year.
      return yearSchema.safeParse(year).success;
    }
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
        <StepIndicatorStep label="What happened" status="current" />
        <StepIndicatorStep label="Who was harmed (optional)" />
        <StepIndicatorStep label="How to reach you (optional)" />
      </StepIndicator>
      <FormGroup>
        <Label htmlFor="productPhotosFileInput">
          Upload product photos (optional)
          <div id="product-photos-hint" className="usa-hint">
            Include a photo of the product and any text on the package,
            including the barcode, lot number, and expiration dates.
          </div>
        </Label>
        <FileInput
          id="productPhotosFileInput"
          name="productPhotosFileInput"
          accept="image/*"
          aria-describedby="product-photos-hint"
          onChange={handleProductPhotoChange}
          multiple
        />
      </FormGroup>
      <FormGroup error={validated && !isProductNameValid()}>
        <Label htmlFor="productName">
          Product name
          {isProductNameRequired && <RequiredAsterisk />}
          <br />
          <span className="usa-hint">
            Include as much detail as possible, including the brand.
          </span>
        </Label>
        {validated && !isProductNameValid() && (
          <ErrorMessage id="product-type-error">
            Please provide the product name.
          </ErrorMessage>
        )}
        <TextInput
          id="productName"
          name="productName"
          type="text"
          value={userData[PRODUCT_NAME]}
          onChange={handleProductNameChange}
          required={isProductNameRequired}
          aria-required={isProductNameRequired}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="barcode">
          UPC number (optional)
          <br />
          <span className="usa-hint">
            This 12-digit number is on the barcode of the product or packaging.
          </span>
        </Label>
        <TextInput
          id="barcode"
          name="barcode"
          type="text"
          value={userData[BARCODE]}
          onChange={handleBarcodeChange}
        />
      </FormGroup>
      {userData[PRODUCT_TYPE] === "Drug" && (
        <FormGroup
          className="margin-bottom-3"
          error={validated && !isNDCValid()}
        >
          <Label title="National Drug Code" htmlFor="ndcNumber">
            NDC number (optional)
            <br />
            <span className="usa-hint">
              The code is 10 or 11 numbers, such as 12345-6789-01.
            </span>
          </Label>
          {validated && !isNDCValid() && (
            <ErrorMessage id="ndc-error">
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
            onChange={handleNDCChange}
          />
        </FormGroup>
      )}
      <FormGroup
        className="margin-bottom-3"
        error={validated && !isDescriptionValid()}
      >
        <Label htmlFor="whatHappened">
          Describe what happened, step by step, and the timing
          <RequiredAsterisk />
          <br />
          <span className="usa-hint">
            When first using the product, how long did it take before problems
            started, and did issues go away after stopping the product?
          </span>
        </Label>
        {validated && !isDescriptionValid() && (
          <ErrorMessage id="description-error">
            Please describe what happened.
          </ErrorMessage>
        )}
        <CharacterCount
          id="whatHappened"
          name="whatHappened"
          isTextArea={true}
          aria-describedby="whatHappened-info whatHappenedHint"
          value={userData[WHAT_HAPPENED]}
          onChange={handleDescriptionChange}
          maxLength={4000}
          required
          aria-required="true"
        />
      </FormGroup>
      <FormGroup error={validated && !isDateValid()}>
        <Label htmlFor="eventDateMonth" className="margin-bottom-neg-2">
          When did this happen?
          <RequiredAsterisk />
          <br />
          <span className="usa-hint">
            For example: October 1, 2024
            <br />
            If you don&apos;t know, give an approximate date.
          </span>
        </Label>
        {validated && !isDateValid() && (
          <ErrorMessage id="event-date-error" className="margin-top-1">
            Please provide the date this happened.
          </ErrorMessage>
        )}
        <DateInputGroup
          legend="When did this happen?"
          legendStyle="srOnly"
          className="margin-bottom-3"
        >
          <FormGroup className="usa-form-group--month usa-form-group--select">
            <Label htmlFor="eventDateMonth">Month</Label>
            <Select
              id="eventDateMonth"
              name="eventDateMonth"
              value={month}
              defaultValue={month}
              onChange={handleMonthChange}
            >
              <option>- Select -</option>
              <option value="1">01 - January</option>
              <option value="2">02 - February</option>
              <option value="3">03 - March</option>
              <option value="4">04 - April</option>
              <option value="5">05 - May</option>
              <option value="6">06 - June</option>
              <option value="7">07 - July</option>
              <option value="8">08 - August</option>
              <option value="9">09 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </Select>
          </FormGroup>
          <DateInput
            id="eventDateDay"
            name="eventDateDay"
            label="Day"
            unit="day"
            maxLength={2}
            placeholder="DD"
            value={day}
            onChange={handleDayChange}
          />
          <DateInput
            id="eventDateYear"
            name="eventDateYear"
            label="Year*"
            unit="year"
            maxLength={4}
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
            onBlur={autoCompleteYear}
            required
            aria-required="true"
          />
        </DateInputGroup>
      </FormGroup>
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
      {(userData[WHAT_HAPPENED_OUTCOME]?.includes("Hospitalization") ||
        userData[WHAT_HAPPENED_OUTCOME]?.includes("Death")) && (
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
      <FormGroup>
        <Label htmlFor="additionalFileInput">
          Upload any additional information (optional)
          <div id="additional-files-hint" className="usa-hint">
            This may include medical records.
          </div>
        </Label>
        <FileInput
          id="additionalFileInput"
          name="additionalFileInput"
          aria-describedby="additional-filesgit a-hint"
          onChange={handleAdditionalFileChange}
          multiple
        />
      </FormGroup>
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
