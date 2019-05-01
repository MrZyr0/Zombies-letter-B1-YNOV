document.addEventListener("DOMContentLoaded",function(){
    console.log("[DOM] Chargé")


    // Récupération Éléments HTML
    var Plateau = document.querySelector('.Plateau-Jeux')                      // Plateau de jeux
    var NomUtilisateur = document.querySelector('.Nom-Joueur')                 // Nom du Joueur
    var ScoreHTML = document.querySelector('.Score')                           // Score
    var ChronosHTML = document.querySelector('.Chronos')                        // Chronomètre (temps de jeux restant)
    // Création Variables
    var ScoreUtilisateur = 0                                                   // Stocke le score du joueur à afficher
    var Temps = 60                                                             // Stocke le temps imparti pour jouer
    var Niveau = 2                                                             // Stocke le niveau de difficulté du jeux (soit le temps entre chaques POP de Zombie)
    var TempsPOPZombie = 100                                                   // Stocke le temps d'apparision des zombie (Défaut Intermédiaire : 100ms)
    var Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "A", "U", "V", "W", "X", "Y","Z"]
    var Couleurs = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22", "C23", "C24", "C25", "C26"]



    // Définition des fonctions
    LancementPartie()                                                          // Exécute la fonction 1 fois au lancement du Jeux
    function LancementPartie()                                                 // A chaque Début de partie, demande le nom du joueur et explique els règles
    {
      var Joueur = prompt("Saisissez votre nom :");
      if (Joueur != "")
      {
        NomUtilisateur.innerHTML = Joueur
      }

      alert("Règles du jeux :\n" +
            "Nous prévoyons une excursion dans une zone potentielement dangereuse.\n" +
            "Vous allez être soumis à un petit test. Des Zombie vont vous submerger :O !!\n" +
            "Ne vous laissez pas faire et tuer les avant qu'il ne vous tue :D\n\n" +
            "Voyons comment vous vous en sortez...")

      alert("Commandes :\n\n" +
            "Appuyez sur les touches correspondantes aux lettres qui arrivent pour les faire disparaitre et gagner 1 point\n" +
            "Appuyez sur une lettre qui n'est pas sur le plateau et c'est 1 point en moins !\n" +
            "Appuyez sur ECHAP pour arrêter le jeux avant la fin.")

      Niveau = prompt("Choississez votre niveau de difficulté (Entrez le numéro du niveau) :\n" +
                          "Niveau 0 : Ultra-Facile\n" +
                          "Niveau 1 : Facile\n" +
                          "Niveau 2 : Intermédiaire\n" +
                          "Niveau 666 : Impossible")
      Difficulte()
    }



    function Difficulte()
    {
      switch (Niveau)
      {
        case "0":
          TempsPOPZombie = 1500
        break;

        case "1":
          TempsPOPZombie = 1000
        break;


        case "2":
          TempsPOPZombie = 100
        break;

        case "666":
          TempsPOPZombie = 10
        break;

        default:
          if (Niveau == "")                                                    // Si choix Vide
          {
            Niveau = prompt("Vous n'avez pas entré de valeur !\n" +
                            "Vous allez jouer avec le niveau par défaut (Intermédiaire) !\n" +
                            "Recharger la page (avec la touche F5) pour changer de niveau")
            Niveau = 2
          }
          else if (Niveau)                                                     // Si choix non valide
          {
            prompt("Votre choix est invalide !\n" +
                   "Réessayez")

             Niveau = prompt("Choississez votre niveau de difficulté (Entrez le numéro du niveau) :\n" +
                                 "Niveau 0 : Ultra-Facile\n" +
                                 "Niveau 1 : Facile\n" +
                                 "Niveau 2 : Intermédiaire\n" +
                                 "Niveau 666 : Impossible")
             Difficulte()

          }
          else                                                                  // Si appuyé sur ANNULER
          {
            prompt("Si vous ne voulez plus jouer, vous pouvez fermer la page.\n" +
                   "(avec le racourcis CTRL + W ou d'un clic molette sur l'onglet)")
            LancementPartie()
          }
        break;
      }
    }


    var Chronos = setInterval(function()                                       // Arrête le jeu dans le temps imparti
    {
      Temps--
      ChronosHTML.innerHTML = Temps

      if (Temps == 0)
      {
        clearInterval(POPZombie)
        clearInterval(Chronos)
        document.onkeydown = null
      }
    },1000)


    var POPZombie = setInterval(function()                                     //Lance NouvoZombi suivant la difficulté
    {
      NouvoZombi()
    },TempsPOPZombie)


    function NouvoZombi ()                                                     //Création d'un nouveau Zombie (Nouvelle Lettre)
    {
      var Lettre = Math.floor(Math.random() * 25)                              //Génère un chiffre aléatoire correspondant aux 26 case du tableau de l'Alphabet
      var CouleurCSS = Math.floor(Math.random() * 25)                          //Génère un chiffre aléatoire correspondant aux 26 case du tableau des couleurs
      var Zombie = document.createElement("p")                                 //Créer un Block de type Paragraphe

      Zombie.id = Alphabet[Lettre]                                             //Assigne l'ID correspondant à la lettre
      Zombie.className = Couleurs[CouleurCSS]                                      //Assigne un CSS pour donner une couleur à la lettre
      Zombie.innerHTML = Alphabet[Lettre]                                      //Ajoute le code HTML généré à ce block
      Plateau.appendChild(Zombie)                                              //Insère le block dans le plateau
    }

    document.onkeydown = ActionUtilisateur                                     //Appel ActionUtilisateur pour chaques touches que l'utilisateur presse

    function ActionUtilisateur(e)                                              //Met a jour le jeux pour chaques touches pressé
    {
      switch (e.keyCode)
      {
        case 27:                                                                //Arrête le Jeux (ECHAP)
          clearInterval(POPZombie)
          clearInterval(Chronos)
        break;

        case 65:
          var Lettre_A = document.getElementById('A')

          if (Lettre_A != null)
          {
            Lettre_A.parentNode.removeChild(Lettre_A);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 66:
          var Lettre_B = document.getElementById('B')

          if (Lettre_B != null)
          {
            Lettre_B.parentNode.removeChild(Lettre_B);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 67:
          var Lettre_C = document.getElementById('C')

          if (Lettre_C != null)
          {
            Lettre_C.parentNode.removeChild(Lettre_C);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 68:
          var Lettre_D = document.getElementById('D')

          if (Lettre_D != null)
          {
            Lettre_D.parentNode.removeChild(Lettre_D);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 69:
          var Lettre_E = document.getElementById('E')

          if (Lettre_E != null)
          {
            Lettre_E.parentNode.removeChild(Lettre_E);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 70:
          var Lettre_F = document.getElementById('F')

          if (Lettre_F != null)
          {
            Lettre_F.parentNode.removeChild(Lettre_F);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 71:
          var Lettre_G = document.getElementById('G')

          if (Lettre_G != null)
          {
            Lettre_G.parentNode.removeChild(Lettre_G);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 72:
          var Lettre_H = document.getElementById('H')

          if (Lettre_H != null)
          {
            Lettre_H.parentNode.removeChild(Lettre_H);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 73:
          var Lettre_I = document.getElementById('I')

          if (Lettre_I != null)
          {
            Lettre_I.parentNode.removeChild(Lettre_I);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 74:
          var Lettre_J = document.getElementById('J')

          if (Lettre_J != null)
          {
            Lettre_J.parentNode.removeChild(Lettre_J);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 75:
          var Lettre_K = document.getElementById('K')

          if (Lettre_K != null)
          {
            Lettre_K.parentNode.removeChild(Lettre_K);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 76:
          var Lettre_L = document.getElementById('L')

          if (Lettre_L != null)
          {
            Lettre_L.parentNode.removeChild(Lettre_L);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 77:
          var Lettre_M = document.getElementById('M')

          if (Lettre_M != null)
          {
            Lettre_M.parentNode.removeChild(Lettre_M);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 78:
          var Lettre_N = document.getElementById('N')

          if (Lettre_N != null)
          {
            Lettre_N.parentNode.removeChild(Lettre_N);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 79:
          var Lettre_O = document.getElementById('O')

          if (Lettre_O != null)
          {
            Lettre_O.parentNode.removeChild(Lettre_O);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 80:
          var Lettre_P = document.getElementById('P')

          if (Lettre_P != null)
          {
            Lettre_P.parentNode.removeChild(Lettre_P);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 81:
          var Lettre_Q = document.getElementById('Q')

          if (Lettre_Q != null)
          {
            Lettre_Q.parentNode.removeChild(Lettre_Q);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 82:
          var Lettre_R = document.getElementById('R')

          if (Lettre_R != null)
          {
            Lettre_R.parentNode.removeChild(Lettre_R);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 83:
          var Lettre_S = document.getElementById('S')

          if (Lettre_S != null)
          {
            Lettre_S.parentNode.removeChild(Lettre_S);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 84:
          var Lettre_T = document.getElementById('T')

          if (Lettre_T != null)
          {
            Lettre_T.parentNode.removeChild(Lettre_T);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 85:
          var Lettre_U = document.getElementById('U')

          if (Lettre_U != null)
          {
            Lettre_U.parentNode.removeChild(Lettre_U);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 86:
          var Lettre_V = document.getElementById('V')

          if (Lettre_V != null)
          {
            Lettre_V.parentNode.removeChild(Lettre_V);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 87:
          var Lettre_W = document.getElementById('W')

          if (Lettre_W != null)
          {
            Lettre_W.parentNode.removeChild(Lettre_W);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 88:
          var Lettre_X = document.getElementById('X')

          if (Lettre_X != null)
          {
            Lettre_X.parentNode.removeChild(Lettre_X);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 89:
          var Lettre_Y = document.getElementById('Y')

          if (Lettre_Y != null)
          {
            Lettre_Y.parentNode.removeChild(Lettre_Y);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        case 90:
          var Lettre_Z = document.getElementById('Z')

          if (Lettre_Z != null)
          {
            Lettre_Z.parentNode.removeChild(Lettre_Z);
            MajScore(true)
          }
          else
          {
            MajScore(false)
          }
        break;

        default:
        break;
      }
    }


    function MajScore(Gain)                                                    //Met à jour le score de l'utilisateur pour chaques touches appuyé
    {
      switch (Gain)
      {
        case true:
          ScoreUtilisateur++
        break;

        case false:
          ScoreUtilisateur--
        break;

        default:
        break;
      }
      ScoreHTML.innerHTML = ScoreUtilisateur
    }

})
