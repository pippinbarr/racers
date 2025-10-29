class Gridlock extends Racer {
    constructor(config) {
        super({
            key: `gridlock`
        });
    }

    create() {
        super.create();

        this.dividersGroup.setVelocity(0, 0);
    }

    createOpponents() {
        // Going to leave this empty
        this.opponents = this.physics.add.group();

        // This is our gridlock
        this.gridlockCars = this.physics.add.group();
        for (let x = this.laneWidth / 2; x < this.width; x += this.laneWidth) {
            for (let y = this.player.y + this.player.displayHeight + this.pixelScale; y > -this.player.displayHeight / 2; y -= this.player.displayHeight + this.pixelScale) {
                if (x === this.player.x && y === this.player.y) continue;
                this.gridlockCars.create(x, y, this.carSprite)
                    .setScale(this.pixelScale)
                    .setTint(Phaser.Math.RND.pick([0xceeb87, 0x87ebce, 0xeb8787, 0xeb87ce]))
            }
        }
    }

    // No input
    setupInput() {

    }

    // No score
    updateScore() {

    }
}