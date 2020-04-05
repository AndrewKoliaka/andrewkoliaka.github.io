import { CELL_SIZE, CELL_TYPE, COLOR } from "../shared/constants";
import ICoordinate from "../shared/ICoordinate";

export default class View {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly startScreen: HTMLElement;
    private readonly pauseScreen: HTMLElement;
    private readonly scoreContainer: HTMLElement;
    private readonly speedContainer: HTMLElement;

    constructor(private readonly cols: number, private readonly rows: number) {
        this.startScreen = <HTMLElement>document.getElementsByClassName('popup--start')[0];
        this.pauseScreen = <HTMLElement>document.getElementsByClassName('popup--pause')[0];
        this.scoreContainer = <HTMLElement>document.getElementsByClassName('score')[0];
        this.speedContainer = <HTMLElement>document.getElementsByClassName('speed')[0];
        this.canvas = <HTMLCanvasElement>document.getElementsByClassName('battlefield')[0];
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.canvas.setAttribute('width', `${this.cols * CELL_SIZE}px`);
        this.canvas.setAttribute('height', `${this.rows * CELL_SIZE}px`);
    }

    draw(grid: CELL_TYPE[][]): void {
        grid.forEach((rowArr: [], row: number) => {
            rowArr.forEach((type: CELL_TYPE, column: number) => {
                this.drawCell({ row, column }, type);
            });
        });
    }

    updateScore(score: number): void {
        this.scoreContainer.textContent = score.toString();
    }

    updateSpeed(speed: number): void {
        this.speedContainer.textContent = speed.toString();
    }

    hideStartScreen(): void {
        this.startScreen.style.display = 'none';
    }

    togglePauseScreen(): void {
        this.pauseScreen.style.display = this.pauseScreen.style.display === 'flex' ? 'none' : 'flex';
    }

    private drawCell(coordinate: ICoordinate, type: CELL_TYPE): void {
        this.ctx.fillStyle = COLOR[type] || COLOR[CELL_TYPE.EMPTY];
        this.ctx.fillRect(coordinate.column * CELL_SIZE, coordinate.row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };
}
