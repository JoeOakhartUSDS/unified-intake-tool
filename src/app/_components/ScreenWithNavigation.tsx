import { Form } from "@trussworks/react-uswds";
import { UserData } from "@/_contexts/UserDataProvider";
import NavigateBack from "./NavigateBack";
import NavigateNext from "./NavigateNext";
import NavigateBackB from "./NavigateBackB";
import { useRouter } from "next/navigation";
import { nextScreen } from "@/_utils/Navigation";
import { useEffect } from "react";

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

  const handlePopState = (event: PopStateEvent) => {
    event.preventDefault();
    router.back();
    return false;
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, handlePopState]);

  const handleSubmit = (event: React.ChangeEvent) => {
    event.preventDefault();
    if (!validate || validate(event)) {
      router.push(nextScreen(screenName, userData));
    }
    return false;
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
