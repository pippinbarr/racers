class Problem extends Racer {
    constructor(config) {
        super({
            key: `problem`
        });

        this.lanes = 2;
        this.laneWidth = this.width / 2;
        this.numOpponents = 0;
        this.distanceToDecision = 300;

        this.scenarios = [
            [{
                label: "YOUR DAD",
                people: 1
            },
            {
                label: "A STRANGER",
                people: 1
            }],
            [{
                label: "YOUR BEST\nFRIEND",
                people: 1
            },
            {
                label: "TEN STRANGERS",
                people: 10
            }],
        ];
    }


    create() {

        super.create();

        this.player.setDepth(1000);

        this.scenarioContainer = this.add.container();
        this.physics.world.enableBody(this.scenarioContainer);

        this.leftText = this.add.text(
            this.pixelScale,
            this.pixelScale,
            ``, {
            font: "18px Commodore",
            color: "#ff0",
            align: "left",
        })
            .setOrigin(0);

        this.rightText = this.add.text(
            this.width / 2 + this.pixelScale,
            this.pixelScale,
            ``, {
            font: "18px Commodore",
            color: "#ff0",
            align: "left",
        })
            .setOrigin(0);

        this.deleter = this.physics.add.image(this.width / 2, this.height + this.height / 2, 'road-mark')
            .setScale(this.width, 1);

        this.player.scoreText.setVisible(false);

        this.problemGroup = this.physics.add.group();
        this.chooseScenario();

        this.physics.add.overlap(this.player, this.problemGroup, this.problem, null, this);
        this.physics.add.overlap(this.problemGroup, this.deleter, this.removal, null, this);

    }

    update() {
        super.update();

        // Needs to be clamped.
        const distanceToDecision = this.player.y - this.scenarioContainer.y;

        this.leftText.setVisible(distanceToDecision > this.height);
        this.rightText.setVisible(distanceToDecision > this.height);

        this.leftText.text = `IN ${distanceToDecision} METERS:\n${this.leftText.label}`;
        this.rightText.text = `IN ${distanceToDecision} METERS:\n${this.rightText.label}`;
    }

    chooseScenario() {
        const options = Phaser.Math.RND.pick(this.scenarios);
        for (let i = 0; i < options.length; i++) {
            this.createLane(i, options[i]);
        }
        this.scenarioContainer.body.setVelocity(0, this.player.speed);
        this.scenarioContainer.y = -this.height;
    }

    createLane(lane, option) {
        let x = this.laneWidth * 0.5 + lane * this.laneWidth;
        let y = 0;

        if (lane === 0) {
            this.leftText.label = option.label;
        }
        else if (lane === 1) {
            this.rightText.label = option.label;
        }

        const label = this.add.text(this.laneWidth * 0.5 + lane * this.laneWidth, y + 100, option.label, {
            font: "18px Commodore",
            color: "#ff0",
            align: "left",
        }).setOrigin(0.5);
        this.scenarioContainer.add(label);

        for (let i = 0; i < option.people; i++) {
            this.createPerson(x, y, lane);
            y -= 100;
        }
    };

    createPerson(x, y, lane) {
        const person = this.problemGroup.create(x, y, 'person')
            .setScale(this.pixelScale)
            .setRotation(Math.PI / 2)

        this.scenarioContainer.add(person);
    }

    problem(player, person) {
        person.setTint(0xff0000);
        this.crashSFX.play()
    }

    removal(deleter, person) {
        console.log(person)
        this.problemGroup.remove(person);
        person.destroy(true, true);
        if (this.problemGroup.getChildren().length === 0) {
            this.scenarioContainer.removeAll(true);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.chooseScenario();
                },
                callbackScope: this
            });
        }
    }
}