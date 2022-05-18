class Formulario {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite Seu Nome");
    this.button = createButton("Jogar");
    this.inicio = createImg("./assets/TITULO.png", "game title");
    this.boasvindas = createElement("h2");
  }

  setElementsPosition() {
    this.inicio.position(120, 50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.button.position(width / 2 - 90, height / 2 - 20);
    this.boasvindas.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.inicio.class("gameTitle");
    this.input.class("customInput");
    this.button.class("customButton");
    this.boasvindas.class("greeting");
  }

  hide() {
    this.boasvindas.hide();
    this.button.hide();
    this.input.hide();
  }

  handleMousePressed() {
    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      var message = `
      Olá ${this.input.value()}
      </br>espere o outro jogador entrar...`;
      this.boasvindas.html(message);
      playerCount += 1;
      jogador.nome = this.input.value();
      jogador.index = playerCount;
      jogador.adicionarJogadores();
      jogador.atualizarQuantidadedeJogadores(playerCount);
      jogador.distancia();
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
