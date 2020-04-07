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
        // If that box is chosen, the AI can't choose it anymore
        if (typeof oriBoard[square.target.id] == 'number') { // oriBoard is filled with numbers, then get replace with symbol after chosen by the player
            turn(square.target.id, humanPlayer); // Player's turn

            // If the player's turn doesn't trigger the tie check, then move on with AI's move
            if (!checkTie()) {
                turn(bestSpot(), comPlayer);
            };
        };
    };

    const turn = (squareId, player) => {
        oriBoard[squareId] = player; // oriBoard has its' square and ID (squareId), so when clicked, it's player's
        document.getElementById(squareId).textContent = player; // This is to show that the square is belong to the player based on ID

        var gameWon = checkWin(oriBoard, player);
        if (gameWon) {
            gameOver(gameWon);
        };
    };

    const checkWin = (board, player) => {
        // Fancy ways to check if that particular box has been chosen by either sides
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        var gameWon = null; // If that turn don't trigger any winning combos, so no winning yet, otherwise, function below

        // For each turns, check the box if come across winning combos
        for (let [index, win] of winCombos.entries()) {
            // Fancy ways to check if the player's turns has come across the combos to win the game in winCombos[]
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break;
            }
        };

        return gameWon;
    };

    const gameOver = (gameWon) => {
        // Check every index of winCombos, and if it's linked with the index of gameWon, then change color based on the winner
        for (let index of winCombos[gameWon.index]) {
            document.getElementById(index).style.backgroundColor =
                gameWon.player == humanPlayer ? "blue" : "red";
        };

        // Loop every boxes, and remove the ability to click on that
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);
        };

        // Display winning text based on who wins
        declareWinner(gameWon.player == humanPlayer ? "You win, congratz!" : "You lose, sorry!");
    };

    // Display the winning text
    function declareWinner(who) {
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").textContent = who;
    }

    const emptySquares = () => {
      return oriBoard.filter(s => typeof s == 'number') // Filter the board, if the box is a number, then it's empty
    };

    const bestSpot = () => {
        return emptySquares()[0]; // If it's empty, then pick the first empty box then choose it (by AI)
    };

    const checkTie = () => {
        if (emptySquares().length == 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "green";
                cells[i].removeEventListener('click', turnClick, false);
            };

            declareWinner("It's either you both are shit, or both are damn good!");
            return true;
        };

        return false;
    };

    // Call the inner functions
    startGame();
};

// Start the game
game();