let INDEX_ROW = 15
let INDEX_COLUMN = 30
let BOARD = new Array(INDEX_ROW).fill(0).map(() => new Array(INDEX_COLUMN).fill(0));


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
    let newBoard = new Array(INDEX_ROW).fill(0).map(() => new Array(INDEX_COLUMN).fill(0));
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
    let StringBoard = ""
    if(r > 0){
        if(c > 0) {
            if(board[r-1][c-1] == 1){
                neighbours += 1
                StringBoard += "."
            }
            else StringBoard += "#"
        } else StringBoard += " "

        if(board[r-1][c] == 1) {
            neighbours += 1
            StringBoard += "."
        } else StringBoard += "#"

        if(c < indexC)  {
            if(board[r-1][c+1] == 1){
                neighbours += 1
                StringBoard += "."
            }
            else StringBoard += "#"
        } else StringBoard += " "
    }
    else {
        StringBoard = (c > 0) ? StringBoard + "+" : StringBoard + " "
        StringBoard += "+"
        StringBoard = (c < indexC) ? StringBoard + "+" : StringBoard + " "
    }
    StringBoard += "\n"


    if(c > 0)  {
        if(board[r][c-1] == 1){
            neighbours += 1
            StringBoard += "."
        }
        else StringBoard += "#"
    } else StringBoard += " "
    StringBoard += "X"
    if(c < indexC)  {
        if(board[r][c+1] == 1){
            neighbours += 1
            StringBoard += "."
        }
        else StringBoard += "#"
    } else StringBoard += " "
    StringBoard += "\n"


    if(r < indexR) {
        if(c > 0)  {
            if(board[r+1][c-1] == 1){
                neighbours += 1
                StringBoard += "."
            }
            else StringBoard += "#"
        }else StringBoard += " "

        if(board[r+1][c] == 1)  {
            neighbours += 1
            StringBoard += "."
        }else StringBoard += "#"

        if(c < indexC)  {
            if(board[r+1][c+1] == 1){
                neighbours += 1
                StringBoard += "."
            }
            else StringBoard += "#"
        }else StringBoard += " "
    }
    else {
        StringBoard = (c > 0) ? StringBoard + "+" : StringBoard + " "
        StringBoard += "+"
        StringBoard = (c < indexC) ? StringBoard + "+" : StringBoard + " "
    }


    if(neighbours == 3)
        console.log(`${r}:${c}\n${neighbours}\n${StringBoard}`)
    return neighbours
}

function deleteChildren() {
    let first = boardElement.firstElementChild;
    while (first) {
        first.remove();
        first = boardElement.firstElementChild;
    }
}