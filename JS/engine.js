// Variablen
let score = 0;
let klickstaerke = 1;

// SHOP Variablen
let inflation = 1;
let preisKlickstaerke = 20;

// Funktionen
function stonks() {
    score += klickstaerke;
    Update();
}

function Update() {
    const pElement = document.getElementById("stonksAnzeige");
    if (pElement) {
        pElement.innerText = "Stonks Counter: " + score;
    }
}

function UpdateKlickstaerke() {
    if (score >= preisKlickstaerke) {
        Einkaufen(preisKlickstaerke);     
        klickstaerke += 1;
        Inflation(); 
    }
}

function Einkaufen(kosten) {
    score -= kosten;
    
    Update();
}

function Inflation() {
    preisKlickstaerke += inflation; 
}

