import NextLink from "next/link";
import { Link } from "@trussworks/react-uswds";
import { previousScreen } from "@/_utils/Navigation";
import { UserData } from "@/_contexts/UserDataProvider";

interface NavigateBackProps {
  screenName: string;
  userData: UserData;
}

const NavigateBackB = ({ screenName, userData }: NavigateBackProps) => (
  <div className="margin-bottom-2 margin-top-2 width-full text-center">
    <NextLink
      href={previousScreen(screenName, userData)}
      passHref
      legacyBehavior
    >
      <Link variant="nav" className="text-no-underline">
        Go back
      </Link>
    </NextLink>
  </div>
);

export default NavigateBackB;
