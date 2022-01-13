/**
 * Classe ascendent des monstres.
 */
export default class Monster extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y,texture,animation,speed)
    {
        super(scene, x, y, 'assets');
        this.setTexture(texture);
        this.play(animation);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.player = this.scene.player;
        this.jumpsAvaible;
        this.isOnAir = false;

        //this.setCircle(14, 3, 6);
        this.setScale(1.4); // Pour rétrécir le sprite il faut type sprite
        this.setCollideWorldBounds(true);

        this.setBounce(0.2);
        this.body.setGravityY(800);
        this.setCollideWorldBounds(true);

        this.isAlive = false;
        this.target = new Phaser.Math.Vector2();
        this.speed=speed;

        this.setScale(2);
        // Boolean qui sera peut être utile pour toi redha
        // this.isChasing=false;
        // this.targer = new Phaser.Math.Vector2();
        this.scene.physics.add.overlap(this.player, this, this.restart, null, this.scene); // kill player if on ogre
    }


    // TODO : kill le joueur au contact
    killPlayer(player, ogre)
    {
        this.player.x = 100;
        this.player.y = 400;
    }

    update()
    {}

    restart()
    {
        this.score = 0;
        this.scene.restart();
    }
}
