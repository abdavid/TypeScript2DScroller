module CapraSideScroller {


	export class Boot extends Phaser.State {

		public preload() {
			this.load.image('preloadbar', 'assets/images/preloader-bar.png');
		}

		public create() {
			this.game.stage.backgroundColor = '#fff';
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.state.start('Preload');
		}
	}

}