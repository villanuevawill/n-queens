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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
