

class OneLaneRoad extends Racer {
    constructor(config) {
        super({
            key: `onelaneroad`
        });

        this.lanes = 1;
        this.numOpponents = 1;
    }

    create() {
        super.create();

        this.player.x = this.width / 2;
        this.player.lane = 1;

        this.dividersGroup = this.physics.add.group();
        this.addRoadMarks(0.9, this.dividersGroup);
        this.addRoadMarks(2.1, this.dividersGroup);
    }

    createEdges() {
        this.edges = this.physics.add.group();
        this.edges.create(this.width / 3, this.height / 2, 'road-mark')
            .setScale(this.pixelScale, this.height);
        this.edges.create(2 * this.width / 3, this.height / 2, 'road-mark')
            .setScale(this.pixelScale, this.height);
    }

    setupOpponent(opponent) {
        super.setupOpponent(opponent);
        opponent.x += this.laneWidth;
        opponent.setVelocity(0, 0);
        this.driftOpponent(opponent);
    }

    driftOpponent(opponent) {
        this.tweens.add({
            targets: opponent,
            y: Phaser.Math.FloatBetween(-opponent.displayHeight, this.player.y - this.player.displayHeight * 1.2),
            ease: 'Sine.easeInOut',
            duration: Phaser.Math.FloatBetween(4000, 10000),
            onComplete: () => {
                this.driftOpponent(opponent)
            }
        });
    }

    handleLaneChange(direction) {
        // Can move if you're moving bro
        if (this.player.tween) return;

        // Where are they trying to go and is it legal?
        const targetLane = this.player.lane + direction;
        if (targetLane < -1 || targetLane > 3) return;

        // Move with a tween
        this.player.tween = this.tweens.add({
            targets: this.player,
            x: this.player.x + (direction * this.pixelScale),
            duration: 2000,
            onComplete: () => {
                this.player.tween = null;
                this.player.lane += direction;
            }
        });
    }
}