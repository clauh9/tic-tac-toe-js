const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winCondictions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


initGame();

function initGame() {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn to play`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.innerHTML = "<span>" + currentPlayer + "</span>";
    currentPlayer == "X" ? cell.classList.add('X') : cell.classList.add('O');
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn to play`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winCondictions.length; i++) {
        const condition = winCondictions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        running = false;
        statusText.innerHTML = `<span>${currentPlayer} wins!</span>`;
        currentPlayer == "X" ? statusText.classList.add('X') : statusText.classList.add('O');
    } else if (!options.includes("")) {
        statusText.textContent = "Draw";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach((cell) => (cell.textContent = ""));
    cells.forEach((cell) => (cell.classList.remove("X")));
    cells.forEach((cell) => (cell.classList.remove("O")));
    initGame();
}
