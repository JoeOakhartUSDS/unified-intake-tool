"use client";

import { FileInput, Label, FormGroup } from "@trussworks/react-uswds";
import {
  PRODUCT_PHOTOS,
  useUserDataContext,
} from "@/_contexts/UserDataProvider";
import { ProductPhotosMetadata } from "./metadata";
import ScreenWithNavigation from "@/_components/ScreenWithNavigation";

export default function ProductPhotos() {
  const screenName = ProductPhotosMetadata.name;
  const { userData, updateUserData } = useUserDataContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData(PRODUCT_PHOTOS, event.target.value);
  };

  return (
    <ScreenWithNavigation userData={userData} screenName={screenName}>
      <FormGroup>
        <Label htmlFor="productPhotosFileInput">
          Upload product photos (optional)
          <div className="usa-hint margin-bottom-2" id="product-photos-hint">
            Include a photo of the product and any text on the package,
            including the barcode, lot number, and expiration dates.
          </div>
        </Label>
        <FileInput
          id="productPhotosFileInput"
          name="productPhotosFileInput"
          accept="image/*"
          aria-describedby="product-photos-hint"
          onChange={handleChange}
          multiple
        />
      </FormGroup>
    </ScreenWithNavigation>
  );
}
