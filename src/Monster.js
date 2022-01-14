/**
 * Classe ascendent des monstres.
 */
import HealthBar from "./HealthBar";

export default class Monster extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y,texture,animation,speed)
    {
        super(scene, x, y, 'assets');
        this.isVivant = 1;
        this.setTexture(texture);
        this.play(animation);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.damage = 30;

        this.health = new HealthBar(scene,x,y);
        this.health.value = 100;

        this.player = this.scene.player;
        this.jumpsAvaible;
        this.isOnAir = false;

        this.setScale(1.4);
        this.setCollideWorldBounds(true);

        this.setBounce(0.2);
        this.body.setGravityY(800);
        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.speed=speed;

        this.setScale(2);

        this.scene.physics.add.overlap(this.player, this, this.attack, null, this.scene); // kill player if on ogre
        this.scene.physics.add.collider(this, this.scene.layerGround); // Collison entre layer sol et mob
        this.scene.physics.add.collider(this ,this.scene.player.power, this.scene.player.power.handlePowerMonster); // Collision entre les projectiles du joueur et les monstres.

    }

    restart()
    {
        this.score = 0;
        this.scene.restart();

        this.player

    }

    attack(dmg){
        console.log(dmg);

        if(this.player.isInvicible == false){
            this.player.takeDamage(dmg);

            if(this.player.side=="right"){
                this.player.x = this.player.x-100;
            }else{
                this.player.x = this.player.x+100;
            }

            this.player.isInvicible=true;
            this.player.alpha = 0.5;
        }

        // Lorsque un mob inflige du dégat à un joueur, le joueur bénéficie de 3s d'invicibilité.
        setTimeout( () => {
            this.player.isInvicible = false;
            this.player.alpha = 1;
        }, 3000);

    }

    kill(){
        this.isVivant=0;
        this.health.destroy();
        this.destroy();
    }

    update()
    {
        this.health.follow(this.x-20,this.y-50);
        this.health.draw()
    }
}
