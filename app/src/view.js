app.view = (function() {
    var canvas = document.getElementsByTagName('canvas')[0],
        ctx = canvas.getContext('2d'),
        CELL_WIDTH = 20,
        CELL_HEIGHT = 20;

    return {
        clearCanvas: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        clearCell: function(x, y) {
            ctx.clearRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        },
        drawCell: function(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
        }
    }
})();
