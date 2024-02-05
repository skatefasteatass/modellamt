<script setup>
import { ref, defineProps, computed } from "vue";
import IconInfo from "./icons/IconInfo.vue";
import ApiService from "../apiService";
import LoadingAnimation from "./LoadingAnimation.vue";

const props = defineProps(["resId", "resCount"]);

const isEnlarged = ref(false);
const isLoading = ref(true);
const data = ref(null);

ApiService.getRessource(props.resId)
  .then((res) => {
    data.value = res;
    isLoading.value = false;
    console.log(data.value);
  })
  .catch((e) => console.log(e));
</script>

<template>
  <div class="res-container">
    <div
      style="display: flex; align-items: center; justify-content: space-around"
      v-if="isLoading"
    >
      <LoadingAnimation />
    </div>
    <div v-else>
      <div @click="isEnlarged = !isEnlarged" class="top">
        <IconInfo style="visibility: hidden" fill-color="white" />
        <div class="text-container">
          <p>
            <span v-if="data.isExpandable">{{ resCount }}x</span>
            {{ data.name }}
          </p>
        </div>
        <IconInfo fill-color="white" />
      </div>
      <div v-if="isEnlarged" class="middle">
        <p>{{ data.info }}</p>
      </div>
      <div class="bottom">
        <p>
          <span v-if="data.isExpandable"
            >{{ resCount }}x -{{ data.baseTime }} Min:
          </span>
          -{{ data.baseTime * resCount }} Min pro Antrag
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.res-container {
  width: 100%;
}
.top {
  background-color: var(--primary);
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 5px;
}
.top > *:first-child,
.top > *:last-child {
  flex-shrink: 0;
}
.top .text-container {
  font-size: 5vw;
  flex-grow: 1;
  text-align: center;
  white-space: nowrap;
}
.middle {
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 15px 15px 15px;
}
.bottom {
  background-color: var(--primary-light);
  color: black;
  border-radius: 0 0 10px 10px;
  font-family: var(--font-numbers);
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 50px;
}
</style>
