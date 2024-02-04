import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "../apiService.js";

export const useGamestateStore = defineStore("gamestate", () => {
  const startBudget = ref(null);
  const budget = ref(null);
  const time = ref(null);
  const chosenScenario = ref(null);
  async function startGame(scenName) {
    return new Promise((resolve, reject) => {
      ApiService.initGame(scenName)
        .then((data) => {
          budget.value = data.budget;
          startBudget.value = data.budget;
          time.value = data.time;
          chosenScenario.value = scenName;
          resolve();
        })
        .catch((e) => {
          console.log("Failed to initalize gamestate in store");
          reject();
        });
    });
  }

  return { startBudget, budget, time, startGame, chosenScenario };
});
