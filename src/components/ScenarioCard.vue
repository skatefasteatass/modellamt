<script setup>
  import IconStar from "./icons/IconStar.vue";
</script>

<template>
  <div class="container">
    <h3> Szenario Großstadt </h3>
    <div class="star-container">
      <IconStar/>
      <IconStar/>
      <IconStar/>
    </div>
    <p style="margin-top: 10px">Sie spielen eine Wohngeldbhörde in einer Großstadt, die Antragszahl ist hoch und die finanziellen Mittel im Verhältnis gering</p>
    <p style="margin-top: 20px">Anzahl der Anträge</p>
    <p class="number">20.000</p>
    <p style="margin-top: 20px">Budget</p>
    <p class="number">200.000€</p>
  </div>
</template>

<style>
.container {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--neutral);
  width: 270px;
  height: 460px;
  border-radius: 20px;
  background: linear-gradient(202deg, #8989AE 4.81%, #D1CAB5 52.49%, #CDB64E 110.24%);
  box-shadow: 2px 2px 5.1px 1px rgba(229, 229, 229, 0.26);
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
