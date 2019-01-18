export class MainGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainGameScene"
        });
    }

    sensitivity = 250;

    ball!: Phaser.Physics.Arcade.Sprite;

    preload(): void {
        this.load.image("ball", "../src/assets/ball.png");
    }

    create(): void {
        this.setupBall();
        console.log("Create");
    }

    private setupBall() {
        this.ball = this.physics.add.sprite(125, 0, "ball");
        this.ball.setCollideWorldBounds(false);
        this.ball.setBounce(0.3, 0);
    }

    update(): void {
        this.parseInput();

        if (this.ball.getTopLeft().y > this.game.canvas.height) {
            console.log("out");
        }
    }

    private parseInput() {
        const half = this.game.canvas.width / 2;
        if (this.game.input.activePointer.isDown) {
            if (this.game.input.activePointer.x > half) {
                this.ball.setAccelerationX(+1 * this.sensitivity);
            }
            else if (this.game.input.activePointer.x < half) {
                this.ball.setAccelerationX(-1 * this.sensitivity);
            }
        }
        else {
            this.ball.setAccelerationX(0);
        }
    }
}
