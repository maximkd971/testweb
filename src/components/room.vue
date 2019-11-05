<template >
    <div id="content">

        <div style="margin:auto; text-align:center ; float:left ;  height:100vh; width:9%; border-right-style: dashed ; border-color: gray;">
            <div><h2> Nous soutenir !</h2></div>
            <div style="margin-top:125% ; ">
                <v-img src="../assets/fb.png" aspect-ratio="2"></v-img>
                <br>
                <v-img src="../assets/ins.png" aspect-ratio="2"></v-img>
                <br>
                <v-img src="../assets/twi.png" aspect-ratio="2"></v-img>
            </div>
        </div>

        <div style="margin:auto ; text-align:center ; height:100vh ; width:80%">
            <div id="image_bombe">
                <v-img src="../assets/image_bombe.png" aspect-ratio="2" contain height="200" width="500"></v-img>
            </div>

            <div id="liste_salons" style="display: none ; margin: auto ; height:40% ; width: 50% ; border-style: solid ; border-color: gray ; overflow:auto;">
            </div>

            <v-btn x-small v-on:click="creation_salon" id="bouton_create" rounded width="22%" height="15%" color="#CDC5C4">Créer un salon</v-btn>
            
            <div id="nom_salon" style="width: 30% ; margin:auto ; text-align:center ; display: none ; ">
                <v-text-field label="Nom du salon"></v-text-field>
            </div>

            <div id="bouton_lancement_salon" style="display: none ; text-align:center ; display: none ;">
                <v-btn x-small v-on:click="lancement_salon" rounded width="22%" height="55" color="#CDC5C4">Lancer un salon</v-btn>
            </div>

            <v-btn x-small v-on:click="affichage_salons" id="bouton_join" rounded width="22%" height="15%" color="#CDC5C4">Rejoindre un salon</v-btn>
        
        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100% ; width:10% ; border-left-style: dashed ; border-color: gray">
            <h2>Amis</h2> 
            <div>
                <div id="liste_amis" style="margin: auto ; max-height:60vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto; border-left-style: none ;">
                </div>

                <v-text-field id="nom_ami" label="Nom de l'ami"></v-text-field>
                
                <v-btn x-small v-on:click="ajout_ami" id="add_ami" rounded width="70%" height="79%" color="#CDC5C4">Ajout ami</v-btn>

            </div>
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
          document.getElementById("bouton_lancement_salon").style.display="block"
      },
      affichage_salons(){
          //document.getElementById("bouton_create").style.display="none"
          document.getElementById("bouton_join").style.display="none"
          document.getElementById("nom_salon").style.display="none"
          document.getElementById("bouton_lancement_salon").style.display="none"
          document.getElementById("liste_salons").style.display="block"
      },
      lancement_salon(){
          console.log("lancement salon")
      },
      ajout_ami(name){
          console.log(name)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
