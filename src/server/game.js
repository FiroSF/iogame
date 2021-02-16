const Constants = require("../shared/constants");
const Player = require("./player");

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.bullets = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;

    setInterval(() => {
      this.update.bind(this);
    }, 1000 / 60);
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;

    //player's start position
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, x, y);
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, dir) {
    if (this.players[socket.id]) {
      this.players[socket.id].setDirection(dir);
    }
  }

  update() {
    //calculate time
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;

    //bullet update
    const bulletsToRemove = [];
    this.bullets = this.bullets.forEach((bullet) => {
      if (bullet.update(dt)) {
        //delete bullet
        bulletsToRemove.push(bullet);
      }
    });
    this.bullets = this.bullets.filter(
      (bullet) => !bulletsToRemove.includes(bullet)
    );

    //player update
  }
}
