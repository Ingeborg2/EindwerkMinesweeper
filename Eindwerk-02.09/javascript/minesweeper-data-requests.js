 'use strict';

 ////////////////// POST EN GET OP SERVER ///////////////////////////////////
 
         $('#btn').click(function () {
             $('#btn_startGame').addClass('verschijn2')
 
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
                 success: function (json) {
                     $.each(json, function (k, v) {
                         $("#topspeler").append($('<tr>').attr('class', 'listitem').html("<td>" + v.name + "</td> <td>" + v.rows + "</td><td>" + v.cols + "</td><td>" + v.time + "</td><td>" + v.mines + "</td>"))
                     });
                 },
 
                 error: function (XMLHttpRequest, textStatus, errorThrown) {
                     console.log("Status: " + textStatus);
                     console.log("Error: " + errorThrown);
 
                 }
             })
         })
 
         $(document).ready(function () {
             var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
                 document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
             for (i = 0; i < 200; i++) {
                 var randClass = Math.floor(Math.random() * 10);
                 var randLeft = Math.floor(Math.random() * document.body.clientWidth);
                 var randTop = Math.floor(Math.random() * height);
                 $('body').append('<div class="star f' + randClass + '" style="top:' + randTop + 'px;left:' + randLeft + 'px;"></div>');
 
             }
         })