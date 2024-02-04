<script setup>
import IconStar from "./icons/IconStar.vue";
const props = defineProps(["data"]);
</script>

<template>
  <div class="card-container">
    <h3>{{ data.title }}</h3>
    <div class="star-container">
      <IconStar filled />
      <IconStar :filled="data.name != 'easy'" />
      <IconStar :filled="data.name == 'hard'" />
    </div>
    <p style="margin-top: 10px">{{ data.description }}</p>
    <p style="margin-top: 20px">Anzahl der Anträge</p>
    <p class="number">{{ data.count }}</p>
    <p style="margin-top: 20px">Budget</p>
    <p class="number">{{ data.budget }}€</p>
  </div>
</template>

<style>
.card-container {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--neutral);
  width: 270px;
  height: 460px;
  border-radius: 20px;
  background: linear-gradient(
    202deg,
    #8989ae 4.81%,
    #d1cab5 52.49%,
    #cdb64e 110.24%
  );
  box-shadow: 2px 2px 5.1px 1px rgba(229, 229, 229, 0.26);
  flex-shrink: 0;
}
.star-container {
  width: 75%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.number {
  font-family: var(--font-numbers);
}
</style>
