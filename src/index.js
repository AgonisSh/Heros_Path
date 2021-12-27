import Phaser from 'phaser';
import Game from "./Game";
import BootScene from "./BootScene";

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
        Game
    ]
};

const game = new Phaser.Game(config);