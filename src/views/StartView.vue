<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useScenariosStore } from '../stores/scenarions.js';
  import ApiService from '../apiService';
  import ScenarioCard from '../components/ScenarioCard.vue';
  import Button from '../components/Button.vue';
  import LoadingAnimation from '../components/LoadingAnimation.vue';
  
  const router = useRouter();
  const scenarioStore = useScenariosStore();

  const isLoading = ref(true);
  var containerElement=ref(null);

  scenarioStore.fetchScenarios()
  .then(() => {
    isLoading.value=false;
  });

  var scenData = computed(() => scenarioStore.scenarios);
  const selected = ref([true, false, false]);
  //var scenario = scenarioStore.scenarios[0].name;

  function updateSelected() {
    for (var i = 0; i < 3; i++) {
      var offset = containerElement.value.children[0].offsetLeft; 
      var x = containerElement.value.children[i].getBoundingClientRect().x;
      if (Math.abs(offset-x) < 50) {
        selected.value = [false, false, false];
        selected.value[i] = true;
        //scenario = scenarioStore.scenarios[i].name;
        //console.log(scenario);
      }
    }
  }
  
  function startGame() {
  }
</script>

<template>
  <LoadingAnimation v-if="isLoading"/>
  <Button is-light @click="router.push('/info')">Info & Anleitung</Button>
  <p>Wählen Sie ein Szenario:</p>
  <div class="v-scroll" dir="ltr" ref="containerElement" v-on:scroll="updateSelected">
    <ScenarioCard class="card" v-for="(item, index) in scenData" :class="{ selected: selected[index] }" :data="item"/>
    <!-- <ScenarioCard  :style="{ 'transform': `scale(${scales[key]})`}" class="card" :data="scen"/> -->
  </div>
  <Button @click="router.push('/scan')">Spiel Starten</Button>
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
  .v-scroll>*{
     scroll-snap-align: center;
  }
  .v-scroll>*:first-child {
    margin-left: 52px;
  }
  .v-scroll>*:last-child {
    margin-right: 52px;
  }
  .selected{
    border: 4px solid var(--primary-light);
  }
  p {
    font-style: italic;
    font-size: var(--font-size-large);
  }
</style>

