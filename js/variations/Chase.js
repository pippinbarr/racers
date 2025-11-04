class Chase extends Racer {
    constructor(config) {
        super({
            key: `chase`
        });

        this.numOpponents = 0;
        this.chaseOver = false;
    }

    create() {
        super.create();

        this.player.y = this.height / 2;

        const frames = this.anims.generateFrameNames("cop-car", {
            frames: [0, 1]
        });
        this.anims.create({
            key: 'cop-lights',
            frames: frames,
            frameRate: 5,
            repeat: -1,
        });

        this.cops = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            const x = 0.5 * this.laneWidth + i * this.laneWidth;
            const y = this.height - 0.6 * this.player.displayHeight;
            const cop = this.cops.create(x, y, 'cop-car');
            cop.baseY = y;
            cop.offset = 0;
            cop.offsetRange = this.pixelScale;
            cop.setScale(this.pixelScale);
            cop.play('cop-lights');
        }

        this.player.score = 200; // Gas

        this.driftCops();
    }

    update() {
        if (this.player.score < 100 && this.player.speed > 0) {
            this.player.speed--;
        }
        super.update();
    }

    driftCops() {
        this.cops.getChildren().forEach((cop) => {
            cop.offset = Phaser.Math.FloatBetween(-cop.offsetRange, cop.offsetRange);
            cop.driftTween = this.tweens.add({
                targets: cop,
                y: cop.baseY + cop.offset,
                duration: 1800,
            });
        });
        this.cops.driftEvent = this.time.addEvent({
            delay: 2200,
            callback: () => {
                this.driftCops();
            }
        });
    }

    updateScore() {
        if (this.player.speed === 0 && this.chaseOver) {
            return;
        }
        else if (this.player.speed === 0 && !this.chaseOver) {
            this.chaseOver = true;

            this.cops.getChildren().forEach((cop) => {
                let targetY;
                if (cop.x < this.player.x) {
                    targetY = this.player.y;
                }
                else if (cop.x > this.player.x) {
                    targetY = this.player.y;
                }
                else {
                    targetY = this.player.y + this.player.displayHeight * 1.2;
                }
                cop.driftTween = this.tweens.add({
                    targets: cop,
                    y: targetY,
                    duration: 2000,
                });
            });
        }

        if (this.player.score > 0) {
            this.player.score--;
        }
        else if (!this.chaseOver) {
            this.cops.getChildren().forEach((cop) => {
                cop.driftTween.remove();
            });
            this.cops.driftEvent.remove();
        }

        this.player.scoreText.text = `GAS: ${this.player.score}`;
    }
}