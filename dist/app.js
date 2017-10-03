'use strict';

const cells = document.querySelectorAll('.cell');

const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
[0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
[0, 4, 8], [2, 4, 6] // diagonal
];

let movesMade = 0;

function makeMove() {
  if (!isEmpty(this.dataset.index)) return;

  this.textContent = 'X';
  this.classList.add('blue');
  movesMade++;

  if (isGameOver('Player')) return;

  // Allow a little time for DOM to update (and simulate 'thinking')
  setTimeout(() => {
    cpuMove();
    isGameOver('CPU');
  }, 500);
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
  const board = buildBoard();

  // Check the board against 'wins' array
  let result = false;
  wins.forEach(win => {
    if (threeInARow(board, ...win)) {
      result = true;
    }
  });
  return result;
}

// Build array to represent the board
function buildBoard() {
  const board = [];
  cells.forEach(c => board.push(c.textContent));
  return board;
}

function checkForDraw() {
  return movesMade >= 9;
}

function isEmpty(index) {
  return cells[index].textContent === '';
}

function threeInARow(board, first, second, third) {
  const b = board;
  return b[first] !== '' && b[first] === b[second] && b[second] === b[third];
}

function gameOver(winner) {
  // Allow a little time for DOM to update
  setTimeout(() => {
    winner === 'Draw' ? alert(`It's a draw!`) : alert(`${winner} wins!`);
    newGame();
  }, 10);
}

function newGame() {
  movesMade = 0;
  cells.forEach(c => {
    c.classList.remove('blue', 'red');
    c.textContent = '';
  });
}

cells.forEach(c => c.addEventListener('click', makeMove));
'use strict';

function cpuMove() {
  movesMade++;

  if (winOrBlock('win')) return;else if (winOrBlock('block')) return;else if (goInCentre()) return;else goInRemaining();
}

function winOrBlock(which) {
  const letter = which === 'win' ? 'O' : 'X';
  // Look for 2 in a row, where we can win or block a win
  const board = buildBoard();
  const twos = wins.filter(win => twoInARow(board, win, letter));

  if (twos.length === 0) {
    // We can't win/block on this turn
    return false;
  } else {
    // We can win/block! Grab one of the winning moves, and fill in the blank
    const winningPattern = shuffle(twos).pop();
    for (let i = 0; i < winningPattern.length; i++) {
      if (isEmpty(winningPattern[i])) {
        markCell(winningPattern[i]);
        return true;
      }
    }
  }
}

// Check if there are two letters out of three, with a blank space
function twoInARow(board, winningPattern, letter) {
  let blanks = 0;
  let letters = 0;

  for (let i = 0; i < winningPattern.length; i++) {
    const cellContents = cells[winningPattern[i]].textContent;
    if (cellContents === '') {
      blanks++;
    } else if (cellContents === letter) {
      letters++;
    }
  }
  return blanks === 1 && letters === 2;
}

function goInCentre() {
  if (isEmpty(4)) {
    markCell(4);
    return true;
  } else {
    return false;
  }
}

function goInRemaining() {
  const corners = shuffle([0, 2, 6, 8]);
  const remaining = shuffle([1, 3, 5, 7]);
  const possibleMoves = [...corners, ...remaining];
  for (let i = 0; i < possibleMoves.length; i++) {
    if (isEmpty(possibleMoves[i])) {
      markCell(possibleMoves[i]);
      return true;
    }
  }
  return false;
}

function markCell(index) {
  cells[index].textContent = 'O';
  cells[index].classList.add('red');
}

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}
//# sourceMappingURL=app.js.map
