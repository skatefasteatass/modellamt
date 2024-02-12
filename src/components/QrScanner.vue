<script setup>
import { ref, defineEmits } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import IconCameraSwitch from "./icons/IconCameraSwitch.vue";

const emit = defineEmits(["onError", "onDetect"]);

// data
const result = ref("");
const error = ref("");
const paused = ref(false);
const facingMode = ref("user");

// methods
const onDetect = async (detectedCodes) => {
  const [firstCode] = detectedCodes;
  emit("onDetect", firstCode.rawValue);
  result.value = firstCode.rawValue;

  paused.value = true;
  await timeout(500);
  paused.value = false;
};

const onError = (err) => {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
  emit("onError", error.value);
};

const drawOutline = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
};

function timeout(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function switchCam() {
  if (facingMode.value == "user") {
    facingMode.value = "environment";
  } else {
    facingMode.value = "user";
  }
}
</script>

<template>
  <div class="reader-container">
    <qrcode-stream
      :paused="paused"
      :constraints="{facingMode}"
      :track="drawOutline"
      @detect="onDetect"
      @error="onError"
    />
    <div class="switch" @click="switchCam()">
      <IconCameraSwitch />
    </div>
  </div>
</template>

<style scoped>
.reader-container {
  position: relative;
}
.switch {
  height: 34px;
  width: 34px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 5px;
  left: 5px;
}
.error {
  font-weight: bold;
  color: red;
}
</style>
