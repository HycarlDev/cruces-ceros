// var oriBoard;

// const humanPlayer = "O";
// const comPlayer = "X";
// const winCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [6, 4, 2]
// ]
// const cells = document.querySelectorAll(".cell");


// // Call the functions
// startGame();

// // Start the game function
// function startGame() {
//     document.querySelector(".endgame").style.display = "none"; // At the game start, the winning text won't be display
//     oriBoard = Array.from(Array(9).keys()); // Array of 9 elements is created and insert into the variable (TTT board)

//     // For each cells/boxes, remove the input, remove the winning background color and playing mechanism (turnClick)
//     for (var i = 0; i < cells.length; i++) {
//         cells[i].textContent = '';
//         cells[i].style.removeProperty('background-color');
//         cells[i].addEventListener("click", turnClick, false);
//     }
// }

// // Just to grouped the turns of player and AI, if player's turn, call turn(player) and vice versa for AI
// function turnClick(square) {
//     turn(square.target.id, humanPlayer);
// }

// function turn(squareId, player) {
//     oriBoard[squareId] = player; // oriBoard has its' square and ID (squareId), so when clicked, it's player's
//     document.getElementById(squareId).textContent = player; // This is to show that the square is belong to the player based on ID
// }


const game = () => {
    var oriBoard;

    const humanPlayer = "O";
    const comPlayer = "X";
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    const cells = document.querySelectorAll(".cell");

    const gameMechanism = () => {
        document.querySelector(".endgame").style.display = "none"; // At the game start, the winning text won't be display
        oriBoard = Array.from(Array(9).keys()); // Array of 9 elements is created and insert into the variable (TTT board)

        // For each cells/boxes, remove the input, remove the winning background color and playing mechanism (turnClick)
        for (var i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].style.removeProperty('background-color');
            cells[i].addEventListener("click", turnClick, false);
        }
    };

    // Start the game function
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        gameMechanism();

        // Replay button
        playBtn.addEventListener("click", () => {
            gameMechanism();
        });
    };

    // Just to grouped the turns of player and AI, if player's turn, call turn(player) and vice versa for AI
    const turnClick = (square) => {
        turn(square.target.id, humanPlayer);
    };

    const turn = (squareId, player) => {
        oriBoard[squareId] = player; // oriBoard has its' square and ID (squareId), so when clicked, it's player's
        document.getElementById(squareId).textContent = player; // This is to show that the square is belong to the player based on ID
    };

    // Call the inner functions
    startGame();
};

// Start the game
game();