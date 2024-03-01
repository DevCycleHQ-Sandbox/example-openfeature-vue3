<script setup>
/*
    |
    |--------------------------------------------------------------------------
    | Remove DevCycle specific imports
    |--------------------------------------------------------------------------
    | This import is used by the DevCycle logging which will not work with the Featbit Provider. 
    |
    | import { dvcDefaultLogger } from "@devcycle/js-client-sdk" 
    | 
    */

import AppDescription from "./components/AppDescription.vue";
import ToggleBot from "./components/ToggleBot.vue";
</script>

<script>
/*
    |
    |--------------------------------------------------------------------------
    | Update Provider Instantiation File Name
    |--------------------------------------------------------------------------
    | The provider.js file is the file that contains the setup for the Featbit Provider and should be imported instead of the devcycle.js file.
    |
    | import { setUpOpenFeature } from "./devcycle.js";
    | 
    */

import { setUpOpenFeature } from "./provider.js";

export default {
  data() {
    return {
      initialized: false,
      componentKey: 0,
      openFeatureClient: null,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
  async mounted() {
    this.openFeatureClient = await setUpOpenFeature();
    if (this.openFeatureClient) {
      this.initialized = true;
    }

    this.openFeatureClient.addHandler("PROVIDER_CONFIGURATION_CHANGED", () => {
      this.forceRerender();
      console.log("Provider configuration changed");
    });
  },
};
</script>

<template>
  <div className="App">
    <div className="App-header">
      <p>Demo Application</p>
      <img
        height="46"
        src="/devcycle-togglebot-full-colour.svg"
        alt="DevCycle"
      />
    </div>

    <div v-if="initialized" className="App-wrapper" :key="componentKey">
      <ToggleBot :openFeatureClient="openFeatureClient" />
      <AppDescription :openFeatureClient="openFeatureClient" />
    </div>
    <div v-else>
      <h2>Initializing...</h2>
    </div>

    <a
      className="App-link"
      href="https://docs.devcycle.com/sdk/client-side-sdks/javascript/"
      target="_blank"
      rel="noopener noreferrer"
    >
      DevCycle JS SDK Docs
    </a>
  </div>
</template>
