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
        stopTimer = setInterval(countTime, 1000);
    });

    $('#btn_pause').click(timeOnGameStop);

    showGameConfigFromLocalStorage();
}); // *****     end of onload function     ******



function timeOnGameStop() {
    clearInterval(stopTimer);
    counterStop = counter;
    $('#time').val(counterStop)
    return counterStop;
    // to do hide game
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
    counter++;
    $('#clock').html(showCounterInMinutesAndSeconds(counter));
}

function resetTimer() {
    counter = 0;
}

function showCounterInMinutesAndSeconds(counter) {
    var minutes = Math.floor(counter / 60);
    var seconds = counter - minutes * 60;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

