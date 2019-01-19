import "phaser";
import { StartScene, MainGameScene, LoseScene } from "./scenes";

// main game configuration
const config: GameConfig = {
    type: Phaser.AUTO,
    width: 250,
    height: 400,
    scene: [StartScene, MainGameScene, LoseScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        }
    },
    callbacks: {
        postBoot: game => {
            // In v3.15, you have to override Phaser's default styles
            game.canvas.style.width = "100%";
            game.canvas.style.height = "100%";
        }
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    const game = new Game(config);
});
