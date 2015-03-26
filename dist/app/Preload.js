var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CapraSideScroller;
(function (CapraSideScroller) {
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            _super.apply(this, arguments);
        }
        Preload.prototype.preload = function () {
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
            this.preloadBar.anchor.setTo(0.5);
            this.preloadBar.scale.setTo(3);

            this.load.setPreloadSprite(this.preloadBar);

            this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');

            this.load.image('player', 'assets/images/player.png');
            this.load.image('playerDuck', 'assets/images/player_duck.png');
            this.load.image('playerDead', 'assets/images/player_dead.png');

            this.load.image('goldCoin', 'assets/images/goldCoin.png');
            this.load.audio('coin', 'assets/audio/coin.wav');
        };

        Preload.prototype.create = function () {
            this.game.state.start('Game');
        };
        return Preload;
    })(Phaser.State);
    CapraSideScroller.Preload = Preload;
})(CapraSideScroller || (CapraSideScroller = {}));
