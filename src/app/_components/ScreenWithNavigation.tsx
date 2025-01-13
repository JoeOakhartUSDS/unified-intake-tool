import { Form } from "@trussworks/react-uswds";
import { UserData } from "@/_contexts/UserDataProvider";
import NavigateBack from "./NavigateBack";
import NavigateNext from "./NavigateNext";
import NavigateBackB from "./NavigateBackB";
import { useRouter } from "next/navigation";
import { nextScreen } from "@/_utils/Navigation";

interface ScreenWithNavigationProps {
  screenName: string;
  userData: UserData;
  validate?: (event: React.ChangeEvent) => boolean;
  buttonText?: string;
  isBottomBack?: boolean;
  hideBack?: boolean;
  hideNext?: boolean;
  children: React.ReactNode;
}

export default function ScreenWithNavigation({
  screenName,
  userData,
  validate,
  buttonText,
  isBottomBack,
  hideBack,
  hideNext,
  children,
}: ScreenWithNavigationProps) {
  const router = useRouter();
  const handleSubmit = (event: React.ChangeEvent) => {
    if (!validate || validate(event)) {
      router.push(nextScreen(screenName, userData));
    }
  };

  return (
    <Form
      large={true}
      className="padding-9 padding-top-0"
      onSubmit={handleSubmit}
    >
      {!hideBack && !isBottomBack && (
        <NavigateBack userData={userData} screenName={screenName} />
      )}
      {children}
      {!hideNext && (
        <NavigateNext
          userData={userData}
          screenName={screenName}
          validate={validate}
          buttonText={buttonText}
        />
      )}
      {!hideBack && isBottomBack && (
        <NavigateBackB userData={userData} screenName={screenName} />
      )}
      <input type="submit" hidden />
    </Form>
  );
}
