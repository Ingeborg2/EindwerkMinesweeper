'use strict';
function Board(cols, rows, mines) {
    this.cols = cols;
    this.rows = rows;
    this.mines = mines;
    this.board = [];
    this.keepPlaying = true;
    this.gameEnd = '';
    this.buildBoard();
    this.gameStart = false;
}

function FieldObj() {
    this.mine = false;
    this.leftClick = false;
    this.rightClick = 0;
    this.mineNeighbours = '';
};

Board.prototype.undiscovered = function(){
    var undiscovered = this.mines
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            if (this.board[x][y].rightClick == '1'){
                undiscovered--
            }
        }
    }
    return undiscovered
}

Board.prototype.onRightClick = function(row, col) {
    this.gameStart = true;
    this.board[row][col].onRightClick()
    this.checkWin();
}

Board.prototype.onLeftClick = function(row, col) {
    this.gameStart = true;
    if (this.board[row][col].leftClick == false) {
        this.board[row][col].onLeftClick()
        if (!this.board[row][col].mine) {
            if (this.board[row][col].mineNeighbours == 0) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (!(dx == 0 && dy == 0)) {
                            if ((row + dx <= this.rows - 1) && (row + dx >= 0) && (col + dy <= this.cols - 1) && (col + dy >= 0)) {
                                this.onLeftClick(row + dx, col + dy)
                            }
                        }
                    }
                }
            }
            this.checkWin()
        } else {
            this.onNextTurn('Game Over');
        }
    }

}
Board.prototype.checkWin = function(){
    var countLeftClicks = 0;
    var countFlags = 0;
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            if (this.board[x][y].leftClick == true){
                countLeftClicks++
            } else if (this.board[x][y].flagState[this.board[x][y].rightClick] == 'V'){
                countFlags++
            } 
        }
    }
    if ((this.rows*this.cols)-this.mines == countLeftClicks && countFlags == this.mines){
        this.onNextTurn('Win');
    } else {
        this.onNextTurn('nextMove');
    }
}

FieldObj.prototype.flagState = [' ', 'images/questionMark.png', 'images/questionMark.png'];

FieldObj.prototype.onLeftClick = function() {
    this.leftClick = true;
}

FieldObj.prototype.onRightClick = function() {
    this.rightClick++
        if (this.rightClick == 3) {
            this.rightClick = 0
        }
}

Board.prototype.buildBoard = function(cols, rows, mines) {
    this.board = [];
    for (var x = 0; x < this.rows; x++) {
        this.board.push([])
        for (var y = 0; y < this.cols; y++) {
            this.board[x].push(new FieldObj());
        }
    }
    for (var i = 0; i < this.mines; i++) {
        var x, y;
        do {
            x = Math.floor(Math.random() * this.rows);
            y = Math.floor(Math.random() * this.cols);
        } while (this.board[x][y].mine == true)
        this.board[x][y].mine = true;
    }
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            if (this.board[x][y].mine == true) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (!(dx == 0 && dy == 0)) {
                            if ((x + dx <= this.rows - 1) && (x + dx >= 0) && (y + dy <= this.cols - 1) && (y + dy >= 0)) {
                                if (this.board[x + dx][y + dy] != this.mine) {
                                    if (this.board[x + dx][y + dy].mineNeighbours == '') {
                                        this.board[x + dx][y + dy].mineNeighbours = 0
                                    }
                                    this.board[x + dx][y + dy].mineNeighbours++
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

Board.prototype.makeStringBoard = function() {
    var string = '';
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            if (this.board[x][y].leftClick) {
                if (this.board[x][y].mine) {
                    string += ' * '
                } else {
                    string += ' ' +this.board[x][y].mineNeighbours+ ' '
                }
            } else {
                string += ' '+this.board[x][y].flagState[this.board[x][y].rightClick]+ ' '
            }
        }
        string += '\n'
    }
    return string.substr(0, string.length - 1);
}

Board.prototype.onNextTurn = function(result){
    switch(true){
        case (result == 'Game Over'):   this.keepPlaying = false;
                                        this.gameEnd = 'Boom!';
                                        break;
        case (result == 'Win'):         this.keepPlaying = false;
                                        this.gameEnd = 'Win'
                                        break;
        case (result == 'nextMove'):    this.keepPlaying = true;
                                        break;

    }

}



// *** Enkel voor console tests ****

// var toetsenbord = require("readline-sync");

// var cols = +toetsenbord.question('geef aantal kolommen: ');
// var rows = +toetsenbord.question('geef aantal rijen: ');
// var mines = +toetsenbord.question('geef aantal mijnen: ');

// function procClick() {
//     var clickResult = askClick()
//     var row = clickResult.row;
//     var col = clickResult.col;
//     var click = clickResult.click;
//     if (click == 'R') {
//         board1.onRightClick(row, col)
//     }
//     if (click == 'L') {
//         board1.onLeftClick(row, col)
//     }
// }

// function askClick() {
//     do {
//         var col = +toetsenbord.question('welke kolom: ') - 1;
//     } while (col > cols || col < 0)
//     do {
//         var row = +toetsenbord.question('welke rij: ') - 1;
//     } while (row > rows || row < 0)
//     var click = toetsenbord.question('Linker- (L) of rechtermuisklik (R) ?: ')
//     var clicked = {
//         col: col,
//         row: row,
//         click: click
//     }
//     return clicked
// }

// var board1 = new Board(cols, rows, mines)
// console.log(board1.makeStringBoard()); 
// do {
//     procClick()
//     console.log(board1.makeStringBoard()); 
// } while (board1.keepPlaying == true)
// if (board1.gameEnd == 'Boom!'){
//     console.log('U heeft op een mijn geklikt, u bent verloren!')
// } else {
//     console.log('U heeft alle mijnen opgeruimd, u bent gewonnen!')
// }


