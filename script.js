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

function gameController(
    playerOneName = player1Name.value,
    playerTwoName = player2Name.value
) {
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
            const winnerMessage = document.querySelector(".winnerSection");
            winnerMessage.textContent = `${getActivePlayer().name} has won this round.`

            const button = document.querySelector(".playAgain");
            const winnerDialogue = document.querySelector("#winner");
            winnerDialogue.showModal();

            const handlePlayAgain = (e) => {
                e.preventDefault();
                board.resetBoard();
                ScreenController();
                winnerDialogue.close();
            }

            button.removeEventListener('click', handlePlayAgain);
            button.addEventListener('click', handlePlayAgain);
        }else {
            //check for tie condition

            const winnerDialogue = document.querySelector('#winner');

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

    // playRound(0,0);
    // playRound(0,1);
    // playRound(0,2);

    // playRound(1,1);
    // playRound(1,0);
    // playRound(1,2);

    // playRound(2,1);
    // playRound(2,0);
    // playRound(2,2);
    // printNewRound();
    return { playRound, printNewRound, getBoard: board.getBoard, getActivePlayer};
}

function ScreenController() {
    //what things do I have to do here ? 
    //I have to keep showing the which person's turn it is
    //and then what ? 
    //is screenController totally separate from the need of css and board clickable buttons ? 
    //what to do ? 
    const game = gameController();
    console.log("game");
    console.log(game);
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    
    const updateScreen = () => {

        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row,index1) => {
            row.forEach((cell, index2) => {
                //what is (cell,index) ?
                //index was only set for column in previous project
                //but here we have both row and column, so what to do
                //users gives those input
                //were they stored in the cell ? yes they were. where?
                //why did we set column as index ?
                //actually it can only be (cell,index) and nothing else
                //like (cell,row,column) is not possible
                //what is index here ? 
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                //wouldn't we set the cell's dimension or something ? 
                //or just store those values of dimension somewhere in it?
                //but how is that an indeal cell ?
                //is it necessary to store values of column and row in the cell ? 

                cellButton.dataset.row = index1;
                cellButton.dataset.column = index2;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);                
            });
        });
    };
    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        console.log(`button was clicked on ${selectedRow} , ${selectedColumn}`);
        //why are selectedRow, selectedColumn undefined now ? 
        //cuz maybe I didn't set their values correctly.

        //what if this cell has already been chosen before?
        //what to do ?
        //why is this cell value not accessible ? 

        console.log(board);
        // console.log(board[selectedRow][selectedColumn]);
        // console.log(board[selectedRow][selectedColumn].getValue());
        // console.log(`cell values for ${selectedRow},${selectedColumn} is ${board[selectedRow][selectedColumn].getValue()}`);
        //|| board[selectedRow][selectedColumn].getValue()!=0
        if(!selectedColumn || !selectedRow ) {
            return;
        }

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    };  
    boardDiv.addEventListener('click', clickHandlerBoard); 

    updateScreen();
}

const player1Name = document.getElementById("player_1");
const player2Name = document.getElementById("player_2");
const board = document.querySelector(".board");

function takeDetailsStartGame() {
  board.style.display = 'none';

  const button = document.getElementById("play");
  button.addEventListener('click',(e) =>{
    e.preventDefault();
    
    const mydialog = document.querySelector("dialog");
    mydialog.close();

    ScreenController();
    board.style.display = 'grid';
  });
}

takeDetailsStartGame();

