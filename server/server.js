var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

var listeSalons = [];

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

const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('data/rooms.txt')
});

const account = readline.createInterface({
    input: fs.createReadStream('data/account.txt')
});

// Each new line emits an event - every time the stream receives \r, \n, or \r\n
rl.on('line', (line) => {
    listeSalons.push(line);
});

account.on('line', (line) => {
    accountList.push(line.split(';'));
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


        console.log(jeux[pseudo[1]].listeJoueur);

        for(var i = 0 ; i < jeux[pseudo[1]].listeSocket.length -1 ; i++){
            jeux[pseudo[1]].listeSocket[i].emit('liste_joueur', [[jeux[pseudo[1]].listeJoueur[jeux[pseudo[1]].listeJoueur.length -1]]]);
        }
        console.log(jeux[pseudo[1]].listeJoueur);
        socket.emit('liste_joueur', [jeux[pseudo[1]].listeJoueur]);
        console.log(pseudo[0] + ' vient de rentrer dans le salon ' + pseudo[1]);
    });

    // ON debut_jeu
    // Réception du nom du salon. Lance la partie. Supprime le salon du fichier.
        // EMIT trouve_mot
        // Tableau. Premier élément = token du joueur a qui c'est le tour, deuxième élément : Le début du mot à trouver (la lettre / la chaine de mots)
    socket.on('debut_jeu', function(salon){
        // Supprimer du fichier
        for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
            jeux[salon].lettre = 'A'; // TODO : lettre aléatoire
            jeux[salon].listeSocket[i].emit('trouve_mot', [jeux[salon].listeJoueur[jeux[salon].tour-1], 'A']); // TODO : lettre aléatoire
        }
        console.log('Partie lancé dans le salon ' + salon);
    });


    // ON entrer_mot
    // Tableau avec premier élément = Nom du salon, deuxième mot entré
        // IF MOT OK
        // EMIT trouve_mot
        // ELSE
        // EMIT encore
    socket.on('entrer_mot', function(token, mot){
        var salon = token.split('_')[1];
         if(mot.startsWith(jeux[salon].lettre)){ // TODO : et mot présent dans un fichier dico
             jeux[salon].tour++;
             for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
                jeux[salon].lettre = 'B'; // TODO : lettre aléatoire
                jeux[salon].listeSocket[i].emit('trouve_mot', [jeux[salon].listeJoueur[jeux[salon].tour-1], 'B']); // TODO : lettre aléatoire
            }
         } else {
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

server.listen(3535);
