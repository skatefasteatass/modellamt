<script setup>
  const props = defineProps({
    isLight: Boolean
  });
</script>

<template>
  <button :class="{ light: isLight }">
  <p>
    <slot/>
  </p>
</button>
</template>

<style scoped>
button {
  height: 50px;
  min-width: 250px;
  background-color: var(--primary);
  border-radius: 10px;
  border: none;
}
p {
  font-size: var(--font-size-large);
  margin: 0;
  color: var(--neutral-light);
  font-family: var(--font-main);
  padding-top: 3px;
}
.light {
  background-color: var(--primary-light);
}
.light p{
  background-color: var(--primary-light);
  color: var(--neutral);
}
</style>

