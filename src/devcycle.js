import { FbProvider } from "@featbit/openfeature-provider-js-client";
import { OpenFeature } from "@openfeature/web-sdk";
import { users } from "./users";

let featbitProvider;

// Create DevCycle client and set up event listeners
export const setUpOpenFeature = async () => {
  const DEVCYCLE_CLIENT_SDK_KEY = import.meta.env.VITE_DEVCYCLE_CLIENT_SDK_KEY;
  if (!DEVCYCLE_CLIENT_SDK_KEY) {
    alert(
      "Set your VITE_DEVCYCLE_CLIENT_SDK_KEY environment variable to use the DevCycle JavaScript SDK."
    );
  }
  //   // Initialize the DevCycle client with your SDK key and user
  const featbitOptions = {
    secret: DEVCYCLE_CLIENT_SDK_KEY,
    api: "https://featbit-tio-eu-eval.azurewebsites.net",
    user: users[0],
  };

  featbitProvider = new FbProvider(featbitOptions);

  await OpenFeature.setProviderAndWait(featbitProvider);

  return OpenFeature.getClient();
};

export function getFeatbitProvider() {
  return featbitProvider;
}
