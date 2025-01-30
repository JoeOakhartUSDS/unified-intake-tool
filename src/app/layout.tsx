import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import { GovBanner } from "@trussworks/react-uswds";
import FakeHeader from "@/components/FakeHeader";
import FakeFooter from "@/components/FakeFooter";
import UserDataProvider from "@/_contexts/UserDataProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unified Intake Tool",
  description: "Unified Intake Tool prototype for FDA by USDS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        <GovBanner />
        <FakeHeader />
        <UserDataProvider>
          <main id="main-content">{children}</main>
        </UserDataProvider>
        <FakeFooter />
      </body>
    </html>
  );
}
