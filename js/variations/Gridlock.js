class Gridlock extends Racer {
    constructor(config) {
        super({
            key: `gridlock`
        });
    }

    create() {
        super.create();

        this.dividersGroup.setVelocity(0, 0);

        this.startTrafficTimer();
    }

    setupCrashes() {
        // Check overlaps for crashes
        this.physics.add.overlap(this.player, this.gridlockCars, this.crash, null, this);
    }

    startTrafficTimer() {
        this.time.addEvent({
            delay: 5000 + 5000 * Math.random(),
            callback: this.moveTraffic,
            callbackScope: this
        });
    }

    moveTraffic() {
        this.dividersGroup.tween = this.tweens.add({
            targets: [...this.dividersGroup.getChildren()],
            y: `+=20 + ${Math.random() * 30}`,
            duration: 2000,
            onComplete: () => {
                if (this.player.tween) {
                    console.log("Stopping player tween")
                    this.player.tween.stop();
                    this.player.tween = null;
                }
                this.startTrafficTimer();
                this.dividersGroup.tween = null;
            },
            callbackScope: this
        });
        this.gridlockCars.getChildren().forEach((car) => {
            car.offset = Phaser.Math.FloatBetween(-car.offsetRange, car.offsetRange);
            this.tweens.add({
                targets: car,
                y: car.baseY + car.offset,
                duration: 1800,
            });
        });
    }

    createOpponents() {
        // Going to leave this empty
        this.opponents = this.physics.add.group();

        // This is our gridlock
        this.gridlockCars = this.physics.add.group();
        for (let x = this.laneWidth / 2; x < this.width; x += this.laneWidth) {
            for (let y = this.player.y + this.player.displayHeight + this.pixelScale; y > -this.player.displayHeight / 2; y -= this.player.displayHeight + this.pixelScale) {
                if (x === this.player.x && y === this.player.y) continue;
                const car = this.gridlockCars.create(x, y, this.carSprite)
                    .setScale(this.pixelScale)
                    .setTint(Phaser.Math.RND.pick([0xceeb87, 0x87ebce, 0xeb8787, 0xeb87ce]));
                car.offset = 0;
                car.offsetRange = this.pixelScale / 2;
                car.baseY = car.y;
            }
        }
    }

    handleLaneChange(direction) {
        // Can move if you're moving bro
        if (this.player.tween) return;
        // Can only change lanes if the cars are moving
        if (this.dividersGroup.tween) {
            // Move with a tween
            this.player.tween = this.tweens.add({
                targets: this.player,
                x: this.player.x + (direction * 20),
                duration: 2000,
                onComplete: () => {
                    this.player.lane += direction;
                    this.player.tween = null;
                }
            });
        }
    }

    // No score
    updateScore() {

    }
}