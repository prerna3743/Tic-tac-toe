const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

// Score elements
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const scoreTiesElement = document.getElementById('score-ties');

// Game State
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Scores
let scores = {
    X: 0,
    O: 0,
    Ties: 0
};

// Winning conditions
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left col
    [1, 4, 7], // Middle col
    [2, 5, 8], // Right col
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// Initialize Game
function initGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', handleReset);
    updateStatusText();
}

// Handle Cell Click
function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if cell is already played or game is over
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Update state and UI
    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    // Check for win or draw
    checkWinCondition();
}

// Check Win Condition
function checkWinCondition() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const cellA = gameState[a];
        const cellB = gameState[b];
        const cellC = gameState[c];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        handleWin(winningCells);
        return;
    }

    // Check for tie
    const roundTie = !gameState.includes('');
    if (roundTie) {
        handleTie();
        return;
    }

    // If no win or tie, change player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusText();
}

// Handle Win
function handleWin(winningCells) {
    statusText.innerHTML = `Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span> Wins!`;
    gameActive = false;
    
    // Highlight winning cells
    winningCells.forEach(index => {
        cells[index].classList.add('win');
    });

    // Update score
    scores[currentPlayer]++;
    updateScores();
}

// Handle Tie
function handleTie() {
    statusText.innerHTML = `Game Ended in a <span class="ties">Tie!</span>`;
    gameActive = false;
    scores.Ties++;
    updateScores();
}

// Update Status Text
function updateStatusText() {
    statusText.innerHTML = `Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span>'s Turn`;
}

// Update Scores UI
function updateScores() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
    scoreTiesElement.textContent = scores.Ties;
}

// Handle Reset
function handleReset() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    updateStatusText();
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // Reset all classes to just 'cell'
    });
}

// Start the game on load
document.addEventListener('DOMContentLoaded', initGame);
