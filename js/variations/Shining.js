

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
        this.grassColour = 0x38450a;
        this.greenTreeColour = 0x326c25;
        this.snowGroundColour = 0xc3c3c3;
        this.whiteTreeColour = 0xffffff;

        this.scenes = [
            {
                name: "lakeside",
                left: {
                    tree: {
                        alpha: 0,
                        color: this.greenTreeColour
                    },
                    ground: {
                        alpha: 1,
                        color: this.waterColor
                    }
                },
                right: {
                    tree: {
                        alpha: 1,
                        color: this.greenTreeColour
                    },
                    ground: {
                        alpha: 1,
                        color: this.grassColour
                    }
                }
            }
        ];
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

        this.createSceneMaterials();

        this.setupScene();
    }

    createDividers() {
        this.dividersGroup = this.physics.add.group();
        this.addRoadMarks(2, this.dividersGroup);
    }

    createSceneMaterials() {

        this.leftTreesGroup = this.createSceneGroup(this.laneWidth / 2, 'tree');
        this.rightTreesGroup = this.createSceneGroup(3 * this.laneWidth, 'tree');

        this.groups = [this.leftTreesGroup, this.rightTreesGroup];

        this.wrapper = this.physics.add.image(this.width / 2, this.height, 'road-mark')
            .setScale(this.width, this.pixelScale);

        this.physics.add.overlap(this.leftTreesGroup, this.wrapper, this.wrap, null, this);
        this.physics.add.overlap(this.rightTreesGroup, this.wrapper, this.wrap, null, this);
    }


    wrap(wrapper, tree) {
        tree.y -= this.height;
    }

    createSceneGroup(x, key) {
        const group = this.physics.add.group();
        const height = this.pixelScale * 12;

        group.createMultiple({
            key: key,
            repeat: this.height / height,
            setXY: {
                x: x,
                y: 0,
                stepY: height
            },
            setScale: {
                x: this.pixelScale,
                y: this.pixelScale,
            }
        });

        group.setVelocity(0, this.player.speed);
        return group;
    }

    setupScene() {
        this.currentScene = this.scenes[0];

        this.leftTreesGroup.setTint(this.currentScene.left.treeColor);
        this.leftTreesGroup.setAlpha(this.currentScene.left.treeAlpha);
    }

    update() {
        super.update();
    }

    moveDividers() {

    }
}