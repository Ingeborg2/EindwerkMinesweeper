"use strict";
var counter = 0;
var counterStop = 0;
var stopTimer;
var board1;


$(function() {
    $('#btn_startGame').click(function() {
        clearInterval(stopTimer);
        resetTimer();
        stopTimer = setInterval(countTime, 1000);
        saveGameConfigInLocalStorage();
    });

    $('#btn_restart').click(function() {
        $('#game').css('display', 'block' );
        $('#gameInterrupted').css('display', 'none' );
        $(this).hide();
        $('#btn_pause').show();
        stopTimer = setInterval(countTime, 1000);
        $('#btn_restart').hide();
        $('#btn_pause').show();
    });

    $('#btn_pause').click(function(){
        $('#gameInterrupted').css('display', 'block' );
        $('#game').css('display', 'none' );
        $(this).hide();
        $('#btn_restart').show()
        timeOnGameStop();
    })

    showGameConfigFromLocalStorage();
}); // *****     end of onload function     ******

function timeOnGameStop() {
    clearInterval(stopTimer);
    counterStop = counter;
    $('#time').val(counterStop)
    return counterStop;
}

function saveGameConfigInLocalStorage() {
    var name = $('#naamSpeler').val();
    var rows = parseInt($('#numberOfRows').val());
    var cols = parseInt($('#numberOfCols').val());
    var mines = parseInt($('#numberOfMines').val());
    localStorage.setItem('gameConfig', JSON.stringify({ "name": name, "rows": rows, "cols": cols, "mines": mines }));
}

function showGameConfigFromLocalStorage() {
    var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
    if (gameConfig == null) {
        gameConfig = {}
    } else {
        $('#naamSpeler').val(gameConfig.name)
        parseInt($('#numberOfRows').val(gameConfig.rows));
        parseInt($('#numberOfCols').val(gameConfig.cols));
        parseInt($('#numberOfMines').val(gameConfig.mines));
    }
}

function countTime() {
    if (board.gameStart){
        counter++;
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
