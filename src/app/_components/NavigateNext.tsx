import NextLink from "next/link";
import { Link } from "@trussworks/react-uswds";
import { nextScreen } from "@/_utils/Navigation";
import { UserData } from "@/_contexts/UserDataProvider";

interface NavigateNextProps {
  screenName: string;
  userData: UserData;
  validate?: (event: React.ChangeEvent) => boolean;
  buttonText?: string;
}

const NavigateNext = ({
  screenName,
  userData,
  validate,
  buttonText,
}: NavigateNextProps) => (
  <div style={{ width: "100%", textAlign: "center" }}>
    <NextLink href={nextScreen(screenName, userData)} passHref legacyBehavior>
      <Link
        onClick={validate}
        className="usa-button padding-left-6 padding-right-6"
        variant="unstyled"
        allowSpacebarActivation
      >
        {buttonText ? buttonText : "Continue"}
      </Link>
    </NextLink>
  </div>
);

export default NavigateNext;
