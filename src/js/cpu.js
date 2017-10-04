function cpuMove() {
  movesMade++;

  if (winOrBlock('win')) return;
  else if (winOrBlock('block')) return;
  else if (goInCentre()) return;
  else if (coverOppositeCorners()) return;
  else if (offensiveMove()) return;
  else goInRemaining();
}

function winOrBlock(which) {
  const letter = which === 'win' ? 'O' : 'X';
  // Look for 2 in a row, where we can win or block a win
  const board = buildBoard();
  const twos = wins.filter(win => isPotentialLineForming(board, win, letter, 1));

  if (twos.length === 0) {
    // We can't win/block on this turn
    return false;
  } else {
    // We can win/block! Grab one of the winning moves, and fill in the blank
    markOneOfThese(shuffle(twos).pop());
    return true;
  }
}

// Check if there are: two OR one matching letters out of three, with one OR two blank spaces
function isPotentialLineForming(board, winningPattern, letter, blanksRequired) {
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
  if (blanksRequired === 1) {
    return (blanks === 1 && letters === 2);
  } else {
    return (blanks === 2 && letters === 1);
  }
}

function goInCentre() {
  if (isEmpty(4)) {
    markCell(4);
    return true;
  } else {
    return false;
  }
}

// Prevent losing due to this: http://www.wikihow.com/Win-at-Tic-Tac-Toe
function coverOppositeCorners() {
  if (!cornerDanger()) return false;

  const middleEdges = shuffle([1, 3, 5, 7]);
  markOneOfThese(middleEdges);
  return true;
}

function cornerDanger() {
  let blankCorners = 0, opponentCorners = 0;
  const corners = [0, 2, 6, 8];
  corners.forEach(corner => {
    if (isEmpty(corner)) {
      blankCorners++;
    } else if (cells[corner].textContent === 'X') {
      opponentCorners++;
    }
  });
  return (blankCorners === 2 && opponentCorners === 2);
}

function offensiveMove() {
  // Look for a 'O' with two blank spaces, where we can make it one away from a win
  const board = buildBoard();
  const moves = wins.filter(win => isPotentialLineForming(board, win, 'O', 2));

  if (moves.length === 0) {
    // We can't go one the offensive on this turn
    return false;
  } else {
    // We can! Grab one of the winning moves, and get one step closer to it
    markOneOfThese(shuffle(moves).pop());
    return true;
  }
}

function goInRemaining() {
  const corners = shuffle([0, 2, 6, 8]);
  const remaining = shuffle([1, 3, 5, 7]);
  markOneOfThese([...corners, ...remaining]);
}

function markOneOfThese(potentialMoves) {
  for (let i = 0; i < potentialMoves.length; i++) {
    if (isEmpty(potentialMoves[i])) {
      markCell(potentialMoves[i]);
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
