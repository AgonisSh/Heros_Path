export default class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y,texture,animation,speed)
    {
        super(scene, x, y, 'assets');
        this.setTexture(texture);
        this.play(animation);

        this.scene = scene; 
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.jumpsAvaible;
        this.isOnAir = false;

        //this.setCircle(14, 3, 6);
        this.setScale(1.3); // Pour rétrécir le sprite il faut type sprite
        this.setCollideWorldBounds(true);

        this.setBounce(0.2);
        this.body.setGravityY(800);
        this.setCollideWorldBounds(true);

        this.isAlive;
        this.target = new Phaser.Math.Vector2();
        this.speed = speed;

        this.start();
    }

    start ()
    {
        this.isAlive = true;
        //todo la fonction start initialise tous les attributs variable du personnage : points de vie,...
        this.jumpsAvaible = 2;

    }

    isJumping(){
        if (this.body.onFloor()) this.jumpsAvaible = 2;
        if (this.jumpsAvaible >= 1) {
            if (!this.scene.cursors.up.isDown && !this.scene.cursors.up.pressed) {
                this.isOnAir = false;
                this.jumpsAvaible--;
            }
        }
    }

    update()
    {
        this.isJumping();

        if (this.scene.cursors.left.isDown) {
            this.setVelocityX(-400);
            this.play('runLPlayer', true);
        }
        else if (this.scene.cursors.right.isDown) {
            this.setVelocityX(400);
            this.play('runRPlayer', true);
        }
        else{
            this.setVelocityX(0);
            this.play('idleRPlayer', true);
        }

        if (this.scene.cursors.up.isDown && !this.isOnAir){
            this.setVelocityY(-400);
            this.isOnAir = true;
        }
    }

    kill ()
    {
        this.isAlive = false;

        this.body.stop();
    }

    sayHello(){
        console.log("hello you, ... I know where you live.");
    }
}