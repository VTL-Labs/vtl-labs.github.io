// Variablen
let score = 0;

// Funktionen
function stonks() {
	score += 1;
	Update()
}

function Update() {
	const pElement = document.getElementById("stonksAnzeige");
	pElement.innerText = "Stonks Counter: " + score;
}

