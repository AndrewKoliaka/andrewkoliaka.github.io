 app.controller = (function() {
     var KEY = {
         UP: 38,
         DOWN: 40,
         LEFT: 37,
         RIGHT: 39
     };

     var CELL = {
         EMPTY: 0,
         SNAKE: 1,
         FRUIT: 2
     };

     var DIRECTION = {
         R: 'RIGHT',
         L: 'LEFT',
         D: 'DOWN',
         U: 'UP'
     };

     var color = {
         snake: null,
         fruit: null,
         empty: '#FAEBD7',
         crash: '#FA8072'
     };

     var dim = app.grid.getDimensions(),
         version = 0,
         score = 0,
         speed = 0,
         gameOver = false,
         snakeDirection = null;

     var fruitColors = ['#65CCA9', '#FF9872', '#FF93FF', '#84C1FF'],
         snakeColors = ['#008080', '#660066', '#323299', '#666666'];

     window.onkeydown = function(e) {
         switch (e.keyCode) {
             case KEY.RIGHT:
                 if (snakeDirection !== DIRECTION.L) {
                     snakeDirection = DIRECTION.R;
                 }
                 break;
             case KEY.LEFT:
                 if (snakeDirection !== DIRECTION.R) {
                     snakeDirection = DIRECTION.L;
                 }
                 break;
             case KEY.UP:
                 if (snakeDirection !== DIRECTION.D) {
                     snakeDirection = DIRECTION.U;
                 }
                 break;
             case KEY.DOWN:
                 if (snakeDirection !== DIRECTION.U) {
                     snakeDirection = DIRECTION.D;
                 }
                 break;
         }
     }

     function init() {
         color.snake = snakeColors[Math.floor(Math.random() * (snakeColors.length - 1))];
         color.fruit = fruitColors[Math.floor(Math.random() * (fruitColors.length - 1))];
         snakeDirection = DIRECTION.R;
         speed = 9;
         score = 0;
         version = 0;
         gameOver = false;
         app.grid.init();
         app.snake.init(3);
         setFood();
         updateScore();
     }

     function updateScore() {
         document.getElementById('score_value').textContent = score;
     }

     function game() {
         var hi, hj;

         if (++version % speed === 0) {
             hi = app.snake.head.i;
             hj = app.snake.head.j;
             switch (snakeDirection) {
                 case DIRECTION.R:
                     hj++;
                     break;
                 case DIRECTION.L:
                     hj--;
                     break;
                 case DIRECTION.U:
                     hi--;
                     break;
                 case DIRECTION.D:
                     hi++;
                     break;
             }

             if (hi < 0 || hj < 0 || hi > dim.height - 1 || hj > dim.width - 1 || app.grid.getCell(hi, hj) === CELL.SNAKE) {
                 gameOver = true;
             }

             if (!gameOver) {
                 if (app.grid.getCell(hi, hj) === CELL.FRUIT) {
                     updateScore(++score);
                     if (score % 5 === 0) {
                         speed--;
                     }
                     app.snake.insert(hi, hj);
                     setFood();
                 }
                 app.snake.insert(hi, hj);
                 app.snake.remove();
                 draw();
             } else {
                 app.view.drawCell(app.snake.head.j, app.snake.head.i, color.crash);
                 if (confirm('Game finished\nyour score: ' + score + '\n try again?')) {
                     app.controller.start();
                 }
                 return;
             }

         }
         window.requestAnimationFrame(game);
     }

     function draw() {
         var cell_color;

         for (var i = 0; i < dim.height; i++) {
             for (var j = 0; j < dim.width; j++) {
                 switch (app.grid.getCell(i, j)) {
                     case CELL.EMPTY:
                         cell_color = color.empty;
                         break;
                     case CELL.FRUIT:
                         cell_color = color.fruit;
                         break;
                     case CELL.SNAKE:
                         cell_color = color.snake;
                         break;
                 }
                 app.view.drawCell(j, i, cell_color);
             }
         }
     }

     function setFood() {
         var empties = [],
             randCell;

         color.fruit = fruitColors[Math.floor(Math.random() * (fruitColors.length - 1))];
         for (var i = 0; i < dim.height; i++) {
             for (var j = 0; j < dim.width; j++) {
                 if (app.grid.getCell(i, j) === 0) {
                     empties.push({ i: i, j: j });
                 }
             }
         }

         if (!empties.length) {
             return false;
         }
         randCell = empties[Math.floor(Math.random() * (empties.length - 1))];
         app.grid.setCell(randCell.i, randCell.j, 2);
         return true;
     }

     return {
         start: function() {
             init();
             window.focus()
             window.requestAnimationFrame(game)
         }
     }
 })();
