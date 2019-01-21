import { load, save } from "../Helper";

export class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: "StartScene"
        });
        HighScore = load("topDotFallScore", 0);
        window.onbeforeunload = () => {
            save("topDotFallScore", HighScore);
        };
    }

    playButton!: Phaser.GameObjects.Sprite;
    title!: Phaser.GameObjects.Sprite;

    highScoreText!: Phaser.GameObjects.Text;

    preload(): void {
        this.load.image("title", "assets/gameTitle.png");
        this.load.image("play", "assets/playButton.png");
    }

    create(): void {
        const center = this.game.canvas.width / 2;

        this.title = this.add.sprite(center, 150, "title");

        const textStyle = {
            font: "26px Arial",
            fill: "#fff"
        };
        this.highScoreText = this.add.text(
            45,
            190,
            `Highscore: ${HighScore}`,
            textStyle
        );

        this.playButton = this.add.sprite(center, 250, "play");
        this.playButton.setInteractive();
        this.playButton.on("pointerdown", () =>
            this.scene.start("MainGameScene")
        );
    }

    update(): void {}
}
