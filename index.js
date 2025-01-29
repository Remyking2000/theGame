const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart");

let currentPlayer = "X";
const board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Prevent clicking on already occupied cells
        if (board[index] !== "") return;

        cell.textContent = currentPlayer;
        board[index] = currentPlayer;

        // Check if the current player wins
        const winningCombination = checkWinner(currentPlayer);
        if (winningCombination) {
            message.textContent = `Player ${currentPlayer} Wins!`;
            highlightWinningCombination(winningCombination);
            disableBoard();
            return;
        }

        // Check for a draw
        if (board.every(cell => cell !== "")) {
            message.textContent = "It's a Draw!";
            return;
        }

        // Switch to the next player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s Turn`;
    });
});

// Function to check if the current player has won
function checkWinner(player) {
    for (let combination of winningCombinations) {
        if (combination.every(index => board[index] === player)) {
            return combination;  // Return the winning combination of indices
        }
    }
    return null;
}

// Function to highlight the winning combination
function highlightWinningCombination(combination) {
    combination.forEach(index => {
        cells[index].style.backgroundColor = "yellow"; // Highlight the winning cells
    });
}

// Function to disable the board after the game ends
function disableBoard() {
    cells.forEach(cell => cell.style.pointerEvents = "none");
}

// Restart button functionality
restartButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = 'auto';
        cell.style.backgroundColor = ""; // Reset background color
    });

    board.fill("");
    currentPlayer = "X";
    message.textContent = `Player ${currentPlayer}'s Turn`;
});
