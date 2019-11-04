<template >
    <div id="content">

        <div style="margin:auto; text-align:center ; float:left ;  height:100vh; width:9%; border-right-style: dashed ; border-color: gray;">
            <div> <h2> Nous soutenir !</h2> </div>
            <div style="margin-top:125% ; ">
                <img src=../assets/fb.png width="35%" height="12%">
                <br>
                <img src=../assets/ins.png width="45%" height="20%" >
                <br>
                <img src=../assets/twi.png width="30%" height="18%" >
            </div>
        </div>

        <div style="margin:auto ; text-align:center ; height:100vh ; width:80%">
            <p><img id="image_bombe" src=../assets/image_bombe.png width="50%" height="5%" style="text-align: center;"></p>
            <p><button v-on:click="creation_salon" id="bouton_create" style="border: none ; background: none ; padding: 0;"><img src="../assets/bouton_creer_salon.png"></button></p>
            
            <label id="label" style="display: none ; margin:auto; text-align:center ;" for="nom_salon">Nom de votre salon : </label>
            <input id="nom_salon" style="display: none ; margin: auto;" type="text" name="name" required minlength="4" maxlength="20" size="22">
            <button v-on:click="lancement_salon" id="bouton_lancement_salon" style="border: none ; background: none ; padding: 0; display: none;margin: auto; margin-top: 5px;"><img src="../assets/bouton_creer_salon.png" width="50%" height="20%"></button>
            
            <p><button v-on:click="affichage_salons" id="bouton_join" style="border: none ; background: none ; padding: 0;"><img src="../assets/bouton_rejoindre_salon.png"></button></p>
        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100vh ; width:10% ; border-left-style: dashed ; border-color: gray">
            <h2>Amis</h2> 
        </div>
    </div>
</template>

<script>
export default {
  name: 'game',
  props: {
    msg: String
  },
  methods:{
      creation_salon(){
          document.getElementById("bouton_create").style.display="none"
          document.getElementById("nom_salon").style.display="block"
          document.getElementById("label").style.display="block"
          document.getElementById("bouton_lancement_salon").style.display="block"
      },
      affichage_salons(){
          document.getElementById("bouton_create").style.display="hidden"
          document.getElementById("bouton_join").style.display="hidden"
      },
      lancement_salon(){
          console.log("lancement salon")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
