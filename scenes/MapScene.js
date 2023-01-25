import { Bullet } from "./Bullet.js"

class Enemy {
	static GOAL = {
		LEFT: 0,
		RIGHT: 1,
	}

	constructor(scene) {
		this.scene = scene
		scene.physics.add.sprite(200, 450, 'boat');

		this.goal = Enemy.GOAL.LEFT;
	}
}

export class MapScene extends Phaser.Scene {
	constructor() {
		super("map-scene")

		this.towns = [
			{
				bounds: new Phaser.Geom.Circle(500, 180, 33),
				name: "jia-ching",
				color: 0x008b8b,
			},
			{
				bounds: new Phaser.Geom.Circle(320, 320, 33),
				name: "tan-chon",
				color: 0xaa0000,
			}
		]
	}

	preload() {
		//image assets
		this.load.image('boat', 'assets/boat01enlarged.png');
		this.load.image('map', 'assets/map800x600.png');
		this.load.image('particle', 'assets/particles/wake.png');
		this.load.image('bullet', 'assets/bullet.png');
		//ui elements
		// this.load.image('panel', 'assets/ui/sizepanel.png');
		// this.load.image('notifications', 'assets/ui/notifications.png');
		
		//sprite sheet assets
		this.load.spritesheet('boatAnimated',
			'assets/boat01keyframe.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//loading in music
		this.load.audio("ocean", 'assets/sounds/oceanwaves.mp3');
	}

	create() {

		// Add 2 groups for Bullet objects
		// playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		// enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
				
		this.sound.add("ocean", {loop: true});

		this.add.image(0,0, 'map').setOrigin(0,0); //for some reason you need to place the image half of the original  height and width
		// this.add.image(0,0, 'panel').setOrigin(0,0); //ui set
		// this.add.image(318+165, 54+493, 'notifications'); //wtf
		var particles = this.add.particles('particle');

		//particles emitter
		var emitter = particles.createEmitter({
			speed: 15,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD'
		});

		//original logo turned into boat
		var drone = this.physics.add.image(400, 100, 'boat');
		drone.setSize(54, 16, true);

		drone.setVelocity(10, 20);
		drone.setBounce(1, 1);
		drone.setCollideWorldBounds(true);
		
		// drone.setSize(drone.width, drone.height, true); //attempting to set bounding box to correct size
		
		emitter.startFollow(drone);
		

		//adding in player
		
		
		this.player = this.physics.add.sprite(100, 450, 'boat');
		this.player.setSize(54, 16, true);
		this.player.setBounce(0.1);
		this.player.setCollideWorldBounds(true);
		//attempting to set bounding box to correct size
		// this.player.setSize(this.player.width, this.player.height, true);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.physics.add.collider(this.player, drone);

		this.input.keyboard.once('keydown-SPACE', function(event) {
			this.scene.start("town-scene")
		}, this)

		//uncomment to hear the ocean
		// ocean.play();

		// make clickable circles for the .bounds of the town objects
		this.towns.forEach((town, i) => {
			this.towns[i].graphics = this.add.graphics({fillStyle: {color: town.color}})
			town.graphics.fillCircleShape(town.bounds)
			town.graphics.setInteractive(town.bounds, Phaser.Geom.Circle.Contains)
			town.graphics.on("pointerdown", function() {
				alert(`${town.name} clicked`);
			})
		})

		// let new_boat = new Enemy(this)
		let new_boat = new Bullet(this)

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
			this.player.body.angularVelocity = -75;
		}
		else if (this.cursors.right.isDown) {
			this.player.body.angularVelocity = 75;
		}
		else {
			this.player.body.angularVelocity = 0;
		}

	}
}