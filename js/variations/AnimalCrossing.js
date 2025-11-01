
class AnimalCrossing extends Racer {
    constructor(config) {
        super({
            key: `animalcrossing`
        });
    }

    create() {
        super.create();

        this.startAnimalTimer();

        this.opponents.clear();

        this.animalStep = this.pixelScale * 6;

        this.animals = this.physics.add.group();
        this.animals.createMultiple({
            key: 'sheep',
            repeat: 20,
            setXY: {
                x: -100,
                y: this.player.y - this.player.displayHeight * 0.75,
                stepX: -this.animalStep
            },
            setScale: {
                x: this.pixelScale,
                y: this.pixelScale
            },
        });
    }

    startAnimalTimer() {
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.animalCrossing();
            }
        });
    }

    animalCrossing() {
        this.player.speed = 0;
        const animalDistance = this.animalStep * this.animals.getChildren().length + this.width * 1.5;
        this.tweens.add({
            delay: 2000,
            targets: [...this.animals.getChildren()],
            x: `+=${animalDistance}`,
            duration: this.animals.getChildren().length * 1000,
            onComplete: () => {
                this.player.speed = this.player.maxSpeed;
                this.animals.incX(-animalDistance);
                this.startAnimalTimer();
            }
        });
    }
}