"use strict";

$(function() {
    $('#btn_startGame').click(function() {
        saveGameConfigInLocalStorage();
    });
    location.search.split("=").pop()

    $('#signInBtn').click(function() {
        saveLoginInLocalStorage();
    });
    // showGameConfigFromLocalStorage();

    // var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
    // console.log("login: " + loginName)
    // console.log("config: " + gameConfig.name)
    // if (gameConfig == null) {
    //     gameConfig = {}
    // } else {
    //     showGameConfigFromLocalStorage();
    // };
});
// *****     end of onload function     ******


// ***** SESSION STORAGE ***** //

// function saveLoginInSessionStorage() {
//     loginName = $('#userName').val();
//     var loginEmail = $('#userMail').val();
//     sessionStorage.setItem('login', JSON.stringify({ "name": loginName, "email": loginEmail }));
// }

// ***** LOCAL STORAGE ***** //

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
    console.log(gameConfig);
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));

}

function saveLoginInLocalStorage() {
    var loginName = "";
    loginName = $('#userName').val();
    localStorage.setItem('login', JSON.stringify({ "name": loginName }));
}

// function showGameConfigFromLocalStorage() {
//     var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
//     var login = JSON.parse(localStorage.getItem('login'))
//     console.log("login " + login.name, "config: " + GameConfig.name)
//     if (gameConfig == null) {
//         gameConfig = [];
//     } else {
//         $('#naamSpeler').val(gameConfig.name)
//         parseInt($('#numberOfRows').val(gameConfig.rows));
//         parseInt($('#numberOfCols').val(gameConfig.cols));
//         parseInt($('#numberOfMines').val(gameConfig.mines));
//     }
// }