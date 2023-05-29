const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B","C", "D", "E", "F"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");


btn.addEventListener("click", jj)



function jj() {

	color.textContent = randomHex();
	document.body.style.backgroundColor = randomHex();
}


function getRandomNum() {
	return Math.floor(Math.random() * hex.length)
}

function randomHex() {
	let hexColor = "#"
	for( let i = 0; i < 6; i++) {
		hexColor += hex[getRandomNum()];

	}
	return hexColor;
}