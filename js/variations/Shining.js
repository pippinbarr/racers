

class Shining extends Racer {
    constructor(config) {
        super({
            key: `shining`
        });

        this.lanes = 2;
        this.numOpponents = 0;
        this.laneWidth = this.width / 4;

        this.playerColour = 0xfce088;
        this.waterColour = 0x112f77;
        this.grassGroundColour = 0x38450a;
        this.greenTreeColour = 0x326c25;
        this.snowGroundColour = 0xc3c3c3;
        this.whiteTreeColour = 0xffffff;

    }

    create() {
        super.create();

        this.themeMusic = this.sound.add("shining-theme");
        this.themeMusic.setLoop(true);
        this.themeMusic.setRate(5);
        this.themeMusic.play();

        this.cameras.main.setBackgroundColor(0x000000);

        this.player.lane = 2;
        this.player.x = this.width / 2 + this.laneWidth / 2;
        this.player.setTint(this.playerColour);

        // Add lake
        this.lake = this.physics.add.image(0, 0, 'road-mark')
            .setScale(this.laneWidth * 2, this.height)
            .setTint(this.waterColour)

        this.rightGround = this.physics.add.image(this.width, this.height / 2, 'road-mark')
            .setScale(this.laneWidth * 2, this.height)
            .setTint(this.grassGroundColour)
        this.createTrees();
    }

    createDividers() {
        this.dividersGroup = this.physics.add.group();
        this.addRoadMarks(2, this.dividersGroup);
    }

    createTrees() {
        this.treesGroup = this.physics.add.group();

        const stepY = this.pixelScale * 13;

        this.treesGroup.createMultiple({
            key: 'tree',
            repeat: (this.height + stepY) / stepY,
            setXY: {
                x: this.width - this.pixelScale * 1.5,
                y: -stepY,
                stepY: stepY
            },
            setScale: {
                x: this.pixelScale,
                y: this.pixelScale
            },
        });
        this.treesGroup.setTint(this.greenTreeColour);
        // Make the markings move according to the player's speed
        this.treesGroup.setVelocity(0, this.player.speed);
    }

    update() {
        super.update();

        this.wrapTrees();
    }

    moveDividers() {

    }

    wrapTrees() {
        // Wrapping road divider
        this.treesGroup.getChildren().forEach((tree) => {
            if (tree.y - tree.displayHeight / 2 >= this.height) {
                tree.y -= (this.height + tree.displayHeight * 1.75);
            }
        });
    }
}