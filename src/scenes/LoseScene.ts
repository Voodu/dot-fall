import { Helper } from "../Helper";

export class LoseScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoseScene"
        });
    }

    score = 0;

    init(data: any): void {
        this.score = data.score;
        Helper.HIGHSCORE = Math.max(Helper.HIGHSCORE, this.score);
        if (Helper.isIOS()) Helper.save("topDotFallScore", Helper.HIGHSCORE);
    }

    preload(): void {
        this.load.image("play", "assets/playButton.png");
        this.load.image("menu", "assets/menuButton.png");
    }

    create(): void {
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        const center = width / 2;

        const textStyle = {
            font: "200px Amatic SC",
            fill: "#000"
        };

        this.add.text(
            (1 / 5) * width,
            (1 / 3) * height,
            `Score: ${this.score}`,
            textStyle
        );

        this.add
            .sprite(center, (5 / 8) * height, "play")
            .setInteractive()
            .on("pointerdown", () => this.scene.start("MainGameScene"));
        this.add
            .sprite(center, (3 / 4) * height, "menu")
            .setInteractive()
            .on("pointerdown", () => this.scene.start("StartScene"));
    }

    update(): void {}
}
