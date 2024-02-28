<script setup>
import AppDescription from "./components/AppDescription.vue";
import ToggleBot from "./components/ToggleBot.vue";
</script>

<script>
import { setUpOpenFeature } from "./devcycle.js";

export default {
  data() {
    return {
      initialized: false,
      componentKey: 0,
      openFeatureClient: null, // Add a property to store the result
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
  async mounted() {
    /**
     * Initialize the DevCycle client with your SDK key and user
     */
    this.openFeatureClient = await setUpOpenFeature();

    if (this.openFeatureClient) {
      this.initialized = true;
    }

    // Update the app when DevCycle receives realtime updates from the dashboard
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
