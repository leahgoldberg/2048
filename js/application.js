var game = new Game();

$(document).ready(function() {
  $('#start-game').on("click", function(e) {
    e.preventDefault();
    for (var i=0; i<game.board.length; i++) {
      $(".cell:eq("+i+")").html(game.board[i]);
    }
  });
  $('#refresh-board').on("click", function(e) {
    e.preventDefault();
    for (var i=0; i<game.board.length; i++) {
      $(".cell:eq("+i+")").html(game.board[i]);
    }
  });
});