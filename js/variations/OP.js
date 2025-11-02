
class OP extends Racer {
    constructor(config) {
        super({
            key: `op`
        });
    }

    create() {
        super.create();
    }

    crash(player, opponent) {
        if (opponent.tween) return;

        this.crashSFX.play();
        opponent.setVelocity(0, 0);

        let x = 0;
        let y = this.height / 2;
        let angle = 0;
        if (this.player.x > opponent.x) {
            x = `-=${this.width}`;
            angle = -500;
        }
        else if (this.player.x < opponent.x) {
            x = `+=${this.width}`;
            angle = 500;
        }
        else {
            x = `+=${Phaser.Math.FloatBetween(-this.width / 2, this.width / 2)}`;
            y = -opponent.displayHeight;
            angle = Math.random() < 0 ? -500 : 500
        }

        opponent.tween = this.tweens.add({
            targets: opponent,
            x: x,
            y: y,
            angle: angle,
            duration: 500,
            onComplete: () => {
                this.setupOpponent(opponent);
            }
        });
    }

    setupOpponent(opponent) {
        super.setupOpponent(opponent);
        opponent.setRotation(0);
        opponent.tween = null;
    }
}