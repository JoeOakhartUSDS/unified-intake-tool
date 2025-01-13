"use client";

import {
  Radio,
  Fieldset,
  ErrorMessage,
  FormGroup,
  Label,
} from "@trussworks/react-uswds";
import { PRODUCT_TYPE, useUserDataContext } from "@/_contexts/UserDataProvider";
import { useEffect, useState } from "react";
import { ProductTypeMetadata } from "./metadata";
import { useNavigationContext } from "@/_contexts/NavigationProvider";

export default function ProductType() {
  const screenName = ProductTypeMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [validated, setValidated] = useState(false);
  const { setCurrentScreen } = useNavigationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(PRODUCT_TYPE, event.target.value);
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
    return userData[PRODUCT_TYPE] && userData[PRODUCT_TYPE].length > 0;
  };

  useEffect(() => {
    setCurrentScreen(screenName, validate);
  });

  return (
    <>
      <FormGroup error={validated && !isValid()}>
        <Label htmlFor="ProductType">
          What was the product?
          <abbr
            title="required"
            className="usa-hint usa-hint--required text-no-underline"
          >
            *
          </abbr>
        </Label>
        {validated && !isValid() && (
          <ErrorMessage id="product-type-error">
            Please select one of the following options.
          </ErrorMessage>
        )}
        <Fieldset
          legend="What was the product?"
          legendStyle="srOnly"
          className="margin-bottom-3"
          validationStatus={validated && !isValid() ? "error" : ""}
        >
          <Radio
            id="product-type-cosmetic"
            value="Cosmetic"
            name="ProductType"
            label="Cosmetic"
            checked={userData[PRODUCT_TYPE] === "Cosmetic"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-drug"
            value="Drug"
            name="ProductType"
            label="Drug"
            checked={userData[PRODUCT_TYPE] === "Drug"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-supplement"
            value="Dietary Supplement"
            name="ProductType"
            label="Dietary Supplement"
            checked={userData[PRODUCT_TYPE] === "Dietary Supplement"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-food"
            value="Food"
            name="ProductType"
            label="Food"
            checked={userData[PRODUCT_TYPE] === "Food"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-device"
            value="Medical Device"
            name="ProductType"
            label="Medical Device"
            checked={userData[PRODUCT_TYPE] === "Medical Device"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-tobacco"
            value="Tobacco"
            name="ProductType"
            label="Tobacco"
            checked={userData[PRODUCT_TYPE] === "Tobacco"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-vaccine"
            value="Vaccine"
            name="ProductType"
            label="Vaccine"
            checked={userData[PRODUCT_TYPE] === "Vaccine"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-veterinary"
            value="Veterinary"
            name="ProductType"
            label="Veterinary (animal food, drug, or device)"
            checked={userData[PRODUCT_TYPE] === "Veterinary"}
            onChange={handleChange}
          />
          <Radio
            id="product-type-other"
            value="Other"
            name="ProductType"
            label="Other / Don't know"
            checked={userData[PRODUCT_TYPE] === "Other"}
            onChange={handleChange}
          />
        </Fieldset>
      </FormGroup>
    </>
  );
}
