import { getAsset } from "./assets";

//!constants import
//!render implements are needed

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

//get canvas things
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

//canvas size
canvas.width = window.innerHeight;
canvas.height = window.innerWidth;

function render() {
  const { me, others, bullets } = getCurrentState();

  if (!me) {
    return;
  }

  //bg
  renderBackground();

  //bullets
  bullets.forEach(renderBullet.bind(null, me)); //bind를 이용해 renderBullet의 첫 인수를 me로 고정. https://ko.javascript.info/bind

  //players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me)); //"
}

function renderBackground() {}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset("bullet.svg"),
    canvas.width / 2 + (x - me.x) - BULLET_RADIUS,
    canvas.height / 2 + (y - me.y) - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2
  );
}

function renderPlayer(me, player) {}

//actual render
let renderInterval = null;
export function startRendering() {
  renderInterval = setInterval(render, 1000 / 60);
}
export function stopRendering() {
  clearInterval(renderInterval);
}
