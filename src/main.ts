import Game from './controllers/Game';
import View from "./controllers/View";

const game = new Game();
const startButton = <HTMLButtonElement>document.getElementsByClassName('start-screen__button')[0];

startButton.addEventListener('click', () => {
    View.hideStartScreen();
    game.start();
});
