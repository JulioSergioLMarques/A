class Jogador {
  constructor() {
    this.nome = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.pontuacao = 0;
    this.rank = 0;
    this.gasolina = 185;
  }

  adicionarJogadores() {
    var jogadorID = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(jogadorID).set({
      nome: this.nome,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      pontuacao: this.pontuacao
      
    });
  }

  obterQuantidadesdeJogadores() {
    var referenciadeJogadores = database.ref("playerCount");
    referenciadeJogadores.on("value", data => {
      playerCount = data.val();
    });
  }

  atualizarQuantidadedeJogadores(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  static infdejogadores() {
    var referenciadejogador = database.ref("players");
    referenciadejogador.on("value", data => {
      allPlayers = data.val();
    });
  }


  distancia(){

    var distanciadejogadores = database.ref("players/player"+this.index);
    distanciadejogadores.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    })
  }
  
  update(){

    var IDplayer = "players/player" + this.index;
    database.ref(IDplayer).update({
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      pontuacao:this.pontuacao
    })
  }

  gameover(){
    database.ref("fimdejogo").on("value",(data)=>{
      this.rank = data.val();
    })
  }
  
  static atualizarfimdejogo(rank){
    database.ref("/").update({
      fimdejogo:rank
    })

  }
}
