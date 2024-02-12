<script setup>
import { ref, computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useGamestateStore } from "@/stores/gamestate";
import QrScanner from "../components/QrScanner.vue";
import Button from "../components/Button.vue";
import ApiService from "@/apiService";

const router = useRouter();
const gamestateStore = useGamestateStore();

const props = defineProps(["mode"]);

var isError = ref(false);
var text = ref(
  "Die QR Code der Ressource (Unterseite des Spielsteins) scannen",
);
var deg = ref(0);
var cdBorderColor = ref('#D4DC62');

var remainingWidth = computed(() => {
  const perc = gamestateStore.budget / gamestateStore.startBudget;
  return perc * 310;
});

function displayError(e) {
  isError.value = true;
  text.value = e;
}

function sendCode(code) {
  console.log(props.mode);
  if (props.mode === "add") {
    sendCodeToAdd(code);
  } else if (props.mode === "remove") {
    sendCodeToRemove(code);
  }
}

function sendCodeToAdd(code) {
  ApiService.postRessource(code)
    .then((res) => {
      gamestateStore.budget = res.newBudget;
      gamestateStore.time = res.newTime;
    })
    .catch((e) => {
      isError.value = true;
      text.value = e.msg;
    })
    .finally(() => countDownBorder())
}

function sendCodeToRemove(code) {
  ApiService.deleteRessource(code)
    .then((res) => {
      gamestateStore.budget = res.newBudget;
      gamestateStore.time = res.newTime;
    })
    .catch((e) => {
      isError.value = true;
      text.value = e.msg;
    })
    .finally(() => countDownBorder())
}

if (gamestateStore.budget === null) {
  gamestateStore.reload();
}

function countDownBorder(){
  if (isError.value){
    cdBorderColor.value = '#c04231'
  } else {
    cdBorderColor.value = '#D4DC62'
  }
  deg.value = 359.9;
  var interval = setInterval(function(){
    if (deg.value <= 0){
      clearInterval(interval);
      deg.value = 0;
      isError.value = false;
      text.value = "Die QR Code der Ressource (Unterseite des Spielsteins) scannen";
    } else {
      deg.value--;
    }

  }, 1)
}

</script>
<template>
  <div
    class="scan-container"
  >
    <div :class="{ error: isError }" class="text-container">
      <p>{{ text }}</p>
    </div>
    <div class="scanner-background" 
    :style="{
    background: `conic-gradient(from 0deg at 50% 50%, rgba(219, 226, 125, 0.00) 0.0deg, ${cdBorderColor} 0.0deg, ${cdBorderColor} ${deg}deg, rgba(255, 255, 255, 0.00) ${deg}deg)`,
    }"
    >
      <QrScanner
        class="scanner"
        @on-detect="sendCode"
        @on-error="displayError"
      />
    </div>
  </div>
  <div class="bar-container">
    <p class="budget-text">Verbleibendes Budget</p>
    <div class="bar-outer">
      <p class="budget">{{ gamestateStore.budget }} €</p>
      <div class="bar-inner" :style="{ width: remainingWidth + 'px' }"></div>
    </div>
  </div>
  <div class="btn-container">
    <Button v-if="mode === 'add'" is-light @click="router.push('/scan/remove')"
      >Ressource entfernen</Button
    >
    <Button v-if="mode === 'remove'" is-light @click="router.push('/scan/add')"
      >Ressource hinzufügen</Button
    >
    <Button v-if="mode === 'add'" @click="router.push('/end')">Beenden</Button>
  </div>
</template>
<style scoped>
.scan-container {
  width: 90%;
}
.scanner-background {
  padding: 5px;
}
.text-container {
  margin-bottom: 20px;
  padding: 10px;
}
.error {
  background-color: var(--error);
}
.scanner {
  aspect-ratio: 1 / 1;
  background-color: var(--neutral-light);
}
.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar-outer {
  display: flex;
  align-items: center;
  width: 310px;
  height: 40px;
  background-color: var(--neutral-light);
  border-radius: 2px;
}
.bar-inner {
  position: absolute;
  height: 40px;
  background-color: var(--secondary);
  border-radius: 2px;
  transition: width 2s;
}
.budget-text {
  font-size: var(--font-size-large);
  font-style: italic;
}
.budget {
  flex-grow: 1;
  text-align: center;
  z-index: 1;
  color: var(--neutral);
  font-family: var(--font-numbers);
  font-size: var(--font-size-large);
  font-weight: 500;
}
.btn-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
