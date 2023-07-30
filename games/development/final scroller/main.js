import Player from "./player.js";
import { InputHnadler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundedEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", ()=>{
    const ctx = c.getContext("2d");
    c.width = 900;
    c.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 4;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHnadler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 200;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = "black";
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();

        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time  > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            this.floatingMessages.forEach(message => {
                message.update();
            })

            this.particles.forEach((p, index) => {
                p.update();
            });
            if (this.particles.length > this.maxParticles) { 
                this.particles.length = this.maxParticles;
            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(p => !p.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => 
                !message.markedForDeletion);
        
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach((p) => {
                p.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            })
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundedEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(c.width, c.height);
    let lastTime = 0;


    function animate(timeStamp){
        const deltaTime  = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, c.width, c.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});