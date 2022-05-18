class Jogo {
  constructor() {
    this.titulo = createElement("h2");
    this.buttonrestart = createButton("");
    this.titulodoRank = createElement("h2");
    this.jogador1 = createElement("h2");
    this.jogador2 = createElement("h2");
  }

  ativarEstadodejogo() {
    var estadodejogoReferencia = database.ref("estadodejogo2");
    estadodejogoReferencia.on("value", function(data) {
      estadodejogo2 = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      estadodejogo2: state
    });
  }

  start() {
    jogador = new Jogador();
    playerCount = jogador.obterQuantidadesdeJogadores();

    formulario = new Formulario();
    formulario.display();

    carro1 = createSprite(width / 2 - 50, height - 100);
    carro1.addImage("car1", imagCarro1);
    carro1.scale = 0.07;

    carro2 = createSprite(width / 2 + 100, height - 100);
    carro2.addImage("car2", imagCarro2);
    carro2.scale = 0.07;

    matrizdoCarro = [carro1, carro2];

    grupodemoedas = new Group();
    grupodocombustivel = new Group();
    obstaculo = new Group();
    var obstaclesPositions = [
      { x: width / 2 + 350, y: height - 800, image: imageobstaculo2 },
      { x: width / 2 - 150, y: height - 1300, image: imageobstaculo },
      { x: width / 2 + 350, y: height - 1800, image: imageobstaculo },
      { x: width / 2 - 180, y: height - 2300, image: imageobstaculo2 },
      { x: width / 2, y: height - 2800, image: imageobstaculo2 },
      { x: width / 2 - 180, y: height - 3300, image: imageobstaculo },
      { x: width / 2 + 180, y: height - 3300, image: imageobstaculo2 },
      { x: width / 2 + 350, y: height - 3800, image: imageobstaculo2 },
      { x: width / 2 - 150, y: height - 4300, image: imageobstaculo },
      { x: width / 2 + 350, y: height - 4800, image: imageobstaculo2 },
      { x: width / 2, y: height - 5300, image: imageobstaculo },
      { x: width / 2 - 180, y: height - 5500, image: imageobstaculo2 }
    ];

    this.addSprites(grupodocombustivel,4,imageFuel,0.02);
    this.addSprites(grupodemoedas,18,imageMoeda,0.09);
    this.addSprites(obstaculo,obstaclesPositions.length,imageobstaculo,0.02,obstaclesPositions);
  }

  elementos() {
    formulario.hide();
    formulario.inicio.position(40, 50);
    formulario.inicio.class("gameTitleAfterEffect");
    
    this.titulo.html("reset");
    this.titulo.class("resetText");
    this.titulo.position(width/2+200,40)

    this.buttonrestart.class("resetButton");
    this.buttonrestart.position(width/2+230,100);

    this.titulodoRank.html("Placar");
    this.titulodoRank.class("resetText");
    this.titulodoRank.position(width/3-60,40);

    this.jogador1.class("leadersText");
    this.jogador1.position(width/3-50,80);

    this.jogador2.class("leadersText");
    this.jogador2.position(width/3-50,130);
    
  }

  play() {
    this.elementos();
    this.restartgame();
    

    Jogador.infdejogadores();
    jogador.gameover();

    if (allPlayers !== undefined) {
      image(imagePista, 0, -height * 5, width, height * 6);  
      
      var index = 0;

      for(var player in allPlayers){
        index = index+1;
        var x = allPlayers[player].positionX;
        var y = height - allPlayers[player].positionY;
        matrizdoCarro[index-1].position.x = x;
        matrizdoCarro[index-1].position.y = y;
        if(index == jogador.index){
          fill("blue");
          ellipse(x,y,60,60);
          this.colisionFuel(index);
          this.colisionMoeda(index);
          camera.position.x = matrizdoCarro[index-1].position.x;
          camera.position.y = matrizdoCarro[index-1].position.y;


        }
      }
      this.movimentodocarro();
      var linhadechegada = height*6-100
      if(jogador.positionY>linhadechegada){
        estadodejogo2 = 2
        jogador.rank = jogador.rank+1
        Jogador.atualizarfimdejogo(jogador.rank)
        this.mostrarganhador();
        jogador.update();
        this.mostrarRank();
      }
      drawSprites();
    }
  }

  movimentodocarro(){
    
    if(keyDown(UP_ARROW)){
      jogador.positionY = jogador.positionY+10;
      jogador.update();
    }
    if(keyDown(LEFT_ARROW)&& jogador.positionX > width / 3 - 50){
      jogador.positionX = jogador.positionX-10;
      jogador.update();
      
    }
    if(keyDown(RIGHT_ARROW)&& jogador.positionX < width / 2 + 300){
      jogador.positionX = jogador.positionX+10;
      jogador.update();
      
    }
    if(keyDown(DOWN_ARROW)){
      jogador.positionY = jogador.positionY-10;
      jogador.update();
    }
  }

  restartgame(){

    this.buttonrestart.mousePressed(
      () => {
        database.ref("/").set({
          fimdejogo:0,
          playerCount:0,
          estadodejogo2:0,
          players:{},
          fimdejogo:0
        })
        window.location.reload();
      }
    )



  }

  mostrarRank(){

    var jogador1;
    var jogador2;
    var jogadores = Object.values(allPlayers);

    if((jogadores[0].rank == 0 && jogadores[1].rank == 0)||jogadores[0].rank == 1){
      // &emsp; Essa etiqueta é usada para exibir quatro espaços.
      jogador1 = jogadores[0].rank + "&emsp;" + jogadores[0].nome + "&emsp;" + jogadores[0].pontuacao;

      jogador2 = jogadores[1].rank + "&emsp;" + jogadores[1].nome + "&emsp;" + jogadores[1].pontuacao;
    }

    if(jogadores[1].rank == 1){

      jogador1 = jogadores[1].rank + "&emsp;" + jogadores[1].nome + "&emsp;" + jogadores[1].pontuacao;

      jogador2 = jogadores[0].rank + "&emsp;" + jogadores[0].nome + "&emsp;" + jogadores[0].pontuacao;
    }
    this.jogador1.html(jogador1);
    this.jogador2.html(jogador2);

  }

  addSprites(nomedogrupo,numerodeSprites,imagedoSprite,escala,Position=[]){
    for(var indice = 0; indice < numerodeSprites; indice = indice+1){
      var X;
      var Y;
      if(Position.length>0){
        X = Position[indice].x
        Y = Position[indice].y
      }
      else{
        X = random(width/2+100,height/2-150);
        Y = random(-height*4.5,height-400);
      }
      var Sprite = createSprite(X,Y);
      Sprite.addImage("imagedoSprite",imagedoSprite);
      Sprite.scale = escala;
      nomedogrupo.add(Sprite);
    }
  }

  colisionFuel(index){
    matrizdoCarro[index-1].overlap(grupodocombustivel,function(coletor,coletato){
      jogador.gasolina = 185
      coletato.remove()

    })
  }

  colisionMoeda(index){
    matrizdoCarro[index-1].overlap(grupodemoedas,function(coletor,coletato){
      jogador.pontuacao = jogador.pontuacao+1;
      jogador.update();
      coletato.remove();
    })
  
  }

  mostrarganhador(){
    swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });

  }

}
