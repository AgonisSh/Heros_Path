import Power from "./Power"
import Powers from "./Powers"
import HealthBar from "./HealthBar";

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

        this.health = new HealthBar(this.scene,this.x,this.y);
        this.health.value=100;

        this.setScale(1.6); // Pour rétrécir le sprite il faut type sprite
        this.setCollideWorldBounds(true);

        this.setBounce(0.2);
        this.body.setGravityY(800);
        this.setCollideWorldBounds(true);

        this.isAlive;
        this.target = new Phaser.Math.Vector2();
        this.speed = speed;
        this.side = "right";

        this.power = new Powers(this.scene); // représente un 'group' object.

        this.isInvicible = false;

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

    collectPower(power,quantity){
        power.x=this.x;
        power.y=this.y;
        power.scene=this.scene;            
        power.setActive(false);
        power.setVisible(false);
        this.updatePower(power);
    }

    update()
    {
        // update health bar position
        this.health.follow(this.x-45,this.y-50);

        this.isJumping();

        if (this.scene.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.side="left";
            this.play('runLPlayer', true);
        }
        else if (this.scene.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.side="right";
            this.play('runRPlayer', true);
        }
        else{
            this.setVelocityX(0);
            if(this.side === "left") this.play('idleLPlayer',true);
            else this.play('idleRPlayer', true);
        }

        if (this.scene.cursors.up.isDown && !this.isOnAir){
            this.setVelocityY(-this.speed                                                                                                                                                                                                   );
            this.isOnAir = true;
        }

        if(this.scene.input.keyboard.checkDown(this.scene.cursors.space, 150) ){ // delay of 150ms  | && this.power.getLength()!=0
            this.usePower();
        }

    }


    sayHello(){
        console.log("Hello I'm the legendary hero !, ...");
    }

    takeDamage(x){
        console.log("le joueur a subit : ",x," dmg");

        if(this.health.decrease(x)){
            this.kill();
        }

    }

    kill()
    {
        this.isAlive = false;
    }

    updatePower(pow){
        this.power.addPower(pow);
    }

    usePower(){
        if(!this.power){
            return;
        }
        this.power.usePower(this.x,this.y,this.side);
    }
    
    win()
    {
        alert("Felicitation vous avez \n"+this.scene.score+" points ")
        this.die();
    }
}