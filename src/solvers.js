/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n:n});
  var col = 0;
  var row = 0;
  board.togglePiece(row,col);
  row++;
  while (row < n){
    board.togglePiece(row,col);
    while(board.hasColConflictAt(col)){
      board.togglePiece(row,col);
      col++;
      board.togglePiece(row,col);
    }
    row++;
  }

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.countNRooksSolutions2 = function(n, currentBoard, tally, init) {
  currentBoard = currentBoard || new Board({n:n});
  tally = n || 0;
  if (init == null){
    init = n;
  }
  var row = init-n;
  var col = 0;
  var boardCopy = new Board(currentBoard.rows());

  for (var i=0; i<init; i++) {
    if (n===1) {
      boardCopy.togglePiece(row, col);
      if (!boardCopy.hasAnyColConflicts()) {
        return 1;
      }
      boardCopy.togglePiece(row, col);
    } else {
      boardCopy.togglePiece(row, col);
      if (!boardCopy.hasAnyColConflicts()) {
        tally += countNRooksSolutions(n-1, boardCopy, tally, init);
      }
      boardCopy.togglePiece(row, col);
    }
    col++;
  }
  console.log('Number of solutions for ' + n + ' rooks:', tally);
  return tally;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var tally = 0;
  var init = n;

  var solutionCount = function(n, currentBoard) {
    var row = init-n;
    var col = 0;
    var boardCopy = new Board(currentBoard.rows());

    for (var i=0; i<init; i++) {
      if (n===1) {
        boardCopy.togglePiece(row, col);
        if (!boardCopy.hasAnyColConflicts()) {
          tally++;
        }
        boardCopy.togglePiece(row, col);
      } else {
        boardCopy.togglePiece(row, col);
        if (!boardCopy.hasAnyColConflicts()) {
          solutionCount(n-1, boardCopy);
        }
        boardCopy.togglePiece(row, col);
      }
      col++;
    }
  };

  solutionCount(n, new Board({n:n}));

  console.log('Number of solutions for ' + n + ' rooks:', tally);
  return tally;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var tally = 0;
  var init = n;
  var solutions = [];

  var solutionCount = function(n, currentBoard) {
    var row = init-n;
    var col = 0;
    var boardCopy = new Board(currentBoard.rows());
    if (n===0){
      return boardCopy.rows();
    }
    for (var i=0; i<init; i++) {
      if (n===1) {
        boardCopy.togglePiece(row, col);
        if (!boardCopy.hasAnyColConflicts() &&
            !boardCopy.hasAnyMajorDiagonalConflicts() &&
            !boardCopy.hasAnyMinorDiagonalConflicts()) {
          return boardCopy.rows();
        }
        boardCopy.togglePiece(row, col);
      } else {
        boardCopy.togglePiece(row, col);
        if (!boardCopy.hasAnyColConflicts() &&
            !boardCopy.hasAnyMajorDiagonalConflicts() &&
            !boardCopy.hasAnyMinorDiagonalConflicts()){
          var solve = solutionCount(n-1, boardCopy);
          if (solve !== null && solve !== undefined){
            return solve;
          }
        }
        boardCopy.togglePiece(row, col);
      }
      col++;
    }
    if (n === init){
      return new Board({n:n}).rows();
    }
  };

  console.log('Finding a solution for n=' + n + ' queens');
  return solutionCount(n, new Board({n:n}))
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var tally = 0;
  var init = n;
  var colCollision = {};
  var majorCollision = {};
  var minorCollision = {};

  var solutionCount = function(n) {
    var row = init-n;
    var col = 0;
    if (n===0){
      tally++;
    }
    for (var i=0; i<init; i++) {
      if (n===1) {
        if (!colCollision[col] &&
            !majorCollision[col-row] &&
            !minorCollision[row+col]) {
          tally++;
        }
      } else {
        if (!colCollision[col] &&
            !majorCollision[col-row] &&
            !minorCollision[row+col]){
          majorCollision[col-row] = true;
          minorCollision[row+col] = true;
          colCollision[col] = true;
          solutionCount(n-1);
          majorCollision[col-row] = false;
          minorCollision[row+col] = false;
          colCollision[col] = false;
        }
      }
      col++;
    }
  };

  solutionCount(n);

  console.log('Number of solutions for ' + n + ' queens:', tally);
  return tally;
};
