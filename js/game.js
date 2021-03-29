'use strict'

var gBoard;

var gClickLocation = {}
var glives = 0
var LIVES = `<img src="./imgs/lives.png">`
var MARK = '🚩'
var gmarkedCount = 0
var SMILEY = {
    normal: `<img src="./imgs/smiley.png">`,
    sad: `<img src="./imgs/sad.png">`,
    win: `<img src="./imgs/smileywin.png">`
}
var isMineNeighbor = false
var gNeighbors = []
var gStartTime = 0
var gCurrTime = 0
var gTime

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    // secsPassed: 0
}

var gLevel = {
    SIZE: 4,
    MINES: 2
};

function init() {

    if (glives === 0) {
        glives = 3
        clearInterval(gTime)
        gCurrTime = 0
        gStartTime = 0
        renderTime()
    }


    gGame.isOn = false
    gMines = []
    gBoard = buildBoard(gLevel.SIZE)
    gGame.shownCount = 0
    gClickLocation = {}
    gmarkedCount = 0
    smiley('normal')
    renderBoard()


}

function buildBoard(SIZE) {
    var board = [];

    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var CELL = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            for (var x = 0; x < gMines.length; x++) {
                if (gMines[x].location.i === i && gMines[x].location.j === j) {
                    CELL.isMine = true
                    CELL.isShown = false
                    break
                }
            }
            board[i][j] = CELL
        }
    }
    return board;
}

function setMinesNegsCount1(currCell, checkNegs) {
    var mineCount = 0;
    if (!gBoard[currCell.i][currCell.j].isMine) {
        for (var i = currCell.i - 1; i <= currCell.i + 1; i++) {
            console.log('Loop Start')
            for (var j = currCell.j - 1; j <= currCell.j + 1; j++) {

                if (i >= 0 && i < gBoard.length && j >= 0 && j < gBoard[i].length) {

                    if (gBoard[i][j].isMine) {
                        mineCount++
                        if (!checkNegs) {
                            isMineNeighbor = true
                            gNeighbors = []
                        }
                    } else {
                        if (!checkNegs && !isMineNeighbor) {
                            var neighb = {
                                i: i,
                                j: j
                            }
                            gNeighbors.push(neighb)
                            console.log("loop - ", i, j)
                        }
                    }
                }
            }
        }
        console.log('gNeighbors - ', gNeighbors)
    } else {

        for (var i = 0; i < gMines.length; i++) {

            gBoard[gMines[i].location.i][gMines[i].location.j].isShown = true
        }


    }
    return mineCount
}

function revealNegs() {
    console.log("gNeighbors.length - ", gNeighbors.length)

    for (var i = 0; i < gNeighbors.length; i++) {

        var minesAround = setMinesNegsCount1(gNeighbors[i], true)

        gBoard[gNeighbors[i].i][gNeighbors[i].j].minesAroundCount = minesAround
        gBoard[gNeighbors[i].i][gNeighbors[i].j].isShown = true

    }

    //     shownNeigCount = gNeighbors.length - 1
    // console.log('shownNeigCount' , shownNeigCount)
    //     gGame.shownCount += shownNeigCount
    //     console.log('gGame.shownCount' , gGame.shownCount)

    //     shownNeigCount = shownNeigCount - (gNeighbors.length - 1)
    //     console.log('shownNeigCount' , shownNeigCount)

    isMineNeighbor = false
    gNeighbors = []
}

function cellClicked(i, j) {

    clearInterval(gTime)
    gTime = setInterval(getTime, 1000)

    if (!gGame.isOn) {
        createMine(i, j)
        gGame.isOn = true
    }

    gClickLocation = {
        i: i,
        j: j,
    }

    var minesAround = setMinesNegsCount1(gClickLocation, false)

    gBoard[i][j].minesAroundCount = minesAround
    gBoard[i][j].isShown = true


    if (gNeighbors.length > 0) {
        revealNegs()
    }

    var count = 0;
    for (var x = 0; x < gLevel.SIZE; x++) {
        for (var y = 0; y < gLevel.SIZE; y++) {
            if (gBoard[x][y].isShown) {
                count++
            }
        }
    }

    gGame.shownCount += count - gGame.shownCount
    console.log('gGame.shownCount - ', gGame.shownCount)

    if (gBoard[i][j].isMine) {
        glives--
        renderBoard()
        if (!checkGameOver()) {
            setTimeout(function () {
                init();
            }, 1000);
        } else {
            renderBoard()
        }
    } else {
        gBoard[i][j].isShown = true
        checkWin()
        renderBoard()
    }
    isMineNeighbor = false
}

function renderBoard() {
    printMat(gBoard, ".board")
}

function cellMarkrd(i, j) {
    clearInterval(gTime)
    gTime = setInterval(getTime, 1000)
    gmarkedCount++
    gBoard[i][j].isMarked = true
    checkWin()
    renderBoard()

}

function checkWin() {
    var boardSize = gLevel.SIZE * gLevel.SIZE

    if (gmarkedCount == gLevel.MINES && gGame.shownCount === (boardSize - gLevel.MINES)) {
        console.log('win')
        smiley('win')
        setTimeout(function () {
            alert('WINNER');
        }, 500);

        clearInterval(gTime)
        gCurrTime = 0
        gStartTime = 0
        renderTime()
    }
}

function checkGameOver() {

    if (glives === 0) {
        smiley('sad')
        clearInterval(gTime)
        gCurrTime = 0
        gStartTime = 0
        renderTime()
        return true
    } else {
        return false
    }
}

function levelBtnClicked(size) {
    switch (size) {
        case 4:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break
        case 8:
            gLevel.SIZE = 8
            gLevel.MINES = 12
            break
        case 12:
            gLevel.SIZE = 12
            gLevel.MINES = 30
    }
    init()
}

function smiley(status) {
    switch (status) {
        case 'normal':
            renderSmiley(SMILEY.normal)
            break
        case 'sad':
            renderSmiley(SMILEY.sad)
            break
        case 'win':
            renderSmiley(SMILEY.win)
    }
}

function reset() {
    glives = 0
    init()
}

function getTime() {
    if (gStartTime === 0) {
        gStartTime = new Date()
    } else {
        gCurrTime = (new Date() - gStartTime) / 1000
    }
    renderTime()
}

function renderTime() {
    var strHTML = ''
    var elTime = document.querySelector('.time')
    strHTML = "Timer: " + gCurrTime
    elTime.innerHTML = strHTML

}