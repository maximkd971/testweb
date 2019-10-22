<template>
    <div>
        <div style="text-align:center ; float:left ; height:100vh ; width:10%;">
            Nous soutenir !
        </div>

        <div style="margin:auto ; text-align:center ; height:100vh ; width:70%">
            <img src=../assets/image_bombe.png width="100%" height="35%">
            <p>Créer un salon</p>
            <p>Liste des salons </p> 
        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100vh ; width:20%">
            Amis 
        </div>
    </div>
</template>

<script>
export default {
  name: 'game',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
