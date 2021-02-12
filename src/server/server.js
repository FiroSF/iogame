const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../../webpack.dev.js");

const socketio = require("socket.io");
const Constants = require("../shared/constants");
const Game = require("./game");

//express setting
const app = express();
app.use(express.static("public"));

if (process.env.NODE_ENV === '"development') {
  //webpack for dev
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  //Static serve the dist/ folder in production
  app.use(express.static("dist"));
}

//server on
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

//socket.io setting
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("Someone just joined... BOOM! ", socket.id);

  //recives
  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on("disconnect", onDisconnect);
});

const game = new Game();

function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(dir) {
  game.handleInput(this, dir);
}

function onDisconnect() {
  game.removeplayer(this);
}
