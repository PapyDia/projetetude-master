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

const coursCreated = createCours();
DB.cours.push(coursCreated);

// 2) créer un cours
function createCours(){
  try{
    const cours = verifyExistingCours(DB);

    const description = prompt()("Ecrire une brève description du cours: ");
    const inscrits = [];

    return {
      id: uuidv4(),
      titre: cours,
      description: description,
      inscrits: inscrits
    };

  }catch(error){
    console.log(error.message);
  };
};

// 3) create prof instance
const prof = createProf();
DB.profs.push(prof);

function createProf(){
  try{
    const mail = verifyExistingProf(DB);
    
    const prenom = prompt()("Entrez le prénom du professeur: ");
    const nom = prompt()("Entrez le nom du professeur: ");
    const cours = "";

    return {
      id : uuidv4(),
      prenom : prenom,
      nom : nom,
      email : mail,
      cours: cours
    };

  }catch(error){
    console.log(error.message);
  };

};


// 4) create and add student data
createStudent(DB);

// 5) save data to database
storeData(fileName, DB);
//afficher les donnees au terminal
// console.log("Afficher data: ", JSON.stringify(DB, null, 4));


//////////////////////////////////////////////////////////
//////Functions used //////////////////////////////////////
/////////////////////////////////////////////////////////

// 1) function to register student
function createStudent(data) {
  try {
    const nouvoEmail = promptEmailStudent(data);
    //demander de tapper le nouveau prenom et nom
    const nouvoPrenom = prompt()("Entrez votre prénom: ");
    const nouvoNom = prompt()("Votre nom: ");
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

// 2.1) helper function to prompt student email.
//  It checks if student email exists. Only 3 tries is allowed.
function promptEmailStudent(data) {
  let nouvoEmail = null;
  let count = 0;
  do {
    if (count++ >= 3)
      throw Error("Vous avez essayé à trois reprises, réesayez ultérieurement. ");
    // demander de taper l'email de l'etudiant
    nouvoEmail = prompt()("Taper votre adresse mail: ");
    console.log("Nombre de tentatives = ", count);
  } while (data.etudiants.find((user) => user?.email === nouvoEmail)); //only false if email not found
  // we need false to break the loop
  return nouvoEmail;
};

// 2.2) helper function to prompt prof email.
function verifyExistingProf(data) {
  let nouvoEmail = null;
  let count = 0;
  do {
    if (count++ >= 3)
      throw Error("Vous avez essayé à trois reprises, réesayez ultérieurement. ");
    // demander de taper l'email de l'etudiant
    nouvoEmail = prompt()("Taper l'email du prof: ");
    console.log("Nombre de tentatives = ", count);
  } while (data.profs.find((user) => user?.email === nouvoEmail)); //only false if email not found
  // we need false to break the loop
    return nouvoEmail;
};

// 2.3) helper function to prompt prof email.
function verifyExistingCours(data) {
  let coursExist = null;
  let count = 0;
  do {
    if (count++ >= 3)
      throw Error("Vous avez essayé à trois reprises, réesayez ultérieurement. ");
    // demander de taper l'email de l'etudiant
    coursExist = prompt()("Entrez le titre du cours: ");
    console.log("Nombre de tentatives = ", count);
  } while (data.cours.find((user) => user?.titre === coursExist)); //only false if email not found
  // we need false to break the loop
    return coursExist;
};

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
    console.log("Ce cours n'existe pas !");
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
  };
};

// 9) helper function to check if a student is already in the database
// la fonction returne true si etudiant existe deja, sinon returne false
// only false if email not found
function findStudentByEmail(data, email) {
  // return student or undefined
  const existingStudent = data.etudiants.find((user) => user.email === email);
  if (existingStudent) return true;
  else return false; //only false if email not found
};

