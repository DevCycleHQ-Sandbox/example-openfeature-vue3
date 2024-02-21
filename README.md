# OpenFeature Web SDK Example App with Vue.js

An example app built using [Vue.js](https://vuejs.org/) and the [OpenFeature Web SDK](https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-openfeature)

## Creating a Demo Feature

This example app requires that your project has a feature with the expected variables, as well as some simple targeting rules.

#### ⇨ [Click here](https://app.devcycle.com/r/create?resource=feature&key=hello-togglebot) to automatically create the feature in your project ⇦

When you run the example app and switch your identity between users, you'll be able to see the feature's different variations.

## Running the Example

### Setup

- Run `npm install` in the project directory to install dependencies
- Create a `.env` file and set `VITE_DEVCYCLE_CLIENT_SDK_KEY` to the SDK Key for your environment.\
  You can find this under [Settings > Environments](https://app.devcycle.com/r/environments) on the DevCycle dashboard. [Learn more about environments](https://docs.devcycle.com/essentials/environments).

### Development

`npm run start`

Compile and Hot-Reload for Development

### Building

`npm run build`

Compile and Minify for Production

### Testing

`npm run test`

Run Unit Tests with [Vitest](https://vitest.dev/)

## Documentation

For more information about using the DevCycle JS SDK, see [the documentation](https://docs.devcycle.com/sdk/client-side-sdks/javascript/)
