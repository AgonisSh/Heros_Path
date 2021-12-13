import 'phaser';

// Les vars :
let cursors;
let player;
let ogre;
let isOnAir = false;
var score = 0;
var scoreDiv = document.createElement("div");
var jumpsAvaible;



export default class GameSceneLvl1 extends Phaser.Scene{
    constructor() {
        super('Game'); // game is the key of the scene
    }

    create ()
    {
        // Musique :
        this.music = this.sound.add('musicPokemon');
        this.music.play({
            volume: 0.2,
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

        // Mob ogre test
        ogre = this.physics.add.sprite(600,400,'ogre','ogre_idle_anim_f0G.png');


        player.setBounce(0.2);// Ptit rebond perso pour dynamisme
        player.body.setGravityY(800); // gravité du perso
        player.setCollideWorldBounds(true); // Les collisions perso avec le monde

        // Pareil pour l'ogre
        ogre.setBounce(0.2);// Ptit rebond perso pour dynamisme
        ogre.body.setGravityY(800); // gravité du perso
        ogre.setCollideWorldBounds(true); // Les collisions perso avec le monde


        player.setScale(1.3); // Pour rétrécir le sprite il faut type sprite

        ogre.setScale(2); // Pour rétrécir le sprite il faut type sprite

        // Les touches du clavier
        cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(player, layerGround); // Collison entre layer sol et perso
        this.physics.add.collider(ogre, layerGround); // Collison entre layer sol et perso
        this.physics.add.overlap(player, ogre, killPlayer, null, this); // kill player if on ogre

        // limite de la cam pour pas depasser les bordures
        this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels);
        // camera qui suivent le joueur
        this.cameras.main.startFollow(player);
        // Zoom sur la caméra
        this.cameras.main.setZoom(1.6);

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
        document.getElementsByTagName("body")[0].appendChild(scoreDiv);
        scoreDiv.innerHTML = "Score: " + score;
        scoreDiv.style.align = "top";
        scoreDiv.style.color = "white";
        scoreDiv.style.fill = "#000";
        scoreDiv.style.fontFamily = "fantasy";
        scoreDiv.style.fontSize = '32px';
        scoreDiv.style.position = "absolute";
        scoreDiv.style.right = "100px";
        scoreDiv.style.top = "100px";
        scoreDiv.style.zIndex = "65532";

        function collectDiamonds (player, diamants)
        {
            diamants.disableBody(true, true);
            score += 10;
            scoreDiv.innerHTML = 'Score: ' + score;
            console.log(player.x);
            console.log(player.y);
        }

        // TODO : kill le joueur au contact
        function killPlayer(player, ogre)
        {
            player.x = 100;
            player.y = 400;

            ogre.x = 600;
            ogre.y = 400;
        }
    }

    isJumping(){
        if (player.body.onFloor()) jumpsAvaible = 2;
        if (jumpsAvaible >= 1) {
            if (!cursors.up.isDown && !cursors.up.pressed) {
                isOnAir = false;
                jumpsAvaible--;
            }
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

            // Les déplacements de l'ogre

            // stop if out of aggro range
            if(player.x - ogre.x > 600){
                ogre.play('idleROgre',true);
                ogre.setVelocityX(0);
            }
            else if(ogre.x - player.x > 600){
                ogre.play('idleLOgre',true);
                ogre.setVelocityX(0);
            }
            // stop when too close of player on x axis
            else if (player.x - ogre.x < 10 && player.x - ogre.x > 0){
                ogre.play('idleROgre',true);
                ogre.setVelocityX(0);
            } else if (ogre.x - player.x < 10 && ogre.x - player.x > 0) {
                ogre.play('idleLOgre', true);
                ogre.setVelocityX(0);
            }
            // move
            else if(player.x < ogre.x){
                ogre.setVelocityX(-100);
                ogre.play('runLOgre',true);
                // jump if blocked
                if (ogre.body.blocked.left && ogre.body.onFloor()) ogre.setVelocityY(-300);
            }
            else if(player.x > ogre.x){
                ogre.setVelocityX(100);
                ogre.play('runROgre',true);
                // jump if blocked
                if (ogre.body.blocked.right && ogre.body.onFloor()) ogre.setVelocityY(-300);
            }
    }
}