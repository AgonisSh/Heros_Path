import 'phaser';

// Les vars :
let cursors;
let player;
let isOnAir = false;
var score = 0;
var scoreText;



export default class GameSceneLvl1 extends Phaser.Scene{
    constructor() {
        super('Game'); // game is the key of the scene
    }

    create ()
    {
        // Musique :
        this.music = this.sound.add('music1');
        this.music.play({
            volume: 0.1,
            loop: true
        });

        // Pour créer la map mettre tjrs la taille des tiles avec les différents layer permet de différencier un décor d'un mur par exemple
        var map1 = this.make.tilemap({ key: 'map1', tileWidth: 16, tileHeight: 16 });
        var tileset = map1.addTilesetImage('Tileset', 'tiles');
        var tilesBackground = map1.addTilesetImage('tiles1Background', 'tilesBackground');
        var tilesBackgroundDecor = map1.addTilesetImage('tiles1Background2', 'tilesBackground2');
        //layers :
        var layerBackground = map1.createLayer("Background",tilesBackground, 0, 0);
        var layerBackgroundDecors = map1.createLayer("DecorBackground",tilesBackgroundDecor, 0, 0);
        var layerGround = map1.createLayer("Ground",tileset, 0, 0);
        layerGround.setCollisionByExclusion([-1]);  // on ajoute les collisions au layerGround qui est le sol ici



        // Le limite du monde :
        this.physics.world.bounds.width = layerBackground.width;
        this.physics.world.bounds.height = layerBackground.height;

        // Charge le sprite du player et on choisi sa position
        player = this.physics.add.sprite(100,400,'player','knight_m_idle_anim_f0.png');


        player.setBounce(0.2);// Ptit rebond perso pour dynamisme
        player.body.setGravityY(800); // gravité du perso
        player.setCollideWorldBounds(true); // Les collisions perso avec le monde


        player.setScale(1.3); // Pour rétrécir le sprite il faut type sprite

        // Les touches du clavier
        cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(player, layerGround); // Collison entre layer sol et perso

        // limite de la cam pour pas depasser les bordures
        this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels);
        // camera qui suivent le joueur
        this.cameras.main.startFollow(player);
        // Zoom sur la caméra
        this.cameras.main.setZoom(1.9);

        // On ajoute les objets :
        var diamants = this.physics.add.group({
            key: 'diamants',
            repeat: 50,
            setXY: { x: 50, y: 100, stepX: 120 }
        });

        diamants.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        // Pour pas qu'il tombe dans le vide
        this.physics.add.collider(diamants, layerGround);
        // Pour qu'il disparaissent si on passe dessus
        this.physics.add.overlap(player, diamants, collectDiamonds, null, this);


        // Affichage score
        scoreText = this.add.text(100, 200, 'score: 0', { fontSize: '32px', fill: '#000', align: "top" });
        scoreText.fixedToCamera = true;

        function collectDiamonds (player, diamants)
        {
            diamants.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);
            console.log(player.x);
            console.log(player.y);
        }


    }

    isJumping(){
        if(!cursors.up.isDown && !cursors.up.pressed){
            isOnAir = false;
        }
    }

    update(){
        this.isJumping();
        if (cursors.left.isDown) {
            player.setVelocityX(-400);
            player.play('runLPlayer', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(400);
            player.play('runRPlayer', true);
        }
        else{
            player.setVelocityX(0);
            player.play('idleRPlayer', true);
        }

        if (cursors.up.isDown && !isOnAir){
            player.setVelocityY(-400);
            isOnAir = true;
        }
    }

}