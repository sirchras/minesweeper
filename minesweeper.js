document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
let board = {
  cells: [],
};

let width = 3;
for(let row = 0; row < width; row++) {
  for(let col = 0; col < width; col++) {
    let i = row * width + col;
    board.cells[i] = {
      row: row,
      col: col,
      isMine: false,
      hidden: true,
    };
  }
}

// set mines
board.cells[3].isMine = true;
board.cells[4].isMine = true;
board.cells[8].isMine = true;

function startGame () {
  for(let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  let mines = board.cells.filter(cell => cell.isMine);
  let notMines = board.cells.filter(cell => !cell.isMine);
  for(let i = 0; i < mines.length; i++) {
    if(!mines[i].isMarked) return;
  }
  for(let i = 0; i < notMines.length; i++) {
    if(notMines.hidden) return
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let count = 0;
  for(let i = 0; i < surrounding.length; i++) {
    if(surrounding[i].isMine) count++;
  }
  return count;
}

