import 'phaser';
import lesAnimations from './animations/animations';

export default class BootScene extends Phaser.Scene{
    constructor() {
        super('Boot');
    }

    preload ()
    {
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
            console.log(percentage);
        });

        // Le sprite pour l'animation du player
        this.load.atlas('player', 'assets/img/animations/player.png', 'assets/img/animations/player.json');
        // Le sprite pour l'animation de l'ogre
        this.load.atlas('ogre', 'assets/img/animations/ogre.png', 'assets/img/animations/ogre.json');
        // le sprite pour l'animation du démon
        this.load.atlas('demon', 'assets/img/animations/demon.png', 'assets/img/animations/demon.json')


        this.load.image('fireball','assets/img/fireball.png',10,10); // todo animation fireball ?
        this.load.image('freezer','assets/img/freezer.png',10,10); // todo animation freezer ?

        this.load.image('diamants','assets/img/diamond.png');

        // MAP avec les tiles:
        this.load.image('tiles', 'assets/tiles/FreeCuteTileset/Tileset.png');
        //this.load.image('tilesBackground', 'assets/tiles/FreeCuteTileset/keys.svg');
        //this.load.image('tilesBackground2', 'assets/tiles/FreeCuteTileset/BG3.png');
        this.load.tilemapTiledJSON('map1', 'assets/map/map1.json');

        this.load.audio('music1','assets/music/music1.mp3');


        // Prepare les animations et quand pret lance la scene game
        this.load.on('complete', () => {
            lesAnimations(this);
            this.scene.start('Game');
        });



    }

}