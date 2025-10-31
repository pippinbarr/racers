

class WrongWay extends Racer {
    constructor(config) {
        super({
            key: `wrongway`
        });
    }

    create() {
        super.create();
    }

    setupOpponent(opponent) {
        super.setupOpponent(opponent);
        const relativeSize = opponent.displayHeight / this.height;
        const baseSpeed = this.gameSpeed * relativeSize * 7000;
        opponent.setVelocity(0, baseSpeed + (0.2 - Math.random() * 0.4) * baseSpeed);

        opponent.setRotation(Math.PI);
    }

    updateScore() {
        // Increase player score
        this.player.score += 1;
        this.player.scoreText.text = `-${this.player.score}`;
    }
}