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
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        const center = width / 2;

        this.title = this.add.sprite(center, (3 / 8) * height, "title");

        const textStyle = {
            font: "104px Arial",
            fill: "#fff"
        };
        this.highScoreText = this.add.text(
            (9 / 50) * width,
            (19 / 40) * height,
            `Highscore: ${HighScore}`,
            textStyle
        );

        this.playButton = this.add.sprite(center, (5 / 8) * height, "play");
        this.playButton.setInteractive();
        this.playButton.on("pointerdown", () =>
            this.scene.start("MainGameScene")
        );
    }

    update(): void {}
}
