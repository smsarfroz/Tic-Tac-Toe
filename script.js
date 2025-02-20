/*
Gameboard object has gameboard array

players stored in objects 
object - to control the flow of the game 
minimum global code 
maximum inside factories
single instance - (gameboard, displayController etc) - wrap the factory 
inside an IIFE (module pattern) so it cannot be reused to create additional instances.

so, how to start this project ? well, how would project look like ? 

each cell is a button
factory is used to create multiple objects - so I can make one for creating
player1 and player2 
gameboard array has 6 button elements
and they will be arranged in some manner. 
like first three in 1st row
then next three in 2nd row
then next three in 3rd row 
and then what ? 

*/

function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i =0 ;i <3; ++i) {
        board[i] = [];
        for(let j =0 ;j<3; ++j) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => {
        board;
    };

    const resetBoard = () => {
        for(let i =0 ;i<rows ;++i) {
            for(let j =0;j<columns; ++j) {
                board[i][j].addToken('');
            }
        }
    };

    const printBoard = () => {
        console.log(board); 
    }

    const placeToken = (row, column, player) => {
        board[row][column].addToken(player);
    };

    return {getBoard, resetBoard, printBoard, placeToken};
}

function Cell() {
    let value = 0;
    const addToken = (player) => {
        value = player;
    };

    const getValue = () => {
        value;
    };

    return {addToken, getValue};
}   

function gameController(playerOneName = "player1",playerTwoName ="player2") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === players[0] ? players[1]: players[0]);
    };
    const getActivePlayer = () => {
        activePlayer;
    };

    const printNewRound = () => {
        board.printBoard();
    };

    let boardHere = board.getBoard();

}

const game = gameController();