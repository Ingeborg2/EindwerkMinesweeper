// "use strict";
// var counter = 0;
// var counterStop = 0;
// var stopTimer;
// var board1;


// $(function() {
//     $('#btn_startGame').click(function() {
//         clearInterval(stopTimer);
//         resetTimer();
//         stopTimer = setInterval(countTime, 1000);
//     });

//     $('#btn_restart').click(function() {
//         $('#game').css('display', 'block');
//         $('#gameInterrupted').css('display', 'none');
//         $(this).hide();
//         $('#btn_pause').show();
//         stopTimer = setInterval(countTime, 1000);
//         $('#btn_restart').hide();
//         $('#btn_pause').show();
//     });

//     $('#btn_pause').click(function() {
//         $('#gameInterrupted').css('display', 'block');
//         $('#game').css('display', 'none');
//         $(this).hide();
//         $('#btn_restart').show()
//         timeOnGameStop();
//     });
// }); // *****     end of onload function     ******

// function timeOnGameStop() {
//     clearInterval(stopTimer);
//     counterStop = counter;
//     $('#time').val(counterStop)
//     return counterStop;
// }

// function countTime() {
//     if (board.gameStart) {
//         counter++;
//         $('#clock').html(showCounterInMinutesAndSeconds(counter));
//         $('#btn_pause').show();
//     }
// }

// function resetTimer() {
//     counter = 0;
// }

// function showCounterInMinutesAndSeconds(counter) {
//     var minutes = Math.floor(counter / 60);
//     var seconds = counter - minutes * 60;
//     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
// }

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
