/**
 * Racer
 * 
 * This is the class that defines the underlying "racer" game in its
 * default setup. It'll need over time to get more complex "hooks" for
 * the variations to grab onto probably, but initially it's just meant
 * to be a passable (and ideally semi-fun) version of an old school
 * three lane racer.
 */

class Racer extends Phaser.Scene {
    constructor(config = {}) {
        super({
            key: config.key ? config.key : `racer`
        });

        // Always nice to have these abbreviated
        this.width = game.canvas.width;
        this.height = game.canvas.height;

        // Default number of lanes
        this.lanes = 3;

        // Default number of opponents
        this.numOpponents = 2;

        // Lane handling numbers
        this.laneWidth = this.width / this.lanes;

        // The overall scaling factor (since graphics are drawn at a nice
        // chunky pixel scale)
        this.pixelScale = 16;

        // Default car sprite
        this.carSprite = 'car';
    }

    /**
     * Sets up input, the track, the cars
     */
    create() {


        // Input
        this.setupInput();

        // Make the world grey
        this.cameras.main.setBackgroundColor(0x777777);

        // Set the current game speed
        this.gameSpeed = 1;

        // Make a player car
        this.createPlayer();

        // Create the opponent cars
        this.createOpponents();

        // Make road dividers
        this.dividersGroup = this.physics.add.group();
        for (let i = 0; i < this.lanes - 1; i++) {
            this.addRoadMarks(i + 1, this.dividersGroup);
        }

        // Make road edges
        this.createEdges();

        // Crash sound
        this.crashSFX = this.sound.add('crash');
        this.crashSFX.setVolume(1);

        // Add a score to the screen
        this.player.scoreText = this.add.text(20, 20, this.player.score, {
            font: "32px Commodore",
            color: "#ff0",
            align: "left",
        });

        this.setupCrashes();
    }

    /**
     * Creates the number of opponents required to populate the racing world?
     */
    createOpponents() {
        // Make an opponents group
        this.opponents = this.physics.add.group();

        for (let i = 0; i < this.numOpponents; i++) {
            // Make an opponent car
            this.createOpponent(this.carSprite, this.opponents);
        }
    }

    createOpponent(sprite, group) {
        const opponent = group.create(0, 0, sprite);
        opponent.setScale(this.pixelScale);

        this.setupOpponent(opponent);

        // Same for the opponent... this needs to be more modular
        opponent.engineSFX = this.sound.add('click');
        opponent.engineSFX.loop = true;
        opponent.engineSFX.setVolume(0);
        opponent.engineSFX.setRate(opponent.engine.rate);
        opponent.engineSFX.setDetune(opponent.engine.detune);
        opponent.engineSFX.play();

        return opponent;
    }

    createPlayer() {
        this.player = this.physics.add.sprite(0, 0, this.carSprite)
        this.player.setScale(this.pixelScale);
        // Starting lane
        this.player.lane = Math.ceil(this.lanes / 2);

        const playerX = -this.laneWidth * 0.5 + this.player.lane * this.laneWidth;
        const playerY = this.height - this.player.displayHeight * 0.75;
        this.player.setPosition(playerX, playerY);

        // Controls how fast the lane markings move technically
        this.player.speed = this.pixelScale * 30;
        // Let's give the player a score, eh?
        this.player.score = 0;

        // Play clicking for engine noise
        this.player.engineSFX = this.sound.add('click');
        this.player.engineSFX.loop = true;
        this.player.engineSFX.setVolume(0.1);
        this.player.engineSFX.setRate(2);
        this.player.engineSFX.setDetune(1000);
        this.player.engineSFX.play();
    }

    /**
     * Creates the edge marker on either side (potentialy could crash into it?)
     */
    createEdges() {
        this.edges = this.physics.add.group();
        this.edges.create(0, this.height / 2, 'road-mark')
            .setScale(this.pixelScale, this.height);
        this.edges.create(this.width, this.height / 2, 'road-mark')
            .setScale(this.pixelScale, this.height);
    }

    /**
     * Creates the typical phaser cursors object and listens for key presses.
     * Will need touch input at some point for this to work on mobile.
     * Swipes is the most obvious.
     */
    setupInput() {
        // Create the cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        // Listen for left
        this.cursors.left.on("down", () => {
            this.handleLaneChange(-1);
        });
        // Same again for right
        this.cursors.right.on("down", () => {
            this.handleLaneChange(1);

        });
        this.cursors.space.on("down", () => {
            if (this.player.crashed) {
                this.physics.resume();
                this.sound.mute = false;
                this.player.crashed = false;
                this.player.engineSFX.setVolume(0.1);
                this.player.setTint(0xffffff);
                this.player.visible = true;
                this.player.flashingTimer.remove();
                this.player.score = 0;
                this.gameSpeed = 1;
                this.opponents.getChildren().forEach((opponent) => {
                    this.setupOpponent(opponent);
                })
            }
        })
    }

    handleLaneChange(direction) {
        // Check legality
        if (this.isIllegalMove(direction)) return;
        // Move with a tween
        this.player.tween = this.tweens.add({
            targets: this.player,
            x: this.player.x + (direction * this.laneWidth),
            duration: 100,
            onComplete: () => {
                this.player.lane += direction;
                this.player.tween = null;
            }
        });
    }

    isIllegalMove(direction) {
        const targetLane = this.player.lane + direction;
        return (this.player.tween || this.player.crashed || targetLane < 1 || targetLane > this.lanes);
    }

    /**
     * Adds a series of images to the provided group to create
     * road markings.
     * @param {int} lane Which lane are these markings for?
     * @param {Phaser.Physics.Group} group Which group to add them to?
     */
    addRoadMarks(lane, group) {
        // Use phaser's configurable creation to make a nice series of
        // road marking vertically down the screen.
        const stepY = this.pixelScale * 4;
        group.createMultiple({
            key: 'road-mark',
            repeat: this.height / stepY,
            setXY: {
                x: lane * this.laneWidth,
                y: 0,
                stepY: stepY
            },
            setScale: {
                x: this.pixelScale,
                y: this.pixelScale
            }
        });
        // Make the markings move according to the player's speed
        group.setVelocity(0, this.player.speed);
    }

    setupCrashes() {
        // Check overlaps for crashes
        this.physics.add.overlap(this.player, this.opponents, this.crash, null, this);
    }

    /**
     * Handles the frame by frame stuff. Mostly wrapping elements right now.
     */
    update() {
        super.update();

        if (this.player.crashed) {
            return;
        }

        this.updateScore();

        // Increase game speed constantly (or should this be event driven?)
        this.gameSpeed += 0.0001;

        // Wrapping road divider
        this.dividersGroup.getChildren().forEach((mark) => {
            if (mark.y - mark.displayHeight / 2 >= this.height) {
                mark.y -= (this.height + mark.displayHeight * 1.5);
            }
        });

        this.opponents.getChildren().forEach((opponent) => {
            // Get the vertical distance between opponent and player
            const dy = Phaser.Math.Distance.Between(0, this.player.y, 0, opponent.y);
            // Convert to a percentage in 0..1 (roughly normalized)
            const dyN = Phaser.Math.Percent(dy, 0, this.height)
            // Apply distance to volume
            opponent.engineSFX.setVolume((1 - dyN) * 0.5);

            // Opponent goes out of range (behind player)
            if (opponent.y > this.height * 1) {
                // "Kill the engine"
                opponent.engineSFX.setVolume(0);
                // Delay and then send down a new car
                // Currently just one at a time
                this.time.addEvent({
                    delay: 500,
                    callback: this.setupOpponent,
                    args: [opponent],
                    callbackScope: this,
                    loop: false
                });
            }
        });
    }

    updateScore() {
        // Increase player score
        this.player.score += 1;
        this.player.scoreText.text = this.player.score;
    }

    /**
     * Spawns a new car with random velocity, lane, and engine sounds
     */
    setupOpponent(opponent) {
        // Set a tint for the opponent
        opponent.setTint(Phaser.Math.RND.pick([0xceeb87, 0x87ebce, 0xeb8787, 0xeb87ce]))
        // Set engine noise parameters for the opponent
        // In a fancy world I suppose the engine sound could also be related to 
        // relative speed compared to player?
        opponent.engine = {
            detune: 0 + Math.random() * 1000,
            rate: 1 + Math.random() * 2
        };
        // Get a new random lane
        const lane = Phaser.Math.Between(1, this.lanes);
        // Reposition on x and y to wrap to the new lane
        opponent.x = ((lane - 0.5) * this.laneWidth);
        opponent.y = -opponent.displayHeight;
        // Get a random velocity on y
        const relativeSize = opponent.displayHeight / this.height;
        const baseSpeed = this.gameSpeed * relativeSize * 4000;

        // console.log(baseVelocity);
        // const baseSpeed = (Math.random() * this.pixelScale * 40 + this.pixelScale * 20);
        // Multiple actual speed by the game speed so we can speed it up
        opponent.setVelocity(0, baseSpeed + (0.2 - Math.random() * 0.4) * baseSpeed);
    }

    crash(player, opponent) {
        this.crashSFX.play();
        this.physics.pause();
        this.player.engineSFX.setVolume(0);
        this.opponents.getChildren().forEach((opponent) => {
            opponent.engineSFX.setVolume(0);
        });
        this.player.setTint(0xff0000);
        this.player.crashed = true;
        this.player.flashingTimer = this.time.addEvent({
            delay: 250,
            callback: () => { this.player.visible = !this.player.visible },
            loop: true
        })
    }
}
