<script setup>
import { ref, computed, onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import IconFullscreen from "./components/icons/IconFullscreen.vue";

const el = ref(null);
const { isFullscreen, enter, exit, toggle } = useFullscreen(el);

const route = useRoute();
const headerText = computed(() => {
  switch (route.name) {
    case "start":
      return "Wohngeldbehörde";
  }
});
var isReturn = false;
</script>

<template ref="el">
  <header>
    <button :class="{ hidden: !isReturn }" @click="enter">
      <IconFullscreen />
    </button>
    <p>{{ headerText }}</p>
    <button @click="toggle">
      <IconFullscreen :close="isFullscreen" fillColor="#F0ECFF" />
    </button>
  </header>
  <Suspense>
    <div class="container">
      <RouterView />
    </div>
  </Suspense>
</template>

<style scoped>
header {
  height: 60px;
  position: sticky;
  top: 0;
  width: calc(100% - 30px); 
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--neutral);
  box-shadow: 2px 2px 5.1px 1px rgba(0, 0, 0, 0.26);
}
header p {
  color: var(--secondary);
  font-size: var(--font-size-large);
  font-weight: 400;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
.hidden {
  visibility: hidden;
}
button {
  background: none;
  outline: none;
  border: none;
}
</style>
