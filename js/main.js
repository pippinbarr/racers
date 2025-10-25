const DEBUG = false;
const START_SCENE = "freeway";
const WIDTH = 480;
const HEIGHT = 720;
const LANG = "en";

let config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#000000",
  scene: [
    Boot,
    Preloader,
    Racer,
    Freeway
  ],
  render: {
    pixelArt: true,
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH,
    width: WIDTH,
    height: HEIGHT,
  },
};

let game = new Phaser.Game(config);