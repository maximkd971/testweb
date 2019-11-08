<template>
    <div id="content">
        <div style="position:absolute ; margin:auto; text-align:center ; float:left ;  height:100%; width:15%; border-right-style: solid ; border-color: gray">
            <div>
                <p><v-btn x-small v-on:click="quitter" rounded width="100%" height="55" :to="{name:'room'}" color="#CDC5C4">Quitter</v-btn></p>
            </div>
            <br>
            <div id="scores" style="margin: auto ; height:80vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto ; border-right-style: none ; border-bottom-style: none">
 
            </div>
        </div>

        <div style="margin:auto; text-align:center ;  height:100vh; width:70%;">
            <div style="margin: auto ; height:20% ; width: 100%"></div>
            <div style="margin: auto ; height:60% ; width: 100%">
                <div v-for='player in liste_joueur' :key="player" class="divPlayer" style="margin: auto ; height:100% ; border-style: solid ; border-color: gray ; float: left">
                    {{player}}
                </div>
            </div>
            <div style="margin: auto ; height:20% ; width: 100%"></div>

        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100% ; width:15% ; border-left-style: solid ; border-color: gray">
            <div>
                <div id="messages" style="margin: auto ; min-height:80vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto;">

                </div>

                <div id="message_a_envoyer" style="width: 100% ; margin:auto ; text-align:center ; margin-bottom: 55;">
                    <v-text-field label="Votre message"></v-text-field>
                </div>

                <p><v-btn x-small v-on:click="envoyer_message" rounded width="100%" height="55" color="#CDC5C4">Envoyer un message</v-btn></p>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
var socket = io('10.239.161.57:3535');
export default {
  name: 'game',
  data: () => ({
    pseudo : '',
    saloin : '',
    token :'',
    size :'',
    liste_joueur : [],
    logEnterRoom : [],
  }),
  props: {
    msg: String
  },
  methods:{
      quitter(){
          console.log("lancement salon")
      },
      envoyer_message(message){
          console.log(message)
      }
  },

  mounted: function(){
    let self = this;
    console.log(sessionStorage.getItem('autosave'));
    console.log(this.$route.params.id);

    self.pseudo = sessionStorage.getItem('autosave');
    self.salon = this.$route.params.id;
    self.logEnterRoom.push(self.pseudo);
    self.logEnterRoom.push(self.salon);
    socket.emit('entrer_salon', self.logEnterRoom);
    self.pseudo='';
    self.logEnterRoom = [];



    socket.on('liste_joueur', function(data){
      console.log(data[0].length);
        for(var i = 0; i < data[0].length; i++){
          self.liste_joueur.push(data[0][i]);
        }
        self.size = 100/data[0].length.toString()+"%";
        self.token = data[1];
        var elm = document.getElementsByClassName('divPlayer')
        console.log(self.token)
        console.log(self.liste_joueur.length)
        console.log(elm)
        for(var j = 0 ; j < elm.length; j++)
        {
           elm[j].style.width = self.size;
        }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
