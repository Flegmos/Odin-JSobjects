const game = (() => {
    let gameBoard = [];
    let boardLength = 10;


    const resetBoard = (boardLength = 10) => {
        gameBoard = []
        for (let i = 0; i < boardLength; i++) {
            gameBoard[i] = []
            for (let j = 0; j < boardLength; j++) {
                gameboard[i][j] = null;
            }
        }
    };

    resetBoard();

    const getBoardState = () => {
        return [...gameBoard]
    };

    return {resetBoard};
})();

console.log(game.getBoardState());
game.resetBoard(5);
console.log(game.getBoardState());