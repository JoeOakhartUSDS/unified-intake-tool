"use client";

import { FormGroup, Label, TextInput } from "@trussworks/react-uswds";
import { BARCODE, useUserDataContext } from "@/_contexts/UserDataProvider";
import { BarcodeTextMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function BarcodeText() {
  const screenName = BarcodeTextMetadata.name;
  const { userData, updateUserData } = useUserDataContext();

  const handleBarcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(BARCODE, event.target.value);
  };

  return (
    <ScreenWithNavigation userData={userData} screenName={screenName}>
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
    </ScreenWithNavigation>
  );
}
