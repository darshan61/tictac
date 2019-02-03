/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

var grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var visited = [];
let withComputer = true;
let gameClosed = false;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        const tempVisited = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
            tempVisited.push(false);
        }
        grid.push(tempArray);
        visited.push(tempVisited);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    if (!gameClosed){
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        hideMessage();
        setCells(colIdx, rowIdx, turn, withComputer);
        renderMainGrid();
        addClickHandlers();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
    var reset = document.getElementById("reset");
    reset.addEventListener('click',onResetClick, false);
}

function setCells(colIdx,rowIdx,turn, withComputer){
 if(visited[colIdx][rowIdx] === true || isgridFull()){
        // alert("This cell is already taken or game is finished, please try a different cell or reset the game");
        showMessage("This cell is already taken or game is finished, please try a different cell or reset the game");
        return false;
    }
    // hideMessage();
    visited[colIdx][rowIdx] = true;
    let newValue = 0;
    if(turn === 'X'){
        newValue = 1;
        grid[colIdx][rowIdx] = newValue;
    }else if(turn === 'O' && !withComputer){
        newValue = 2;
        grid[colIdx][rowIdx] = newValue;
    }
    renderMainGrid();
    if (isGameWon()){
        showMessage("Player "+ turn + " has won the game");
        endGame();
    };
    // console.log(turn);
    if (withComputer && !isGameWon()){
        setRandomCell();
        renderMainGrid();
        turn = toggle(turn);
        if (isGameWon()){
            showMessage("Player "+ turn +" has won the game");
            endGame();
        };
    }
    if(isgridFull()){
        showMessage("Game has been completed without any winner, please try again");   
        endGame();
    }
    turn = toggle(turn);
}

function toggle(turn){
    return turn === 'X'? 'O':'X';
}

function showMessage(message){
        document.getElementById("message").textContent = message;
        document.getElementById("message").style.display = "";
}

function hideMessage(){
    document.getElementById("message").style.display = "none";
}

function isGameWon(){
let won = false;
    if ((grid[0][0]!=0 && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) ||    
        (grid[0][0]!=0 && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) ||   
        (grid[0][0]!=0 && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) ||   
        (grid[1][0]!=0 && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) ||   
        (grid[2][0]!=0 && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) ||   
        (grid[0][1]!=0 && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) ||   
        (grid[0][2]!=0 && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) ||
        (grid[0][2]!=0 && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0])             
        )
        won = true;
    return won;
}

function isgridFull(){
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if(visited[colIdx][rowidx] === false)
                return false;
        }
    }
    return true;
}

function setRandomCell(){
    // debugger;
    var col = Math.floor(Math.random()* GRID_LENGTH);
    var row = Math.floor(Math.random()* GRID_LENGTH);
    if(visited[col][row] === true && !isgridFull()){
        setRandomCell();
    }else {
        visited[col][row] = true;
        grid[col][row] = 2;
        return;
    }
}

function endGame(){
    gameClosed = true;
}

function onResetClick(){
    reset();
}

function reset(){
    grid = [];
    visited = [];
    turn = 'X';
    gameClosed = false;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
    hideMessage();
}

reset();
// initializeGrid();
// renderMainGrid();
// addClickHandlers();

