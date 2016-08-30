app.snake = (function() {
    var chain = [];

    var SNAKE_SYMBOL = 1;

    return {
        init: function(initialLength) {
            var initialPos = { i: 3, j: 3 };
            chain = [];
            for (var i = 0; i < initialLength; i++) {
                this.insert(initialPos.i, initialPos.j + i);
            }
        },
        get head() {
            return chain[0];
        },
        insert: function(i, j) {
            chain.unshift({ i: i, j: j });
            app.grid.setCell(i, j, SNAKE_SYMBOL);
        },
        remove: function() {
            app.grid.setCell(chain[chain.length - 1].i, chain[chain.length - 1].j, 0);
            chain.pop();
        }
    }
})();
