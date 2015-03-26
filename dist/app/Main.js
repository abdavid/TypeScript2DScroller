var CapraSideScroller;
(function (CapraSideScroller) {
    var Game = new Phaser.Game(500, 320, Phaser.WEBGL, '');

    Game.state.add('Boot', CapraSideScroller.Boot);
    Game.state.add('Preload', CapraSideScroller.Preload);
    Game.state.add('Game', CapraSideScroller.Game);
    Game.state.start('Boot');
})(CapraSideScroller || (CapraSideScroller = {}));
