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
    }

    preload(): void {
        this.load.image("play", "../src/assets/playButton.png");
        this.load.image("menu", "../src/assets/menuButton.png");
    }

    create(): void {
        const center = this.game.canvas.width / 2;

        const textStyle = {
            font: "30px Arial",
            fill: "#fff",
        };

        this.scoreText = this.add.text(60, 175, `Score: ${this.score}`, textStyle);

        this.playButton = this.add.sprite(center, 250, "play");
        this.playButton.setInteractive();
        this.playButton.on("pointerdown", () =>
            this.scene.start("MainGameScene")
        );
        this.menuButton = this.add.sprite(center, 300, "menu");
        this.menuButton.setInteractive();
        this.menuButton.on("pointerdown", () => this.scene.start("StartScene"));
    }

    update(): void {}
}
