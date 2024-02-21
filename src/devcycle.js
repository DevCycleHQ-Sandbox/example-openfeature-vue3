import DevCycleProvider from "@devcycle/openfeature-web-provider";
import { OpenFeature } from "@openfeature/web-sdk";
import { users } from "./users";

let devcycleProvider;

// Create DevCycle client and set up event listeners
export const setUpOpenFeature = async () => {
  const DEVCYCLE_CLIENT_SDK_KEY = import.meta.env.VITE_DEVCYCLE_CLIENT_SDK_KEY;
  if (!DEVCYCLE_CLIENT_SDK_KEY) {
    alert(
      "Set your VITE_DEVCYCLE_CLIENT_SDK_KEY environment variable to use the DevCycle JavaScript SDK."
    );
  }
  // Initialize the DevCycle client with your SDK key and user
  const devcycleOptions = { logLevel: "debug" };
  devcycleProvider = new DevCycleProvider(
    DEVCYCLE_CLIENT_SDK_KEY,
    devcycleOptions
  );
  await OpenFeature.setContext(users[0]);
  await OpenFeature.setProviderAndWait(devcycleProvider);

  return OpenFeature.getClient();
};

export function getDevCycleProvider() {
  return devcycleProvider;
}
