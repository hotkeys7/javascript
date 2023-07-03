const canvas = document.getElementById("canvas1");
const ctx = canvas1.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();



class Explosion {
	constructor(x, y) {
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.width = this.spriteWidth * 0.7;
		this.height = this.spriteHeight * 0.7;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = "boom.png";
		this.frame = 0;
		this.timer = 0;
		this.angle = Math.random() * 6.2;
		this.sound = new Audio();
		this.sound.src = "atari.wav";

	}

	update() {
		if (this.frame === 0 ) this.sound.play();
		this.timer++;
		if(this.timer % 8 === 0){
			this.frame++;
		}
		

	}
	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, 
			this.spriteHeight, 0 - this.width/2, 0 - this.height/2, this.width, this.height);
		ctx.restore();
	}
}

window.addEventListener("click", (b) => {
	createAnimation(b);
});

// window.addEventListener("mousemove", (b) => {
// 	createAnimation(b);
// });


function createAnimation(b) {
	let positionX = b.x - canvasPosition.left;
	let positionY= b.y - canvasPosition.top;
	explosions.push(new Explosion(positionX, positionY));
};

function animate(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for(let i = 0; i < explosions.length; i++){
		explosions[i].update();
		explosions[i].draw();
		if (explosions[i].frame > 5) {
			explosions.splice(i, 1);
			i--;
		}
	}
	requestAnimationFrame(animate);

};
animate();