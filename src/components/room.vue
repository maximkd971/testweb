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
            <div id="image_bombe" style="margin: auto ; height:40% ; width: 50% ;">
                <v-img src="../assets/image_bombe.png" aspect-ratio="2" contain height="200" width="500"></v-img>
            </div>

            <div id="liste_salons" style="margin: auto ; height:40% ; width: 50% ; border-style: solid ; border-color: gray ; overflow:auto;">
                <ul>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                    <li>test 1</li>
                </ul>
            </div>
            
            <div id="nom_salon" style="width: 30% ; margin:auto ; text-align:center ; margin-bottom: 55;">
                <v-text-field label="Nom du salon"></v-text-field>
            </div>

            <div id="bouton_lancement_salon" style=" text-align:center ;">
                <p><v-btn x-small v-on:click="lancement_salon" rounded width="22%" height="55" color="#CDC5C4">Lancer un salon</v-btn></p>
            </div>
        
        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100% ; width:10% ; border-left-style: dashed ; border-color: gray">
            <h2>Amis</h2> 
            <div>
                <div id="liste_amis" style="margin: auto ; max-height:60vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto; border-left-style: none ;">
                    <ul>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                        <li>AMI 1</li>
                    </ul>
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
