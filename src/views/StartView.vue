<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useScenariosStore } from "../stores/scenarions.js";
import { useGamestateStore } from "../stores/gamestate.js";
import ScenarioCard from "../components/ScenarioCard.vue";
import Button from "../components/Button.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";

const router = useRouter();
const scenarioStore = useScenariosStore();
const gamestateStore = useGamestateStore();

const isLoading = ref(true);
const isStarting = ref(false);
var containerElement = ref(null);

var scenData = computed(() => scenarioStore.scenarios);
const selected = ref([true, false, false]);
var scenarioName;

scenarioStore.fetchScenarios().then(() => {
  isLoading.value = false;
  scenarioName = scenarioStore.scenarios[0].name;
});

function updateSelected() {
  for (var i = 0; i < 3; i++) {
    var offset = containerElement.value.children[0].offsetLeft;
    var x = containerElement.value.children[i].getBoundingClientRect().x;
    if (Math.abs(offset - x) < 50) {
      selected.value = [false, false, false];
      selected.value[i] = true;
      scenarioName = scenarioStore.scenarios[i].name;
    }
  }
}

function startGame() {
  isStarting.value = true;
  gamestateStore.startGame(scenarioName).then(() => {
    router.push("/scan/add");
    isStarting.value = false;
  });
}
</script>

<template>
  <Button is-light @click="router.push('/info')">Info & Anleitung</Button>
  <p><i>Wählen Sie ein Szenario:</i></p>
  <LoadingAnimation v-if="isLoading" />
  <div
    v-else
    class="v-scroll"
    dir="ltr"
    ref="containerElement"
    v-on:scroll="updateSelected"
  >
    <ScenarioCard
      class="card"
      v-for="(item, index) in scenData"
      :class="{ selected: selected[index] }"
      :data="item"
    />
    <!-- <ScenarioCard  :style="{ 'transform': `scale(${scales[key]})`}" class="card" :data="scen"/> -->
  </div>
  <Button class="button" :disabled="isLoading" @click="startGame()">
    <p v-if="!isStarting">Spiel Starten</p>
    <LoadingAnimation v-else />
  </Button>
</template>

<style scoped>
.v-scroll {
  width: 100%;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  align-items: center;
}
.v-scroll::-webkit-scrollbar {
  display: none;
}
.v-scroll > * {
  scroll-snap-align: center;
}
.v-scroll > *:first-child {
  margin-left: 52px;
}
.v-scroll > *:last-child {
  margin-right: 52px;
}
.selected {
  border: 4px solid var(--primary-light);
}
p {
  font-size: var(--font-size-large);
}
.button {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
