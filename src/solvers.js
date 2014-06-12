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
  var solution = []; //fixme
  var top = n;
  ///PSEUDOCODIN'!!!!!
  // Find an available spot for rook #1
  var board = new Board({n:n});
  var emptyBoard = board.rows();
  var checkSolutions = function(n,boardLayout,conflictedRow,conflictedCol){
    if (n===2){
      debugger;
    }
    var conflictedRow = conflictedRow || {};
    var conflictedCol = conflictedCol || {};

    for (var i = 0; i < top; i ++){
      if(!conflictedRow[i]){

      // find first available column
        for (var j=0; j < top; j++) {
          var tempBoardLayout = boardLayout.slice();
          if (!conflictedCol[j]){
            conflictedRow[i]=true;
            conflictedCol[j]=true;
            tempBoardLayout[i][j] = 1;
            if (n!== 1){
              checkSolutions(n-1, tempBoardLayout,conflictedRow,conflictedCol);
              delete conflictedRow[i];
              delete conflictedCol[j];

              solution.push(tempBoardLayout);
            }
          }
        }
      }
    }
  };
  checkSolutions(n,emptyBoard);

  // Save the rook's row and column as forbidden
    // Find available spot for rook #2 that is not forbidden
    // Repeat until we're out of rooks
    //
    // LOOKS LIKE RECURSION!!!
    //
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
