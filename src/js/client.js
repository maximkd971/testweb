var socket = null;

var app = new Vue({
	el :"#content",
    data :{
    	pseudo: '',
    	word: '',
    	emptyPseudo : false,
    	emptyWord : false,
    },

    methods :{
    	//Connexion de l'utilisateur
    	//Envoyer juste le pseudo au serveur et stocker dans une variable de session
    	session : function(){
    		if (this.pseudo != ''){
    			this.emptyPseudo = false;
	    		if (sessionStorage.getItem("autosave")) {
				  // Restauration du contenu du champ
				  sessionStorage.clear();
				}
				// Enregistrement de la saisie utilisateur dans le stockage de session
				sessionStorage.setItem("autosave", this.pseudo);
	    		socket.emit('connexion', this.pseudo);
	    		this.pseudo = '';
	    	}
	    	else {
	    		this.emptyPseudo = true;
	    	}
    	},

    	// Envoie du mot entrer par le user
    	sendMessage : function(){
    		if (this.word != ''){
    			this.emptyWord = false;
	    		socket.emit('message', this.word);
	    		this.word = '';
    		}else{
    			this.emptyWord = true;
    		}
    	},
    },

    created : function(){
        socket = io();
    },


    mounted : function(){


    },





});