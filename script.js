var feld = new Array();
/*var spielfeldsize = parseInt(prompt("bitte zahl", 15));
if (isNaN(spielfeldsize)) {
    spielfeldsize = 5;
}**/
var spielfeldsize = 5;

var pause = 0;
var score = 0;
var animtcount = 0;
var tileanimtcount = 0;
let rotationFeld = 1;
for (let y = 0; y < spielfeldsize; y++) {
    feld[y] = [];
    for (let x = 0; x < spielfeldsize; x++) {
        var nextnummer = Math.round(Math.random());
        //feld[y][x] = nextnummer;
        var rotationgen = getRandomInt(0,4);
        var gennummer = nextnummer + '' + rotationgen;
        console.log(gennummer);
        feld[y][x] = gennummer;
    }
}

var player = {
    x: 1,
    y: 2,
    img: new Image(),

    //score: 0,
    setPlayer: function () {
        let rotationPlayer;
        feld[this.y][this.x] = 2 /**+ rotationPlayer*/;
    },
    liftPlayer: function () {
        let rotationFeldNachPlayer;
        feld[this.y][this.x] = 0 /**+ rotationFeldNachPlayer*/;
    },
    movePlayer: function (dx, dy) {
        if (freiesFeld(player.x + dx, player.y + dy)) {
            player.liftPlayer();
            player.x += dx;
            player.y += dy;
            player.setPlayer();
        }
    },
    punchFeind: function (dx, dy) {
        var zielx = this.x + dx;
        var ziely = this.y + dy;
        if (feindFeld(zielx, ziely)) {
            console.log("punch");
            score++;
            //feld[zielx][ziely] = 0;
            feld[this.y + dy][this.x + dx] = 0;
        }
    }
}
var msg;
var indx = [0, 0];

/** Zähler für die game loop */
var counter = 0;

var weg_normal = new Image();
weg_normal.src = "weg_1.png";

var weg_gerade = new Image();
weg_gerade.src = "weg_gerade.png";
/**
var weg_normal = new Image();
weg_normal.src = "weg_1_big.png";

var weg_gerade = new Image();
weg_gerade.src = "weg_gerade_big.png";
*/
//player.img.src = "Skeleton test.png";
//player.img.src = "Ritter_Orange.png";
player.img.src = "Ritter_Gruen_smol.png";

//var offsetX = 25 * spielfeldsize;
var offsetX = 400;
var offsetY = 100;
var canvas, context;

function init() {
    canvas = document.getElementById("spielfeld");
    context = canvas.getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    //canvas.addEventListener("keydown", handleKeydown);
    canvas.focus();
    player.setPlayer(); // Spielerfigur auf Startposition setzen 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function freiesFeld(x, y) {
    if (y >= 0 && y < feld.length && x >= 0 && x < feld[y].length) {
        let tile = feld[y][x].toString().charAt(0);
        return (tile <= 0);
    } else {
        return false;
    }
}

function feindFeld(x, y) {
    if (feld[y][x] == 3) {
        //if ( y==3 && x==3 )
        console.log("Feind Feld: " + x + y);
        return true; //( feld[y][x] == 3 )
    } else {
        console.log("Feind Feld: " + x + y);
        return false;
    }
}

function zeichneFeld() {
    //console.log("gametick");
    animtcount++;
    if (animtcount > 9) {
        animtcount = 0;
    }
    tileanimtcount++;
    if (tileanimtcount > 2) {
        tileanimtcount = 0;
    }

        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < feld.length; i++)
            for (let j = 0; j < feld[i].length; j++) {
                let x = j * weg_normal.height + offsetX;
                let y = i * weg_normal.height + offsetY;
                let isoX = x - y + offsetX;
                let isoY = (x + y) / 2;

                rotationFeld = feld[i][j].toString().charAt(1);
                let tile = feld[i][j].toString().charAt(0);

                console.log("Rotation : " + rotationFeld);
                console.log("Tile : " + tile);
    
                if (tile == 0) //normale weg_normal
                {
                    weg_normalDraw(isoX, isoY, rotationFeld);
                }
                if (tile == 1) //Hindernis
                {
                    weg_geradeDraw(isoX, isoY, rotationFeld);
                }
                if (tile == 2) //Spielplayer
                {
                    playerDraw(isoX, isoY, rotationFeld);
                }
            }

    switch (pause) {
        case 0:
            update();
            setTimeout(zeichneFeld, 100);
            break;
        default:
            break;
    }
}

function weg_normalDraw(isoX, isoY, rotation) {
    let hohe = weg_normal.height;
    let weite = weg_normal.width / 4;
    //context.drawImage(weg_normal, 62 + rotation, 0, 62, weg_normal.height, isoX + 40, isoY - 10, 62, weg_normal.height);
    //context.drawImage(weg_normal, weg_normal.width / 4 * rotation, 0, weg_normal.width / 4, weg_normal.height, isoX + 40, isoY - 10, weg_normal.width / 4, weg_normal.height);
    context.drawImage(weg_normal, weite * rotation, 0, weite, hohe, isoX + 40, isoY - 10, weite, hohe);
}

function weg_geradeDraw(isoX, isoY, rotation) { /** Problemkind */
    //context.drawImage(weg_gerade, 62 + rotation, 0, 62, weg_gerade.height, isoX + 40, isoY - 10, 62, weg_gerade.height);
    //context.drawImage(weg_gerade, weg_normal.width/4 + rotation, 0, weg_normal.width/4, weg_gerade.height, isoX + 40, isoY - 10, weg_normal.width/4, weg_gerade.height);
    context.drawImage(weg_gerade, weg_normal.width / 4 * rotation, 0, weg_normal.width / 4, weg_gerade.height, isoX + 40, isoY - 21, weg_normal.width / 4, weg_gerade.height);
}

function playerDraw(isoX, isoY, rotation) {
    weg_normalDraw(isoX, isoY, rotation);
    //context.drawImage(player.img, 24 + drawFrameX, 0, 24, player.img.height, isoX + 40, isoY - 10, 24, player.img.height);
    context.drawImage(player.img, player.img.width / 4 * rotation, 0, player.img.width / 4, player.img.height, isoX + 85, isoY - 15, player.img.width / 4, player.img.height);
}

function update() {
    counter++;
}

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    switch (code) {
        default: break;
        //move
        case 87:
            player.movePlayer(0, -1);
            break;
        case 83:
            player.movePlayer(0, 1);
            break;
        case 68:
            player.movePlayer(1, 0);
            break;
        case 65:
            player.movePlayer(-1, 0);
            break;
        //punch
        case 104:
            player.punchFeind(0, -1);
            console.log("punchKey");
            break;
        case 98:
            player.punchFeind(0, 1);
            console.log("punchKey");
            break;
        case 102:
            player.punchFeind(1, 0);
            console.log("punchKey");
            break;
        case 100:
            player.punchFeind(-1, 0);
            console.log("punchKey");
            break;
    }
}