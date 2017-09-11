'use strict'

$(document).ready(function () {
    $('#mineBtn').click(function () {
        window.location.href = "minesweeper.html";
    })
    $('#blackJackBtn').click(function () {
        window.location.href = "minesweeper.html";
    })
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    for (var i = 0; i < 200; i++) {
        var randClass = Math.floor(Math.random() * 10);
        var randLeft = Math.floor(Math.random() * document.body.clientWidth);
        var randTop = Math.floor(Math.random() * height);
        $('body').append('<div class="star f' + randClass + '" style="top:' + randTop + 'px;left:' + randLeft + 'px;"></div>');

    }
})

// $(document).ready(function () {
//     var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
//         document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
//     for (i = 0; i < 200; i++) {
//         var randClass = Math.floor(Math.random() * 10);
//         var randLeft = Math.floor(Math.random() * document.body.clientWidth);
//         var randTop = Math.floor(Math.random() * height);
//         $('body').append('<div class="star f' + randClass + '" style="top:' + randTop + 'px;left:' + randLeft + 'px;"></div>');

//     }
// });