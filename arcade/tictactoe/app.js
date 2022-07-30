let gameStatus = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const statusMessage = document.querySelector('.status');
statusMessage.innerHTML = `Player ${currentPlayer} Goes First`;

const winningCombo = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    currentPlayer = currentPlayer === "X" ? /*Value if True*/ "O" : /*Value if False*/ "X";
    statusMessage.innerHTML = `Player ${currentPlayer}'s turn`;
}

function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCombo[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        } if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusMessage.innerHTML = `Player ${currentPlayer} Won!`;
        gameStatus = false;
        return;
    }

    let draw = !gameState.includes("");
    if (draw) {
        statusMessage.innerHTML = `It's a Draw! Play Again!`;
        gameStatus = false;
        return;
    }

    playerChange();
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameStatus) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

function restartGame() {
    gameStatus = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusMessage.innerHTML = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.reset').addEventListener('click', restartGame);
