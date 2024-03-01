/*
    |
    |--------------------------------------------------------------------------
    | Remove DevCycle specific imports
    |--------------------------------------------------------------------------
    | This import is DevCycle specific and is not longer needed when using a different provider. 
    |
    | import DevCycleProvider from "@devcycle/openfeature-web-provider"; 
    | 
    */

import { FbProvider } from "@featbit/openfeature-provider-js-client";
import { OpenFeature } from "@openfeature/web-sdk";
import { users } from "./users";

/*
    |
    |--------------------------------------------------------------------------
    | Update provider variable to make it more generic
    |--------------------------------------------------------------------------
    |
    | let devcycleProvider; // Change this to make variable more generic
    | 
    */

let provider;

export const setUpOpenFeature = async () => {
  /*
|
|--------------------------------------------------------------------------
| Update the SDK_KEY to make it more generic
|--------------------------------------------------------------------------
| 
|  const DEVCYCLE_CLIENT_SDK_KEY = import.meta.env.VITE_DEVCYCLE_CLIENT_SDK_KEY;
|
|  if (!DEVCYCLE_CLIENT_SDK_KEY) {
|    alert(
|      "Set your VITE_DEVCYCLE_CLIENT_SDK_KEY environment variable to use the DevCycle JavaScript SDK."
|    );
|  }
|
*/

  const SDK_KEY = import.meta.env.VITE_SDK_KEY;
  if (!SDK_KEY) {
    alert("Set your SDK_KEY environment variable to OpenFeature Web SDK.");
  }

  /*
|
|--------------------------------------------------------------------------
| Update the options object for capability to use multiple providers
|--------------------------------------------------------------------------
| 
|  const devcycleOptions = { logLevel: "debug" };
|
*/

  const providerOptions = {
    secret: SDK_KEY,
    api: "https://featbit-tio-eu-eval.azurewebsites.net",
    user: users[0],
  };

  /*
|
|--------------------------------------------------------------------------
| Update the intantiation of the provider to make it work with the new provider
|--------------------------------------------------------------------------
| 
|  devcycleProvider = new DevCycleProvider(
|    DEVCYCLE_CLIENT_SDK_KEY,
|    devcycleOptions
|  );
| await OpenFeature.setContext(users[0]);
|
*/

  provider = new FbProvider(providerOptions);

  await OpenFeature.setProviderAndWait(provider);

  return OpenFeature.getClient();
};

/*
|
|--------------------------------------------------------------------------
| Update the getProvider function to return a generic provider
|--------------------------------------------------------------------------
| 
| export function getDevCycleProvider() {
|   return devcycleProvider;
| }
|
*/

export function getProvider() {
  return provider;
}
