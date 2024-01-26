import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '../apiService.js';

export const useGamestateStore = defineStore('gamestate', () => {
  const current = ref(null);
  async function fetchScenarios() {
      ApiService.getAllScenarios()
      .then((data) => { 
        scenarios.value = data;
      })
      .catch((e) => console.log('Failed to initalize scenarios in store'));
  }

  return { scenarios, fetchScenarios }
})
