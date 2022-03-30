import 'phaser';
import lesAnimations from '../animations/animations';
import Menu from "./Menu";


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
            this.scene.start('Menu');
        });


    }

    loadRessources() {
        this.input.setDefaultCursor('url(https://cur.cursors-4u.net/games/gam-14/gam1340.cur),pointer');

        // Le sprite pour l'animation du player
        this.load.atlas('player', 'assets/img/animations/player.png', 'assets/img/animations/player.json');
        // Le sprite pour l'animation de l'ogre
        this.load.atlas('ogre', 'assets/img/animations/ogre.png', 'assets/img/animations/ogre.json');
        // Le sprite pour l'animation du démon
        this.load.atlas('demon', 'assets/img/animations/demon.png', 'assets/img/animations/demon.json')
        // Le sprite pour l'animation du lizard
        this.load.atlas('lizard', 'assets/img/animations/lizard.png', 'assets/img/animations/lizard.json')
        
        this.load.image('chest', 'assets/img/diamond.png', 10, 10);
        this.load.image('fireball', 'assets/img/fireball.png', 10, 10);
        this.load.image('freezer', 'assets/img/freezer.png', 10, 10);
        this.load.image('astralInfusion', 'assets/img/astralInfusion.png', 10, 10);
        this.load.image('ghost', 'assets/img/ghost.png', 10, 10);

        this.load.image('sword', 'assets/img/sword.png', 10, 10);

        this.load.image('diamants', 'assets/img/diamond.png');
        this.load.image('getsugaTensho', 'assets/img/getsugaTensho.png');
        this.load.image('coins', 'assets/img/coin.png');


        this.load.image("menu_title", "assets/img/pause_title.png");
        this.load.image("menu_resume", "assets/img/resume_button.png");
        this.load.image("menu_options", "assets/img/options_button.png");
        this.load.image("menu_quit", "assets/img/quit_button.png");
        this.load.image("menu_back", "assets/img/back_button.png");
        this.load.image("menu_music_on", "assets/img/music_on_button.png");
        this.load.image("menu_music_off", "assets/img/music_off_button.png");
        this.load.image("menu_resume_hover", "assets/img/resume_button_hover.png");
        this.load.image("menu_options_hover", "assets/img/options_button_hover.png");
        this.load.image("menu_quit_hover", "assets/img/quit_button_hover.png");
        this.load.image("menu_back_hover", "assets/img/back_button_hover.png");
        this.load.image("menu_music_on_hover", "assets/img/music_on_button_hover.png");
        this.load.image("menu_music_off_hover", "assets/img/music_off_button_hover.png");

        // MAP1 avec les tiles:
        this.load.image('tiles', 'assets/tiles/FreeCuteTileset/Tileset.png');
        this.load.tilemapTiledJSON('map1', 'assets/map/map1.json');
        // MAP2 avec les tiles:
        this.load.image('tiles2', 'assets/tiles/TilesetMap2/Castlevania.png');
        this.load.tilemapTiledJSON('map2', 'assets/map/map2.json');

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