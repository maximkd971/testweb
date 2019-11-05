<template >
    <div id="content">

        <div style="margin:auto; text-align:center ; float:left ;  height:100vh; width:9%; border-right-style: dashed ; border-color: gray;">
            <div> <h2> Nous soutenir !</h2> </div>
            <div style="margin-top:125% ; ">
                <div>
                    <v-btn rounded color="primary" dark>Rounded Button</v-btn>
                </div>
                <img src=../assets/fb.png width="35%" height="12%">
                <br>
                <img src=../assets/ins.png width="50%" height="25%" >
                <br>
                <img src=../assets/twi.png width="40%" height="25%" >
            </div>
        </div>

        <div style="margin:auto ; text-align:center ; height:100vh ; width:80%">
            <p><img id="image_bombe" src=../assets/image_bombe.png width="50%" height="5%" style="text-align: center;"></p>
            <div id="liste_salons" style="display: none ; margin: auto ; height:40% ; width: 50% ; border-style: solid ; border-color: gray ; overflow:auto;">

            </div>
            <p><button v-on:click="creation_salon" id="bouton_create" style="border: none ; background: none ; padding: 0;"><img src="../assets/bouton_creer_salon.png"></button></p>
            
            <label id="label" style="display: none ; margin:auto; text-align:center ;" for="nom_salon">Nom de votre salon : </label>
            <input id="nom_salon" style="display: none ; margin: auto;" type="text" name="name" required minlength="4" maxlength="20" size="22">
            <button v-on:click="lancement_salon" id="bouton_lancement_salon" style="border: none ; background: none ; padding: 0; display: none;margin: auto; margin-top: 5px;"><img src="../assets/bouton_creer_salon.png" width="50%" height="20%"></button>
            
            <p><button v-on:click="affichage_salons" id="bouton_join" style="border: none ; background: none ; padding: 0;"><img src="../assets/bouton_rejoindre_salon.png"></button></p>
        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100% ; width:10% ; border-left-style: dashed ; border-color: gray">
            <h2>Amis</h2> 
            <div>
                <div id="liste_amis" style="margin: auto ; max-height:60vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto; border-left-style: none ;">
                    <ul>
                        <li>ami 1</li>
                        <li>ami 2</li>
                        <li>ami 3</li>
                    </ul>
                </div>
                <p><label id="label_ami" style="margin:auto; text-align:center ;" for="nom_ami"><U>Nom de votre ami : </U></label></p>
                <input id="nom_ami" style="margin: auto;" type="text" name="name_friend" required minlength="4" maxlength="10" size="11">
                <p><button v-on:click="ajout_ami" id="add_ami" style="border: none ; background: none ; padding: 0;"><img src="../assets/ajout_ami.png" height=50% width="85%"></button></p>
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
          document.getElementById("label").style.display="block"
          document.getElementById("bouton_lancement_salon").style.display="block"
      },
      affichage_salons(){
          //document.getElementById("bouton_create").style.display="none"
          document.getElementById("bouton_join").style.display="none"
          document.getElementById("nom_salon").style.display="none"
          document.getElementById("label").style.display="none"
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
