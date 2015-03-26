var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CapraSideScroller;
(function (CapraSideScroller) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
        }
        Game.prototype.preload = function () {
            this.game.time.advancedTiming = true;
        };

        Game.prototype.create = function () {
            this.map = this.game.add.tilemap('level1');

            this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

            this.backgroundLayer = this.map.createLayer('backgroundLayer');
            this.blockedLayer = this.map.createLayer('blockedLayer');

            this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');

            this.backgroundLayer.resizeWorld();

            this.createCoins();

            this.player = this.game.add.sprite(100, 300, 'player');

            this.game.physics.arcade.enable(this.player);

            this.player.body.gravity.y = 1000;

            var playerDuckImg = this.game.cache.getImage('playerDuck');

            this.duckedDimensions = {
                width: playerDuckImg.width,
                height: playerDuckImg.height
            };

            this.standDimensions = {
                width: this.player.width,
                height: this.player.height
            };

            this.player.anchor.setTo(0.5, 1);

            this.game.camera.follow(this.player);

            this.cursors = this.game.input.keyboard.createCursorKeys();

            this.coinSound = this.game.add.audio('coin');
        };

        Game.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);

            if (this.player.alive) {
                this.player.body.velocity.x = 300;

                if (this.cursors.up.isDown) {
                    this.playerJump();
                } else if (this.cursors.down.isDown) {
                    this.playerDuck();
                }

                if (!this.cursors.down.isDown && this.isDucked && !this.pressingDown) {
                    this.player.loadTexture('player');
                    this.player.body.setSize(this.standDimensions.width, this.standDimensions.height);
                    this.isDucked = false;
                }

                if (this.player.x >= this.game.world.width) {
                    this.game.state.start('Game');
                }
            }
        };

        Game.prototype.findObjectsByType = function (type, map, layerName) {
            var result = [];

            map.objects[layerName].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });

            return result;
        };

        Game.prototype.createFromTiledObject = function (element, group) {
            var sprite = group.create(element.x, element.y, element.properties.sprite);

            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        };

        Game.prototype.playerHit = function (player, blockedLayer) {
            if (player.body.blocked.right) {
                this.player.alive = false;

                this.player.body.velocity.x = 0;

                this.player.loadTexture('playerDead');

                this.game.time.events.add(1500, this.gameOver, this);
            }
        };

        Game.prototype.collect = function (player, collectable) {
            this.coinSound.play();

            collectable.destroy();
        };

        Game.prototype.createCoins = function () {
            this.coins = this.game.add.group();
            this.coins.enableBody = true;
            var result = this.findObjectsByType('coin', this.map, 'objectsLayer');
            result.forEach(function (element) {
                this.createFromTiledObject(element, this.coins);
            }, this);
        };

        Game.prototype.gameOver = function () {
            this.game.state.start('Game');
        };

        Game.prototype.playerJump = function () {
            if (this.player.body.blocked.down) {
                this.player.body.velocity.y -= 700;
            }
        };

        Game.prototype.playerDuck = function () {
            this.player.loadTexture('playerDuck');
            this.player.body.setSize(this.duckedDimensions.width, this.duckedDimensions.height);

            this.isDucked = true;
        };

        Game.prototype.render = function () {
        };
        return Game;
    })(Phaser.State);
    CapraSideScroller.Game = Game;
})(CapraSideScroller || (CapraSideScroller = {}));
