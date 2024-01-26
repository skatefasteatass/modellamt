<script setup>
  import { useRouter } from 'vue-router';
  import Button from '../components/Button.vue';
  const router = useRouter();
</script>

<template>
  <div class="text-container">
    <h3>Allgemeine Informationen</h3>
    <p>Das Lernspiel “Wohngeldamt” soll eine grobe Idee geben, wie Ressourcen in einem Amt verteilt werden müssen, damit eine schnelle Bearbeitung möglich ist.</p>
    <h4>Disclaimer</h4>
    <p> Das Spiel wurde im Zuge eines Uni-Kurses von Studierenden entwickelt. Es handelt sich bisher um eine prototypische Idee und die bishere Arbeit hat sich besonders auf die technische Umsetzung fokusiert. Die beschriebenen Ressourcen, deren Funktionen und deren Werte sind nur grobe Überlegungen. Entsprechend sollte berücksichtigt werden, dass die hier dargestellte Situation nicht der Realität entspricht. </p>
  </div>
  <div class="text-container">
    <h3>Anleitung</h3>
    <ol>
      <li>Zum Spielstart wird eines der drei Szenarien gewählt.</li>
      <li>Im zweiten Schritt können Ressourcen (Spielsteine) hinzugefügt werden, dafür den Code auf der Unterseite der Spielsteine scannen </li>
      <li>Zuletzt gibt es eine Übersicht über die ersparrte Zeit</li>
    </ol>
  </div>
  <Button is-light @click="router.push('/')">
    Zurück 
  </Button>
</template>

<style scoped>
  .text-container {
    padding: 0 20px;
  }
</style>
