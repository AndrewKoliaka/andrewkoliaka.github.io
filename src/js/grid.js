app.grid = (function() {
    var grid = [],
        GRID_WIDTH = 20,
        GRID_HEIGHT = 20;

    return {
        init: function() {
            var i, j;
            for (i = 0; i < GRID_HEIGHT; i++) {
                grid[i] = [];
                for (j = 0; j < GRID_WIDTH; j++) {
                    grid[i][j] = 0;
                }
            }
        },
        getDimensions: function() {
            return {
                width: GRID_WIDTH,
                height: GRID_HEIGHT
            }
        },
        getCell: function(i, j) {
            return grid[i][j];
        },
        setCell: function(i, j, value) {
            grid[i][j] = value;
        }
    }
})();
