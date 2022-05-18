var canvas;
var backgroundImage, bgImg, imagCarro1, imagCarro2, imagePista;
var database, estadodejogo2;
var formulario, jogador, playerCount;
var allPlayers, carro1, carro2;
var jogo;
var matrizdoCarro = [];
var grupodemoedas;
var grupodocombustivel;
var imageMoeda;
var imageFuel;
var obstaculo;
var imageobstaculo;
var obstaculo2;
var imageobstaculo2;


function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  imagCarro1 = loadImage("./assets/car1.png");
  imagCarro2 = loadImage("./assets/car2.png");
  imagePista = loadImage("./assets/pista.png");
  imageMoeda = loadImage("./assets/goldCoin.png");
  imageFuel = loadImage("./assets/fuel.png");
  imageobstaculo = loadImage("./assets/obstacle1.png");
  imageobstaculo2 = loadImage("./assets/obstacle2.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  jogo = new Jogo();
  jogo.ativarEstadodejogo();
  jogo.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    jogo.update(1);
  }

  if (estadodejogo2 === 1) {
    jogo.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
