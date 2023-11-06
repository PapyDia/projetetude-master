import { readFileSync, writeFileSync} from "node:fs";
import prompt from "prompt-sync";
// Lire le fichier database.json
// let data = readFileSync("database.json");
//Deserialiser l'data
// const objetData = JSON.parse(data);
const objetData = new Object();
objetData.users = [];
//variable to store filename
const fileName = "database.json";

//afficher les donnees au terminal
console.log(
  "Voici les donnees avant modifications",
  JSON.stringify(objetData, null, 4)
);
///////////////////////////////////////////////////
// Program logic
//////////////////////////////////////////////////

//extraire les donnees ( tableau users) dans l'objet
const users = objetData.users;

// demander de taper l'email de l'utilisateur
// dont on souhaite modifier les donnees

let email = prompt()("taper l'email: ");
//demande de tapper le nouveau prenom
let nouvoPrenom = prompt()("taper le nouveau prenom: ");
//1) get data from database
let data = readData(fileName);

// trouver l'utilisateur a modifier
const userOld = users.find((user) => { 
// 2) create and course data
data.cours.push({
  titre: "chimie",
  description: "Ce cours est une introduction de la chimie generale",
  prof: "",
  inscrits: [],
});

// 3) create and prof data
let prof = {
  nom: "Bakary",
  prenom: "Konate",
  email: "prof1@gmail.com",
  cours: "chimie",
};
data.profs.push(prof);
data.cours.prof = prof.nom;

  user.email === email

});


// if(!userOld) {
//   console.log("l'utilisateur n'existe pas");
//   return;
// }
//trouver l'index de l'utilisateur
// const index = users.findIndex((user) => user.email === email);
// console.log("index", index);
// 4) create and add student data
createStudent(data);

users.push({
  nom: "John",
  prenom: nouvoPrenom,
  email: email,
});
//modifier les donnees a l'index
// users[index] = {
//   nom: userOld.nom,
//   prenom: nouvoPrenom,
//   email: userOld.email,
// };
// 5) save data to database
storeData(fileName, data);
//afficher les donnees au terminal
console.log("Afficher data: ", JSON.stringify(data, null, 4));

// Serialiser l'objetData apres modification
let jsonData = JSON.stringify(objetData);
//////////////////////////////////////////////////////////
//////Functions used //////////////////////////////////////
/////////////////////////////////////////////////////////
// 1) function to register student
function createStudent(data) {
  try {
    const nouvoEmail = promptEmail();
    //demander de tapper le nouveau prenom et nom
    const nouvoPrenom = prompt()("taper le prenom: ");
    const nouvoNom = prompt()("taper le nom: ");
    const choixCourse = prompt()("taper le choix de cours: ");
    const etudiant = {
      nom: nouvoNom,
      prenom: nouvoPrenom,
      email: nouvoEmail,
      myCourse: [],
    };
    //add student information
    // data after student creation
    addStudent(data, etudiant);
  } catch (err) {
    console.log(err.message);
  }
}

//Sauver les donnees modifiées
// 2) helper function to prompt student email.
//  It check if student email exists. Only3 tries is allowed.
function promptEmail() {
  let nouvoEmail = null;
  let count = 0;
  do {
    if (count++ >= 3)
      throw Error("You have exceeded 3 trials, please try again");
    // demander de taper l'email de l'etudiant
    nouvoEmail = prompt()("taper l'email: ");
    console.log("trial count = ", count);
  } while (findStudentByEmail(data, nouvoEmail));
  return nouvoEmail;
}

  writeFileSync("database1.json", jsonData, { flag: 'w' }, "utf-8", (err) => {
    if (err) throw err;
    console.log("database modifiée");
  });
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
  let data = {};
  data.cours = [];
  data.profs = [];
  data.etudiants = [];

  //write data to new database(this should be empty)
  storeData(filename, data);
  return data;
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

//lire les donnees apres modification
    data = readFileSync("database1.json");
//Serialiser les donnees
jsonData = JSON.parse(data);
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
function addStudent(data, etudiant) {
  const cours = data.cours;
  const choix = cours.find((c) => c.titre === "chimie");
  choix.inscrits.push(etudiant.email);
  data.etudiants.push(etudiant);
};

// 9) function pour ajouter un prof