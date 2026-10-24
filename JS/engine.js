// Variablen
let score = 100;
let klickstaerke = 1;
let autoClickerStaerke = 0;

// SHOP Variablen
let inflation = 1;
let preisKlickstaerke = 20;
let preisAutoklicker = 50;

// Funktionen
function stonks() {   // Damit machen wir Stonks bei buttonclick
    score += klickstaerke;
    Update();
}

function Update() {            // Wir Updaten die Anzeigen
    const pElement = document.getElementById("stonksAnzeige"); 
    pElement.innerText = "Stonks Counter: " + score;
    const bElement = document.getElementById("Kaufpreis");
    bElement.innerHTML = `+1 Klickstärke (${preisKlickstaerke})`;
    const bElementAuto = document.getElementById("KaufpreisAuto");
    bElementAuto.innerHTML = `Autoclicker (${preisAutoklicker})`;
}

function UpdateKlickstaerke() {     // Wir können erhöhte Klickstärke kaufen
    if (Einkaufen(preisKlickstaerke)) {     
        klickstaerke += 1;
        preisKlickstaerke = Inflation(preisKlickstaerke); 
        Update();
    }
}

function Einkaufen(kosten) {      // Das upgrades was kosten                                       
    if (score >= kosten) {
        score -= kosten;
        Update();
        return true;
    }
    else {
        return false;
    }
}

function Inflation(kost) {  // Das die Kosten steigen
   return kost + inflation; 
}

function AutoKlickerKaufen() {  // Wir können den Autoclicker kaufen
     if (Einkaufen(preisAutoklicker)) {
         autoClickerStaerke += 1;
         preisAutoklicker = Inflation(preisAutoklicker);
         Update();
     }
}

function AutoKlicker() {   // DEr AutoKlicker geht arbeiten 
    score += autoClickerStaerke;
    Update();
}

setInterval(AutoKlicker, 1000);
