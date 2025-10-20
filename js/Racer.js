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

        // Lane handling numbers
        this.lanes = 3;
        this.laneWidth = this.width / this.lanes;

        // The overall scaling factor (since graphics are drawn at a nice
        // chunky pixel scale)
        this.pixelScale = 16;
    }

    /**
     * Sets up input, the track, the cars
     */
    create() {
        // Input
        this.setupInput();

        // Make the world grey
        this.cameras.main.setBackgroundColor(0x777777);


        // Make an opponent car
        this.opponent = this.physics.add.sprite(this.width / 2 - this.laneWidth, 0, 'car')
        this.opponent.setScale(this.pixelScale);
        this.spawnCar();

        // Make a player car
        this.player = this.physics.add.sprite(this.width / 2, this.height * 0.8, 'car')
        this.player.setScale(this.pixelScale);
        // Starting lane
        this.player.lane = 2;
        // Controls how fast the lane markings move technically
        this.player.speed = this.pixelScale * 30;

        // Make road markings
        this.dividersGroup = this.physics.add.group();
        this.addRoadMarks(1, this.dividersGroup);
        this.addRoadMarks(2, this.dividersGroup);

        // Play clicking for engine noise
        this.playerEngineSFX = this.sound.add('click');
        this.playerEngineSFX.loop = true;
        this.playerEngineSFX.setVolume(0.3);
        this.playerEngineSFX.setRate(2);
        this.playerEngineSFX.setDetune(1000);
        this.playerEngineSFX.play();

        this.opponentEngineSFX = this.sound.add('click');
        this.opponentEngineSFX.loop = true;
        this.opponentEngineSFX.setVolume(0);
        this.opponentEngineSFX.setRate(this.opponent.engine.rate);
        this.opponentEngineSFX.setDetune(this.opponent.engine.detune);
        this.opponentEngineSFX.play();

        // Check overlaps
        this.physics.add.overlap(this.player, this.opponent, this.crash, null, this);

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
            // Don't move if you're crashed
            if (this.player.crashed) return;
            // Don't go left if you're in the leftmost lane
            if (this.player.lane === 1) return;
            // Otherwise update lane and x position appropriately
            this.player.lane--;
            this.player.x -= this.laneWidth;
        });
        // Same again for right
        this.cursors.right.on("down", () => {
            if (this.player.crashed) return;
            if (this.player.lane === this.lanes) return;
            this.player.lane++;
            this.player.x += this.laneWidth;
        });
        this.cursors.space.on("down", () => {
            if (this.player.crashed) {
                this.physics.resume();
                this.sound.mute = false;
                this.player.crashed = false;
                this.player.setTint(0xffffff);
                this.player.visible = true;
                this.player.flashingTimer.remove();
                this.spawnCar();
            }
        })
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
        group.createMultiple({
            key: 'road-mark',
            repeat: 12,
            setXY: {
                x: lane * this.laneWidth,
                y: 0,
                stepY: this.pixelScale * 4
            },
            setScale: {
                x: this.pixelScale,
                y: this.pixelScale
            }
        });
        // Make the markings move according to the player's speed
        group.setVelocity(0, this.player.speed);
    }

    /**
     * Handles the frame by frame stuff. Mostly wrapping elements right now.
     */
    update() {
        super.update();

        // Update opponent engine sound

        // Get the vertical distance between opponent and player
        const dy = Phaser.Math.Distance.Between(0, this.player.y, 0, this.opponent.y);
        // Convert to a percentage in 0..1 (roughly normalized)
        const dyN = Phaser.Math.Percent(dy, 0, this.height)
        // Apply distance to volume
        this.opponentEngineSFX.setVolume((1 - dyN) * 1);

        // Wrapping road divider
        this.dividersGroup.getChildren().forEach((mark) => {
            if (mark.y - mark.displayHeight / 2 >= this.height) {
                mark.y -= (this.height + mark.displayHeight * 1.5);
            }
        });

        // Opponent goes out of range (behind player)
        if (this.opponent.y > this.height * 2) {
            // "Kill the engine"
            this.opponentEngineSFX.setVolume(0);
            // Delay and then send down a new car
            // Currently just one at a time
            this.time.addEvent({
                delay: 2000,
                callback: this.spawnCar(),
                callbackScope: this,
                loop: false
            });
        }
    }

    /**
     * Spawns a new car with random velocity, lane, and engine sounds
     */
    spawnCar() {
        // Set a velocity for the opponent
        this.opponent.setVelocity(0, this.pixelScale * (20 + Math.random() * 20));
        // Set engine noise parameters for the opponent
        // In a fancy world I suppose the engine sound could also be related to 
        // relative speed compared to player?
        this.opponent.engine = {
            detune: 0 + Math.random() * 1000,
            rate: 1 + Math.random() * 2
        };
        // Get a new random lane
        const lane = Phaser.Math.Between(1, this.lanes);
        // Reposition on x and y to wrap to the new lane
        this.opponent.x = ((lane - 0.5) * this.laneWidth);
        this.opponent.y = -this.height;
        // Get a random velocity on y
        this.opponent.setVelocity(0, Math.random() * this.pixelScale * 40 + this.pixelScale * 20);
    }

    crash(player, opponent) {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.sound.mute = true;
        this.player.crashed = true;
        this.player.flashingTimer = this.time.addEvent({
            delay: 250,
            callback: () => { this.player.visible = !this.player.visible },
            loop: true
        })
    }
}
