app.grid = (function() {
    var grid = [],
        COLS = 20,
        ROWS = 20;

    return {
        init: function() {
            var i, j;
            for (i = 0; i < ROWS; i++) {
                grid[i] = [];
                for (j = 0; j < COLS; j++) {
                    grid[i][j] = 0;
                }
            }
        },
        getDimensions: function() {
            return {
                cols: COLS,
                rows: ROWS
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
