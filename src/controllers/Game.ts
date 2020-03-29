import { CELL_TYPE, DIRECTION, KEY_CODE, SPEED_INCREASE_INTERVAL, START_SPEED } from "../shared/constants";
import Grid from "./Grid";
import View from "./View";
import Snake from "./Snake";
import ICoordinate from "../shared/ICoordinate";

export default class Game {
    private readonly view: View;
    private readonly grid: Grid;
    private readonly snake: Snake;
    private frame: number = 0;
    private score: number = 0;
    private speed: number = START_SPEED;
    private direction: DIRECTION = DIRECTION.RIGHT;
    private isChangeDirectionAllowed: boolean = true;

    constructor() {
        this.grid = new Grid();
        this.view = new View(this.grid.columnsQuantity, this.grid.rowsQuantity);
        this.snake = new Snake(this.grid);

        window.addEventListener('keydown', this.onKeyDown.bind(this));

        this.generateApple();
    }

    start(): void {
        window.focus();
        window.requestAnimationFrame(this.startLoop.bind(this))
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this.isChangeDirectionAllowed) {
            return;
        }

        this.isChangeDirectionAllowed = false;

        switch (event.keyCode) {
            case KEY_CODE.RIGHT:
                if (this.direction !== DIRECTION.LEFT) {
                    this.direction = DIRECTION.RIGHT;
                }
                break;
            case KEY_CODE.LEFT:
                if (this.direction !== DIRECTION.RIGHT) {
                    this.direction = DIRECTION.LEFT;
                }
                break;
            case KEY_CODE.UP:
                if (this.direction !== DIRECTION.DOWN) {
                    this.direction = DIRECTION.UP;
                }
                break;
            case KEY_CODE.DOWN:
                if (this.direction !== DIRECTION.UP) {
                    this.direction = DIRECTION.DOWN;
                }
                break;
        }
    }

    private generateApple(): void {
        const emptyCoordinates: ICoordinate[] = this.getEmptyCoordinates();
        const foodCoordinate: ICoordinate = emptyCoordinates[Math.floor(Math.random() * (emptyCoordinates.length - 1))];

        this.grid.setCell(foodCoordinate, CELL_TYPE.APPLE);
    }

    private getEmptyCoordinates(): ICoordinate[] {
        const emptyCoordinates: ICoordinate[] = [];

        for (let row: number = 0; row < this.grid.rowsQuantity; row++) {
            for (let column: number = 0; column < this.grid.columnsQuantity; column++) {
                if (this.grid.getCell({ row, column }) === CELL_TYPE.EMPTY) {
                    emptyCoordinates.push({ row, column });
                }
            }
        }

        return emptyCoordinates;
    }

    private startLoop(): void {
        if (++this.frame % this.speed !== 0) {
            window.requestAnimationFrame(this.startLoop.bind(this));
            return;
        }

        let headRow: number = this.snake.head.row;
        let headColumn: number = this.snake.head.column;

        switch (this.direction) {
            case DIRECTION.RIGHT:
                headColumn++;
                break;
            case DIRECTION.LEFT:
                headColumn--;
                break;
            case DIRECTION.UP:
                headRow--;
                break;
            case DIRECTION.DOWN:
                headRow++;
                break;
        }

        if (this.checkGameOver({ row: headRow, column: headColumn })) {
            // todo handle game over

            return;
        }

        const isGetApple: boolean = this.grid.getCell({ row: headRow, column: headColumn }) === CELL_TYPE.APPLE;

        if (isGetApple) {
            this.snake.eat({ row: headRow, column: headColumn });
            this.generateApple();
            this.updateScore(++this.score);
        }

        this.snake.move({ row: headRow, column: headColumn });

        this.view.draw(this.grid.grid);
        this.isChangeDirectionAllowed = true;

        window.requestAnimationFrame(this.startLoop.bind(this));
    }

    private updateScore(score: number): void {
        if (this.score % SPEED_INCREASE_INTERVAL === 0) {
            this.speed--;
        }

        this.view.updateScore(this.score);
    }

    private checkGameOver(snakeHead: ICoordinate): boolean {
        const isTouchedBorder: boolean = snakeHead.row < 0 || snakeHead.column < 0 || snakeHead.row > this.grid.rowsQuantity - 1 || snakeHead.column > this.grid.columnsQuantity - 1;
        const isTouchedHerself: boolean = this.grid.getCell(snakeHead) === CELL_TYPE.SNAKE;

        return isTouchedBorder || isTouchedHerself;
    }
}

