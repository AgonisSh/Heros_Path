import 'phaser';
import Player from "./Player";
import Ogre from "./Ogre";



export default class Game extends Phaser.Scene{
    constructor() {
        super('Game'); // game is the key of the scene
        this.cursor;
        this.player;
        this.ogre;
        this.score=0
        this.scoreDiv = document.createElement("div");
        this.PowerDiv = document.createElement("div");
        this.diamants;

        this.map1;
        this.tileset;
        this.tilesBackground;
        this.tilesBackgroundDecor;
        this.layerBackground;
        this.layerBackgroundDecors;
        this.layerGround
    }

    loadMap(){
        // Pour créer la map mettre tjrs la taille des tiles avec les différents layer permet de différencier un décor d'un mur par exemple
        this.map1 = this.make.tilemap({ key: 'map1', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map1.addTilesetImage('generic_platformer_tiles', 'tiles');  // Faut mettre nom de la tile dans Tiled

        //layers :
        this.layerBackground = this.map1.createLayer("Background",this.tileset, 0, 0);
        this.layerBackgroundDecors = this.map1.createLayer("BackgroundDecor",this.tileset, 0, 0);
        this.layerWater = this.map1.createLayer("Water",this.tileset, 0, 0);
        this.layerGround = this.map1.createLayer("Ground",this.tileset, 0, 0);
        this.layerGround.setCollisionByExclusion([-1]);  // on ajoute les collisions au layerGround qui est le sol ici
        // Le limite du monde :
        this.physics.world.bounds.width = this.layerBackground.width;
        this.physics.world.bounds.height = this.layerBackground.height;
    }

    loadMusic(){
        // Musique :
        this.music = this.sound.add('musicPokemon');
        this.music.play({
            volume: 0.2,
            loop: true
        });
    }

    collectDiamonds (player, diamants)
    {
        diamants.disableBody(true, true);
        this.score += 10;
        /*** TEST POUVOIR ***/

        this.player.collectPower('fireball',1);
        this.PowerDiv.innerHTML = this.player.power.powerName+": " + this.player.power.count;

        /**** ** ** */
        this.scoreDiv.innerHTML = 'Score: ' + this.score;

    }

    create ()
    {
        this.loadMap();
        this.loadMusic();
        // Les touches du clavier
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this,100,400,'player','knight_m_idle_anim_f0.png',280);
        this.ogre = new Ogre(this,600,400,'ogre','ogre_idle_anim_f0G.png',300);


        this.diamants = this.physics.add.group({
            key: 'diamants',
            repeat: 50,
            setXY: { x: 50, y: 100, stepX: 120 }
        });

        this.physics.add.collider(this.player, this.layerGround); // Collison entre layer sol et perso
        this.physics.add.collider(this.ogre, this.layerGround); // Collison entre layer sol et perso
        this.physics.add.collider(this.ogre, this.player); // Collison entre layer sol et perso
        this.physics.add.collider(this.player, this.layerWater); // Collison entre player et eau

        //this.physics.add.overlap(this.player, this.layerWater, this.restart2, null, this); // kill player if on water


        this.physics.add.collider(this.ogre,this.player.power,this.player.power.handlePowerMonster); // Collision entre les projectiles du joueur et les monstres.

        this.physics.add.collider(this.diamants, this.layerGround);
        this.physics.add.overlap(this.player, this.diamants, this.collectDiamonds, null, this);

        this.diamants.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.cameras.main.setBounds(0, 0, this.map1.widthInPixels, this.map1.heightInPixels);
        // camera qui suivent le joueur
        this.cameras.main.startFollow(this.player);
        // Zoom sur la caméra
        this.cameras.main.setZoom(1.3);

        // Set html indicator
        document.getElementsByTagName("body")[0].appendChild(this.PowerDiv);
        this.PowerDiv.innerHTML = this.player.power.powerName + "  " + this.player.power.count;
        this.PowerDiv.style.align = "top";
        this.PowerDiv.style.color = "white";
        this.PowerDiv.style.fill = "#000";
        this.PowerDiv.style.fontFamily = "fantasy";
        this.PowerDiv.style.fontSize = '32px';
        this.PowerDiv.style.position = "absolute";
        this.PowerDiv.style.right = "100px";
        this.PowerDiv.style.top = "70px";
        this.PowerDiv.style.zIndex = "65532";

        document.getElementsByTagName("body")[0].appendChild(this.scoreDiv);
        this.scoreDiv.innerHTML = "Score: " + this.score;
        this.scoreDiv.style.align = "top";
        this.scoreDiv.style.color = "white";
        this.scoreDiv.style.fill = "#000";
        this.scoreDiv.style.fontFamily = "fantasy";
        this.scoreDiv.style.fontSize = '32px';
        this.scoreDiv.style.position = "absolute";
        this.scoreDiv.style.right = "100px";
        this.scoreDiv.style.top = "100px";
        this.scoreDiv.style.zIndex = "65532";



    }

    update(){
        // mouvement joueur
        this.player.update();

        // Les déplacements de l'ogre
        this.ogre.update();

        if (this.layerWater.getTileAtWorldXY(this.player.x, this.player.y) != null) this.restart2();
    }

    restart2()
    {
        this.score = 0;
        this.scene.restart();
    }

}