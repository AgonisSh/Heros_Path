import Phaser from 'phaser';
import GameSceneLvl1 from "./scenes/GameSceneLvl1";
import BootScene from "./scenes/BootScene";

const config =  {
    type: Phaser.AUTO,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}
        }
    },
    scale: {
        mode : Phaser.Scale.RESIZE,
        parent: 'phaser-example',
        width: '100%',
        height: '100%'
    },
    scene: [
        BootScene,
        GameSceneLvl1
    ]
};

const game = new Phaser.Game(config);