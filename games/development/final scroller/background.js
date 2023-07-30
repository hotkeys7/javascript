class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.lay = new Layer(this.game, this.width, this.height, 0, layer1);
        this.lay2 = new Layer(this.game, this.width, this.height, 0.2, layer2);
        this.lay3 = new Layer(this.game, this.width, this.height, 0.4, layer3);
        this.lay4 = new Layer(this.game, this.width, this.height, 0.8, layer4);
        this.lay5 = new Layer(this.game, this.width, this.height, 1, layer5);
        this.backgroundLayers = [this.lay, this.lay2, this.lay3, this.lay4, this.lay5];

    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();

        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}