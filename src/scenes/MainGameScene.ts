export class MainGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainGameScene"
        });
    }

    sensitivity = 250;

    ball!: Phaser.Physics.Arcade.Sprite;
    walls!: Phaser.Physics.Arcade.StaticGroup;

    preload(): void {
        this.load.image("ball", "../src/assets/ball.png");
        this.load.image("wall", "../src/assets/wall.png");
    }

    create(): void {
        this.setupBall();
        this.setupWalls();
        this.setupCollisions();
    }

    update(): void {
        this.parseInput();
        if (this.ball.getTopLeft().y > this.game.canvas.height) {
            console.log("out");
        }
    }

    private setupCollisions() {
        this.physics.add.collider(this.ball, this.walls);
    }

    private setupWalls() {
        this.walls = this.physics.add.staticGroup();
        this.walls.create(0, 0, "wall");
        this.walls.create(this.game.canvas.width + 1, 0, "wall");
    }

    private setupBall() {
        this.ball = this.physics.add.sprite(125, 0, "ball");
        this.ball.setCollideWorldBounds(false);
        this.ball.setBounce(0.3, 0);
    }

    private parseInput() {
        const half = this.game.canvas.width / 2;
        if (this.game.input.activePointer.isDown) {
            if (this.game.input.activePointer.x > half) {
                this.ball.setAccelerationX(+1 * this.sensitivity);
            } else if (this.game.input.activePointer.x < half) {
                this.ball.setAccelerationX(-1 * this.sensitivity);
            }
        } else {
            this.ball.setAccelerationX(0);
        }
    }
}
