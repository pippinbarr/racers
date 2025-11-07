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
                people: 2
            }],
        ];

        this.scenario = {
            options: null,
            texts: []
        }
    }


    create() {

        super.create();

        this.leftText = this.add.text(
            this.pixelScale,
            this.pixelScale,
            ``, {
            font: "24px Commodore",
            color: "#ff0",
            align: "left",
        })
            .setOrigin(0);

        this.rightText = this.add.text(
            this.width / 2 + this.pixelScale,
            this.pixelScale,
            ``, {
            font: "24px Commodore",
            color: "#ff0",
            align: "left",
        })
            .setOrigin(0);

        this.deleter = this.physics.add.image(this.width / 2, this.height, 'road-mark')
            .setScale(this.width, 1);

        this.player.scoreText.setVisible(false);

        this.problemGroup = this.physics.add.group();

        this.scenario.texts.push(this.add.text(this.laneWidth * 0.5, 0, "PLACEHOLDER", {
            font: "24px Commodore",
            color: "#ff0",
            align: "left",
        }).setOrigin(0.5));
        this.scenario.texts.push(this.add.text(this.laneWidth * 1.5, 0, "PLACEHOLDER", {
            font: "24px Commodore",
            color: "#ff0",
            align: "left",
        }).setOrigin(0.5));

        this.chooseScenario();
    }

    update() {
        super.update();

        this.distanceToDecision -= 1;
        if (this.distanceToDecision <= 0) {
            this.distanceToDecision = 0;
        }

        this.leftText.text = `${this.distanceToDecision} METERS\nAHEAD:\n${this.scenario.options[0].label}`;
        this.rightText.text = `${this.distanceToDecision} METERS\nAHEAD:\n${this.scenario.options[1].label}`;

        this.problemGroup.getChildren().forEach((person) => {
            // person.label.setPosition(person.x, person.y + person.displayHeight / 2);
        });
    }

    chooseScenario() {
        this.scenario.options = Phaser.Math.RND.pick(this.scenarios);
        for (let i = 0; i < this.scenario.options.length; i++) {
            this.createLane(i, this.scenario.options[i]);
        }
    }

    createLane(lane, option) {
        let x = this.laneWidth * 0.5 + lane * this.laneWidth;
        let y = this.height / 2;
        console.log(this.scenario);

        this.scenario.texts[lane].text = option.label;
        this.scenario.texts[lane].y = y + 100;

        for (let i = 0; i < option.people; i++) {
            this.createPerson(x, y, lane);
            y -= 100;
        }
    };

    createPerson(x, y, lane) {
        // const peopleGroup = 
        const person = this.problemGroup.create(x, y, 'person')
            .setScale(this.pixelScale)
            .setRotation(Math.PI / 2)
            .setVelocity(0, this.player.speed);

        this.physics.add.overlap(this.player, person, this.problem, null, this);
        this.physics.add.overlap(person, this.deleter, this.removal, null, this);
    }

    problem(player, person) {
        person.setTint(0xff0000);
        // person.label.setColor("#ff0000");
        this.crashSFX.play()
    }

    removal(deleter, person) {
        person.label.destroy();
        person.destroy(true, true);
    }
}