"use client";

import { FormGroup, Label, TextInput } from "@trussworks/react-uswds";
import { BARCODE, useUserDataContext } from "@/_contexts/UserDataProvider";
import NavigateSkip from "@/_components/NavigateSkip";
import { ScanBarcodeMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";
import Html5QrcodePlugin from "@/_components/Html5QrcodePlugin";
import { useState } from "react";

export default function ScanBarcode() {
  const screenName = ScanBarcodeMetadata.name;
  const { userData, updateUserData } = useUserDataContext();
  const [scanSuccessful, setScanSuccessful] = useState(false);

  const handleBarcodeScan = (decodedText: string) => {
    setScanSuccessful(true);
    updateUserData(BARCODE, decodedText);
  };

  const handleBarcodeTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateUserData(BARCODE, event.target.value);
  };

  return (
    <ScreenWithNavigation userData={userData} screenName={screenName}>
      {!scanSuccessful && (
        <>
          <NavigateSkip userData={userData} screenName={screenName} />
          <FormGroup>
            <Label htmlFor="barcodeFileInput">
              Scan barcode (optional)
              <div className="usa-hint margin-bottom-2" id="barcode-hint">
                Find the barcode on the package. Open your camera application
                and take a photo of the barcode.
                <br />
                <br />
                Make sure there is good lighting and the barcode is fully
                visible in the frame.
              </div>
            </Label>
            <Html5QrcodePlugin
              successCallback={handleBarcodeScan}
              id="barcodeFileInput"
            />
          </FormGroup>
        </>
      )}
      {scanSuccessful && (
        <FormGroup>
          <Label htmlFor="barcodeTextInput">Confirm barcode (optional)</Label>
          <TextInput
            id="barcodeTextInput"
            name="barcodeTextInput"
            value={userData[BARCODE]}
            onChange={handleBarcodeTextChange}
            type="text"
          />
        </FormGroup>
      )}
    </ScreenWithNavigation>
  );
}
