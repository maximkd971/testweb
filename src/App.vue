<template>
  <div id="app">
    <connexion v-if="window.location.pathname === '/'"/>
    <listSalon v-if="window.location.pathname === '/salons'"/>
  </div>
</template>

<script>
import Connexion from './components/Connexion.vue'
import ListSalon from './components/ListSalon.vue'
    
export default {
  name: 'app',
  components: {
    Connexion,
    ListSalon
  },
  data: function() {
      return {
          window: window
      }
  }
}
</script>

<style scope>

</style>
