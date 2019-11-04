var socket = null;

var app = new Vue({
	el :"#content",
    data :{
    	pseudo: '',
    	emptyWord : false,
    },

    methods :{
    	//Connexion de l'utilisateur
    	//Envoyer juste le pseudo au serveur et stocker dans une variable de session
    	session : function(){
    		if (this.word != ''){
    			this.emptyWord = false;
	    		if (sessionStorage.getItem("autosave")) {
				  // Restauration du contenu du champ
				  sessionStorage.clear();
				}
				// Enregistrement de la saisie utilisateur dans le stockage de session
				sessionStorage.setItem("autosave", this.pseudo);
	    		socket.emit('connexion', this.pseudo);
	    	}
	    	else {
	    		this.emptyWord = true;
	    	}
    	}
    },

    created : function(){
        socket = io();
    },


    mounted : function(){


    },





});