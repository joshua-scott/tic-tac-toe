function cpuMove() {
  movesMade++;

  if (winOrBlock('win')) return;
  else if (winOrBlock('block')) return;
  else if (goInCentre()) return;
  else goInRemaining();
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
  return (blanks === 1 && letters === 2);
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
