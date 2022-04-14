getNewEmptyBoard = () => new Array(INDEX_ROW).fill(0).map(() => new Array(INDEX_COLUMN).fill(0))

let INDEX_ROW = 15
let INDEX_COLUMN = 30
let BOARD = getNewEmptyBoard()

const boardElement = document.getElementById("board")
boardElement.style.gridTemplateRows = `repeat(${INDEX_ROW}, 50px)`
boardElement.style.gridTemplateColumns = `repeat(${INDEX_COLUMN}, 50px)`
updateCells(BOARD, INDEX_ROW, INDEX_COLUMN)

function updateCells(board, indexR, indexC) {
    deleteChildren()
    for (let r = 0; r < indexR; r++)
        for (let c = 0; c < indexC; c++){
            let cell = document.createElement("div")
            if (board[r][c] == 0) cell.className = "dead"
            else if(board[r][c] == 1) cell.className = "alive"
            else alert(board[r][c])
            boardElement.appendChild(cell)
        }
}

function displayElements() {
    console.clear()
    BOARD = newGeneration(BOARD, INDEX_ROW, INDEX_COLUMN)
    updateCells(BOARD, INDEX_ROW, INDEX_COLUMN)
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

function deleteChildren() {
    let first = boardElement.firstElementChild;
    while (first) {
        first.remove();
        first = boardElement.firstElementChild;
    }
}
