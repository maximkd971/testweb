<template>
  <div id="app">
    <home v-if="window.location.pathname === '/'"/>
    <salons v-if="window.location.pathname === '/salons'"/>
  </div>
</template>

<script>
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
