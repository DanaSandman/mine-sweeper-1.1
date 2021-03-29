'use strict'

const MINE = '💣'

var gMines = []

function createMine(x, y) {

    for (var i = 0; i < gLevel.MINES; i++) {
        var num1 = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var num2 = getRandomIntInclusive(0, gLevel.SIZE - 1)
        if (num1 === x && num2 === y) {
            num1 = getRandomIntInclusive(0, gLevel.SIZE - 1)
            num2 = getRandomIntInclusive(0, gLevel.SIZE - 1)
        }
        if (gMines > 0) {
            for (var j = 0; j < gMine.length; j++) {
                if (num1 === mine.location.i && num1 === mine.location.i)
                    num1 = getRandomIntInclusive(0, gLevel.SIZE - 1)
                num2 = getRandomIntInclusive(0, gLevel.SIZE - 1)
            }
        }
        var mine = {
            location: {
                i: num1,
                j: num2
            }
        }
        gBoard[mine.location.i][mine.location.j].isMine = true
        renderBoard(gBoard[mine.location.i][mine.location.j])
        gMines.push(mine)
    }
    console.log(gMines)
}