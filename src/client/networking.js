import io from "socket.io-client";

//!constants import

const socket = io(`ws://${window.location.host}`);
const connectedPromise = new Promise((resolve) => {
  socket.on("connect", () => {
    console.log("Connected to Server!");
    resolve();
  });
});

export const connect = (onGameOver) => {
  connectedPromise.then(() => {
    //Register listener
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
  });
};

//requests
export const play = (username) => {
  socket.emit(Constrants.MSG_TYPES.JOIN_GAME, username);
};

export const updateDirection = (dir) => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
};
