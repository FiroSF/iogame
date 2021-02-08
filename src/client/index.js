import { downloadAssets } from "./assets";
import { connect, play } from "./networking";
import { downloadAssets } from "./assets";
import { startCapturingInput } from "./input";
import { startRendering } from "./render";
import { initState } from "./state";

const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const usernameInput = document.getElementById("username-input");

Promise.all([connect(), downloadAssets()]).then(() => {
  playMenu.classList.remove("hidden");
  usernameInput.focus();

  playButton.onclick = () => {
    //Play part
    play(usernameInput.value);
    playMenu.classList.add("hidden");
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
});
