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
		// this.add.image("panel");
		this.add.image(320, 320, "town");

		this.input.keyboard.once('keydown-SPACE', function(event) {
			this.scene.start("map-scene")
		}, this)
	}

	update(time, delta) {
		
	}
}