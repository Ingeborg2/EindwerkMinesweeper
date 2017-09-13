'use strict';
const KLEUREN = ["harten", "klaveren", "schoppen", "ruiten"];
const WAARDES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "boer", "dame", "heer"];

function Speelkaart(kleur, waarde) {
    this.kleur = kleur;
    this.waarde = waarde;
    this.afbeelding = "images/blackjack_images/" + afbeeldingNaam(kleur, waarde);
}

Speelkaart.prototype.omschrijving = function() {
    return this.kleur + " " + this.waarde
}


function Speelkaartenboek() {
    this.speelkaarten = [];
    this.teller = 0;
    for (var i = 0; i < KLEUREN.length; i++) {
        for (var j = 0; j < WAARDES.length; j++) {
            this.speelkaarten.push(new Speelkaart(KLEUREN[i], WAARDES[j]));
        }
    }
}

Speelkaartenboek.prototype.isLeeg = function() {
    return this.teller == 52;
}

Speelkaartenboek.prototype.volgendeKaart = function() {
    var kaart = this.speelkaarten[this.teller];
    this.teller++;
    return kaart;
}

Speelkaartenboek.prototype.schud = function() {
    this.speelkaarten.sort(function(a, b) { return 0.5 - Math.random() })
    this.teller = 0;
}

function afbeeldingNaam(kleur, waarde) {
    var kleurAfbeelding;
    var waardeAfbeelding = WAARDES.indexOf(waarde) + 1
    var extensieAfbeelding = ".png";
    switch (kleur) {
        case KLEUREN[0]:
            kleurAfbeelding = "h";
            break;
        case KLEUREN[1]:
            kleurAfbeelding = "c";
            break;
        case KLEUREN[2]:
            kleurAfbeelding = "s";
            break;
        case KLEUREN[3]:
            kleurAfbeelding = "d";
    }
    return waardeAfbeelding + kleurAfbeelding + extensieAfbeelding;
}

function Hand() {
    this.kaartenInHand = [];
}

Hand.prototype.voegKaartToe = function(kaart) {
    this.kaartenInHand.push(kaart);
}

Hand.prototype.punten = function() {
    var punten = 0;
    var aas = 0;
    for (var i = 0; i < this.kaartenInHand.length; i++) {
        var waarde = WAARDES.indexOf(this.kaartenInHand[i].waarde) + 1;
        switch (waarde) {
            case 1:
                punten += 11;
                aas += 1;
                break;
            case 11:
            case 12:
            case 13:
                punten += 10;
                break;
            default:
                punten += waarde;
        }
        if (punten > 21 && aas > 0) {
            punten -= 10;
            aas -= 1;
        }
    }
    return punten
}

Hand.prototype.magStoppen = function() {
    var punten = this.punten();
    return punten >= 17;
}

Hand.prototype.isKapot = function() {
    var punten = this.punten();
    return punten > 21;
}

Hand.prototype.isBlackjack = function() {
    return this.punten() == 21;
}

Hand.prototype.factor = function() {
    var punten = this.punten();
    switch (punten) {
        case 21:
            return 3;
        case 20:
            return 2;
        case 19:
            return 1;
        case 18:
            return 0.75;
        case 17:
            return 0.5;
        default:
            return 0;
    }
}