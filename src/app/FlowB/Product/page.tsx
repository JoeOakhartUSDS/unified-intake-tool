"use client";

import {
  Checkbox,
  Radio,
  Fieldset,
  ErrorMessage,
  FormGroup,
  StepIndicator,
  StepIndicatorStep,
  Label,
} from "@trussworks/react-uswds";
import {
  SUBMISSION_TYPE,
  PRODUCT_TYPE,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { ProductMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function Product() {
  const screenName = ProductMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(PRODUCT_TYPE, event.target.value);
  };

  const handleReportTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    if (!isValidType() || !isValidReportType()) {
      event.preventDefault();
      setValidated(true);
      return false;
    }
    return true;
  };

  const isValidType = () => {
    return userData[PRODUCT_TYPE] && userData[PRODUCT_TYPE].length > 0;
  };

  const isValidReportType = () => {
    return userData[SUBMISSION_TYPE] && userData[SUBMISSION_TYPE].length > 0;
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
        <StepIndicatorStep label="The product" status="current" />
        <StepIndicatorStep label="What happened" />
        <StepIndicatorStep label="Who was harmed (optional)" />
        <StepIndicatorStep label="How to reach you (optional)" />
      </StepIndicator>
      <FormGroup error={validated && !isValidType()}>
        <Label htmlFor="ProductType">
          What was the product?
          <abbr
            title="required"
            className="usa-hint usa-hint--required text-no-underline"
          >
            *
          </abbr>
        </Label>
        {validated && !isValidType() && (
          <ErrorMessage id="product-type-error">
            Please select one of the following options.
          </ErrorMessage>
        )}
        <Fieldset
          legend="What was the product?"
          legendStyle="srOnly"
          className="margin-bottom-3"
          validationStatus={validated && !isValidType() ? "error" : ""}
        >
          <Radio
            id="product-type-cosmetic"
            value="Cosmetic"
            name="ProductType"
            label="Cosmetic"
            checked={userData[PRODUCT_TYPE] === "Cosmetic"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-drug"
            value="Drug"
            name="ProductType"
            label="Drug"
            checked={userData[PRODUCT_TYPE] === "Drug"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-supplement"
            value="Dietary Supplement"
            name="ProductType"
            label="Dietary Supplement"
            checked={userData[PRODUCT_TYPE] === "Dietary Supplement"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-food"
            value="Food"
            name="ProductType"
            label="Food"
            checked={userData[PRODUCT_TYPE] === "Food"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-device"
            value="Medical Device"
            name="ProductType"
            label="Medical Device"
            checked={userData[PRODUCT_TYPE] === "Medical Device"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-tobacco"
            value="Tobacco"
            name="ProductType"
            label="Tobacco"
            checked={userData[PRODUCT_TYPE] === "Tobacco"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-vaccine"
            value="Vaccine"
            name="ProductType"
            label="Vaccine"
            checked={userData[PRODUCT_TYPE] === "Vaccine"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-veterinary"
            value="Veterinary"
            name="ProductType"
            label="Veterinary (animal food, drug, or device)"
            checked={userData[PRODUCT_TYPE] === "Veterinary"}
            onChange={handleTypeChange}
          />
          <Radio
            id="product-type-other"
            value="Other"
            name="ProductType"
            label="Other / Don't know"
            checked={userData[PRODUCT_TYPE] === "Other"}
            onChange={handleTypeChange}
          />
        </Fieldset>
      </FormGroup>
      <FormGroup error={validated && !isValidReportType()}>
        <Label htmlFor="SubmissionType">
          What happened?
          <abbr
            title="required"
            className="usa-hint usa-hint--required text-no-underline"
          >
            *
          </abbr>
          <br />
          <span className="usa-hint">Select all that apply</span>
        </Label>
        {validated && !isValidReportType() && (
          <ErrorMessage id="report-type-error">
            Please select one or more of the following options.
          </ErrorMessage>
        )}
        <Fieldset
          legend="Tell us what happened"
          legendStyle="srOnly"
          className="margin-bottom-3"
        >
          <Checkbox
            id="someoneWasHarmedSubmissionType"
            value="someoneWasHarmedSubmissionType"
            name="SubmissionType"
            label="Someone was harmed"
            checked={userData[SUBMISSION_TYPE]?.includes(
              "someoneWasHarmedSubmissionType",
            )}
            onChange={handleReportTypeChange}
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
            onChange={handleReportTypeChange}
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
            onChange={handleReportTypeChange}
            tile
          />
          <Checkbox
            id="illegalActivityOrFraudSubmissionType"
            value="illegalActivityOrFraudSubmissionType"
            name="SubmissionType"
            label="Illegal activity or fraud"
            checked={userData[SUBMISSION_TYPE]?.includes(
              "illegalActivityOrFraudSubmissionType",
            )}
            onChange={handleReportTypeChange}
            tile
          />
        </Fieldset>
      </FormGroup>
    </ScreenWithNavigation>
  );
}
