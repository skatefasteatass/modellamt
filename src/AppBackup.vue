<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import ApiService from "./apiService";
import QrScanner from "./components/QrScanner.vue";

function startGame() {
  ApiService.startGame("hard")
  .then(data => console.log(data))
  .catch(e => {
    console.log(e);
  });
}
function addRessource() {
  ApiService.postRessource("65a25406c6d43920386c2256")
  .then(data => console.log(data))
  .catch(e => {
    console.log(e);
  });
}
function getScenario() {
  ApiService.getScenario("hard")
  .then(data => console.log(data))
  .catch(e => {
    console.log(e);
  });
}
function getRessource() {
  ApiService.getRessource("65a25406c6d43920386c2256")
  .then(data => console.log(data))
  .catch(e => {
    console.log(e);
  });
}
function getGameState() {
  ApiService.getGameState()
  .then(data => console.log(data))
  .catch(e => {
    console.log(e);
  });
}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <button @click="startGame">START GAME</button>
      <button @click="addRessource">ADD RESSOURCE</button>
      <button @click="getScenario">GET SCENARIO</button>
      <button @click="getRessource">GET RESSOURCE</button>
      <button @click="getGameState">GET GAMESTATE</button>
    </div>
  </header>
  <RouterView />
  <QrScanner/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
