<template>
  <div id="app">
    <home v-if="window.location.pathname === '/'"/>
    <salons v-if="window.location.pathname === '/salons'"/>
  </div>
</template>

<script>
import home from './components/home.vue'
import salons from './components/salons.vue'
    
export default {
  name: 'app',
  components: {
    home,
    salons
  },
  data: function() {
      return {
          window: window
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
