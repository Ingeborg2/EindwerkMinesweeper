'use strict';
var kaartboek = new Speelkaartenboek();
var hand = new Hand();
var dealerHand = new Hand();
var teller = 0;
window.onload = function() {
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    for (var i = 0; i < 200; i++) {
        var randClass = Math.floor(Math.random() * 10);
        var randLeft = Math.floor(Math.random() * document.body.clientWidth);
        var randTop = Math.floor(Math.random() * height);
        $('.background').append('<div class="star f' + randClass + '" style=" z-index: 0; top:' + randTop + 'px;left:' + randLeft + 'px;"></div>');
    }
    document.getElementById("btnGeefKaart").onclick = geefKaart;
    document.getElementById("btnInzet").onclick = inzetten;
    document.getElementById("btnSchud").onclick = stoppenEnSchudden;
    document.getElementById("stackVeld").value = 200;
    kaartboek.schud();

}

function geefKaart() {
    var volgKaart = kaartboek.volgendeKaart();
    var kaart = document.createElement("img");
    var punten = document.getElementById("puntenPar");
    // var winst = document.getElementById("winstPar");
    hand.voegKaartToe(volgKaart);
    kaart.src = volgKaart.afbeelding;
    kaartenDiv.appendChild(kaart);
    punten.innerHTML = "U heeft " + hand.punten() + ".";
    if (kaartboek.isLeeg()) {
        document.getElementById("btnGeefKaart").disabled = true;
        document.getElementById("dekAchterkant").className = "leeg";
    }
    if (hand.isBlackjack()) {
        stoppenEnSchudden();
    }
    if (hand.magStoppen()) {
        // punten.innerHTML = "U heeft " + hand.punten() + ".";
        document.getElementById("btnSchud").disabled = false;
    }
    if (hand.isKapot()) {
        document.getElementById("btnGeefKaart").disabled = true;
        // punten.innerHTML = "U heeft " + hand.punten() + ".";
        verliesSchrijven();
        document.getElementById("btnSchud").disabled = false;
    }
    teller++
}

function stoppenEnSchudden() {
    dealerSpeelt();
    winstOpnemen();
    document.getElementById("btnSchud").disabled = true;
    document.getElementById("dealerDekAchterkant").className = "";
    hand = new Hand();
    dealerHand = new Hand();
    if (teller > 40) {
        kaartboek.schud();
        teller = 0;
    }


}

function inzetten() {
    var tafelSpeler = document.getElementById("kaartenDiv");
    var tafelDealer = document.getElementById("dealerKaartenDiv");
    var inzet = +document.getElementById("inzetVeld").value;
    var stack = +document.getElementById("stackVeld").value;
    var puntenSpeler = document.getElementById("puntenPar");
    var puntenDealer = document.getElementById("dealerPuntenPar");
    var winst = document.getElementById("winstPar");
    puntenSpeler.innerHTML = "";
    puntenDealer.innerHTML = "";
    winst.innerHTML = "";
    winst.classList.remove('bounceIn');
    inzetInfo.innerHTML = "";
    if (inzet > stack) {
        return inzetInfo.innerHTML = "Uw stack is te klein, geef een lagere inzet."
    }
    if (inzet < 10) {
        return inzetInfo.innerHTML = "Uw inzet is te laag. Minimum inzet is 10."
    }
    stack -= inzet;

    while (tafelSpeler.firstChild) {
        tafelSpeler.removeChild(tafelSpeler.firstChild);
    }
    while (tafelDealer.firstChild) {
        tafelDealer.removeChild(tafelDealer.firstChild);
    }

    document.getElementById("stackVeld").value = stack;
    document.getElementById("btnGeefKaart").disabled = false;
    document.getElementById("btnInzet").disabled = true;
    document.getElementById("btnSchud").disabled = true;
}

function winstOpnemen() {
    var inzet = +document.getElementById("inzetVeld").value;
    var stack = +document.getElementById("stackVeld").value;
    var winst = 0;
    if (hand.factor == 3) {
        winst = hand.factor() * inzet;
        winstSchrijven();
    } else {
        if (hand.factor() > dealerHand.factor()) {
            winst = hand.factor() * inzet;
            winstSchrijven();
        } else {
            verliesSchrijven();
        }
    }
    stack += winst;
    if (stack == 0) {
        document.getElementById("btnGeefKaart").disabled = true;
        return document.getElementById("stackVeld").value = "BANKROET !!!"
    }
    document.getElementById("btnGeefKaart").disabled = true;
    document.getElementById("btnInzet").disabled = false;
    document.getElementById("stackVeld").value = stack;
}

function dealerSpeelt() {
    while (dealerHand.magStoppen() == false) {
        var volgKaart = kaartboek.volgendeKaart();
        var kaart = document.createElement("img");
        var dealerPunten = document.getElementById("dealerPuntenPar");
        dealerHand.voegKaartToe(volgKaart);
        kaart.src = volgKaart.afbeelding;
        dealerKaartenDiv.appendChild(kaart);
    }
    dealerPunten.innerHTML = "De dealer heeft " + dealerHand.punten() + ".";
}

function winstSchrijven() {
    var winst = document.getElementById("winstPar");
    winst.classList.add('bounceIn');
    winst.innerHTML = "U krijgt uw inzet " + hand.factor() + " keer terug.";
}

function verliesSchrijven() {
    var winst = document.getElementById("winstPar");
    winst.classList.add('bounceIn');
    winst.innerHTML = "Helaas, u hebt verloren, u bent uw inzet kwijt";
}