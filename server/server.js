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

account.on('close', () => {
    for(elt in accountList){
        console.log(accountList[elt]);
    }
});




io.sockets.on('connection', function (socket, pseudo) {
    // ON connexion
    // Vide.
        // EMIT liste_salon
        // Tableau de String
    socket.on('connexion', function(logInfo){
        console.log('Tentative de connexion : ' + logInfo[0] + ' - ' + logInfo[1]);
        for(elt in accountList){
            console.log()
            if(logInfo[0] === accountList[elt][0] && logInfo[1] === accountList[elt][1]){
                console.log(listeSalons);
                socket.emit('liste_salon', listeSalons);
                console.log('Connexion de ' + logInfo[0]);
            }
        }

    });

    // ON nouveau_salon
    // Comme entrer_salon mais avec ajout du salon dans le fichier
    socket.on('nouveau_salon', function(pseudo, salon){
        // Ecrire le salon dans le fichier
       jeux[salon] = {listeJoueur: [pseudo+'_'+salon+'_1'], tour: 1, timer: 0, listeSocket: [socket]};
        socket.emit('liste_joueur', [jeux[salon].listeJoueur, pseudo+'_'+salon+'_1']);
    });

    // ON entrer_salon
    // Envoi d'un tableau avec pseudo et nom du salon
        // EMIT liste_joueur
        // Tableau avec tous les TOKENS
    socket.on('entrer_salon', function(pseudo, salon){
        jeux[salon].tour++;
        jeux[salon].listeJoueur.push(pseudo+'_'+salon+'_'+tour);
        jeux[salon].listeSocket.push(socket);

        for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
            jeux[salon].listeSocket[i].emit('liste_joueur', [jeux[salon].listeJoueur, pseudo+'_'+salon+'_'+tour]);
        }
    });

    // ON debut_jeu
    // Réception du nom du salon. Lance la partie. Supprime le salon du fichier.
        // EMIT trouve_mot
        // Tableau. Premier élément = token du joueur a qui c'est le tour, deuxième élément : Le début du mot à trouver (la lettre / la chaine de mots)
    socket.on('debut_jeu', function(salon){
        // Supprimer du fichier
        for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
            jeux[salon].lettre = 'A'; // TODO : lettre aléatoire
            jeux[salon].listeSocket[i].emit('trouve_mot', [jeux[salon].listeJoueur[jeux[salon].tour-1]], 'A'); // TODO : lettre aléatoire
        }
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
                jeux[salon].listeSocket[i].emit('trouve_mot', [jeux[salon].listeJoueur[jeux[salon].tour-1]], 'B'); // TODO : lettre aléatoire
            }
         } else {
             for(var i = 0 ; i < jeux[salon].listeSocket.length ; i++){
                jeux[salon].listeSocket[i].emit('encore');
            }
         }
    });
});

server.listen(3535);
