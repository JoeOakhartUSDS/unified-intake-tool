import { Html5QrcodeScanner } from "html5-qrcode";
import {
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
  QrDimensionFunction,
  QrDimensions,
} from "html5-qrcode/esm/core";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect } from "react";

interface Html5QrcodeScannerProps {
  fps?: number;
  qrbox?: number | QrDimensions | QrDimensionFunction;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  successCallback: QrcodeSuccessCallback;
  errorCallback?: QrcodeErrorCallback;
  id: string;
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Html5QrcodeScannerProps) => {
  const config: Html5QrcodeScannerConfig = {
    fps: props.fps ? props.fps : undefined,
    qrbox: props.qrbox ? props.qrbox : undefined,
    aspectRatio: props.aspectRatio ? props.aspectRatio : undefined,
    disableFlip:
      props.disableFlip === undefined ? undefined : props.disableFlip,
  };
  return config;
};

const Html5QrcodePlugin = (props: Html5QrcodeScannerProps) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.successCallback) {
      throw "successCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      props.id,
      config,
      verbose,
    );
    html5QrcodeScanner.render(props.successCallback, props.errorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [props]);

  return <div id={props.id} />;
};

export default Html5QrcodePlugin;
