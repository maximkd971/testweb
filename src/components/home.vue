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
                  <p v-if ='errPseudo' style="color:red;">Les identifiants entrés sont incorrects</p>
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
var socket = io();
export default {
  name: 'home',

    data : () => ({
      pseudo: '',
      password :'',
      errPseudo : false,
      log : []
    }),

    methods :{
      //Connexion de l'utilisateur
      //Envoyer juste le pseudo au serveur et stocker dans une variable de session
      session : function(pseudo, password){
        if (pseudo != '' && password != ''){
          this.errPseudo = false;
          this.pseudo = pseudo;
          this.password = password;
          // Enregistrement de la saisie utilisateur dans le stockage de session
          this.log.push(pseudo);
          this.log.push(password);
          socket.emit('connexion', this.log);
          this.log = [];
        }
        else {
          this.errPseudo = true;
        }
      }
    },

    
    props: {
      msg: String,
    },

    mounted: function(){
      let self = this;
      sessionStorage.clear();
      socket.on('connexion_success', function(data){
          if (sessionStorage.getItem("autosave")) {
            // Restauration du contenu de session
            sessionStorage.clear();
          }
          sessionStorage.setItem("autosave", self.pseudo);
          self.errPseudo = false
          console.log(data)
          this.pseudo = '';
          this.password = '';
          document.location.href= '/room'
        })
      socket.on('connexion_failed', function(data){
          self.errPseudo = true
      })
    },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
