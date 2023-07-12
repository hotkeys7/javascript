window.addEventListener("load", function() {
	const ctx = c.getContext("2d");
	c.width = 1400;
	c.height = 720;
	let enemies = [];
	let score = 0;
	let gameOver = false;

	class InputHandler {
		constructor(){
			this.keys =[];
			this.touchY = "";
			this.touchThreshold = 30;

			window.addEventListener("keydown", e => {
				
				if ((e.key === "ArrowDown" || 
					e.key === "ArrowUp" || 
					e.key === "ArrowLeft" || 
					e.key === "ArrowRight" )
				 	&& this.keys.indexOf(e.key) === -1) {
					this.keys.push(e.key);
				} else if (e.key === "Enter" && gameOver) restartGame();
				
			});
			window.addEventListener("keyup", e => {

				if (e.key === "ArrowDown" ||
					e.key === "ArrowUp" ||
					e.key === "ArrowLeft" ||
					e.key === "ArrowRight") {
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
				
			});
			window.addEventListener("touchstart", e => {
				this.touchY = e.changedTouches[0].pageY
			});
			window.addEventListener("touchmove", e => {
				const swipeDistance = e.changedTouches[0].pageY - 
				this.touchY;
				if ( swipeDistance < -this.touchThreshold && this.keys.indexOf("swipe up") === -1) 
					this.keys.push("swipe up");
				else if (swipeDistance > this.touchThreshold && this.keys.indexOf("swipe down") === -1) {
				 	this.keys.push("swipe down");
				 	if (gameOver) restartGame();
				}

			});
			window.addEventListener("touchend", e => {
				this.keys.splice(this.keys.indexOf("swipe up"), 1);
				this.keys.splice(this.keys.indexOf("swipe down"), 1);
			});
		}

	}


	class Player {
		constructor(gameWidth, gameHeight){

			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.width = 200;
			this.height = 200;
			this.x = 100;
			this.y = this.gameHeight - this.height;
			this.frameX = 0;
			this.maxFrame = 8;
			this.frameY = 0;
			this.fps = 20;
			this.frameTimer = 0;
			this.frameInterval = 1000/this.fps;
			this.speed = 0;
			this.vy = 0;
			this.weight = 1;
			


		}
		restart() {

			this.x = 100;
			this.y = this.gameHeight - this.height;
			this.maxFrame = 8;
			this.frameX = 0;

		}
		draw(context) {



			context.drawImage(playImg, this.frameX * this.width, this.frameY * this.height, 
				this.width, this.height, this.x, this.y, this.width, this.height);

		}
		update(input, deltaTime, enemies) {

			enemies.forEach( enemy => {

				const dx = (enemy.x + enemy.width/2 - 20) - (this.x + this.width/2);
				const dy = (enemy.y + enemy.height/2)- (this.y + this.height/2 + 20);
				const distance = Math.sqrt(dx * dx + dy * dy);
				if ( distance < enemy.width/3 + this.width/3) {
					
					gameOver = true;

				}

			});


			if (this.frameTimer > this.frameInterval) {
				if (this.frameX >= this.maxFrame) this.frameX = 0;
				else this.frameX++;
				this.frameTimer = 0;

			} else { 
				this.frameTimer += deltaTime;
			}
	
			if (input.keys.indexOf("ArrowRight") > -1){

				this.speed = 5;

			}else if(input.keys.indexOf("ArrowLeft") > -1){

				this.speed = -5;

			}else if((input.keys.indexOf("ArrowUp") > -1 || input.keys.indexOf("swipe up") > -1) && this.onGround()){

				this.vy -= 32;

			}else{

				this.speed = 0;
			}

			this.x += this.speed;
			if (this.x < 0) this.x = 0;
			else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

			this.y += this.vy;
			if (!this.onGround()){

				this.vy += this.weight;
				this.maxFrame = 5;
				this.frameY = 1;


			} else {

				this.vy = 0;
				this.maxFrame = 8;
				this.frameY = 0;
			}
			if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;

		}

		onGround(){
			return this.y >= this.gameHeight - this.height;
		}
	}


	class Background {
		constructor(gameWidth, gameHeight){

			this.gameHeight = gameHeight;
			this.gameWidth = gameWidth;
			this.x = 0;
			this.y = 0;
			this.width = 2400;
			this.height = 720;
			this.speed = 20;


		}
		draw(context){

			context.drawImage(bgImg, this.x, this.y, this.width, this.height);
			context.drawImage(bgImg, this.x + this.width - this.speed, this.y, this.width, this.height)
		}
		update(){
			this.x -= this.speed;
			if (this.x < 0 - this.width) this.x = 0;
		}
		restart(){
			this.x = 0;

		}


	}

	class Enemy {

		constructor(gameWidth, gameHeight){
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.width = 160;
			this.height = 119;
			this.x = this.gameWidth;
			this.y = this.gameHeight - this.height;
			this.frameX = 0;
			this.maxFrame = 5;
			this.fps = 20;
			this.frameTimer = 0;
			this.frameInterval = 1000/this.fps;
			this.speed = 8;
			this.markedForDeletion = false;

		}
		draw(context){

			context.drawImage(eImg, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
		}
		update(deltaTime) {
			if (this.frameTimer > this.frameInterval) {
				if (this.frameX >= this.maxFrame) this.frameX = 0;
				else this.frameX++;
				this.frameTimer = 0;

			} else {
				this.frameTimer += deltaTime;
			}
			this.x -= this.speed;
			if (this.x < 0 - this.width) {
				this.markedForDeletion = true;
				score++;

			}
		}

	}

	// enemies.push(new Enemy(c.width, c.height));

	function handleEnemy(deltaTime) {
		if(enemyTimer > enemyInterval + randomEnemyInterval) { 
			enemies.push(new Enemy(c.width, c.height));

			randomEnemyInterval = Math.random() * 1000 + 500;
			enemyTimer = 0;
		} else {
			enemyTimer += deltaTime;
		}
		enemies.forEach(enemy => {
			enemy.draw(ctx);
			enemy.update(deltaTime);
		});

		enemies = enemies.filter(enemy => !enemy.markedForDeletion);
	}

	function displayStatus(context) {

		context.textAlign = "left";
		context.font = "40px Helventica";
		context.fillStyle = "black";
		context.fillText("Score: " + score, 20, 50);

		context.fillStyle = "white";
		context.fillText("Score: " + score, 22, 52);

		if ( gameOver) {

			context.textAlign = "center";
			context.fillStyle = "black";
			context.fillText("GAME OVER press Enter or swipe down to restart", c.width/2, 200);

			context.fillStyle = "white";
			context.fillText("GAME OVER press Enter or swipe down to restart", c.width/2 + 2, 202)

		}
	}


	function restartGame() {

		player.restart()
		bg.restart();
		enemies = [];
		score = 0;
		gameOver = false;
		animate(0);
	}


	function toggleFullScreen(){
		
		if(!document.fullscreenElement) {
			c.requestFullscreen().catch(err => {
				alert(`Error, can't enable fullscreen mode: ${err.message}`)
			});
		} else{
			document.exitFullscreen();
		}
	}

	fullScreenButton.addEventListener("click", toggleFullScreen);


	const input = new InputHandler();
	const player = new Player(c.width, c.height);
	const bg = new Background(c.width, c.height);
	

	let lastTime  = 0;
	let enemyTimer = 0;
	let enemyInterval = 2000;
	let randomEnemyInterval = Math.random() * 1000 + 500


	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;

		ctx.clearRect(0, 0, c.width, c.height);
		bg.draw(ctx);
		// bg.update();
		player.draw(ctx);
		player.update(input, deltaTime, enemies);

		handleEnemy(deltaTime);
		displayStatus(ctx);
		 if (!gameOver) requestAnimationFrame(animate);


	}
	animate(0)

});