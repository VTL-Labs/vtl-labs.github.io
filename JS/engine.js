// Variablen
let score = 0;
let klickstaerke = 1;

// Funktionen
function stonks() {
	score += klickstaerke;
	Update()
}

function Update() {
	const pElement = document.getElementById("stonksAnzeige");
	pElement.innerText = "Stonks Counter: " + score;
}

function UpdateKlickstaerke() {
	klickstaerke += 1; 
}