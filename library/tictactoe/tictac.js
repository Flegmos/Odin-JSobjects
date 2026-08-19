const game = (() => {
    let gameBoard = [];
    let boardLength = 10;
    let playerOnTurn = 1;
    let gameEnded = false;

    const resetBoard = (boardLength = 10) => {
        gameBoard = [];
        playerOnTurn = 1;
        gameEnded = false;
        for (let i = 0; i < boardLength; i++) {
            gameBoard[i] = []
            for (let j = 0; j < boardLength; j++) {
                gameBoard[i][j] = null;
            }
        }
    };
    resetBoard();

    const getBoardState = () => {
        return [...gameBoard]
    };

    const onBoard = (number) => {
        if (number >= 0 && number < boardLength) return true;
        return false;
    }

    const playerTurn = () => playerOnTurn;

    const makeMove = (x, y) => {
        if (gameEnded) return "gameEnded"
        if (!(onBoard(x)) || !(onBoard(y))) return "notOnBoard"
        if (gameBoard[x][y] !== null) return "taken";
        gameBoard[x][y] = playerOnTurn;

        //check wiener
        //x axis
        let lengthX = [0, 0];
        let lengthY = [0, 0];
        let lengthCross = [0, 0];
        let lengthCriss = [0, 0];

        for (let i = 1; (i < 5); i++) {
            if (onBoard(x + i) && lengthX[1] == i - 1) {
                if (gameBoard[x + i][y] == playerOnTurn) {
                    lengthX[1]++;
                }
            }
            if (onBoard(x - i) && lengthX[0] == i - 1) {
                if (gameBoard[x - i][y] == playerOnTurn) {
                    lengthX[0]++;
                }
            }
            if (onBoard(y + i) && lengthY[1] == i - 1) {
                if (gameBoard[x][y + i] == playerOnTurn) {
                    lengthY[1]++;
                }
            }
            if (onBoard(y - i) && lengthY[0] == i - 1) {
                if (gameBoard[x][y - i] == playerOnTurn) {
                    lengthY[0]++;
                }
            }
            if (onBoard(x + i) && onBoard(y + i) && lengthCross[1] == i - 1) {
                if (gameBoard[x + i][y + i] == playerOnTurn) {
                    lengthCross[1]++;
                }
            }
            if (onBoard(x - i) && onBoard(y - i) && lengthCross[0] == i - 1) {
                if (gameBoard[x - i][y - i] == playerOnTurn) {
                    lengthCross[0]++;
                }
            }
            if (onBoard(x + i) && onBoard(y - i) && lengthCriss[1] == i - 1) {
                if (gameBoard[x + i][y - i] == playerOnTurn) {
                    lengthCriss[1]++;
                }
            }
            if (onBoard(x - i) && onBoard(y + i) && lengthCriss[0] == i - 1) {
                if (gameBoard[x - i][y + i] == playerOnTurn) {
                    lengthCriss[0]++;
                }
            }
        }
        if ((lengthX[0] + lengthX[1] >= 4) ||
            (lengthY[0] + lengthY[1] >= 4) ||
            (lengthCross[0] + lengthCross[1] >= 4) ||
            (lengthCriss[0] + lengthCriss[1] >= 4)) {
            gameEnded = true;
            return "victory"
        }

        console.log(lengthX, lengthY, lengthCross, lengthCriss);

        playerOnTurn = (playerOnTurn == 1) ? 2 : 1;
        return "next";
    };



    return {
        resetBoard,
        getBoardState,
        makeMove,
        playerTurn
    };
})();


const display = (() => {
    const showBoard = (board) => {
        const boardLength = board.length;
        for (let x = 0;x<boardLength;x++){
            for (let y = 0; y<boardLength;y++){
                const tile = board[x][y];
            }
        }
    };

    return {
        showBoard
    };
})();

const controller = (({ getBoardState }, { showBoard }) => {
    const render = () => {
        const board = getBoardState();
        showBoard(board);
    };

    return {
        render
    };
})(game, display);

console.log(game.getBoardState());
console.log(game.makeMove(0, 0));
console.log(game.makeMove(1, 1));
console.log(game.makeMove(1, 10));
console.log(game.makeMove(1, 0));
console.log(game.makeMove(1, 2));
console.log(game.makeMove(2, 0));
console.log(game.makeMove(1, 3));
console.log(game.makeMove(3, 0));
console.log(game.makeMove(1, 4));
console.log(game.makeMove(4, 0));
console.log(game.makeMove(1, 5));
console.log(game.makeMove(5, 0));
console.log(UI.getBoardState());
