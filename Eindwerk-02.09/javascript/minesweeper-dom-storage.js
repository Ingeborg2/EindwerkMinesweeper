"use strict";

$(function() {
    $('#btn_startGame').click(function() {
        saveGameConfigInLocalStorage();
    });

    $('#signInFrm').click(function() {
        saveLoginInSessionStorage();
    });
    var login = $('#userName').val();
    var config = $('#naamSpeler').val();
    if (login == config) {
        showGameConfigFromLocalStorage();
    }
}); // *****     end of onload function     ******

// ***** SESSION STORAGE ***** //

function saveLoginInSessionStorage() {
    var loginName = $('#userName').val();
    var loginEmail = $('#userMail').val();
    sessionStorage.setItem('login', JSON.stringify({ "name": loginName, "email": loginEmail }));
}

// ***** LOCAL STORAGE ***** //

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