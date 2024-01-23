<script setup>
  import { computed, onMounted, ref } from 'vue';
  import ScenarioCard from '../components/ScenarioCard.vue';
  import { useScenariosStore } from '../stores/scenarions.js';
  import Button from '../components/Button.vue';
  
  const scenarioStore = useScenariosStore();
  await scenarioStore.fetchScenarios();
  var scenData = computed(() => scenarioStore.scenarios);

  var containerElement=ref(null);
  const selected = ref([true, false, false]);

  function updateSelected() {
    for (var i = 0; i < 3; i++) {
      var offset = containerElement.value.children[0].offsetLeft; 
      var x = containerElement.value.children[i].getBoundingClientRect().x;
      if (Math.abs(offset-x) < 20) {
        selected.value = [false, false, false];
        selected.value[i] = true;
      }
      //var scale = null;
      //// scale > 0.8
      //if (x > 184 || x < -80) {
      //  scale = 0.6;
      //} else {
      //  scale = Math.abs((Math.abs(x-52)-330)/330)
      //}
      //// scale = Math.round(scale * 100) / 100;
      // scales.value[i] = scale;
      //console.log(i + ": " + scale);
    }
  }
</script>

<template>
  <Button is-light>Info & Anleitung</Button>
  <p>Wählen Sie ein Szenario:</p>
  <div class="v-scroll" dir="ltr" ref="containerElement" v-on:scroll="updateSelected">
    <ScenarioCard class="card" v-for="(item, index) in scenData" :class="{ selected: selected[index] }" :data="item"/>
    <!-- <ScenarioCard  :style="{ 'transform': `scale(${scales[key]})`}" class="card" :data="scen"/> -->
  </div>
  <Button>Spiel Starten</Button>
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
</style>

