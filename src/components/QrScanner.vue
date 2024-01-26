<script setup>
import { ref, defineEmits } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";

const emit = defineEmits(['onError', 'onDetect']);

// data
const result = ref("");
const error = ref("");

// methods
const onDetect = (detectedCodes) => {
  const [firstCode] = detectedCodes;
  emit('onDetect', firstCode.rawValue);
  result.value = firstCode.rawValue;
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
  emit('onError', error.value);
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
</script>

<template>
  <div>
    <!--
    <p class="error">{{ error }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>
    -->
    <qrcode-stream
      :constraints="'user'"
      :track="drawOutline"
      @detect="onDetect"
      @error="onError"
    />
  </div>
</template>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
