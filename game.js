import { TownScene } from "./scenes/TownScene.js"
import { MapScene } from "./scenes/MapScene.js"


var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			// gravity: { y: 20 }
		}
	},
	scene: [MapScene, TownScene]
};

var game = new Phaser.Game(config);
