module CapraSideScroller {


	export class Game extends Phaser.State {

		public player:Phaser.Sprite;
		public map:Phaser.Tilemap;
		public backgroundLayer:Phaser.TilemapLayer;
		public blockedLayer:Phaser.TilemapLayer;
		public cursors:Phaser.CursorKeys;
		public coinSound:Phaser.Sound;
		public coins:Phaser.Group;

		public pressingDown:boolean;
		public isDucked:boolean;
		
		public duckedDimensions:any;
		public standDimensions:any;

		public preload():void {
			this.game.time.advancedTiming = true;
		}

		public create():void {

			this.map = this.game.add.tilemap('level1');

			//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
			this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

			//create layers
			this.backgroundLayer = this.map.createLayer('backgroundLayer');
			this.blockedLayer = this.map.createLayer('blockedLayer');

			//collision on blockedLayer
			this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');

			//resizes the game world to match the layer dimensions
			this.backgroundLayer.resizeWorld();

			//create coins
			this.createCoins();

			//create player
			this.player = this.game.add.sprite(100, 300, 'player');

			//enable physics on the player
			this.game.physics.arcade.enable(this.player);

			//player gravity
			this.player.body.gravity.y = 1000;

			//properties when the player is ducked and standing, so we can use in update()
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

			//the camera will follow the player in the world
			this.game.camera.follow(this.player);

			//move player with cursor keys
			this.cursors = this.game.input.keyboard.createCursorKeys();

			//sounds
			this.coinSound = this.game.add.audio('coin');
		}

		public update():void {

			//collision
			this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
			this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);

			//only respond to keys and keep the speed if the player is alive
			if (this.player.alive) {
				this.player.body.velocity.x = 300;

				if (this.cursors.up.isDown) {
					this.playerJump();
				}
				else if (this.cursors.down.isDown) {
					this.playerDuck();
				}

				if (!this.cursors.down.isDown && this.isDucked && !this.pressingDown) {
					//change image and update the body size for the physics engine
					this.player.loadTexture('player');
					this.player.body.setSize(this.standDimensions.width, this.standDimensions.height);
					this.isDucked = false;
				}

				//restart the game if reaching the edge
				if (this.player.x >= this.game.world.width) {
					this.game.state.start('Game');
				}
			}
		}

		public findObjectsByType(type, map, layerName):any {
			var result = [];

			map.objects[layerName].forEach((element:any)=> {
				if (element.properties.type === type) {
					element.y -= map.tileHeight;
					result.push(element);
				}
			});

			return result;
		}

		public createFromTiledObject(element, group):void {
			var sprite = group.create(element.x, element.y, element.properties.sprite);

			//copy all properties to the sprite
			Object.keys(element.properties).forEach((key)=> {
				sprite[key] = element.properties[key];
			});
		}

		public playerHit(player, blockedLayer):void {
			//if hits on the right side, die
			if (player.body.blocked.right) {

				//set to dead (this doesn't affect rendering)
				this.player.alive = false;

				//stop moving to the right
				this.player.body.velocity.x = 0;

				//change sprite image
				this.player.loadTexture('playerDead');

				//go to gameover after a few miliseconds
				this.game.time.events.add(1500, this.gameOver, this);
			}
		}

		public collect(player, collectable):void {
			//play audio
			this.coinSound.play();

			//remove sprite
			collectable.destroy();
		}

		public createCoins():void {
			this.coins = this.game.add.group();
			this.coins.enableBody = true;
			var result = this.findObjectsByType('coin', this.map, 'objectsLayer');
			result.forEach(function (element) {
				this.createFromTiledObject(element, this.coins);
			}, this);
		}

		public gameOver():void {
			this.game.state.start('Game');
		}

		public playerJump():void {
			if (this.player.body.blocked.down) {
				this.player.body.velocity.y -= 700;
			}
		}

		public playerDuck():void {
			//change image and update the body size for the physics engine
			this.player.loadTexture('playerDuck');
			this.player.body.setSize(this.duckedDimensions.width, this.duckedDimensions.height);

			//we use this to keep track whether it's ducked or not
			this.isDucked = true;
		}

		public render():void {
			//this.game.debug.text(this.game.time.fps.toString() || '--', 20, 70, "#00ff00", "40px Courier");
			//this.game.debug.bodyInfo(this.player, 0, 80);
		}
	}

}