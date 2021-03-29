'use strict'

function printMat(mat, selector) {
    var btnClass = ''
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var className = `cell cell${i}-${j}`

            var shownInCell = ''

            if (mat[i][j].isMine && mat[i][j].isShown) {
                shownInCell = MINE
            } else if (mat[i][j].minesAroundCount >= 0 && mat[i][j].isShown) {
                shownInCell = `${mat[i][j].minesAroundCount}`

            } else if (mat[i][j].isMarked) {
                shownInCell = MARK
            }
            if (mat[i][j].isShown) {
                btnClass = 'boardClickedBtn'
            } else {
                btnClass = 'boardBtn'
            }

            strHTML += `<td class="${className}"><button class = "${btnClass}" onclick="cellClicked(${i},${j})" oncontextmenu="cellMarkrd(${i},${j})">${shownInCell}</button></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';

    var live = `${LIVES}${LIVES}${LIVES}`
    if (glives === 2) {
        live = `${LIVES}${LIVES}`
    } else if (glives === 1) {
        live = `${LIVES}`
    } else if (glives === 0) {
        live = `GAME OVER`
    }
    strHTML += `<h3 class="lives">${live}</h3>`
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderSmiley(smiley) {
    var strHTML = `<span onclick="reset()">${smiley}</span>`
    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = strHTML

}