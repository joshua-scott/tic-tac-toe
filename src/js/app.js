const cells = document.querySelectorAll('.cell');

const wins = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
];

let movesMade = 0;

function makeMove() {
  if (!isEmpty(this)) return;

  this.textContent = 'X';
  movesMade++;
  
  if (isGameOver('Player')) return;

  cpuMove();
  isGameOver('CPU');
}

function isGameOver(lastPlayer) {
  if (checkForWinner()) {
    gameOver(lastPlayer);
    return true;
  } else if (checkForDraw()) {
    gameOver('Draw');
    return true;
  } else {
    return false;
  }
}

function checkForWinner() {
  // Build array to represent the board
  const board = [];
  cells.forEach(c => board.push(c.textContent));

  // Check the board against 'wins' array
  let result = false;
  wins.forEach(win => {
    if (threeInARow(board[win[0]], board[win[1]], board[win[2]])) {
      result = true;
    }
  });
  return result;
}

function checkForDraw() {
  return (movesMade >= 9);
}

function isEmpty(cell) {
  return cell.textContent === '';
}

function threeInARow(first, second, third) {
  return (first !== '' && first === second && second === third);
}

function cpuMove() {
  // Just go in the first available place for now...
  for (let where = 0; where < 9; where++) {
    if (isEmpty(cells[where])) {
      cells[where].textContent = 'O';
      movesMade++;
      return;
    }
  }
}

function gameOver(winner) {
  winner === 'Draw' ? alert(`It's a draw!`) : alert(`${winner} wins!`);
  newGame();
}

function newGame() {
  movesMade = 0;
  cells.forEach(c => c.textContent = '');
}

cells.forEach(c => c.addEventListener('click', makeMove));