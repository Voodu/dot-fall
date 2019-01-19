export class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: "StartScene"
        });
    }

    playButton!: Phaser.GameObjects.Sprite;
    title!: Phaser.GameObjects.Sprite;

    preload(): void {
        this.load.image("title", "assets/gameTitle.png");
        this.load.image("play", "assets/playButton.png");
    }

    create(): void {
        const center = this.game.canvas.width / 2;

        this.title = this.add.sprite(center, 150, "title");

        this.playButton = this.add.sprite(center, 250, "play");
        this.playButton.setInteractive();
        this.playButton.on("pointerdown", () => this.scene.start("MainGameScene"));
    }

    update(): void {}
}
