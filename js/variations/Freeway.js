class Freeway extends Racer {
    constructor(config) {
        super({
            key: `freeway`
        });

        this.laneWidth = 4; // pixels
        this.pixelScale = 1;
        this.carSprite = 'road-mark';
        // this.lanes = 5;
        this.lanes = this.width / this.laneWidth;
        this.numOpponents = 2000;
    }
}