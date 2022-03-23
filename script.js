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
var rotation = 0;
for (let y = 0; y < spielfeldsize; y++) {
    feld[y] = [];
    for (let x = 0; x < spielfeldsize; x++) {
        var nextnummer = Math.round(Math.random());
        if (nextnummer == 1) {
            feld[y][x] = nextnummer;
        }
    }
}

var player = {
    x: 1,
    y: 2,
    img: new Image(),

    //score: 0,
    setPlayer: function() {
        feld[this.y][this.x] = 2;
    },
    liftPlayer: function() {
        feld[this.y][this.x] = 0;
    },
    movePlayer: function(dx, dy) {
        /**Das ergibt alles keinen Sinn
         * help
         * me
         */
        if (freiesFeld(player.x + dx, player.y + dy)) {
            player.liftPlayer();
            player.x += dx;
            player.y += dy;
            player.setPlayer();
        }
    },
    punchFeind: function(dx, dy) {
        var zielx = this.x + dx;
        var ziely = this.y + dy;
        if (feindFeld(zielx, ziely)) {
            console.log("punch");
            score++;
            //feld[zielx][ziely] = 0;
            feld[this.y + dy][this.x + dx] = 0;
        }
    },
    digGold: function() {
        if (feld[this.y + dy][this.x + dx] == 3) {
            this.score++;
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

//var figur = new Image();
player.img.src = "Skeleton test.png";


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


function freiesFeld(x, y) {
    if (y >= 0 && y < feld.length && x >= 0 && x < feld[y].length) {
        return (feld[y][x] <= 0);
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
            if (feld[i][j] == 0) //normale weg_normal
            {
                weg_normalDraw(isoX, isoY);
            }
            if (feld[i][j] == 1) //Hindernis
            {
                weg_geradeDraw(isoX, isoY);
            }
            if (feld[i][j] == 2) //Spielplayer
            {
                playerDraw(isoX, isoY);
            }
            if (feld[i][j] == 3) //Feind
            {
                feindDraw(isoX, isoY);
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

function weg_normalDraw(isoX, isoY) {
    context.drawImage(weg_normal, 62 + rotation, 0, 62, weg_normal.height, isoX + 40, isoY - 10, 62, weg_normal.height);
}

function weg_geradeDraw(isoX, isoY) {
    //context.drawImage(weg_gerade, 49 + rotation, 0, 49, weg_gerade.height, isoX + 40, isoY - 10, 49, weg_gerade.height);
    weg_normalDraw(isoX, isoY);
}

function playerDraw(isoX, isoY) {
    weg_normalDraw(isoX, isoY);
    let drawFrameX = 0;
    for (let i = 0; i < animtcount; i++) {
        drawFrameX = drawFrameX + 24;
    }
    context.drawImage(player.img, 24 + drawFrameX, 0, 24, player.img.height, isoX + 40, isoY - 10, 24, player.img.height);
}

function feindDraw(isoX, isoY) {
    weg_normalDraw(isoX, isoY);
    let drawFrameX = 0;
    for (let i = 0; i < animtcount; i++) {
        drawFrameX = drawFrameX + 24;

    }
    context.drawImage(feindIdel.img, 24 + drawFrameX, 0, 24, feindIdel.img.height, isoX + 40, isoY - 10, 24, feindIdel.img.height);

}

function update() {
    counter++;
}

window.onkeydown = function(e) {
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