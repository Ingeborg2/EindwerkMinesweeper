"use strict";
var loginName;

$(function() {
    $('#btn_startGame').click(function() {
        saveGameConfigInLocalStorage();
    });
    location.search.split("=").pop()

    $('#signInBtn').click(function() {
        saveLoginInSessionStorage();
        console.log("loginName: " + loginName);
        console.log($('#userName').val());
        //var login = location.search.split("=").pop();
    });
    var gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
    console.log("login: " + loginName)
    console.log("config: " + gameConfig.name)
    if (gameConfig == null) {
        gameConfig = {}
    } else {
        showGameConfigFromLocalStorage();

        //showGameConfigFromLocalStorage();
    };
});
// *****     end of onload function     ******


// ***** SESSION STORAGE ***** //

//function saveLoginInSessionStorage(elem) {
function saveLoginInSessionStorage() {
    //console.log(elem);
    loginName = $('#userName').val();
    var loginEmail = $('#userMail').val();
    sessionStorage.setItem('login', JSON.stringify({ "name": loginName, "email": loginEmail }));
    //location.href = elem.href + "?name=" + sessionStorage.getItem("login.name");
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