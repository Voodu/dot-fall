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

    preload(): void {
        this.load.image("title", "assets/gameTitle.png");
        this.load.image("play", "assets/playButton.png");
    }

    create(): void {
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        const center = width / 2;

        this.add.sprite(center, (3 / 8) * height, "title");

        const textStyle = {
            font: "104px Amatic SC",
            fill: "#000"
        };
        this.add.text(
            (3 / 10) * width,
            (19 / 40) * height,
            `Highscore: ${HighScore}`,
            textStyle
        );

        this.add
            .sprite(center, (5 / 8) * height, "play")
            .setInteractive()
            .on("pointerdown", () => this.scene.start("MainGameScene"));
    }

    update(): void {}
}
