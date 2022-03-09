/**
 * Classe ascendent des monstres.
 */
import HealthBar from "./HealthBar";

export default class Monster extends Phaser.Physics.Arcade.Sprite {


    constructor(scene, x, y, texture, animation, speed) {
        super(scene, x, y, 'assets');

        this.isVivant = 1;
        this.setTexture(texture);
        this.play(animation);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.damage = 30;

        this.health = new HealthBar(scene, x, y);
        this.health.value = 100; // default

        this.player = this.scene.player;
        this.jumpsAvaible;

        this.setScale(1.4);
        this.setCollideWorldBounds(true);

        this.setBounce(0.2);
        this.body.setGravityY(800);
        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.speed = speed;

        this.setScale(2);

        // Collisions avec les autres entités
        this.scene.physics.add.overlap(this.player, this, this.attack, null, this.scene); // Collison entre le joueur et le mob.
        this.scene.physics.add.collider(this, this.scene.layerGround); // Collison entre layer sol et mob

        this.scene.physics.add.overlap(this, this.player.swordHitBox, this.incur, null, this.scene) // Collision entre l'attack du joueur et le monstre

        this.onHit = false
        this.damageTime = 0
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        if (this.onHit) {
            this.damageTime += dt

            if (this.damageTime >= 250) {
                this.setTint(0xffffff)
                this.damageTime = 0
                this.onHit = false;
            }
        }
    }

    update(t, dt) {
        this.health.follow(this.x - 20, this.y - 50);
    }

    restart() {
        this.score = 0;
        this.scene.restart();
    }

    attack(player, monster) {
        if (!player.isInvicible) {
            // Push the player in the opposite direction of the monster
            const dx = player.x - monster.x
            const dy = player.y - monster.y
            const vec = new Phaser.Math.Vector2(dx, dy).normalize().scale(200 + monster.damage)

            player.incur(player, monster.damage, vec);
        }
    }

    kill() {
        if (this.scene != null)
            this.scene.kill.play();
        this.isVivant = 0;
        this.health.destroy();
        this.destroy();
    }

    /**
     *
     * @param obj1 Monstre
     * @param obj2 Integer : Dégat
     * @param vector Vecteur pour simuler l'effet 'pousse'
     */
    incur(obj1, obj2, vector) {
        let vec = vector
        let dmg = obj2
        // If obj2 is the sword that mean we take the damage associete to it
        // else we pass that and we continue with the default damage that correspond to the power (threw by the player)
        if (obj2 == this.player.swordHitBox) {
            console.log("Le monstre a recu un coup d'épée")
            dmg = this.player.swordDamage
            vec = new Phaser.Math.Vector2(obj1.x - this.player.x, obj1.y - this.player.y).normalize().scale(400 + dmg)
        }

        if (isNaN(obj1)) {
            obj1.onHit = true
            obj1.setTint(0xff0000)

            if (vec != null) {
                obj1.setVelocity(vec.x, vec.y);
            }

            console.log("Le monstre a reçu :", dmg, " degats")

            if (this.scene != null && this.scene.hit != null)
                this.scene.hit.play()
            if (obj1.health.decrease(dmg)) obj1.kill()
        }


    }


}
