const turnIndicator = document.querySelector(".turnIndicator");
const resetButton = document.querySelector(".reset");
const cellCon = document.querySelector(".cellContainer");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isGameActive = true;
let currentPlayer = {
  piece: "X",
  xArray: [],
  oArray: [],
  filteredList: [],
  // oArray: [0, 1, 3, 4],
  // xArray: [2, 5, 6, 7, 8],
};

let current;
let allCells = cellCon.children;

function showCurrentPlayer() {
  turnIndicator.innerHTML = `It's ${currentPlayer.piece}'s turn`;
}

showCurrentPlayer();

window.onclick = (e) => {
  let elem = e.target;
  let isClicked = elem.classList.contains("clicked");
  let isValidCell = elem.classList.contains("cell");
  if (!isClicked && isValidCell) {
    elem.classList.add("clicked");
    completeTurn(currentPlayer, elem);
    showCurrentPlayer();
    checkWins();
  }
};

function handlePlayerChange() {
  currentPlayer.piece = currentPlayer.piece === "X" ? "O" : "X";
}
function completeTurn(player, elem) {
  let cellId = elem.id;
  let current = currentPlayer.piece;
  let turnDetails = {
    piece: currentPlayer.piece,
    takenCells: currentPlayer.piece === "X" ? player.xArray : player.oArray,
    classAdd: currentPlayer.piece === "X" ? "xClicked" : "oClicked",
  };
  elem.classList.add(turnDetails.classAdd),
    (elem.innerText = turnDetails.piece),
    turnDetails.takenCells.push(Number(cellId));
  console.log(turnDetails);

  handlePlayerChange();
}
function checkWins() {
  let players = [
    {
      piece: "X",
      takenList: currentPlayer.xArray.sort((a, b) => a - b),
      filteredList: [],
    },
    {
      piece: "O",
      takenList: currentPlayer.oArray.sort((a, b) => a - b),
      filteredList: [],
    },
  ];
  // let filtered = [];
  // for (j = 0; j < 2; j++) {
  let determinePlayer = players.find(
    (player) => player.piece === currentPlayer.piece
  );
  console.log(determinePlayer);
  for (i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    determinePlayer.filteredList = determinePlayer.takenList.filter((a, b) =>
      winCondition.includes(a)
    );
    console.log(determinePlayer.piece, determinePlayer.filteredList);
    if (
      JSON.stringify(winCondition) ===
      JSON.stringify(determinePlayer.filteredList)
    ) {
      turnIndicator.innerHTML = `${determinePlayer.piece} is the winner!`;
      turnIndicator.classList.add("winner");
      lockCells();
      // isGameActive = false;
      endOfGame();
    } else {
      detectTie();
    }
  }
}
// }
function lockCells() {
  for (i = 0; i < allCells.length; i++) {
    allCells[i].style.pointerEvents = "none";
  }
}

function endOfGame() {
  resetButton.classList.remove("hidden");
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  currentPlayer.oArray = [];
  currentPlayer.xArray = [];
  console.log(currentPlayer.xArray, currentPlayer.oArray);
  resetButton.classList.add("hidden");
  for (i = 0; i < allCells.length; i++) {
    allCells[i].classList = "cell";
    allCells[i].innerHTML = "";
    turnIndicator.classList.remove("winner");
    showCurrentPlayer();
  }
  unlockCells();
}
function unlockCells() {
  console.log(currentPlayer.xArray, currentPlayer.oArray);
  for (i = 0; i < allCells.length; i++) {
    allCells[i].style.pointerEvents = "all";
  }
}
function detectTie() {
  let tieList = [];
  for (i = 0; i < allCells.length; i++) {
    if (
      allCells[i].classList.contains("xClicked") ||
      allCells[i].classList.contains("oClicked")
    ) {
      tieList.push(i);
    }
  }
  if (tieList.length === allCells.length || !isGameActive) {
    console.log(currentPlayer.xArray, currentPlayer.oArray);
    console.log(tieList);
    console.log("it's a tie!");
    turnIndicator.innerHTML = `Game Over -- It's a tie!`;
    endOfGame();
  }
  // else {
  //   checkWins();
  // }
}
// if (!isGameActive) {

// }
