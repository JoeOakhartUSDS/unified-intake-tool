"use client";

import { AdditionalFilesMetadata } from "@/FlowA/AdditionalFiles/metadata";
import { UserData } from "../_contexts/UserDataProvider";
import { ScreenMetadata } from "./ScreenMetadata";
import { ContactInfoMetadata } from "@/FlowA/ContactInfo/metadata";
import { EventDateMetadata } from "@/FlowA/EventDate/metadata";
import { HarmedPersonMetadata } from "@/FlowA/HarmedPerson/metadata";
import { NDCNumberMetadata } from "@/FlowA/NDCNumber/metadata";
import { ProductNameMetadata } from "@/FlowA/ProductName/metadata";
import { ProductPhotosMetadata } from "@/FlowA/ProductPhotos/metadata";
import { ProductTypeMetadata } from "@/FlowA/ProductType/metadata";
import { ScanBarcodeMetadata } from "@/FlowA/ScanBarcode/metadata";
import { SubmissionTypeMetadata } from "@/FlowA/SubmissionType/metadata";
import { WhatHappenedMetadata } from "@/FlowA/WhatHappened/metadata";
import { FlowAMetadata } from "@/FlowA/metadata";
import { FlowBMetadata } from "@/FlowB/metadata";
import { LandingMetadata } from "@/metadata";
import { ReviewScreenMetadata } from "@/ReviewScreen/metadata";
import { ConfirmationScreenMetadata } from "@/ConfirmationScreen/metadata";
import Cookies from "js-cookie";
import { ProductMetadata } from "@/FlowB/Product/metadata";
import { WhatHappenedBMetadata } from "@/FlowB/WhatHappenedB/metadata";
import { HarmedPersonBMetadata } from "@/FlowB/HarmedPersonB/metadata";
import { ContactInfoBMetadata } from "@/FlowB/ContactInfoB/metadata";
import { WhatOutcomeMetadata } from "@/FlowA/WhatOutcome/metadata";
import { ReportedToManufacturerMetadata } from "@/FlowA/ReportedToManufacturer/metadata";

export const screenOrder = () => {
  return Cookies.get("CurrentFlow") === "B" ? screenOrderB : screenOrderA;
};

export const screenOrderA: Array<ScreenMetadata> = [
  LandingMetadata,
  FlowAMetadata,
  ProductTypeMetadata,
  SubmissionTypeMetadata,
  ScanBarcodeMetadata,
  NDCNumberMetadata,
  ProductPhotosMetadata,
  ProductNameMetadata,
  WhatHappenedMetadata,
  EventDateMetadata,
  WhatOutcomeMetadata,
  HarmedPersonMetadata,
  ContactInfoMetadata,
  AdditionalFilesMetadata,
  ReportedToManufacturerMetadata,
  ReviewScreenMetadata,
  ConfirmationScreenMetadata,
];

export const screenOrderB: Array<ScreenMetadata> = [
  LandingMetadata,
  FlowBMetadata,
  ProductMetadata,
  WhatHappenedBMetadata,
  HarmedPersonBMetadata,
  ContactInfoBMetadata,
  ReviewScreenMetadata,
  ConfirmationScreenMetadata,
];

export const previousScreen = (currentScreen: string, userData: UserData) => {
  // If current screen is the first screen that should be displayed, return an empty string
  let prevScreen = "";
  for (const screen of screenOrder()) {
    if (screen.name === currentScreen) {
      return prevScreen;
    } else if (screen.shouldDisplay(userData)) {
      prevScreen = screen.route;
    }
  }
  // If current screen is not found, return an empty string
  return "";
};

export const nextScreen = (currentScreen: string, userData: UserData) => {
  let foundScreen = false;
  for (const screen of screenOrder()) {
    if (screen.name === currentScreen) {
      foundScreen = true;
    } else if (foundScreen && screen.shouldDisplay(userData)) {
      return screen.route;
    }
  }
  // If current screen is not found or is the last screen that should be displayed, return an empty string
  return "";
};
