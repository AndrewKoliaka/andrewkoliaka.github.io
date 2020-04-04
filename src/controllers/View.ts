import { CELL_SIZE, CELL_TYPE, COLOR } from "../shared/constants";
import ICoordinate from "../shared/ICoordinate";

export default class View {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(private readonly cols: number, private readonly rows: number) {
        this.canvas = <HTMLCanvasElement>document.getElementsByClassName('battlefield')[0];
        this.canvas.setAttribute('width', `${this.cols * CELL_SIZE}px`);
        this.canvas.setAttribute('height', `${this.rows * CELL_SIZE}px`);
        this.ctx = this.canvas.getContext('2d');
    }

    draw(grid: CELL_TYPE[][]): void {
        grid.forEach((rowArr: [], row: number) => {
            rowArr.forEach((type: CELL_TYPE, column: number) => {
                this.drawCell({ row, column }, type);
            });
        });
    }

    updateScore(score: number): void {
        // todo implement score draw
    }

    static hideStartScreen(): void {
        (<HTMLElement>document.getElementsByClassName('start-screen')[0]).style.display = 'none';
    }

    private drawCell(coordinate: ICoordinate, type: CELL_TYPE): void {
        this.ctx.fillStyle = COLOR[type] || COLOR[CELL_TYPE.EMPTY];
        this.ctx.fillRect(coordinate.column * CELL_SIZE, coordinate.row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };
}
