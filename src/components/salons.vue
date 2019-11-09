<template>
    <div id="content">
        <div style="position:absolute ; margin:auto; text-align:center ; float:left ;  height:100%; width:15%; border-right-style: solid ; border-color: gray">
            <div>
                <p><v-btn x-small rounded width="100%" height="55" :to="{name:'room'}" color="#CDC5C4">Quitter</v-btn></p>
            </div>
            <br>
            <div id="scores" style="margin: auto ; height:80vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto ; border-right-style: none ; border-bottom-style: none">
 
            </div>
        </div>

        <div style="margin:auto; text-align:center ;  height:100vh; width:70%;">
            <div style="margin: auto ; height:40% ; width: 100%">
                <div id="compteur" style="display: none ">
                    <div style="float: left ; width: 30%">
                        <v-img src="../assets/bombe_1.png" aspect-ratio="2" height="200" width="300"></v-img>
                    </div>
                    <div style="float: left ; width: 40%">
                        <div style="margin: auto ; height:14vh ; width: 100%"></div>
                        <p><FONT size="50">10,00</FONT></p>
                    </div>
                    <div style="float: left ; width: 30%">
                        <v-img src="../assets/bombe_1.png" aspect-ratio="2" height="200" width="300"></v-img>
                    </div>
                </div>
                <p><v-btn id="bouton_lancement" x-small v-on:click="lancement_partie" rounded width="33%" height="55" color="#CDC5C4">Lancer la partie</v-btn></p>
            </div>
            <div style="margin: auto ; height:20% ; width: 100%">
                <div v-for='player in liste_joueur' :key="player" class="divPlayer" style="margin: auto ; height:100% ; border-style: solid ; border-color: gray ; float: left ; border-right-style: none ; ">
                    {{player}}
                </div>
            </div>
            <div id="envoie_des_mots" style="margin: auto ; height:40% ; width: 100% ; display: none">
                <div style="margin: auto ; height:40% ; width: 100%"></div>
                <p>Mot avec <strong>{{chaine}}</strong></p>
                <form @submit.prevent="entrer_mot(mot)">
                    <div id = "mot_joueur" style="width: 30% ; margin:auto ; text-align:center ; margin-bottom: 55;">
                    <v-text-field v-model = "mot" @input="seeChange"></v-text-field>
                    </div>
                </form>
                <p>{{changing}}</p>
            </div>

        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100% ; width:15% ; border-left-style: solid ; border-color: gray">
            <div>
                <div id="messages" style="margin: auto ; min-height:80vh ; width: 100% ; border-style: solid ; border-left-style: none ;border-color: gray ; overflow:auto;">

                </div>

                <div id="message_a_envoyer" style="width: 100% ; margin:auto ; text-align:center ; margin-bottom: 55;">
                    <v-text-field v-if="turn" label="Votre message" v-model = "message"></v-text-field>
                </div>

                <p><v-btn x-small v-if="turn" v-on:click="entrer_mot(message)" rounded width="100%" height="55" color="#CDC5C4">Envoyer un message</v-btn></p>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
var socket = io('192.168.1.73:3535');
export default {
  name: 'game',
  data: () => ({
    mot : '',
    pseudo : '',
    salon : '',
    token :'',
    size :'',
    chaine : '',
    message : '',
    changing : '',
    turn : false,
    liste_joueur : [],
    logEnterRoom : [],
    logMot :[],
    logChange :[],
  }),
  props: {
    msg: String
  },
  methods:{
      lancement_partie(){
        this.salon = this.$route.params.id;
        socket.emit('debut_jeu', this.salon)
        
      },
      entrer_mot(mot){
          console.log(mot)
          console.log(this.token)
          this.logMot.push(this.token)
          this.mot = mot
          this.logMot.push(this.mot)
          socket.emit('entrer_mot',this.logMot)
          this.mot = ""
      },
      //Voir les mots entré en direct par le user
      seeChange : function(){
        console.log(this.mot)
        this.salon = this.$route.params.id
        this.logChange.push(this.salon)
        this.logChange.push(this.mot)
        socket.emit('change', this.logChange);
      },
  },

  mounted: function(){
    let self = this;
    console.log(sessionStorage.getItem('autosave'));
    console.log(this.$route.params.id);
    if (sessionStorage.getItem("autosave") == null){
      document.location.href='/'
    }
    self.pseudo = sessionStorage.getItem('autosave');
    self.salon = this.$route.params.id;
    self.logEnterRoom.push(self.pseudo);
    self.logEnterRoom.push(self.salon);
    socket.emit('entrer_salon', self.logEnterRoom);
    self.pseudo='';
    self.logEnterRoom = [];

    socket.on('broadcast', function(data) {
      console.log(data);
      self.changing = data;
    })

    socket.on('liste_joueur', function(data){
        for(var i = 0; i < data[0].length; i++){
          self.liste_joueur.push(data[0][i]);
        }
        var size = 100/self.liste_joueur.length;
        self.token = data[1];
        setTimeout(function(){
            var elm = document.getElementsByClassName('divPlayer')
            for(var j = 0 ; j < elm.length; j++)
            {
               elm[j].style.width = size + '%';
            }
        }, 500) 
    })
      
    socket.on('lancement_partie', function(){
        document.getElementById('bouton_lancement').style.display = 'none'
        document.getElementById('envoie_des_mots').style.display = 'block'
        document.getElementById('compteur').style.display = 'block'
    })
    console.log(self.token)
    socket.on('trouve_mot', function(data){
      if (data[0]  == self.token){
        self.turn = true
      }
      else {
        self.turn = false
      }
      self.chaine = data[1]
    })

    socket.on('encore', function(data){
      
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
