
import  prompt  from "prompt-sync";
import { v4 as uuidv4 } from "uuid";




// L'entité supérieure qui contient les entités professeurs, étudiants et cours.
let maBaseDeDonnees = {};

    // Initialisation des entités de maBaseDeDonnees.
    maBaseDeDonnees.professeurs = [];
    maBaseDeDonnees.etudiants = [];
    maBaseDeDonnees.cours = [];


// Déclaration des entités.
let professeurs = maBaseDeDonnees.professeurs;
let etudiants = maBaseDeDonnees.etudiants;
let cours = maBaseDeDonnees.cours;

    const profGeo = {
        id: uuidv4(),
        nom: "Diop",
        prenom: "Cheikh",
        mail: "cheikhdiop0812@gmail.com",
        tel: "0022177000000000",
        coursDispense: "Géographie",
    };

    professeurs.push(profGeo);

    let coursGeo = {
        id: uuidv4(),
        nom: "Géographie",
        duree: "2 mois",
        description: "Ceci est un cours qui permet aux étudiants d'avoir les bases en géographie humaine",
        enseignant: profGeo,
        apprenants: []
    };
    cours.push(coursGeo);

// L'inscription des etudiants à un cours.

let inscription = {
    prenom: prompt()("Entrez votre prenom SVP."),
    nom: prompt()("Entrez votre nom SVP."),
    mail: prompt()("Entrez votre adresse mail SVP."),
    cours: prompt()("Entrez le nom du cours à suivre SVP."),
    id: uuidv4()
};
    coursGeo.apprenants.push(inscription.prenom + inscription.nom);

    etudiants.push(inscription);

    console.log("Un étudiant de l'établissement ",etudiants);
    console.log("Voici les étudiants inscrit au cours Géographie ",coursGeo.apprenants);
console.log(JSON.stringify(maBaseDeDonnees));