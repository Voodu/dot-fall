import "phaser";
import { StartScene } from "./scenes/StartScene";

// main game configuration
const config: GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: "game",
	scene: StartScene,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
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
	var game = new Game(config);
});