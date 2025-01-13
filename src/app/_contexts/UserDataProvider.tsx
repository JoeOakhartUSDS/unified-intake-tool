"use client";

import React, { createContext, useState, useContext } from "react";

export const PRODUCT_TYPE = "productType";
export const SUBMISSION_TYPE = "submissionType";
export const BARCODE = "barcode";
export const NDC_NUMBER = "ndcNumber";
export const PRODUCT_PHOTOS = "productPhotos";
export const PRODUCT_NAME = "productName";
export const WHAT_HAPPENED = "whatHappened";
export const WHAT_HAPPENED_OUTCOME = "whatHappenedOutcome";
export const WHAT_HAPPENED_DIAGNOSIS = "whatHappenedDiagnosis";
export const PREVIOUSLY_REPORTED_TO_MANUFACTURER =
  "previouslyReportedToManufacturer";
export const EVENT_DATE = "eventDate";
export const EVENT_DATE_PRECISION = "eventDatePrecision";
export const HARMED_AGE = "harmedAge";
export const HARMED_AGE_UNIT = "harmedAgeUnit";
export const HARMED_GENDER = "harmedGender";
export const HARMED_GENDER_SPECIFY = "harmedGenderSpecify";
export const HARMED_MEDICAL = "harmedMedical";
export const CONTACT_PERMISSION = "contactPermission";
export const CONTACT_FIRST_NAME = "contactFirstName";
export const CONTACT_LAST_NAME = "contactLastName";
export const CONTACT_EMAIL = "contactEmail";
export const CONTACT_PHONE = "contactPhone";
export const ADDITIONAL_FILES = "additionalFiles";

export interface UserData {
  [key: string]: string | Array<string>;
}

export interface UserDataContextType {
  userData: UserData;
  updateUserData: (name: string, value: string | Array<string>) => void;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

export default function UserDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserData>({
    PRODUCT_TYPE: "",
    SUBMISSION_TYPE: [],
    BARCODE: "",
    NDC_NUMBER: "",
    PRODUCT_NAME: "",
    WHAT_HAPPENED: "",
    WHAT_HAPPENED_OUTCOME: [],
    WHAT_HAPPENED_DIAGNOSIS: "",
    PREVIOUSLY_REPORTED_TO_MANUFACTURER: "",
    EVENT_DATE: "",
    HARMED_AGE: "",
    HARMED_AGE_UNIT: "years",
    HARMED_GENDER: [],
    HARMED_GENDER_OTHER: "",
    HARMED_MEDICAL: "",
    CONTACT_PERMISSION: "",
    CONTACT_FIRST_NAME: "",
    CONTACT_LAST_NAME: "",
    CONTACT_EMAIL: "",
    CONTACT_PHONE: "",
    ADDITIONAL_FILES: "",
  });

  const updateUserData = (name: string, value: string | Array<string>) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("UserDataContext must be used within a UserDataProvider");
  }
  return context;
};
