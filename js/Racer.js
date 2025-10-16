class Racer extends Phaser.Scene {
    constructor(config = {}) {
        super({
            key: config.key ? config.key : `racer`
        });

        this.lanes = 3;
        this.width = game.canvas.width;
        this.height = game.canvas.height;
    }

    init(data) {
        this.strings = this.cache.json.get(`strings`);
        this.config = data;
    }

    create() {
        // Make the world grey
        this.cameras.main.setBackgroundColor(0x777777);

        // Draw the lanes
        const laneWidth = this.width / this.lanes;
        const laneLineWidth = 16;  //this.width / (this.lanes * 16);
        for (let lane = 1; lane < this.lanes; lane++) {
            this.add.rectangle(lane * laneWidth, this.height / 2, laneLineWidth, this.height, 0xffffff);
        }

        // Make a car
        this.player = this.physics.add.sprite(this.width / 2, this.height * 0.8, 'car')
        this.player.setScale(16, 16);
        // this.player.setVelocity(0, -16 * 50);

        this.opponent = this.physics.add.sprite(this.width / 2 - laneWidth, 0, 'car')
        this.opponent.setScale(16, 16);
        this.opponent.setVelocity(0, 16 * 40);

    }

    update() {
        super.update();

        if (this.player.y < 0) {
            this.player.y = this.height;
        }
        if (this.opponent.y > this.height) {
            this.opponent.x = Math.random() < 0.5 ? 0.5 * this.width / this.lanes : 2.5 * (this.width / this.lanes);
            this.opponent.y = 0;
            this.opponent.setVelocity(0, Math.random() * 16 * 40 + 16 * 20);
        }
    }
}
