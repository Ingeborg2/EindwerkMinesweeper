'use strict';
$( document ).ready(function(){
    $('#btn_startGame').click(function(){
        vulTabel();
        $('#undiscoveredMines').html(board.undiscovered())
    })
    $('#tableBody').bind('contextmenu', function(e){return false})
})
var board;


function vulTabel() {
    var cols = +$('#numberOfCols').val()
    var rows = +$('#numberOfRows').val()
    var mines = +$('#numberOfMines').val()
    board = new Board(cols, rows, mines)
    $('#tableBody').html('')
    for (var x = 0; x < rows; x++) {
        $('#tableBody').append($('<tr>').attr('id', x))
        for (var y = 0; y < cols; y++) {
            $('#' + x).append($('<td>').append($('<button>', { id: x + '-' + y, href: '#', type: 'button', class: 'mineBtn', click: onLeft, contextmenu: onRight}).val(' ')))
        }
    }
}

function onLeft(){
    var id = this.id
    var n = id.indexOf('-')
    var x = +id.substr(0, n)
    var y = +id.substr(n + 1)
    board.onLeftClick(x, y)
    for (var i = 0; i < board.board.length; i++){
        for (var j = 0; j < board.board[i].length; j++){
            if (board.board[i][j].leftClick == true){
                if(board.board[i][j].mine == true){
                    $('#'+i+'-'+j).text('*')
                    $('#'+i+'-'+j).attr({class: 'turned', disabled: true})
                } else {
                    $('#'+i+'-'+j).text(board.board[i][j].mineNeighbours)
                    $('#'+i+'-'+j).attr({class: 'turned', disabled: true})
                }
            }
        }
    }
    if (board.keepPlaying == false){
        if (board.gameEnd == 'Boom!'){
            timeOnGameStop()
            $('#tableBody').find('button').attr('disabled','disabled');
            console.log('U heeft op een mijn geklikt, u bent verloren!')
        } else {
            timeOnGameStop()
            $('#frm').validate()
            $('.submitBtn').css('display', 'inline')
            console.log('U heeft alle mijnen opgeruimd, u bent gewonnen!')
        }
    }
   
        

}
function onRight(){
    var id = this.id
    var n = id.indexOf('-')
    var x = id.substr(0, n)
    var y = id.substr(n + 1)
    board.onRightClick(x,y)
    $('#undiscoveredMines').html(board.undiscovered())
    $('#'+id).text(board.board[x][y].flagState[board.board[x][y].rightClick])
    if (board.keepPlaying == false){
        // if (board.gameEnd == 'Boom!'){
        //     timeOnGameStop()
        //     $('#tableBody').find('button').attr('disabled','disabled');
        //     console.log('U heeft op een mijn geklikt, u bent verloren!')
        // } else {
            timeOnGameStop()
            $('#frm').validate()
            $('.submitBtn').css('display', 'inline')
            console.log('U heeft alle mijnen opgeruimd, u bent gewonnen!')
    }
    
        
}

function getFieldVal(e) {
    // $(this).mousedown(function(e){
    //     console.log(e.button)
    //     // if e.button == 0 => left click
    //     // if e.button == 2 => right click
    // })
    var id = this.id
    var n = id.indexOf('-')
    var x = id.substr(0, n)
    var y = id.substr(n + 1)
    // // var fieldVal = board[x][y] 
    // console.dir(board)
    // // rechts klik afhandelen
    // if (e.button == 2){
    //     console.log('rechts')
    //     this.onRightClick(x, y)
    // }

    // function vervangVelden(id) {
       
    //     $('#' + id).text(fieldVal).attr({ class: 'turned', disabled: true })
    //     if (fieldVal == '-') {
    //         for (var dx = -1; dx <= 1; dx++) {
    //             for (var dy = -1; dy <= 1; dy++) {
    //                 if (!(dx == 0 && dy == 0)) {
    //                     if ((x + dx <= row - 1) && (x + dx >= 0) && (y + dy <= col - 1) && (y + dy >= 0)) {
    //                         fieldVal = board[x + dx][y + dy]
    //                         console.log('***' + fieldVal)
    //                         id = (x + dx) + '-' + (y + dy)
    //                         vervangVelden(id)
    //                             // $('#'+(x+dx)+'-'+(y+dy)).text(fieldVal).attr({class: 'turned', disabled: true})   
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}