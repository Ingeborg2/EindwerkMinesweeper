'use strict';

var counter = 0;
var counterStop = 0;
var stopTimer;
var board1;
var board;


$(document).ready(function() {
        /////////sterren////////////////
        var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        for (var i = 0; i < 200; i++) {
            var randClass = Math.floor(Math.random() * 10);
            var randLeft = Math.floor(Math.random() * document.body.clientWidth);
            var randTop = Math.floor(Math.random() * height);
            $('.background').append('<div class="star f' + randClass + '" style=" z-index: 0 ; top:' + randTop + 'px;left:' + randLeft + 'px;"></div>');
        }
        // $('#btn_startGame').addClass('verschijn2')
        //////////LOCAL STORAGE////////////
        var form = $("#frm");

        $('#naamSpeler').change(function() {
            getInfoNotLoggedInPlayer();
        });

        showGameConfigFromLocalStorage();
        clickfunctie();

        ////////////////MINESWEEPER GENERATE/////////////////
        $('#btn_startGame').click(function() {
            if ($('#numberOfMines').val() <= ($('#numberOfCols').val() * $('#numberOfRows').val()) - 1) {
                form.validate()
                if (form.valid()) {
                    saveGameConfigInLocalStorage();
                    vulTabel();
                    $('#clock').hide()
                    $('.winOverlay').hide();
                    $('.lostOverlay').hide();
                    $('#undiscoveredMines').html(board.undiscovered())
                    $('.clockMines').css('display', 'block');
                    $('.formbutton').hide();
                    $('.topplayers').hide();
                    $('#game').show();
                    $('.knoppendiv').show();
                    $('.atagBox1').css('visibility', 'visible');
                    $('.atagBox2').css('visibility', 'visible');
                    clearInterval(stopTimer);
                    resetTimer();
                    stopTimer = setInterval(countTime, 1000);
                }
            } else {
                console.log('teveel mijnen')
                $('#numberOfMines').val('');
                $('#numberOfMines').attr('placeholder', 'too many mines').css('color', 'red');
            }

        })
        $('#tableBody').bind('contextmenu', function(e) { return false })

        $('#btn_restart').click(function() {

            $('#game').css('display', 'block');
            $('#gameInterrupted').css('display', 'none');
            $(this).hide();
            $('#btn_pause').show();
            stopTimer = setInterval(countTime, 1000);
            $('#btn_restart').hide();
            $('#btn_pause').show();
        });

        $('#btn_pause').click(function() {
            $('#gameInterrupted').css('display', 'block');
            $('#pauseimage').addClass('pauseanimate');
            $('#game').css('display', 'none');
            $(this).hide();
            $('#btn_restart').show()
            timeOnGameStop();
        });

        ////// show start button //////

        $('input').on('blur', function() {
            if ($("#frm").valid()) {
                if ($('#numberOfCols').val() != 0 && $('#numberOfRows').val() != 0 && $('#numberOfMines').val() != 0) {
                    $('#btn_startGame').addClass('verschijn2')
                } else {
                    console.log('hallo')
                    $('input').on('keyup', function() {
                        if ($('#numberOfCols').val() != 0 && $('#numberOfRows').val() != 0 && $('#numberOfMines').val() != 0) {
                            $('#btn_startGame').addClass('verschijn2')
                        }
                    })
                }
            }
        });

        $('#reconfig').click(function() {
            $('#game').css('display', 'none');
            $('#gameInterrupted').hide();
            $('#btn_restart').hide();
            $('#btn_pause').hide();
            $('.formbutton').show();
            $('.topplayers').show();
            $('.clockMines').hide();
            $('.knoppendiv').hide();
        })

        $('#newGame').click(function() {
            resetTimer();
            if (form.valid()) {
                $('#btn_restart').hide();
                $('#btn_pause').hide();
                $('.winOverlay').hide();
                $('.lostOverlay').hide();
                $('#gameInterrupted').hide();
                $('.atagBox1').show();
                $('#btn2').hide()
                $('.middleBtns').show()
                $('.atagBox2').removeClass('col-md-offset-5');
                saveGameConfigInLocalStorage();
                vulTabel();
                $('#undiscoveredMines').html(board.undiscovered())
                $('.clockMines').css('display', 'block');
                $('#clock').hide()
                $('.formbutton').hide();
                $('.topplayers').hide();
                $('#game').show();
                $('.knoppendiv').show();
                $('.atagBox1').css('visibility', 'visible');
                $('.atagBox2').css('visibility', 'visible');
                clearInterval(stopTimer);
                resetTimer();
                stopTimer = setInterval(countTime, 1000);
            }

        })



        /////// Rumble ///////
        $('#rumble').jrumble({
            x: 10,
            y: 10,
            rotation: 1
        });

        $('#btnTest').click(function() {
            //alert("ok");

        });

        $("#spaceship").addClass('spaceship')
    }) ///////////////END OF WINDOW ONLOAD/////////////////

//////////////FUNCTIONS LOCAL STORAGE/////////////
function saveGameConfigInLocalStorage() {
    var name = $('#naamSpeler').val();
    var cols = parseInt($('#numberOfCols').val());
    var rows = parseInt($('#numberOfRows').val());
    var mines = parseInt($('#numberOfMines').val());
    var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
    if (gameConfig == null) {
        gameConfig = [];
    }
    var spelerObj = {
        name: name,
        rows: rows,
        cols: cols,
        mines: mines
    }
    var gevonden = false;
    for (var i = 0; i < gameConfig.length && gevonden == false; i++) {
        if (gameConfig[i].name == name) {
            gevonden = true;
            gameConfig[i].rows = rows;
            gameConfig[i].cols = cols;
            gameConfig[i].mines = mines;
        }
    }
    if (gevonden == false) {
        gameConfig.push(spelerObj);
    }
    //console.log(gameConfig);
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
}

function showGameConfigFromLocalStorage() {
    var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
    var login = JSON.parse(localStorage.getItem('login'));
    if (gameConfig == null) {
        gameConfig = [];
    } else if (login != null) {
        for (var i = 0; i < gameConfig.length; i++) {
            if (login.name == gameConfig[i].name) {
                $('#naamSpeler').val(gameConfig[i].name);
                parseInt($('#numberOfRows').val(gameConfig[i].rows));
                parseInt($('#numberOfCols').val(gameConfig[i].cols));
                parseInt($('#numberOfMines').val(gameConfig[i].mines));
            }
        }
    }
}

function getInfoNotLoggedInPlayer() {
    var prefilled = false;
    var naam = $('#naamSpeler').val();
    var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
    if (gameConfig == null) {
        gameConfig = [];
    } else {
        for (var i = 0; i < gameConfig.length; i++) {
            if (naam == gameConfig[i].name) {
                prefilled = true;
                //alert("test geslaagd");
                $('#numberOfRows').val(gameConfig[i].rows);
                $('#numberOfCols').val(gameConfig[i].cols);
                $('#numberOfMines').val(gameConfig[i].mines);
            }
        }
    }

    if (!prefilled) {
        $('#numberOfRows').val(10);
        $('#numberOfCols').val(10);
        $('#numberOfMines').val(10);
    }
};

function clickfunctie() {
    $('#btn_players').click(function() {

        var name = $('#naamSpeler').val();
        var rows = parseInt($('#numberOfRows').val());
        var cols = parseInt($('#numberOfCols').val());
        var mines = parseInt($('#numberOfMines').val());
        var querystring = "?"

        $('#topspeler').addClass('tableopacity')
        $('#hidebutton').removeClass('buttonhide')
        $('#topspeler').show()
        if ($('.listitem')) {
            $('.listitem').remove()
        }

        if (name != "") {
            querystring += 'name=' + name + '&'
        }

        if (rows != "" && cols != "" && mines != "") {
            querystring += 'rows=' + rows + '&cols=' + cols + '&mines=' + mines
        } else {
            querystring.slice(0, querystring.length - 1)
        }

        if (querystring == "?") {
            querystring = ""
        }

        $.ajax({
            // publieke open dataset opvragen
            url: "http://127.0.0.1:8081/spelers" + querystring,
            dataType: "json", //parse returned JSON
            crossDomain: true,
            success: function(json) {
                $.each(json, function(k, v) {
                    createShowable(k, v);
                    // for (var i = 0; i < v.score.length; i++) {
                    //     $("#topspeler").append($('<tr>').attr('class', 'listitem').html("<td>" + v.score[i].name + "</td> <td>" + v.rows + "</td><td>" + v.cols + "</td><td>" + v.score[i].time + "</td><td>" + v.mines + "</td><td>" + v.score[i].date + "</td>"))
                    // }
                });
            },

            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);

            }
        })
    })

    function createShowable(index, v) {
        $('#tableBody2').append($('<tr>').attr('id', 'package' + index).attr('class', 'accordion-toggle listitem').attr('data-toggle', 'collapse')
            .attr('data-parent', '#topPlayerOverview').attr('data-target', '.packageDetails' + index)
            .html("<td>" + v.rows + "</td><td>" + v.cols + "</td><td>" + v.mines +
                "</td><td><i class='indicator glyphicon glyphicon-chevron-down pull-right'></i></td> "))
        createShowableForPlayer(index, v);
        showRowsWhenClickedOnShowable(index);
    }

    function createShowableForPlayer(index, v) {
        $('#tableBody2').append($('<tr class="listitem item"><td colspan="4" class="hiddenRow">' +
            '<div class="accordion-body collapse packageDetails' + index + '" id="accordion' + index +
            '"><table class="showable-table-part">' + createRowsForShowable(v) +
            '</table></div></td></tr>'))
    }

    function createRowsForShowable(v) {
        var result = "";
        for (var i = 0; i < v.score.length; i++) {
            result += "<td>" + v.score[i].name + "</td> <td>" + v.score[i].time + " sec" + "</td><td>" + v.score[i].date + "</td><td>&nbsp;</td></tr>"
        }
        return result;
    }

    function showRowsWhenClickedOnShowable(index) {
        $('#accordion' + index).on('shown.bs.collapse', function() {
            $("#package" + index + " i.indicator").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        });
        $('#accordion' + index).on('hidden.bs.collapse', function() {
            $("#package" + index + " i.indicator").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        });
    }

    $('#btn2').click(function() {
        var name = $('#naamSpeler').val();
        var rows = parseInt($('#numberOfRows').val());
        var cols = parseInt($('#numberOfCols').val());
        var mines = parseInt($('#numberOfMines').val());
        var time = counterStop;
        var gegevens = { name: name, rows: rows, cols: cols, mines: mines, time: time }

        $.post("http://127.0.0.1:8081/spelers", gegevens,
            function(data, status) {
                alert("Data: " + data.message + "\nStatus: " + data.status);
            });
    });
}

function vulTabel() {
    var cols = +$('#numberOfCols').val()
    var rows = +$('#numberOfRows').val()
    var mines = +$('#numberOfMines').val()
    board = new Board(cols, rows, mines)
    $('#tableBody').html('')
    for (var x = 0; x < rows; x++) {
        $('#tableBody').append($('<tr>').attr('id', x))
        for (var y = 0; y < cols; y++) {
            $('#' + x).append($('<td>').append($('<button>', { id: x + '-' + y, href: '#', type: 'button', class: 'mineBtn', click: onLeft, contextmenu: onRight }).val(' ')))
        }
    }
}

function onLeft() {
    var id = this.id
    var n = id.indexOf('-')
    var x = +id.substr(0, n)
    var y = +id.substr(n + 1)
    board.onLeftClick(x, y)
    for (var i = 0; i < board.board.length; i++) {
        for (var j = 0; j < board.board[i].length; j++) {
            if (board.board[i][j].leftClick == true) {
                if (board.board[i][j].mine == true) {
                    $('#' + i + '-' + j).text('*')
                    $('#' + i + '-' + j).attr({ class: 'turned', disabled: true })
                } else {
                    $('#' + i + '-' + j).text(board.board[i][j].mineNeighbours)
                    switch (true) {
                        case $('#' + i + '-' + j).text() == '':
                            $('#' + i + '-' + j).css({ verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 1:
                            $('#' + i + '-' + j).css({ color: 'blue', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 2:
                            $('#' + i + '-' + j).css({ color: 'green', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 3:
                            $('#' + i + '-' + j).css({ color: 'yellow', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 4:
                            $('#' + i + '-' + j).css({ color: 'orange', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 5:
                            $('#' + i + '-' + j).css({ color: 'pink', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 6:
                            $('#' + i + '-' + j).css({ color: 'purple', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 7:
                            $('#' + i + '-' + j).css({ color: 'brown', verticalAlign: 'top' });
                            break;
                        case $('#' + i + '-' + j).text() == 8:
                            $('#' + i + '-' + j).css({ color: 'red', verticalAlign: 'top' });
                            break;
                    }
                    $('#' + i + '-' + j).attr({ class: 'turned', disabled: true })
                }
            }
        }
    }
    if (board.keepPlaying == false) {
        if (board.gameEnd == 'Boom!') {
            timeOnGameStop();
            $('.atagBox1').hide();
            $('.middleBtns').hide();
            $('.atagBox2').addClass('col-md-offset-5');
            // $('#btn_pause').hide()
            $('#rumble').trigger('startRumble');
            setTimeout(function() {
                $('#rumble').trigger('stopRumble');
            }, 1000);
            $('#playExplosion').get(0).play();
            $('#tableBody').find('button').attr('disabled', 'disabled');
            $('#btn_pause').css('display', 'none');
            $('.lostOverlay').show();
            console.log('U heeft op een mijn geklikt, u bent verloren!');
        } else {
            timeOnGameStop()
            $('#frm').validate()
            $('.submitBtn').css('display', 'inline');
            $('#btn_pause').css('display', 'none');
            $('.winOverlay').show();
            $('#tableBody').find('button').attr('disabled', 'disabled');
            console.log('U heeft alle mijnen opgeruimd, u bent gewonnen!');
            $('#playTaDa').get(0).play();
        }
    }



}

function onRight() {
    var id = this.id
    var n = id.indexOf('-')
    var x = id.substr(0, n)
    var y = id.substr(n + 1)
    board.onRightClick(x, y)
    $('#undiscoveredMines').html(board.undiscovered())
        // $('#' + id).text(board.board[x][y].flagState[board.board[x][y].rightClick])
        // $('#' + id).css('background-image', 'url('+ board.board[x][y].flagState[board.board[x][y].rightClick]+')')
    $('#' + id).html("<img src='" + board.board[x][y].flagState[board.board[x][y].rightClick] + "' style='height: 20px; width: 15px; vertical-align: top;'>")
    if (board.keepPlaying == false) {
        // if (board.gameEnd == 'Boom!'){
        //     timeOnGameStop()
        //     $('#tableBody').find('button').attr('disabled','disabled');
        //     console.log('U heeft op een mijn geklikt, u bent verloren!')
        // } else {
        timeOnGameStop()
        $('#frm').validate();
        $('.submitBtn').css('display', 'inline');
        $('#btn_pause').css('display', 'none');
        $('.winOverlay').show();
        $('#playTaDa').get(0).play();
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
////////////TIMER/////////////
function timeOnGameStop() {
    clearInterval(stopTimer);
    counterStop = counter;
    $('#time').val(counterStop)
    return counterStop;
}

function countTime() {
    if (board.gameStart) {
        counter++;
        $('#clock').show();
        $('#clock').html(showCounterInMinutesAndSeconds(counter));
        $('#btn_pause').show();

    }
}

function resetTimer() {
    counter = 0;
}

function showCounterInMinutesAndSeconds(counter) {
    var minutes = Math.floor(counter / 60);
    var seconds = counter - minutes * 60;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

///// overlays /////
function openWinOverlay() {
    $('.winOverlay').css({ visibility: 'visible', opacity: 1 });
    // document.getElementById("overlay").style.opacity = 1;
}