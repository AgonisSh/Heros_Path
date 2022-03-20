import Phaser from 'phaser';
import Game from "./scenes/Game";
import GameUI from "./scenes/GameUI";
import BootScene from "./scenes/BootScene";
import Menu from "./scenes/Menu";


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
        Game,
        GameUI,
        Menu
    ]
};

const game = new Phaser.Game(config);