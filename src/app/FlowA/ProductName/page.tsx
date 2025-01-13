"use client";

import {
  TextInput,
  Label,
  FormGroup,
  ErrorMessage,
} from "@trussworks/react-uswds";
import {
  PRODUCT_NAME,
  SUBMISSION_TYPE,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { useState } from "react";
import { ProductNameMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function ProductName() {
  const screenName = ProductNameMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);

  const isRequired =
    userData[SUBMISSION_TYPE]?.includes(
      "someoneUsedAProductIncorrectlySubmissionType",
    ) ||
    userData[SUBMISSION_TYPE]?.includes(
      "somethingWasWrongWithAProductSubmissionType",
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(PRODUCT_NAME, event.target.value);
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
    // Only validate that the field isn't empty if it's required.
    return (
      !isRequired ||
      (userData[PRODUCT_NAME] && userData[PRODUCT_NAME].length > 0)
    );
  };

  return (
    <ScreenWithNavigation
      userData={userData}
      screenName={screenName}
      validate={validate}
    >
      <FormGroup error={validated && !isValid()}>
        <Label>
          Product name
          {isRequired && (
            <abbr
              title="required"
              className="usa-hint usa-hint--required text-no-underline"
            >
              *
            </abbr>
          )}
          <br />
          <span className="usa-hint">
            Include as much detail as possible, including the brand.
          </span>
        </Label>
        {validated && !isValid() && (
          <ErrorMessage id="product-type-error">
            Please provide the product name.
          </ErrorMessage>
        )}
        <TextInput
          id="productName"
          name="productName"
          type="text"
          value={userData[PRODUCT_NAME]}
          onChange={handleChange}
          required
        />
      </FormGroup>
    </ScreenWithNavigation>
  );
}
