<template>
  <div id="app">
      <home-component></home-component>
  </div>
</template>

<script>
import Home from './components/HomeComponent.vue'

export default {
    name: 'app',
    components: {
        'home-component': Home
    }
}
</script>

<style>
body{
    font-family: Ubuntu;
    color: #555;
}
</style>
