function generateBoard() {
  var boardZeroes = _.map(Array(14), function() {return 0});
  var boardTwos = _.map(Array(2), function() {return 2});
  var board = _.shuffle(boardZeroes.concat(boardTwos));
  return board;
}

function Game() {
  this.board = generateBoard();
}

Game.prototype = {
  toString: function() {
    var values = this.boardValues();
    var boardString = "";
    for (var i=0; i<values.length; i+=4) {
      boardString += values.slice(i,i+4).join(" ")+"\n";
    }
    return boardString;
  },
  boardRows: function() {
    var rows = [];
    for (var i=0; i<this.board.length; i+=4) {
      rows.push(this.board.slice(i,i+4));
    }
    return rows;
  },
  boardCols: function() {
    return _.zip.apply(_,game.boardRows());
  },
  transformDownToUp: function () {
    return _.map(this.boardCols(), function(col) {return col.reverse()});
  },
  transformRightToLeft: function() {
    return _.map(this.boardRows(), function(col) {return col.reverse()});
  },
  move: function(direction) {
    switch (direction) {
      case "up":
        return moveModule.move(this.boardCols())
      case "down":
        return moveModule.move(this.transformDownToUp());
      case "right":
        return moveModule.move(this.transformRightToLeft());
      case "left":
        return moveModule.move(this.boardRows());
    }
  }
}

// var moveModule = (function() {

  function availableCells() {
    var availableIndices = [];
    for (var i=0; i<this.board.length; i++) {
      if (this.board[i]==0) {
        availableIndices.push(i);
      }
    }
    return availableIndices;
  }

  function spawnBlock() {

  }

  function shiftAllRows(rows) {
    for (var i=0; i<rows.length; i++) {
      rows[i]=shiftOneRow(rows[i]);
    }
    return rows;
  }

  function shiftOneRow(row) {
    shiftZeroAtEnd(row);
    collapseDuplicates(row);
    shiftZeroes(row);
    return row;
  }

  function shiftZeroAtEnd(row) {
    if (row[0]==0) {
      row.splice(0, 1);
      row.push(0);
    }
    return row;
  }

  function collapseDuplicates(row) {
    for (var i=0; i<row.length-1; i++) {
      if (_.contains(row.slice(i+1),row[i]) && row[i]!=0) {
        row[i]=row[i]*2;
        row[i+1]=0;
      }
    }
    return row;
  }

  function shiftZeroes(row) {
    for (var i=1; i<row.length-1; i++) {
      if (row[i]==0) {
        row[i]=row[i+1]
        row[i+1]=0;
      }
    }
    return row;
  }

  function move(direction) {
     switch (direction) {
      case "up":
        return moveModule.move(this.boardCols())
      case "down":
        return moveModule.move(this.transformDownToUp());
      case "right":
        return moveModule.move(this.transformRightToLeft());
      case "left":
        return moveModule.move(this.boardRows());
    }
  }

//   return {
//     move: function(rows) {
//       // debugger
//       return shiftAllRows(rows);
//     }
//   };
// }) ();