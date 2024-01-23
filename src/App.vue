<script setup>
import { ref, computed, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import { useFullscreen } from '@vueuse/core';
import IconFullscreen from './components/icons/IconFullscreen.vue';

const el = ref(null);
const { isFullscreen, enter, exit, toggle } = useFullscreen(el);

const route = useRoute();
const headerText = computed(() => {
  switch (route.name) {
    case 'start':
      return 'Wohngeldbehörde';
  }
});
var isReturn = false;
</script>

<template ref='el'>
  <header>
    <button :class="{hidden: !isReturn }" @click='enter'>
      <IconFullscreen/>
    </button>
    <p> {{ headerText }} </p>
    <button @click='toggle'>
      <IconFullscreen :close="isFullscreen" fillColor="#F0ECFF"/>
    </button>
  </header>
  <Suspense>
    <RouterView/>
  </Suspense>
</template>

<style scoped>
header {
  width:96%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 20px;
}
header p{
  color: var(--secondary);
  font-size: var(--font-size-large);
  font-weight: 400;
}
.hidden {
  visibility: hidden;
}
  button{
    background: none;
    outline: none;
    border: none;
  }
</style>  
