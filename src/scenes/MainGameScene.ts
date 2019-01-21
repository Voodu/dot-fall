export class MainGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainGameScene"
        });
    }

    sensitivity = 1000;
    ballGravity = 600;
    platformVelocity = 200;
    scoreText!: Phaser.GameObjects.Text;

    private _score = 0;
    public get score(): number {
        return this._score;
    }
    public set score(v: number) {
        this._score = v;
        this.updateText();
    }

    ball!: Phaser.Physics.Arcade.Sprite;
    walls!: Phaser.Physics.Arcade.StaticGroup;
    platforms!: Phaser.Physics.Arcade.Group;

    preload(): void {
        this.load.image("ball", "assets/ball.png");
        this.load.image("wall", "assets/wall.png");
        this.load.image("platform", "assets/platform.png");
    }

    create(): void {
        this.setupBall();
        this.setupWalls();
        this.setupPlatforms();

        this.setupCollisions();

        this.setupText();
    }

    update(): void {
        this.parseInput();
        if (this.isBallOut()) {
            this.scene.start("LoseScene", { score: this.score });
        }
        this.cleanUp();
    }

    private setupText() {
        const style = {
            font: "60px Arial",
            fill: "#fff"
        };
        this.scoreText = this.add.text(40, 40, `Score: 0`, style);
        this.score = 0;
    }

    private updateText() {
        this.scoreText.text = `Score: ${this.score}`;
    }

    private isBallOut() {
        return (
            this.ball.body.top > this.game.canvas.height ||
            this.ball.body.bottom < 0
        );
    }

    private cleanUp() {
        this.platforms.children.each((p: Phaser.Physics.Arcade.Sprite) => {
            if (p.getBottomLeft().y < 0) {
                p.destroy();
                this.score++;
            }
        }, undefined);
    }

    private setupPlatforms(): void {
        this.platforms = this.physics.add.group();
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnPlatform.bind(this),
            loop: true
        });
        this.spawnPlatform(this.game.canvas.width / 2);
    }

    private spawnPlatform(x?: number, y?: number): void {
        if (x === null || x === undefined) {
            x = Phaser.Math.Between(0, this.game.canvas.width);
        }
        if (y === null || y === undefined) {
            y = this.game.canvas.height;
        }
        const platform = this.platforms.create(x, y, "platform");
        platform.body.setVelocity(0, -1 * this.platformVelocity);
        platform.body.allowGravity = false;
        platform.body.immovable = true;
    }

    private setupCollisions(): void {
        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.platforms);
    }

    private setupWalls(): void {
        this.walls = this.physics.add.staticGroup();
        this.walls.create(0, 0, "wall");
        this.walls.create(this.game.canvas.width + 1, 0, "wall");
    }

    private setupBall(): void {
        this.ball = this.physics.add.sprite(500, 0, "ball");
        this.ball.setCollideWorldBounds(false);
        this.ball.setBounce(0.3, 0);
        this.ball.setGravity(0, this.ballGravity);
    }

    private parseInput(): void {
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
