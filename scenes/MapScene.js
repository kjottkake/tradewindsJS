export class MapScene extends Phaser.Scene {
	constructor() {
		super("map-scene")
	}

	preload() {
		//image assets
		this.load.image('boat', 'assets/boat01enlarged.png');
		this.load.image('map', 'assets/map.png');
		this.load.image('particle', 'assets/particles/wake.png');

		//sprite sheet assets
		this.load.spritesheet('boatAnimated',
			'assets/boat01keyframe.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//loading in music
		this.load.audio("ocean", 'assets/sounds/oceanwaves.mp3');
	}

	create() {
		this.sound.add("ocean", {loop: true});

		this.add.image(320, 320, 'map'); //for some reason you need to place the image half of the original  height and width

		var particles = this.add.particles('particle');

		//particles emitter
		var emitter = particles.createEmitter({
			speed: 15,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD'
		});

		//original logo turned into boat
		var logo = this.physics.add.image(400, 100, 'boat');


		logo.setVelocity(10, 20);
		logo.setBounce(1, 1);
		logo.setCollideWorldBounds(true);
		
		logo.setSize(logo.width, logo.height, true); //attempting to set bounding box to correct size
		emitter.startFollow(logo);


		//adding in player
		
		
		this.player = this.physics.add.sprite(100, 450, 'boat');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		//attempting to set bounding box to correct size
		this.player.setSize(this.player.width, this.player.height, true);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.physics.add.collider(this.player, logo);

		this.input.keyboard.once('keydown-SPACE', function(event) {
			this.scene.start("town-scene")
		}, this)

		//uncomment to hear the ocean
		// ocean.play();

	}

	update(time, delta) {
		if (this.cursors.up.isDown) {
			this.physics.velocityFromRotation(
				this.player.rotation + 4.7123, 
				10, 
				this.player.body.acceleration
			); //player.rotation + angle in radians of sprite
			// player.setVelocityY(-16);
		}
		else {
			this.player.body.acceleration.set(0);
		}

		if (this.cursors.left.isDown) {
			this.player.body.angularVelocity = -15;
		}
		else if (this.cursors.right.isDown) {
			this.player.body.angularVelocity = 75;
		}
		else {
			this.player.body.angularVelocity = 0;
		}

	}
}