import rawlist from "@inquirer/rawlist";
import inquirer from "inquirer";
import prompt from "prompt-sync";

// // Déclaration des fonctions primaires plus(+), moins(-), multiplier(*), diviser(/).
// const plus = (...args) => {
//     let total = 0;
//     for(const arg of args){
//         total += arg; 
//     };
//     return total;
// };
// const moins = (a, b) => a - b;
// const multiplierPar = (...args) => {
//     let total = 1;
//     for(const arg of args){
//         total *= arg;
//     };
//     return total;
// };
// const diviserPar = (a, b) => {
//         if(b === 0){
//             throw Error ("Il est imposible de faire une division par zéro");
//         }
//         return a / b;
// };

// const exit = () => {
//     process.exit();
// };

// // La fonction calculer utilise un switch pour choisir l'opération à faire selon les des fonctions primaires.
// const calculer = (operation) => {
//     switch(operation){
//         case "plus":
//             return plus;
//         case "moins":
//             return moins;
//         case "multiplierPar":
//             return multiplierPar;
//         case "diviserPar":
//             return diviserPar;
//         case "exit":
//             exit();
//         break;
//         default:
//             return (a, b) => "Impossible de faire cette opération";
//     };
// };

// // Calculatrice est la fonction constructor qui appelle la fonction calculer pour simplifier les calculs.
// const Calculatrice = (operation, ...args) => {
//     let dic = new Map();
//     dic.set("plus", " + ");
//     dic.set("moins", " - ");
//     dic.set("multiplierPar", " * ");
//     dic.set("diviserPar", " / ");

//     try{
//         console.log("Résultat de " + args.join(dic.get(operation)) + " = ",
//         calculer(operation)(...args));
//     }catch(err){
//         console.error(err.message);
//     };
// };

// // Utilisation de la bibliothèque Inquirer
// const myRawlist = async () => {
//    return await rawlist({
//         message: 'Select your operation',
//         choices: [
//           { name: 'plus', value: 'plus' },
//           { name: 'moins', value: 'moins' },
//           { name: 'multiplierPar', value: 'multiplierPar' },
//           { name: 'diviserPar', value: 'diviserPar' },
//           { name: 'exit', value: 'exit' },
//         ],
//       });
// };

// const operation = await myRawlist();

// if(operation === "exit") exit();

// inquirer.prompt([
//     {
//         type: 'input',
//         name: "calc",
//         message: "Taper les nombres"
//     },
// ]).then((answers) => {
//     const numbers = answers.calc.trim().split(" ");
//     const theArg = numbers.map(Number);

//     Calculatrice(operation, ...theArg);
//     exit();
// });

// _____________--------------------__________________----------------------____________________-----------------------_____________________

//          EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES EXERCICES
const food = ["Poisson braisé", "Riz au poisson", "Riz au poulet", "Atiéké", "Burger", "Mini pizza"];
const placeDispo = [1, 3, 10, 8, 9, 11, 20, 17, 6];

const exit = () => {
    process.exit();
};

const choice = await rawlist({
    message: "Définissez votre commande",
    choices: [
        { name: "Poisson braisé", value: "Poisson braisé" },
        { name: "Riz au poisson", value: "Riz au poisson" },
        { name: "Riz au poulet", value: "Riz au poulet" },
        { name:  "Atiéké", value:  "Atiéké" },
        { name: "Burger", value: "Burger" },
        { name: "Mini pizza", value: "Mini pizza" },
    ]
});

const gerePlace = (placeDispo) => {
    inquirer
        .prompt({
            type: "input",
            name: "place",
            message: "Entrez le numéro de table où vous assayez"
        })
        .then((answers) => {
            const numero = answers.place.trim().split(" ");
            const myArrayNumber = numero.map(Number);
            
            compareNumber(placeDispo, myArrayNumber)

            exit();
        });
};

const livreur = (food, choice) => {
    const searchFood = food.find(plat => plat === choice);
    console.log("Vous avez choisi " + searchFood);
};

const compareNumber = (placeDispo, myArrayNumber) => {
    const searchPlace = placeDispo.find(p => p === myArrayNumber[0]);
    if (searchPlace === myArrayNumber[0]) {
        console.log("Votre commande vient tout de suite, Merci !");
    } else {
        console.log("Cette place elle est occupée, Choisissez une table libre");
    };
};


const addFood = () => {
    const suggestion = prompt()("Voulez-vous ajouter un plat ?");
    if (suggestion === "oui") {
        console.log("il est d'accord");
    } else if(suggestion === "non"){
        console.log("il l'est pas");
    }else{
        console.log("Répondez par oui ou non !");
    }
};

livreur(food, choice);
gerePlace(placeDispo);

// addFood();