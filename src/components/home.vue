<template>
  <div id="content">
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#575453"
                dark
                flat
              >
                <v-toolbar-title>MaxienBomFlo</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                    v-model="pseudo"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-btn v-on:click="session(pseudo, password)" color="#575453">Connexion</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>
<script>
import io from 'socket.io-client';


var socket = null

export default {

  name: 'home',

      data : () => ({
      pseudo: '',
      word: '',
      roomName : '',
      token : '',
      debut_jeu : '',
      tour : '',
      word2Find : '',
      mort : '',
      password :'',
      emptyPseudo : false,
      emptyWord : false,
      emptyRoom : false,
      entrer_mot : [],
      nouveau_salon : [],
      liste_salon : [],
      liste_player : [],
      log : []
    }),

    methods :{
      //Connexion de l'utilisateur
      //Envoyer juste le pseudo au serveur et stocker dans une variable de session
      session : function(pseudo, password){
        console.log(pseudo, password);
        if (pseudo != '' && password != ''){
          console.log("ok1");
          this.emptyPseudo = false;
          
          if (sessionStorage.getItem("autosave")) {
          // Restauration du contenu de session
          sessionStorage.clear();
        }
        // Enregistrement de la saisie utilisateur dans le stockage de session
        this.log.push(pseudo);
        this.log.push(password);
        sessionStorage.setItem("autosave", pseudo);
          socket.emit('connexion', this.log);
          this.pseudo = '';
          this.password = '';
          this.log = [];
        }
        else {
          console.log("ok");
          this.emptyPseudo = true;
        }
      },

      // Envoie du mot entrer par le user ainsi que son pseudo au serveur
      sendMessage : function(){
        if (this.word != ''){
          this.emptyWord = false;
          this.entrer_mot.push(token);
          this.entrer_mot.push(word);
          socket.emit('entrer_mot', this.entrer_mot);
          this.entrer_mot = [];
          this.word = '';
        }else{
          this.emptyWord = true;
          

        }
      },

      newRoom : function(){
        if (this.roomName != ''){
          this.emptyRoom = false;
          this.pseudo = sessionStorage.getItem();
          this.nouveau_salon.push(pseudo);
          this.nouveau_salon.push(roomName);
          socket.emit('entrer_mot', this.entrer_mot);
          this.pseudo = '';
          this.nouveau_salon = [];
          this.roomName = '';
        }
        else{
          this.emptyRoom = true;
        }
      },

      startGame : function(){
        this.debut_jeu = token.split('_')[1];
        socket.emit('debut_jeu', this.debut_jeu);
      }
    },

    created : function(){
      socket = io('10.8.94.235:8080')
    },

    computed : {
      liste_room(){
        return this.$liste_salon;
      }
    },

    mounted : function(){
      socket.on('liste_salon', function(data){
        console.log(this.$liste_room)
        console.log(data[0]);
        this.$liste_salon.push(data[0]);
        document.location.href='./room.vue'
      })

      socket.on('liste_joueur', function (data){
        app.liste_player.push(data[0]);
        app.token = data[1];
      })

      socket.on('trouve_mot', function (data){
        app.tour = data [0];
        app.word2Find = data [1];
      })
      socket.on('boom' , function(data){
        app.liste_player.push(data[0]);
        app.mort = data[1];
      })
    },


  props: {
    msg: String,
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>