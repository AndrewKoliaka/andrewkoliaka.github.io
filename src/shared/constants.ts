import ICoordinate from "./ICoordinate";

export const CELL_SIZE: number = 20;
export const GRID_MARGIN: number = 6;
export const START_SPEED: number = 10;
export const SPEED_INCREASE_INTERVAL: number = 5;
export const START_SNAKE_COORDINATE: ICoordinate = {
    row: 3,
    column: 3
};

export enum KEY_CODE {
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
}

export enum CELL_TYPE {
    EMPTY,
    SNAKE,
    APPLE,
    CRASH
}

export enum DIRECTION {
    RIGHT,
    LEFT,
    DOWN,
    UP
}

export const COLOR = {
    [CELL_TYPE.SNAKE]: 'green',
    [CELL_TYPE.APPLE]: 'red',
    [CELL_TYPE.CRASH]: 'darkred',
    [CELL_TYPE.EMPTY]: 'white'
};
