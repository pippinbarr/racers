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

    /**
     * Needed to override this to make the right-hand edge show up
     */
    // createEdges() {
    //     this.edges = this.physics.add.group();
    //     this.edges.create(0, this.height / 2, 'road-mark')
    //         .setScale(this.pixelScale, this.height);
    //     this.edges.create(this.width - this.pixelScale / 2, this.height / 2, 'road-mark')
    //         .setScale(this.pixelScale, this.height);
    // }
}