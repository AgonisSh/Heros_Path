const config = {
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
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Les vars :
let cursors;
let player;


// Les 3 fonctions principales :
function preload(){
    // Le sprite pour l'animation du perso
    this.load.atlas('player', 'assets/img/animations/texture.png', 'assets/img/animations/texture.json');

    // MAP avec les tiles:
    this.load.image('tiles', 'assets/img/Tile.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map1.json')

}

function create(){
    // Pour créer la map mettre tjrs la taille des tiles avec les différents layer permet de différencier un décor d'un mur par exemple
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    var tileset = map.addTilesetImage('tiles1', 'tiles');
    var layer = map.createLayer("topLayer",tileset, 0, 0);
    var layer2 = map.createLayer("ground",tileset, 0, 0);
    layer2.setCollisionByExclusion([-1]);  // on ajoute les collisions aux layer2 qui est le sol ici

    // Le limite du monde :
    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    // Charge le sprite du player et on choisi sa position
    player = this.physics.add.sprite(100,800,'player','knight_m_idle_anim_f0.png');


    // LA Création des différentes animations :
    this.anims.create({
        key: 'idleR',
        frames: [
            { key: 'player', frame:"knight_m_idle_anim_f0.png" },
            { key: 'player', frame:"knight_m_idle_anim_f1.png" },
            { key: 'player', frame:"knight_m_idle_anim_f2.png" },
            { key: 'player', frame:"knight_m_idle_anim_f3.png" },
        ],
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: 'runR',
        frames: [
            { key: 'player', frame:"knight_m_run_anim_f0.png" },
            { key: 'player', frame:"knight_m_run_anim_f1.png" },
            { key: 'player', frame:"knight_m_run_anim_f2.png" },
            { key: 'player', frame:"knight_m_run_anim_f3.png" },
        ],
        frameRate: 16,
        repeat: -1
    });

    this.anims.create({
        key: 'runL',
        frames: [
            { key: 'player', frame:"knight_m_run_anim_f0L.png" },
            { key: 'player', frame:"knight_m_run_anim_f1L.png" },
            { key: 'player', frame:"knight_m_run_anim_f2L.png" },
            { key: 'player', frame:"knight_m_run_anim_f3L.png" },
        ],
        frameRate: 16,
        repeat: -1
    });


    player.body.bounce.y = 0.2 // Ptit rebond perso pour dynamisme
    player.body.gravity.y = 800   // gravité du perso
    player.body.collideWorldBounds = true  // Les collisions perso avec le monde


    player.setScale(1.3); // Pour rétrécir le sprite il faut type sprite

    cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(layer2, player); // Collison entre layer sol et perso


    // limite de la cam pour pas depasser les bordures
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // camera qui suivent le joueur
    this.cameras.main.startFollow(player);
    // Zoom sur la caméra
    this.cameras.main.setZoom(1.8);

}

function update(){

    if (cursors.left.isDown) {
        player.setVelocityX(-400);
        player.play('runL', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(400);
        player.play('runR', true);
    }
    else{
        player.setVelocityX(0);
        player.play('idleR', true);
    }
    if (cursors.up.isDown ){
        player.setVelocityY(-400);
    }

}
