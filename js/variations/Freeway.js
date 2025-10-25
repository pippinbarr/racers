class Freeway extends Racer {
    constructor(config) {
        super({
            key: `freeway`
        });

        // More lanes is a freeway
        this.lanes = this.width / 8;

        // But also probably: more other cars, faster other cars, ...
    }
}