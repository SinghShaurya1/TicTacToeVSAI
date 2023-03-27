const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart');

const player = 'X';
const computer = 'O';
let currentPlayer = player;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let boardState = ['', '', '', '', '', '', '', '', ''];

const XwinningMessage = () => `Player has won!`;
const OwinningMessage = () => `computer has won!`;
const drawMessage = () => `Game ended in a draw`;
const computerMoveMessage = () => `Computer is making a move...`;

const checkWin = (boardState, player) => {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return boardState[index] === player;
    });
  });
};

const checkDraw = (boardState) => {
  return boardState.every(cell => {
    return cell !== '';
  });
};

const showStatus = (message) => {
  status.textContent = message;
};

const playerMark = (cell, index, mark) => {
  boardState[index] = mark;
  cell.textContent = mark;
  cell.classList.add(mark);
};

const switchPlayer = () => {
  currentPlayer === player ? computer : player;
};

const resetBoard = () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove(player);
    cell.classList.remove(computer);
  });
};

const computerMove = () => {
  showStatus(computerMoveMessage());

  setTimeout(() => {
    let availableCells = [];
    cells.forEach((cell, index) => {
      if (boardState[index] === '') {
        availableCells.push(index);
      }
    });

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const chosenCell = availableCells[randomIndex];

    playerMark(cells[chosenCell], chosenCell, computer);
    switchPlayer();
  });
};

const handleClick = (event) => {
  const cell = event.target;
  const index = [...cell.parentElement.children].indexOf(cell);

  if (boardState[index] !== '' || checkWin(boardState, player) || checkWin(boardState, computer)) {
    return;
  }

  playerMark(cell, index, currentPlayer);

  if (checkWin(boardState, player)) {
    showStatus(XwinningMessage());
    return;
  }

  if (checkWin(boardState, computer)) {
    showStatus(OwinningMessage())
    return;
  }
  if (checkDraw(boardState)) {
    showStatus(drawMessage());
    return;
  }

  switchPlayer();
  computerMove();
};

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', () => {
  resetBoard();
  showStatus('');
  currentPlayer = player;
});
