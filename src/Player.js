import Power from "./Power"
import Powers from "./Powers"
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

    collectPower(powerName,quantity){
        // **** TEST **** // Le joueur obtient "FIREBALL" a partir du 3ème diamant récupérer.
        let pow;
        this.power.powerName = powerName;

        for(let i = 0 ; i < quantity ;i++){
            pow = new Power(this.scene,this.x,this.y,powerName);
            pow.setActive(false);
            pow.setVisible(false);
            this.updatePower(pow);
        }

        // ****
    }

    update()
    {
        this.isJumping();

        if (this.scene.cursors.left.isDown) {
            this.setVelocityX(-400);
            this.side="left";
            this.play('runLPlayer', true);
        }
        else if (this.scene.cursors.right.isDown) {
            this.setVelocityX(400);
            this.side="right";
            this.play('runRPlayer', true);
        }
        else{
            this.setVelocityX(0);
            if(this.side === "left") this.play('idleLPlayer',true);
            else this.play('idleRPlayer', true);
        }

        if (this.scene.cursors.up.isDown && !this.isOnAir){
            this.setVelocityY(-400);
            this.isOnAir = true;
        }

        if(this.scene.input.keyboard.checkDown(this.scene.cursors.space, 150) ){ // delay of 150ms  | && this.power.getLength()!=0
            this.usePower();
        }

    }

    kill ()
    {
        this.isAlive = false;
        this.body.stop();
    }

    sayHello(){
        console.log("Hello I'm the legendary hero !, ...");
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
        this.kill();
    }
}