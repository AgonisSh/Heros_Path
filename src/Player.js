import Power from "./Power"
import Powers from "./Powers"
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
        this.target = new Phaser.Math.Vector2();
        this.speed = speed;
        this.side = "right";

        this.power = new Powers(this.scene); // représente un 'group' object.

        this.isInvicible = false;
        this.onHit = false;
        this.damageTime = 0;
        this.invincibilityTime = 0;
        this.start();

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

    collectPower(power, quantity) {

        power.x = this.x;
        power.y = this.y;

        this.updatePower(power);
        this.scene.events.emit('addPower', power.name, this.power.count);

    }

    update() {
        // update health bar position
        this.health.follow(this.x - 45, this.y - 50);

        if (this.onHit) {
            return
        }

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

        if (this.scene.input.keyboard.checkDown(this.scene.cursors.space, 150)) { // delay of 150ms  | && this.power.getLength()!=0
            this.usePower();
        }

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        // Lorsque un mob inflige du dégat à un joueur, le joueur bénéficie de 3s d'invicibilité.

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


    sayHello() {
        console.log("Hello I'm the legendary hero !, ...");
    }

    incur(dmg, vector) {

        console.log("DEBUG : le joueur a subit : ", dmg, " dmg");
        this.setTint(0xff0000)

        this.isInvicible = true;
        this.alpha = 0.5;
        this.onHit = true;

        if (dmg > 50) {
            this.scene.hightHit.play()
        } else {
            this.scene.hit.play()
        }

        this.setVelocity(vector.x, vector.y);

        if (this.health.decrease(dmg)) {
            this.kill();
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

        this.power.usePower(this.x, this.y, this.side);

        // Update the UI (power part)
        this.scene.events.emit('usePower', this.power.count);

    }

    win() {
        alert("Felicitation vous avez \n" + this.scene.score + " points ")
        this.die();
    }
}