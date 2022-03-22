var feld = [[1,0,1,1],
			[0,0,0,1],
			[0,0,0,0],
			[0,0,1,0]];

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