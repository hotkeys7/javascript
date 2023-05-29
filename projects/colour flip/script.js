const colors = ["green", "red", "rgba(133, 122, 200)", "#f15025"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

// let numNum = Math.floor(Math.random() * colors.length);

// let randn = colors[numNum];

btn.addEventListener("click", t); 


function genran() {
	return Math.floor(Math.random() * colors.length)
}

function ranc() {
	return colors[genran()]

}

function t() {
	document.body.style.backgroundColor = ranc();
	color.textContent = ranc();
}


function rr(col) {

	document.body.style.backgroundColor = col;
	color.textContent = col;
}