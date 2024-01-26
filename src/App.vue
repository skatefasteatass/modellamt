<script setup>
import { ref, computed, onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import IconFullscreen from "./components/icons/IconFullscreen.vue";
import IconBack from "./components/icons/IconBack.vue";

const route = useRoute();
const router = useRouter();

const el = ref(null);
const { isFullscreen, enter, exit, toggle } = useFullscreen(el);

const headerText = computed(() => {
  switch (route.name) {
    case "start":
      return "Wohngeldbehörde";
    case "info":
      return "Wohngeldbehörde";
  }
});
const isReturn = computed(() => {
  if (route.name === "info") {
    return true;
  } else {
    return false;
    }
});
</script>

<template ref="el">
  <header>
    <button :class="{ hidden: !isReturn }" @click="router.back()">
      <IconBack fillColor="#F0ECFF"/>
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
  min-height: calc(100% - 60px - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
