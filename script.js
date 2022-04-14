getNewEmptyBoard = () => new Array(INDEX_ROW).fill(0).map(() => new Array(INDEX_COLUMN).fill(0))

const boardElement = document.getElementById("board")
document.getElementById("btn").onclick = async () => {
    document.getElementById("btn").innerText = !state ? "PAUSA" : "INIZIA"
    state = !state
    console.log(state)
    await displayElements()
}

let INDEX_ROW = 10
let INDEX_COLUMN = 10
let BOARD = getNewEmptyBoard(INDEX_ROW, INDEX_COLUMN);
let state = false

setGrid()
updateCells(BOARD, INDEX_ROW, INDEX_COLUMN)

function updateCells(board, indexR, indexC) {
    deleteChildren()
    for (let r = 0; r < indexR; r++)
        for (let c = 0; c < indexC; c++){
            let cell = document.createElement("div")
            cell.onclick = () => setCellsState(cell, r, c)
            if (board[r][c] == 0) cell.className = "dead"
            else if(board[r][c] == 1) cell.className = "alive"
            boardElement.appendChild(cell)
        }
}

function setCellsState(cell, r, c) {
    cell.className = (cell.className == "dead") ? "alive" : "dead"
    BOARD[r][c] = (BOARD[r][c] == 0) ? 1 : 0
}

function newGeneration(oldBoard, indexR, indexC){
    let newBoard = getNewEmptyBoard()
    for (let row = 0; row < indexR; row++)
        for (let column = 0; column < indexC; column++){
            let neighbours = neighboursCounter(oldBoard, indexR-1, indexC-1, row, column)
            let cell = oldBoard[row][column]

            if(cell == 1 && (neighbours < 2 || neighbours > 3))
                newBoard[row][column] = 0
            else if(cell == 0 && neighbours == 3)
                newBoard[row][column] = 1
            else
                newBoard[row][column] = oldBoard[row][column]
        }

    return newBoard
}

function neighboursCounter(board, indexR, indexC, r, c) {
    let neighbours = 0
    if(r > 0){
        if(c > 0 && board[r-1][c-1] == 1)  neighbours += 1
        if(board[r-1][c] == 1)  neighbours += 1
        if(c < indexC && board[r-1][c+1] == 1) neighbours += 1
    }

    if(c > 0 && board[r][c-1] == 1) neighbours += 1
    if(c < indexC && board[r][c+1] == 1) neighbours += 1

    if(r < indexR) {
        if(c > 0 && board[r+1][c-1] == 1) neighbours += 1
        if(board[r+1][c] == 1) neighbours += 1
        if(c < indexC && board[r+1][c+1] == 1) neighbours += 1
    }
    return neighbours
}

function setGrid() {
    INDEX_ROW = eval(document.getElementById("row").value)
    INDEX_COLUMN = eval(document.getElementById("columns").value)
    boardElement.style.gridTemplateRows = `repeat(${INDEX_ROW}, 40px)`
    boardElement.style.gridTemplateColumns = `repeat(${INDEX_COLUMN}, 40px)`
    console.log(`impostato su ${INDEX_ROW}x${INDEX_COLUMN} (RIGHExCOLONNE)`)

    BOARD = getNewEmptyBoard(INDEX_ROW, INDEX_COLUMN)
    updateCells(BOARD, INDEX_ROW, INDEX_COLUMN)
}

async function displayElements() {
    while(state) {
        BOARD = newGeneration(BOARD, INDEX_ROW, INDEX_COLUMN)
        updateCells(BOARD, INDEX_ROW, INDEX_COLUMN)
        await sleep(500)
    }
}

function deleteChildren() {
    let first = boardElement.firstElementChild;
    while (first) {
        first.remove();
        first = boardElement.firstElementChild;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
