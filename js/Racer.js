class Racer extends Phaser.Scene {
    constructor(config = {}) {
        super({
            key: config.key ? config.key : `racer`
        });
    }

    init(data) {
        this.strings = this.cache.json.get(`strings`);
        this.config = data;
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
    }
}
