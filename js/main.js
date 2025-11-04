const urlParams = new URLSearchParams(window.location.search);

const DEBUG = false;
const START_SCENE = urlParams.get('v') || "racer";
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

    AnimalCrossing,
    Chase,
    Drag,
    Freeway,
    Ghost,
    Gridlock,
    OneLaneRoad,
    OP,
    WrongWay,
  ],
  render: {
    pixelArt: true,
  },
  pixelArt: true,
  zoom: 1,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },
  scale: {
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.BOTH,
    width: WIDTH,
    height: HEIGHT,
  },
};

let game = new Phaser.Game(config);