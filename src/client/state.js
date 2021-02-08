/**
 * The "current" state will always be RENDER_DELAY ms behind server time.
 * This makes gameplay smoother and lag less noticeable.
 */
const RENDER_DELAY = 100;

let gameUpdates = [];

/**
 * client time of game starts
 */
let gameStart = 0;

/**
 * server time of game starts
 */
let firstServerTimestamp = 0;

export function initState() {
  gameStart = 0;
  firstServerTimestamp = 0;
}

export function processGameUpdate(update) {
  if (!firstServerTimestamp) {
    firstServerTimestamp = update.t;
    gameStart = Date.now();
  }

  gameUpdates.push(update);

  const base = getBaseUpdate();
  if (base > 0) {
    gameUpdates.slice(0, base);
  }
}

/**
 * this returns server time including render delay.
 */
function currentServerTime() {
  return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}

/**
 * Returns the index of the base update, the first game update before current server time
 * N/A => -1
 */
function getBaseUpdate() {
  const serverTime = currentServerTime();
  for (let i = gameUpdates.length; i > 0; i--) {
    if (gameUpdates[i].t < serverTime) {
      return i;
    }
  }
  return -1;
}

/**
 * including render delay.
 */
function getCurrentState() {
  if (!firstServerTimestamp) {
    return;
  }

  const base = getBaseUpdate();
  const serverTime = currentServerTime();

  if (base < 0) {
    return gameUpdates[gameUpdates.length - 1];
  } else if (base === gameUpdates.length - 1) {
    return gameUpdates[base];
  } else {
    const baseupdate = gameUpdates[base];
    const next = gameStart[base + 1];
    const ratio = (serverTime - baseupdate.t) / (next.t - baseupdate.t);
    return {};
  }
}
