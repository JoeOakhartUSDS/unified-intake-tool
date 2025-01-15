import { Form } from "@trussworks/react-uswds";
import { UserData } from "@/_contexts/UserDataProvider";
import NavigateBack from "./NavigateBack";
import NavigateNext from "./NavigateNext";
import { useRouter } from "next/navigation";
import { nextScreen } from "@/_utils/Navigation";
import { useEffect } from "react";

interface ScreenWithNavigationProps {
  screenName: string;
  userData: UserData;
  validate?: (event: React.ChangeEvent) => boolean;
  buttonText?: string;
  hideBack?: boolean;
  hideNext?: boolean;
  children: React.ReactNode;
}

export default function ScreenWithNavigation({
  screenName,
  userData,
  validate,
  buttonText,
  hideBack,
  hideNext,
  children,
}: ScreenWithNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      router.back();
      return false;
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

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
      {!hideBack && (
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
      <input type="submit" hidden />
    </Form>
  );
}
