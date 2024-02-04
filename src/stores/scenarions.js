import { ref, computed } from "vue";
import { defineStore } from "pinia";
import ApiService from "../apiService.js";

export const useScenariosStore = defineStore("scenarios", () => {
  const scenarios = ref(null);
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

  return { scenarios, fetchScenarios };
});
