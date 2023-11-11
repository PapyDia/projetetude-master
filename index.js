import prompt from "prompt-sync";
import { v4 as uuidv4 } from "uuid";
import { readFileSync, writeFileSync } from "node:fs";
//variable to store filename
const fileName = "database.json";

///////////////////////////////////////////////////
// Program logic
//////////////////////////////////////////////////

//1) get data from database
const DB = readData(fileName);

// 2) create and course data
DB.cours.push({
  id: uuidv4(),
  titre: "chimie",
  description: "Ce cours est une introduction de la chimie generale",
  prof: "",
  inscrits: [],
});
// 3) create and prof data
const prof = {
  id: uuidv4(),
  nom: "Bakary",
  prenom: "Konate",
  email: "prof1@gmail.com",
  cours: "chimie",
};
DB.profs.push(prof);
DB.cours.prof = prof.nom;

// 4) create and add student data
createStudent(DB);

// 5) save data to database
storeData(fileName, DB);
//afficher les donnees au terminal
console.log("Afficher data: ", JSON.stringify(DB, null, 4));

//////////////////////////////////////////////////////////
//////Functions used //////////////////////////////////////
/////////////////////////////////////////////////////////
// 1) function to register student
function createStudent(data) {
  try {
    const nouvoEmail = promptEmail(data);
    //demander de tapper le nouveau prenom et nom
    const nouvoPrenom = prompt()("taper le prenom: ");
    const nouvoNom = prompt()("taper le nom: ");
    const choixCourse = prompt()("taper le choix de cours: ");
    const etudiant = {
      id: uuidv4(),
      nom: nouvoNom,
      prenom: nouvoPrenom,
      email: nouvoEmail,
      courses: [],
    };
    //add student information after student creation
    addStudent(data, etudiant, choixCourse);
  } catch (err) {
    console.log(err.message);
  }
}

// 2) helper function to prompt student email.
//  It checks if student email exists. Only 3 tries is allowed.
function promptEmail(data) {
  let nouvoEmail = null;
  let count = 0;
  do {
    if (count++ >= 3)
      throw Error("You have exceeded 3 trials, please try again");
    // demander de taper l'email de l'etudiant
    nouvoEmail = prompt()("taper l'email: ");
    console.log("trial count = ", count);
  } while (data.etudiants.find((user) => user.email === nouvoEmail)); //only false if email not found
  // we need false to break the loop
  return nouvoEmail;
}

// 3) helper function to check if file exists
//returns true if file exists and false if not
function fileExists(filename) {
  try {
    readFileSync(filename, "utf8");
    return true;
  } catch {
    return false;
  }
}
// 4) function to create new database
function initDatabase(filename) {
  let collection = {};
  collection.cours = [];
  collection.profs = [];
  collection.etudiants = [];

  //write data to new database(this should be empty)
  storeData(filename, collection);
  return collection;
}
// 5) helper function to read database file
function loadDatabase(filename) {
  //Node API to read data from database
  const dataBuffer = readFileSync(filename);
  //deserialise data
  const jsonData = JSON.parse(dataBuffer);
  //return data deserialised as object.
  return jsonData;
}

// 6) function to read data from database
//database file does not exist, create it
function readData(filename) {
  if (fileExists(filename)) {
    try {
      return loadDatabase(filename);
    } catch (error) {
      console.error("Error loading data", error);
    }
  } else {
    try {
      console.log("database successfully created!");
      return initDatabase(filename);
    } catch (error) {
      console.error("Error initialising database", error);
    }
  }
}
// 7) function to save data to database
function storeData(filename, data) {
  //Node API to serialise data
  const jsonData = JSON.stringify(data, null, 4);
  //Node API to write data to database
  writeFileSync(filename, jsonData, { flag: "w" }, "utf-8", (err) => {
    if (err) throw err;
    console.log("database initialised successfully file name:", filename);
  });
}
// 8) function add to studens list in memory
function addStudent(data, etudiant, titre) {
  const cours = data.cours;
  const choix = cours.find((c) => c.titre === titre);

  if (choix) {
    etudiant.courses.push(titre);
    choix.inscrits.push(etudiant.email);
    data.etudiants.push(etudiant);
  } else {
    console.log("Error adding student");
  }
}
// ajouter un coursa la list des cours d'un etudiant
// cette fonction pas utilisee dans mon code 
function addCours(data, etudiant, titre) {
  const cours = data.cours;
  const choix = cours.find((c) => c.titre === titre);
  if (
    choix &&
    etudiant.courses.length <= 4 &&
    !etudiant.courses.includes(titre)
  ) {
    etudiant.courses.push(choix.titre);
    choix.inscrits.push(etudiant.email);
    data.etudiants.push(etudiant);
  }
}

// 9) helper function to check if a student is already in the database
// la fonction returne true si etudiant existe deja, sinon returne false
// only false if email not found
function findStudentByEmail(data, email) {
  // return student or undefined
  const existingStudent = data.etudiants.find((user) => user.email === email);
  if (existingStudent) return true;
  else return false; //only false if email not found
}

// 10) fonction d'ajouter un prof
function addProf(DB){
  try{
    verifieEmailProf(DB);

    const nom = prompt()("Entrez votre nom: ");
    const prenom = prompt()("Entrez votre prénom: ");
    const matiere = prompt()("Entrez votre matière à enseigner: ");
  }catch(error){
    console.log(error.message);
  };

};
// 11) Fonction qui vériefie l'existence de l'email entré par le nouveau professeur
function verifieEmailProf(DB){
  const mail = prompt()('Entrer votre adresse mail Monsieur: ');
  const profs = DB.profs;
  const trouver = profs.find((p) => p.email === mail);

  if(trouver){
    console.log('Email existé !');
    promptEmailInsist(DB);
  }else{
    console.log("C'est un nouveau email !");
  };
  
};

// 12) Fonction qui exige à l'utilisateur de taper un email différent
function promptEmailInsist(DB) {
  let mail = null;
  let count = 0;
    do {
      if (count++ >= 3)
      throw Error("Vous avez fait plus de 3 tentatives, réessayer ultérieurement");
  // demander de taper l'email du nouveau professeur
      mail = prompt()("Retaper votre email: ");
      console.log("Tentative = ", count);
} while (DB.profs.find((user) => user.email === mail));

        return mail;
};

addProf(DB);