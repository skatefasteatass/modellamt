<script setup>
import { ref, defineProps } from "vue";
import IconInfo from "./icons/IconInfo.vue";
import ApiService from "../apiService";
import LoadingAnimation from "./LoadingAnimation.vue";

const props = defineProps(['resId', 'resCount']);

const isEnlarged = ref(false);
const isLoading = ref(true);
const data = ref(null);

ApiService.getRessource(props.resId)
.then((res) => {
  data.value = res;
  isLoading.value = false;
})
.catch((e) => console.log(e));

</script>

<template>
  <div class="container">
    <div style=" display: flex; align-items: center; justify-content: space-around" v-if="isLoading">
      <LoadingAnimation />
    </div>
    <div v-else>
      <div @click="isEnlarged = !isEnlarged" class="top">
        <IconInfo style="visibility: hidden" fill-color="white" />
        <p>4x Mitarbeitende</p>
        <IconInfo fill-color="white" />
      </div>
      <div v-if="isEnlarged" class="middle">
        <p>INOF</p>
      </div>
      <div class="bottom">
        <p>4x -35 Min = -140 Min pro Antrag</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
}
.top {
  background-color: var(--primary);
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: var(--font-size-large);
  height: 50px;
}
.middle {
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 15px;
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
