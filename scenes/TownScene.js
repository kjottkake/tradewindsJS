export class TownScene extends Phaser.Scene {
	constructor() {
		super("town-scene")
	}

	preload() {
		// TODO replace with town asset
		this.load.image("town", "assets/town.png")
		this.load.image("panel", "assets/ui/sidepaneluismall.png");
	}

	create() {
		
		this.add.image(640, 320, "town");
		this.add.image(0,0, 'panel').setOrigin(0,0); //ui set
		this.add.image(318+165, 54+493, 'notifications'); //wtf

		this.input.keyboard.once('keydown-SPACE', function(event) {
			this.scene.start("map-scene")
		}, this)
	}

	update(time, delta) {
		
	}
}