<script setup>
import { ref } from 'vue';
import ScenarioCard from './components/ScenarioCard.vue';

const headerText = ref('WOHNGELDBEHÖRDE');
</script>

<template>
  <header>
    <p> {{ headerText }} </p>
  </header>
  <ScenarioCard/>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
}
header p{
  color: var(--secondary);
  font-size: var(--font-size-large);
  font-weight: 400;
}
</style>  
