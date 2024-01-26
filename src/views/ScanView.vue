<script setup>
  import { ref } from 'vue';
  import QrScanner from '../components/QrScanner.vue';
  var isError = ref(false);
  var text = ref("Die QR Code der Ressource (Unterseite des Spielsteins) scannen");
</script>
<template>
  <div class="scan-container">
    <div :class="{error: isError}" class="text-container">
      <p>{{ text }}</p>
    </div>
    <div>
      <QrScanner @on-detect="(value) => console.log(value)" @on-error="(e) => text = e"/>
    </div>
  </div>
</template>
<style scoped>
  .scan-container { 
    width: 90%;
    background-color: var(--error);
  }
</style>
