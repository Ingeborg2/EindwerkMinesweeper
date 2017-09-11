'use strict';

$(document).ready(function() {
    /////////sterren////////////////
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    for (var i = 0; i < 200; i++) {
        var randClass = Math.floor(Math.random() * 10);
        var randLeft = Math.floor(Math.random() * document.body.clientWidth);
        var randTop = Math.floor(Math.random() * height);
        $('body').append('<div class="star f' + randClass + '" style="top:' + randTop + 'px;left:' + randLeft + 'px;"></div>');
    }
    //////spaceman animate///////
    animateDiv();
    //////////signin button////////////
    $('#signInBtn').click(function() {
        $('#signInFrm').validate()
        if ($('#signInFrm').valid()) {
            window.location.href = "home.html";
        }
    })

    //////////login animation//////////////
    $('.form-control').addClass('animation')
    $('#signInBtn').addClass('animate2')
    $('h2').addClass('animate3')
    $('label').addClass('animate4')

    ////////////SAVE LOGIN LOCAL STORAGE///////////
    $('#signInBtn').click(function() {
        saveLoginInLocalStorage();
    })

})


///////////////SPACEMAN POSITIE////////////
function makeNewPosition(){
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 100;
    var w = $(window).width() - 75;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('#spaceman').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('#spaceman').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
	$('#spaceman').addClass('rotated');
    
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = 0.05;
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
}

function saveLoginInLocalStorage() {
    var loginName = "";
    loginName = $('#userName').val();
    localStorage.setItem('login', JSON.stringify({ "name": loginName }));
}