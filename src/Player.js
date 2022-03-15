import Powers from "./Powers";
import HealthBar from "./HealthBar";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, animation, speed) {
        super(scene, x, y, 'assets');
        this.setTexture(texture);
        this.play(animation);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.jumpsAvaible;
        this.isOnAir = false;

        this.health = new HealthBar(this.scene, this.x, this.y);
        this.health.value = 100;

        this.setScale(1.6); // Pour rétrécir le sprite il faut type sprite
        this.setCollideWorldBounds(true);

        this.setBounce(0.2);
        this.body.setGravityY(800);
        this.setCollideWorldBounds(true);

        this.isAlive;
        //this.target = new Phaser.Math.Vector2();
        this.speed = speed;
        this.side = "right";

        this.power = new Powers(this.scene);

        this.isInvicible = false;
        this.onHit = false;
        this.damageTime = 0;
        this.invincibilityTime = 0;

        // Coup d'épee
        // Crée une hitbox 'dynamic', qui afflige des dégats aux monstres lorsque la touche 'espace' est appuyé
        this.swordHitBox = this.scene.add.rectangle(0,0,this.width*2,this.height*2,0xffffff,0.4) // Dynamic body
        this.swordDamage = 10

        this.scene.physics.add.existing(this.swordHitBox)
        this.swordHitBox.body.enable = true
        this.scene.physics.world.remove(this.swordHitBox.body)

        this.swordHitBox.body.setAllowGravity(false)

        this.start();

        this.scene.physics.add.collider(this, this.power.children, this.power.handlePowerCollision);


    }

    start() {
        this.isAlive = true;
        //todo la fonction start initialise tous les attributs variable du personnage : points de vie,...
        this.jumpsAvaible = 2;

    }

    isJumping() {
        if (this.body.onFloor()) this.jumpsAvaible = 2;
        if (this.jumpsAvaible >= 1) {
            if (!this.scene.cursors.up.isDown && !this.scene.cursors.up.pressed) {
                this.isOnAir = false;
                this.jumpsAvaible--;
            }
        }
    }

    /**
     * Après avoir ramasser un pouvoir, selon la quantité celui ci est chargé dans 'pouvoirs' (groupe).
     * @param power
     * @param quantity
     */
    collectPower(power, quantity) {

        power.x = this.x;
        power.y = this.y;

        // todo add loop
        this.updatePower(power);

    }

    update() {
        // update health bar position
        // todo : check follow concept phaser 3 => instead of manually update the coordinate
        this.health.follow(this.x - 45, this.y - 50);

        // Condition used for the vector's effect -> see : incur method.
        if (this.onHit) {
            return
        }

        // rare
        if(this.health.value <= 0) this.kill()

        this.isJumping();

        if (this.scene.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.side = "left";
            this.play('runLPlayer', true);
        } else if (this.scene.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.side = "right";
            this.play('runRPlayer', true);
        } else {
            this.setVelocityX(0);
            if (this.side === "left") this.play('idleLPlayer', true);
            else this.play('idleRPlayer', true);
        }

        if (this.scene.cursors.up.isDown && !this.isOnAir) {
            this.setVelocityY(-this.speed);
            this.isOnAir = true;
            this.scene.jump.play();
        }

        if (this.scene.input.keyboard.checkDown(this.scene.cursors.shift, 150)) { // delay of 150ms
            this.usePower();
        }

        if (this.scene.input.keyboard.checkDown(this.scene.cursors.space, 2000)) {
            this.attack();
        }

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        // When the monster deal damage to the player then the player gain 3s of invincibility
        if (this.onHit) {
            this.damageTime += dt
            if (this.damageTime >= 250) {
                this.setTint(0xffffff)
                this.damageTime = 0
                this.onHit = false;
            }
        }
        if (this.isInvicible) {
            this.invincibilityTime += dt

            if (this.invincibilityTime >= 1500) {
                this.isInvicible = false
                this.invincibilityTime = 0
                this.alpha = 1;
            }
        }
    }

    /**
     * this action active the swordHitbox to deal damage to monster
     */
    attack(){
        // Joue une animation
        this.setVelocityX(0)

        let x = this.side == "left" ? this.x - this.width * 1.10 : this.x + this.width *  1.10
        let y = this.y + this.height * 0.5

        this.swordHitBox.x = x
        this.swordHitBox.y = y

        this.swordHitBox.body.enable = true
        this.scene.physics.world.add(this.swordHitBox.body)
        this.swordHitBox.setAlpha(0.5)

        // Rotate the sword
        /*this.anims.create({
            key: "slash",
            frames: this.anims.generateFrameNumbers("slash", {
                start: 0,
                end: 4
            }),
            frameRate: 2,
            repeat: 0
        });*/



        // todo use something else
        setTimeout(()=>{
            this.swordHitBox.body.enable = false
            this.scene.physics.world.remove(this.swordHitBox.body)
            this.swordHitBox.setAlpha(0)
        }, 50);
    }

    /**
     * When the player get hit by something
     * @param player
     * @param dmg
     * @param vector used to simulate a "push"
     */
    incur(player,dmg, vector) {
        // opacity
        player.setTint(0xff0000)

        player.isInvicible = true;
        player.alpha = 0.5;
        player.onHit = true;

        if (dmg > 50) {
            player.scene.hightHit.play()
        } else {
            player.scene.hit.play()
        }

        if(vector){
            player.setVelocity(vector.x, vector.y);
        }

        if (player.health.decrease(dmg)) {
            player.kill();
        }
    }

    kill() {
        this.isAlive = false;
        this.scene.death.play();
    }

    updatePower(pow) {
        this.power.addPower(pow);
    }

    usePower() {
        if (this.power.getLength() == 0) {
            console.log("No power ...")
            return;
        }
        console.log(`${this.power.powerName} !`)

        this.power.usePower(this.side == "right" ? this.x+25 : this.x-25 , this.y, this.side);

        // Update the UI (power part)
        this.scene.events.emit('usePower', this.power.count);
    }

    win() {
        alert("Felicitation vous avez \n" + this.scene.score + " points ")
        this.kill();
    }
}