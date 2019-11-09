var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

var listeSalons = [];

var listeChaine = [];
// Dictionnaire JS avec Nom de salon comme clé
// Chaque élément du dictionnaire est une structure
    // Liste joueur
    // Tour
    // Timer
    // Lettre
var notFound = true;
var jeux = {};

var salons = [];

var accountList = [];

var listeMot = [];

const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('data/rooms.txt')
});

const account = readline.createInterface({
    input: fs.createReadStream('data/account.txt')
});

const char = readline.createInterface({
   input: fs.createReadStream('data/referentiel_chaines.txt')
});

const dico = readline.createInterface({
    input: fs.createReadStream('data/liste_francais.txt')
});

// Each new line emits an event - every time the stream receives \r, \n, or \r\n
rl.on('line', (line) => {
    listeSalons.push(line);
});

account.on('line', (line) => {
    accountList.push(line.split(';'));
});

char.on('line', (line) => {
   listeChaine.push(line);
});

dico.on('line', (line) => {
    listeMot.push(line);
});

console.log('Serveur lancé !');



io.sockets.on('connection', function (socket, pseudo) {
    // ON connexion
    // Vide.
        // EMIT liste_salon
        // Tableau de String
    socket.on('connexion', function(logInfo){

        for(elt in accountList){

            if(logInfo[0] === accountList[elt][0] && logInfo[1] === accountList[elt][1]){
                notFound = false;
                socket.emit('connexion_success', 'Succes de la connexion');
                console.log('Connexion de ' + logInfo[0]);
                socket.pseudo = logInfo[0];
            }

        }
        if (notFound == true){
            socket.emit('connexion_failed', 'Echec de la connexion');
            console.log('Tentative de connexion de ' + logInfo[0] + ' - ' + logInfo[1]);
        }
        notFound = true;
        

    });

    //ON acces_room
    //Lorsqu'un utilise accède à room on renvoie la liste des salons
    socket.on('acces_room', function(data){
        socket.emit('liste_salon', listeSalons);
    })

    // ON nouveau_salon
    // Comme entrer_salon mais avec ajout du salon dans le fichier
    socket.on('nouveau_salon', function(data){
        var pseudo = data[0];
        var salon = data[1];
        // Ecrire le salon dans le fichier
       jeux[salon] = {listeJoueur: [], tour: 0, timer: 0, listeSocket: []};
        listeSalons.push(salon);
        fs.writeFile('data/rooms.txt', fileContentRooms(listeSalons), function(err){});
        socket.emit('redirect_salon', salon);
        console.log(pseudo + ' vient de créer le salon ' + salon);
    });


    // ON entrer_salon
    // Envoi d'un tableau avec pseudo et nom du salon
        // EMIT liste_joueur
        // Tableau avec tous les TOKENS
    socket.on('entrer_salon', function(pseudo){
        jeux[pseudo[1]].tour++;
        jeux[pseudo[1]].listeJoueur.push(pseudo[0]+'_'+pseudo[1]+'_'+jeux[pseudo[1]].tour);
        jeux[pseudo[1]].listeSocket.push(socket);

        for(var i = 0 ; i < jeux[pseudo[1]].listeSocket.length -1 ; i++){
            jeux[pseudo[1]].listeSocket[i].emit('liste_joueur', [[jeux[pseudo[1]].listeJoueur[jeux[pseudo[1]].listeJoueur.length -1]], jeux[pseudo[1]].listeJoueur[i]]);
        }
        socket.emit('liste_joueur', [jeux[pseudo[1]].listeJoueur, pseudo[0]+'_'+pseudo[1]+'_'+jeux[pseudo[1]].tour]);
        console.log(pseudo[0] + ' vient de rentrer dans le salon ' + pseudo[1]);
    });

    // ON debut_jeu
    // Réception du nom du salon. Lance la partie. Supprime le salon du fichier.
        // EMIT trouve_mot
        // Tableau. Premier élément = token du joueur a qui c'est le tour, deuxième élément : Le début du mot à trouver (la lettre / la chaine de mots)
    socket.on('debut_jeu', function(salon){
        // Supprimer du fichier
        var newLettre = lettreAleatoire();
             jeux[salon].lettre = newLettre;
        console.log(newLettre);
        for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
            jeux[salon].lettre = newLettre; // TODO : lettre aléatoire
            jeux[salon].listeSocket[i].emit('lancement_partie');
            jeux[salon].listeSocket[i].emit('trouve_mot', [jeux[salon].listeJoueur[jeux[salon].tour-1], newLettre]);
        }
        console.log('Partie lancé dans le salon ' + salon);
    });

     // ON debut_jeu
    // Réception du nom du salon. Lance la partie. Supprime le salon du fichier.
        // EMIT trouve_mot
        // Tableau. Premier élément = token du joueur a qui c'est le tour, deuxième élément : Le début du mot à trouver (la lettre / la chaine de mots)
    socket.on('change', function(data){
        salon = data[0];
        mot = data[1];
        for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
            jeux[salon].listeSocket[i].emit('broadcast', mot); // TODO : lettre aléatoire
        }
    });


    // ON entrer_mot
    // Tableau avec premier élément = Nom du salon, deuxième mot entré
        // IF MOT OK
        // EMIT trouve_mot
        // ELSE
        // EMIT encore
    socket.on('entrer_mot', function(data){
        var token = data[0];
        var mot = data[1];
        var salon = token.split('_')[1];
        console.log(token.split('_')[0] + ' envoi le mot ' + mot + ' sur salon ' + salon);
         if(mot.includes(jeux[salon].lettre) && inDico(mot)){ // TODO : et mot présent dans un fichier dico
             jeux[salon].tour++;
             if (jeux[salon].tour > jeux[salon].listeJoueur.length){
                 jeux[salon].tour = 1;
             }
             var newLettre = lettreAleatoire();
             jeux[salon].lettre = newLettre;
             console.log(jeux[salon].listeJoueur[jeux[salon].tour-1]);
             for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
                jeux[salon].lettre = newLettre;
                jeux[salon].listeSocket[i].emit('trouve_mot', [jeux[salon].listeJoueur[jeux[salon].tour-1], newLettre]); // TODO : lettre aléatoire
            }
         } else {
             console.log('FAUX');
             for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
                jeux[salon].listeSocket[i].emit('encore');
            }
         }
    });
});

var fileContentRooms = function(salon){
    var ret = '';
    for(var elt in salon){
        ret+=listeSalons[elt]+'\n';
    }
    return ret;
};

var lettreAleatoire = function(){
    return listeChaine[Math.floor(Math.random() * (81056 - 1) + 1)];
};

var inDico = function(mot){
    for(var i = 0 ; i < listeMot.length ; i++){
        if(mot.toUpperCase() == listeMot[i].toUpperCase()){
            return true;
        }
    }
    return false;
};

server.listen(3535);
