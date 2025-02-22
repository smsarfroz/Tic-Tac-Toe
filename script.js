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
        return board;
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
        return value;
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
        return activePlayer;
    };
    
    const printNewRound = () => {
        board.printBoard();
    };

    let boardHere = board.getBoard();

    const checkWin = () => {
        //horizontal 
        //iterate first column
        for(let i=0;i<3;++i){
            const typeHere = boardHere[i][0].getValue();
            let timesRepeated = 0;
            for(let j=0;j<3; ++j) {
                if(boardHere[i][j].getValue() === typeHere) {
                    timesRepeated++;
                }
            }
            if(timesRepeated === 3 && typeHere!=''){
                return true;
            }
        }

        //vertical
        //iterate first row

        for(let j=0;j<3;++j) {
            const typeHere = boardHere[0][j].getValue();
            let timesRepeated = 0;
            for(let i=0;i<3;++i) {
                if(boardHere[i][j].getValue() === typeHere) {
                    timesRepeated++;
                }
            }

            if(timesRepeated === 3 && typeHere!='') {
                return true;
            }
        }

        //diagonals 

        {
            if(boardHere[0][0].getValue() === boardHere[1][1].getValue()){
                if(boardHere[1][1].getValue() === boardHere[2][2].getValue() && boardHere[2][2].getValue()!=''){
                    return true;
                }
            }
        }

        {
            if(boardHere[2][0].getValue() === boardHere[1][1].getValue()){
                if(boardHere[1][1].getValue() === boardHere[0][2].getValue() && boardHere[0][2].getValue()!=''){
                    return true;
                }
            }
        }
        return false;
    };

    const playRound = (row, column) => {
        console.log(`row = ${row}, column =${column}`);
        console.log('activeplayer');
        console.log(getActivePlayer());
        board.placeToken(row, column, getActivePlayer().token);

        if(checkWin()) {
            console.log(`${getActivePlayer().name} has won the round.`);
        }else {
            //check for tie condition

            let emptyCells = 0;
            for(let i=0;i<3;++i){
                for(let j=0;j<3;++j){
                    if(boardHere[i][j].getValue() == ''){
                        emptyCells++;
                    }
                }
            }   
            if(emptyCells === 0) {
                console.log("It's a tie!");
            }
        }

        switchPlayerTurn();
    };

    playRound(0,0);
    playRound(0,1);
    playRound(0,2);

    playRound(1,1);
    playRound(1,0);
    playRound(1,2);

    playRound(2,1);
    playRound(2,0);
    playRound(2,2);
    // printNewRound();
    return { playRound, printNewRound, getBoard: board.getBoard};
}

function screenController() {

}

const game = gameController();

