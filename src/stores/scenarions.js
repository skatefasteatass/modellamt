import { ref, computed } from "vue";
import { defineStore } from "pinia";
import ApiService from "../apiService.js";

export const useScenariosStore = defineStore("scenarios", () => {
  const scenarios = ref(null);
  function getCount(scenName){
    return scenarios.value.find((scen) => scen.name === scenName).count
  }
  async function fetchScenarios() {
    return new Promise((resolve, reject) => {
      ApiService.getAllScenarios()
        .then((data) => {
          scenarios.value = data;
          resolve();
        })
        .catch((e) => {
          console.log("Failed to initalize scenarios in store");
          reject();
        });
    });
  }

  return { scenarios, getCount, fetchScenarios };
});
