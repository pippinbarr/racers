class Preloader extends Phaser.Scene {

  constructor(config) {
    super({
      key: `preloader`
    });
  }

  preload() {
    this.load.bitmapFont('atari', 'assets/fonts/atari.png', 'assets/fonts/atari.xml');

    this.load.audio('click', [`assets/sounds/click.mp3`]);
    this.load.audio('crash', [`assets/sounds/crash.wav`]);

    // this.load.json('strings', `assets/json/${LANG}.json`);

    this.load.image('car', 'assets/images/car.png');
    this.load.image('road-mark', 'assets/images/road-mark.png');

    // Loading screen visuals

    let style = {
      fontFamily: 'Commodore',
    };
    let invisible = this.add.text(0, 0, "123456", style);
    invisible.visible = false;

    this.cameras.main.setBackgroundColor(0x000000);

    this.clown = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, `clown_logo`);

    let progressBar = this.add.graphics();

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(this.clown.x - this.clown.width / 2, this.clown.y + this.clown.height / 2, this.clown.width * value, 5);
    });
  }

  create() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 1000);
  }
}
