<template >
    <div id="content">

        <div style="margin:auto; text-align:center ; float:left ;  height:100vh; width:9%; border-right-style: dashed ; border-color: gray;">
            <div><h2> Nous soutenir !</h2></div>
            <div style="margin-top:125% ; ">
                <br>
                <v-img class="v-img" v-on:click="redirection('https://facebook.fr')" src="../assets/fb.png" aspect-ratio="2" title="https://facebook.fr"></v-img>
                <br>
                <v-img class="v-img" v-on:click="redirection('https://instagram.fr')" src="../assets/ins.png" aspect-ratio="2" title="https://instagram.fr"></v-img>
                <br>
                <v-img class="v-img" v-on:click="redirection('https://twitter.fr')" src="../assets/twi.png" aspect-ratio="2" title="https://twitter.fr"></v-img>
            </div>
        </div>

        <div style="margin:auto ; text-align:center ; height:100vh ; width:80%">
            <div id="image_bombe" style="margin: auto ; height:40% ; width: 50% ;">
                <v-img src="../assets/image_bombe.png" aspect-ratio="2" contain height="200" width="500"></v-img>
            </div>

            <div style="margin: auto ; height:40% ; width: 50% ; border-style: solid ; border-color: gray ; overflow:auto;">
                <v-card id="liste_salons"
                    class="mx-auto"
                    max-width="100%"
                    tile
                >
                    <v-list rounded>
                        <v-subheader>Liste des salons</v-subheader>
                        <v-list-item-group v-model="item" color="primary">
                            <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                                :to="{name:'post', params:{id:item}}"
                            >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item" ></v-list-item-title>
                            </v-list-item-content> 
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                 </v-card>
            </div>
            
            <div id="nom_salon" style="width: 30% ; margin:auto ; text-align:center ; margin-bottom: 55;">
                <v-text-field id = "nom_salon" label="Nom du salon" v-model = "nom_salon"></v-text-field>
            </div>

            <div id="bouton_lancement_salon" style=" text-align:center ;">
                <p><v-btn x-small v-on:click="newRoom(nom_salon)" rounded width="22%" height="55" color="#CDC5C4">Lancer un salon</v-btn></p>
            </div>
        
        </div>

        <div style="position:absolute ; top:0 ; right:0 ; text-align:center ; float:right ; height:100% ; width:10% ; border-left-style: dashed ; border-color: gray">
            <h2>Amis</h2> 
            <div>
                <div style="margin: auto ; max-height:60vh ; width: 100% ; border-style: solid ; border-color: gray ; overflow:auto; border-left-style: none ;">
                    <v-card id="liste_amis"
                        class="mx-auto"
                        max-width="100%"
                        tile
                    >
                    <v-list rounded>
                        <v-subheader>Liste des amis</v-subheader>
                        <v-list-item-group v-model="item_friend" color="primary">
                            <v-list-item
                                v-for="(item_friend, j) in items_friends"
                                :key="j"
                            >
                            <v-list-item-content>
                                <v-list-item-title v-text="item_friend.text"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                 </v-card>
                </div>

                <v-text-field id="nom_ami" label="Nom de l'ami"></v-text-field>
                
                <v-btn x-small v-on:click="ajout_ami" id="add_ami" rounded width="100%" height="50" color="#CDC5C4">Ajout ami</v-btn>

            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
var socket = io('127.0.0.1:3535');
export default {
  name: 'game',
  props: {
    msg: String
  },
  data: () => ({
      item: 1,
      item_friend: 1,
      items: [],
      items_friends: [],
      emptyRoom : false,
      logRoom :[],
      pseudo : '',
      nom_salon:''
    }),
  methods:{
      lancement_salon(){
          console.log("lancement salon")
      },
      ajout_ami(name){
          console.log(name)
      },
      redirection(lien){
        document.location.href=lien
      },

      newRoom : function(roomName){
        if(roomName != ''){
          this.emptyRoom = false;
          this.pseudo = sessionStorage.getItem('autosave');
          this.logRoom.push(this.pseudo);
          this.logRoom.push(roomName);
          socket.emit('nouveau_salon', this.logRoom);
          this.pseudo = '';
          this.logRoom = [];
        }
        else{
          this.emptyRoom = true;
        }
      },
  },

  mounted : function(){
    let self = this
    console.log(sessionStorage.getItem('autosave'))
    if (sessionStorage.getItem("autosave") == null){
      document.location.href='/'
    }
    socket.emit('acces_room','Entre dans la room')
    socket.on('liste_salon', function(data){
        for(var i = 0; i < data.length; i++){
          self.items.push(data[i]);
        }
    })
    socket.on('redirect_salon', function(salon){
        document.location.href='/salons/'+salon
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-img:hover{
    cursor: pointer;
}
</style>
