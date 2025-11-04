class Drag extends Racer {
    constructor(config) {
        super({
            key: `drag`
        });

        this.numOpponents = 1;

        this.lanes = 2;
        this.laneWidth = this.width / 2;
    }

    create() {
        super.create();

        this.player.x = this.width / 4
        this.player.lane = 1;
        this.player.speed = 0;
        this.player.maxSpeed = 1000;

        this.opponent = this.opponents.getChildren()[0];
        this.opponent.setVelocity(0, 0);
        this.opponent.x = 3 * this.width / 4;
        this.opponent.y = this.player.y;

        this.dividersGroup.clear(true, true);
        this.addRoadMarks(1, this.dividersGroup);

        this.countdown = 3;
        this.countdownText = this.add.text(this.width / 2, this.height / 2, this.countdown, {
            font: "256px Commodore",
            color: "#ff0",
            align: "center",
        })
            .setOrigin(0.5);

        this.countdownTimer = this.time.addEvent({
            delay: 1000,
            repeat: 2,
            callback: () => {
                this.updateCountdown();
            }
        });

        this.player.scoreText.setVisible(false);

        this.raceOver = false;
    }

    update() {
        super.update();

        // If the player reached the finish line...
        if (this.player.score >= 100 && !this.raceOver) {
            this.raceOver = true;
            this.countdownText.setFontSize(128);
            if (this.player.y < this.opponent.y) {
                this.countdownText.text = "WIN";
            }
            else {
                this.countdownText.text = "LOSE";
            }

            this.player.setVelocity(0, 0);
            this.opponent.setVelocity(0, 0);
            this.player.speed = 0;
            this.gameSpeed = 0;

            this.tweens.add({
                targets: [this.player, this.opponent],
                y: -this.height / 2,
                duration: 1000,
                ease: "Sine.easeOut",
            });
        }
    }

    updateCountdown() {
        this.countdown -= 1;
        if (this.countdown === 0) {
            this.countdownText.text = "GO"
            this.time.addEvent({
                delay: Math.random() * 250,
                callback: () => {
                    this.opponent.setVelocity(0, this.opponent.body.velocity.y - this.player.maxSpeed * Phaser.Math.FloatBetween(0.9, 1.025));
                }
            });
        }
        else {
            this.countdownText.text = this.countdown;
        }
    }

    setupInput() {
        super.setupInput();
        this.cursors.up.on("down", () => {
            if (this.player.speed !== 0) return;
            if (this.countdown === 0) {
                this.countdownText.text = "";
                this.player.speed = this.player.maxSpeed;
                this.opponent.setVelocity(0, this.opponent.body.velocity.y + this.player.maxSpeed);
            }
            else {
                this.countdownTimer.remove();
                this.countdownText.setFontSize(96);
                this.countdownText.text = "FALSE\nSTART"
            }
        });
    }

    isIllegalMove(direction) {
        return true;
    }

    wrapOpponent(opponent) {

    }
}