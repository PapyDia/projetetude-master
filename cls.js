const plus = (a, b) => a + b;
const moins = (a, b) => a - b;
const multiplierPar = (a, b) => a * b;
const diviserPar = (a, b) => {
        if(b === 0){
            throw Error ("Il est imposible de faire une division par zéro");
        }
        return a / b;
    
};

const calcul = (operation) => {
    switch(operation){
        case "plus":
            return plus;
        case "moins":
            return moins;
        case "multiplierPar":
            return multiplierPar;
        case "diviserPar":
            return diviserPar;
        break;
        default:
            return (a, b) => "Impossible de faire cette opération";
    };
};

const calculatrice = (a, operation, b) => {
    try{
        console.log(a + " " + operation + " " + b + " = ",
        calcul(operation)(a, b));
    }catch(err){
        console.error(err.message);
    };
};

const resultat = calculatrice(20, "diviserPar", 4);
console.log(resultat);