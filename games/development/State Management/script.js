import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";

window.addEventListener("load", () => {

    loading.style.display = "none";
    const ctx = c.getContext("2d");
    c.height = window.innerHeight;
    c.width = window.innerWidth;



    const player = new Player(c.width, c.height);
    const input = new InputHandler();

    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, c.width, c.height);
        player.update(input.lastKey);
        player.draw(ctx, deltaTime);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate)
    }

    animate(0);
})