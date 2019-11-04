var socket = null;

var app = new Vue({
	el :"#content",
    data :{
    	pseudo: '',
    	word: '',
    	roomName : '',
    	token : '',
    	emptyPseudo : false,
    	emptyWord : false,
    	emptyRoom : false,
    	entrer_mot : [],
    	nouveau_salon : [],
    },

    methods :{
    	//Connexion de l'utilisateur
    	//Envoyer juste le pseudo au serveur et stocker dans une variable de session
    	session : function(){
    		if (this.pseudo != ''){
    			this.emptyPseudo = false;
	    		if (sessionStorage.getItem("autosave")) {
				  // Restauration du contenu de session
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

    	// Envoie du mot entrer par le user ainsi que son pseudo au serveur
    	sendMessage : function(){
    		if (this.word != ''){
    			this.emptyWord = false;
    			this.pseudo = sessionStorage.getItem();
    			this.entrer_mot.push(pseudo);
    			this.entrer_mot.push(word);
	    		socket.emit('entrer_mot', this.entrer_mot);
	    		this.pseudo = '';
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
    	}
    },

    created : function(){
        socket = io();
    },


    mounted : function(){


    },





});