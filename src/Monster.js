/**
 * Classe ascendent des monstres.
 */
import HealthBar from "./HealthBar";

export default class Monster extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y,texture,animation,speed)
    {
        super(scene, x, y, 'assets');

        this.cordX=x
        this.cordY=y
        console.log(`DEBUG : CREATE Monster (${this.cordX};${this.cordY})`)

        this.isVivant = 1;
        this.setTexture(texture);
        this.play(animation);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.damage = 30;

        this.health = new HealthBar(scene,x,y);
        this.health.value = 100; // default

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

        this.scene.physics.add.overlap(this.player,this,this.attack,null,this.scene); // Collison entre le joueur et le mob.
        this.scene.physics.add.collider(this, this.scene.layerGround); // Collison entre layer sol et mob
        this.scene.physics.add.collider(this ,this.scene.player.power, this.scene.player.power.handlePowerMonster); // Collision entre les projectiles du joueur et les monstres.

        this.onHit=false
        this.damageTime=0
    }

    restart()
    {
        this.score = 0;
        this.scene.restart();
    }

    attack(player,monster){
        if(!player.isInvicible){
            // Push the player in the opposite direction of the monster
            const dx = player.x - monster.x
            const dy = player.y - monster.y
            const vec = new Phaser.Math.Vector2(dx, dy).normalize().scale(200+monster.damage)

            player.handleDamage(monster.damage,vec);
        }
    }

    kill(){
        this.isVivant=0;1
        this.health.destroy();
        this.destroy();
    }

    incur(dmg){

        this.onHit=true
        this.setTint(0xff0000)
        if (this.health.decrease(dmg)) this.kill()
    }

    preUpdate(t, dt)
    {
        super.preUpdate(t, dt)

        if (this.onHit)
        {
            this.damageTime += dt

            if(this.damageTime>=250){
                this.setTint(0xffffff)
                this.damageTime = 0
                this.onHit=false;
            }
        }
    }

    update()
    {
        this.health.follow(this.x-20,this.y-50);
    }
}
