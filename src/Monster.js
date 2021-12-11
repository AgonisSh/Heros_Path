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
        this.setScale(1.3); // Pour rétrécir le sprite il faut type sprite
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
    }

    update(){ // todo corriger bug : le joueur ou le mob peut pousser l'autre a traver le mur.
        if(this.player.x - this.x > 400){
            this.playAnimationKey(0);
            this.setVelocityX(0);
        }
        else if(this.x - this.player.x > 400){
            this.playAnimationKey(0);
            this.setVelocityX(0);
        }
        else if(this.player.x < this.x){
            this.playAnimationKey(1);
            this.setVelocityX(-300);
        }
        else if(this.player.x > this.x){
            this.setVelocityX(300);
            this.playAnimationKey(2);
        }
        if(this.player.y < this.y && this.body.onFloor()){
            this.setVelocityY(-300);
        }
    }
}
