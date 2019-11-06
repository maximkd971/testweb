<template>
    <div id="content">
        <div style="margin:auto; text-align:center ; float:left ;  height:30%; width:15%;">
            <div>
                <p><v-btn x-small v-on:click="quitter" rounded width="100%" height="55" color="#CDC5C4">Quitter</v-btn></p>
            </div>
        </div>

        <div style="margin:auto; text-align:center ;  height:100vh; width:70%;">
            
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
export default {
  name: 'game',
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
