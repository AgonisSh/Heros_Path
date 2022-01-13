/**
 * Classe ascendent des monstres.
 */
export default class Monster extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y,texture,animation,speed)
    {
        super(scene, x, y, 'assets');
        this.isVivant = 1;
        this.id = scene.entities.size - 1;
        this.setTexture(texture);
        this.play(animation);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //this.scene.entities.forEach((e) => {this.scene.physics.add.collider(this, e); // Collison entre mob et autres mobs});
        this.scene.physics.add.collider(this, this.scene.player); // Collison entre mob et perso
        this.scene.physics.add.collider(this, this.scene.layerGround); // Collison entre layer sol et mob
        this.scene.physics.add.collider(this ,this.scene.player.power, this.scene.player.power.handlePowerMonster); // Collision entre les projectiles du joueur et les monstres.

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

    restart()
    {
        this.score = 0;
        this.scene.restart();
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

    kill()
    {
        this.isVivant = 0;
        this.destroy();
    }
}
