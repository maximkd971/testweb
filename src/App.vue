<template>
    <home/>
</template>

<script>
import home from './components/game.vue'

export default {
  name: 'app',
  components: {
    home
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9A2C15;
  margin-top: 60px;
}
</style>
