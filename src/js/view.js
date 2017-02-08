app.view = (function() {
    var canvas = document.getElementsByTagName('canvas')[0],
        ctx = canvas.getContext('2d'),
        CELL_WIDTH = 20,
        CELL_HEIGHT = 20,
        popup = document.getElementById('popup'),
        restart_btn = document.getElementById('restart_btn');

    restart_btn.onclick = function() {
        popup.style.visibility = 'hidden';
        app.controller.start();
    }

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
        },
        confirm: function(score) {
            document.getElementById('popup_score').textContent = score;
            document.getElementById('popup').style.visibility = 'visible';
            restart_btn.focus();
        }
    }
})();
