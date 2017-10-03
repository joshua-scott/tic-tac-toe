function cpuMove() {
  movesMade++;

  if (winOrBlock('win')) return;
  else if (winOrBlock('block')) return;
  else if (goInCentre()) return;
  else if (goInCorner()) return;
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
      if (isEmpty(cells[winningPattern[i]])) {
        cells[winningPattern[i]].textContent = 'O';
        return true;
      }
    }
  }
}

// check if we have two given letters in a row, with a blank space
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
  if (isEmpty(cells[4])) {
    cells[4].textContent = 'O';
    return true;
  } else {
    return false;
  }
}

function goInCorner() {
  const corners = shuffle([0, 2, 6, 8]);
  for (let i = 0; i < corners.length; i++) {
    if (isEmpty(cells[corners[i]])) {
      cells[corners[i]].textContent = 'O';
      return true;
    }
  }
  return false;
}

function goInRemaining() {
  const remaining = shuffle([1, 3, 5, 7]);
  for (let i = 0; i < remaining.length; i++) {
    if (isEmpty(cells[remaining[i]])) {
      cells[remaining[i]].textContent = 'O';
      return true;
    }
  }
  return false;
}

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function trivial() {
  // Just go in the first available place for now...
  for (let where = 0; where < 9; where++) {
    if (isEmpty(cells[where])) {
      cells[where].textContent = 'O';
      return;
    }
  }
}