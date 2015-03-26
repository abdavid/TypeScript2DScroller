var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CapraSideScroller;
(function (CapraSideScroller) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadbar', 'assets/images/preloader-bar.png');
        };

        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = '#fff';
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preload');
        };
        return Boot;
    })(Phaser.State);
    CapraSideScroller.Boot = Boot;
})(CapraSideScroller || (CapraSideScroller = {}));
