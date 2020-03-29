import Game from './controllers/Game';

window.addEventListener('load', () => {
    const game = new Game();

    game.start();
});
