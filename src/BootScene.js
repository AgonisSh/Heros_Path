import 'phaser';
import lesAnimations from './animations/animations';

export default class BootScene extends Phaser.Scene{
    constructor() {
        super('Boot');
    }

    preload ()
    {

        this.loadRessources();

        // Barre de chargement
        let loadingBar = this.add.graphics(
            {
                fillStyle: {
                    color: 0xfffff // blue
                }
            }
        );

        // faire la progression
        this.load.on("progress", (percentage) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2 , this.game.renderer.width * percentage, 50);
        });

        // Prepare les animations et quand pret lance la scene game
        this.load.on('complete', () => {
            lesAnimations(this);
            this.scene.start('Game');
        });

    }

    loadRessources() {
        // Le sprite pour l'animation du player
        this.load.atlas('player', 'assets/img/animations/player.png', 'assets/img/animations/player.json');
        // Le sprite pour l'animation de l'ogre
        this.load.atlas('ogre', 'assets/img/animations/ogre.png', 'assets/img/animations/ogre.json');
        // le sprite pour l'animation du démon
        this.load.atlas('demon', 'assets/img/animations/demon.png', 'assets/img/animations/demon.json')


        this.load.image('fireball', 'assets/img/fireball.png', 10, 10);
        this.load.image('freezer', 'assets/img/freezer.png', 10, 10);
        this.load.image('astralInfusion', 'assets/img/astralInfusion.png', 10, 10);
        this.load.image('ghost', 'assets/img/ghost.png', 10, 10);

        this.load.image('sword', 'assets/img/sword.png', 10, 10);


        this.load.image('diamants', 'assets/img/diamond.png');
        this.load.image('getsugaTensho', 'assets/img/getsugaTensho.png');
        this.load.image('coins', 'assets/img/coin.png');

        // MAP avec les tiles:
        this.load.image('tiles', 'assets/tiles/FreeCuteTileset/Tileset.png');
        //this.load.image('tilesBackground', 'assets/tiles/FreeCuteTileset/keys.svg');
        //this.load.image('tilesBackground2', 'assets/tiles/FreeCuteTileset/BG3.png');
        this.load.tilemapTiledJSON('map1', 'assets/map/map1.json');

        this.load.audio('music1', 'assets/music/music1.mp3');
        this.load.audio('victory', 'assets/music/victory.mp3');

        this.load.audio("pickupCoin", "assets/sounds/pickupCoin.wav");
        this.load.audio("jump", "assets/sounds/jump.wav");
        this.load.audio("drown", "assets/sounds/drown.wav");
        this.load.audio("player-dead", "assets/sounds/player-dead.wav");
        this.load.audio("heal", "assets/sounds/heal.wav");
        this.load.audio("hit", "assets/sounds/hit.wav");
        this.load.audio("fireball", "assets/sounds/fireball.wav");
        this.load.audio("freezer", "assets/sounds/freezer.wav");
        this.load.audio("hit-hight", "assets/sounds/hit-hight.wav");
        this.load.audio("monster-dead", "assets/sounds/monster-dead.wav");
        this.load.audio("pickPower", "assets/sounds/pickPower.wav");
    }
}