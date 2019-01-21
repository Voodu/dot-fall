export class LoseScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoseScene"
        });
    }

    playButton!: Phaser.GameObjects.Sprite;
    menuButton!: Phaser.GameObjects.Sprite;
    scoreText!: Phaser.GameObjects.Text;
    score = 0;

    init(data: any): void {
        this.score = data.score;
        HighScore = Math.max(HighScore, this.score);
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
            font: "120px Arial",
            fill: "#fff"
        };

        this.scoreText = this.add.text(
            (6 / 25) * width,
            (7 / 16) * height,
            `Score: ${this.score}`,
            textStyle
        );

        this.playButton = this.add.sprite(center, (5 / 8) * height, "play");
        this.playButton.setInteractive();
        this.playButton.on("pointerdown", () =>
            this.scene.start("MainGameScene")
        );
        this.menuButton = this.add.sprite(center, (3 / 4) * height, "menu");
        this.menuButton.setInteractive();
        this.menuButton.on("pointerdown", () => this.scene.start("StartScene"));
    }

    update(): void {}
}
