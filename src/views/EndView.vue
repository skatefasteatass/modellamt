<script setup>
import { computed, ref, toRaw } from "vue";
import RessourceCard from "../components/RessourceCard.vue";
import { useGamestateStore } from "../stores/gamestate.js";
import { useScenariosStore } from "../stores/scenarions.js";
import { useRouter } from "vue-router";
import ApiService from "../apiService";
import Button from "../components/Button.vue";

const gameStateStore = useGamestateStore();
const scenarioStore = useScenariosStore();
const router = useRouter();

const isLoading = ref(true);
const usedRessources = ref({});
const count = ref(null);

if(scenarioStore.scenarios === null){
  await gameStateStore.reload();
  await scenarioStore.fetchScenarios();
} 
count.value = scenarioStore.getCount(gameStateStore.chosenScenario);

const timePerApplication = computed(() => {
  return gameStateStore.time;
});

const time = computed(() => {
  return timePerApplication.value * count.value;
});

function endGame(){
  ApiService.deleteGameState()
  .then(() => router.push("/"))
  .catch((e) => console.log(e))
}

ApiService.getGameState()
.then((res) => {
  for(var key in res.ressources) {
    if (res.ressources[key] != 0){
      usedRessources.value[key] = res.ressources[key];
    }
  }
  isLoading.value = false;
})
.catch(e => console.log(e));
</script>

<template>
  <div
    style="display: flex; align-items: center; justify-content: space-around"
    v-if="isLoading"
  >
    <LoadingAnimation />
  </div>
  <div v-else class="end-container">
    <div class="time-container">
      <p>
        Mit den gewählten Ressourcen dauert die Bearbeitung von
        {{ count }} Anträgen:
      </p>
      <div class="time">
        <p>{{ time }} Minuten</p>
        <p>{{ timePerApplication }} Minuten per Antrag</p>
      </div>
    </div>
    <RessourceCard
      style="margin-bottom: 20px"
      v-for="(value, key) in usedRessources"
      :res-id="key"
      :res-count="value"
    />
    <Button @click="endGame()">Neues Spiel</Button>
  </div>
</template>

<style scoped>
.end-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.time-container > p {
  padding: 10px 20px;
}
.time {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 110px;
  border-radius: 16px;
  background: var(
    --Gradient,
    linear-gradient(202deg, #8989ae 4.81%, #d1cab5 52.49%, #cdb64e 110.24%)
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: black;
  font-family: var(--font-numbers);
  font-size: var(--font-size-large);
}
.time p:first-child {
  font-weight: 600;
}
.time p:last-child {
  font-weight: 200;
}
</style>
