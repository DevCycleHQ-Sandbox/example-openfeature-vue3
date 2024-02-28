<script>
import { getFeatbitProvider } from "../devcycle.js";

export default {
  name: "ToggleBot",
  props: {
    openFeatureClient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      spinSpeed: "off",
      shouldWink: false,
    };
  },
  methods: {
    getMessage: (spinSpeed) => {
      switch (spinSpeed) {
        case "slow":
          return "Awesome, look at you go!";
        case "fast":
          return "This is fun!";
        case "off-axis":
          return "...I'm gonna be sick...";
        case "surprise":
          return "What the unicorn?";
        default:
          return "Hello! Nice to meet you.";
      }
    },
    getImageSource: (spinSpeed, shouldWink) => {
      if (spinSpeed === "surprise") return "unicorn.svg";
      return shouldWink ? "togglebot-wink.png" : "togglebot.png";
    },
    getVariationName: () => {
      const devcycleProvider = getFeatbitProvider();
      const features = devcycleProvider.devcycleClient.allFeatures();
      return features["hello-togglebot"]?.variationName ?? "Default";
    },
  },
  mounted() {
    this.spinSpeed = this.openFeatureClient.getStringValue(
      "togglebot-speed",
      "off"
    );

    this.shouldWink = this.openFeatureClient.getBooleanValue(
      "togglebot-wink",
      false
    );
  },
};
</script>

<template>
  <div className="App-content">
    <div className="ToggleBot-message">"{{ getMessage(spinSpeed) }}"</div>
    <img
      :src="getImageSource(spinSpeed, shouldWink)"
      :class="`ToggleBot-logo spin-${spinSpeed}`"
      alt="togglebot"
    />
    <!-- <div className="ToggleBot-variation">
      Serving Variation: <b>"{{ getVariationName() }}"</b>
    </div> -->
  </div>
</template>
