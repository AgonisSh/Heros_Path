import {powersList} from "../utils/Model";
import Effect from "./Effect";
import Demon from "../enemies/Demon";

// represent one element
export class Power extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, powerName) {
        super(scene, x, y, powerName);

        this.enableBody = false;
        this.setActive(false);
        this.setVisible(false);

        this.powerName = powerName; // powerName <=> Image
        this.setTexture(powerName);

        //this.checkWorldBounds = true;
        //this.exists = false;

        //this.tracking = false; // direction dirigé
        //this.scaleSpeed = 0; // Change la taille par rapport à la distance parcourut

        this.damage = 50;
        this.velocity = 700;
        this.name = powerName;
        this.lifespan = 1000;

        this.scene = scene;


    }

    static fromJSON(scene, obj) {

        let pow = new Power(scene, 0, 0, obj.name)

        pow.damage = obj.damage
        pow.velocity = obj.velocity
        pow.lifespan = obj.lifespan
        pow.spellType = obj.spellType
        pow.effect = Effect.load(obj.effect);
        pow.sound = obj.sound;
        pow.setScale(obj.scale);

        return pow
    }

    usePower(x, y, side, angle) {

        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.body.setBounce(1);

        if (this.spellType === 1) {
            this.body.setAllowGravity(false);
        }

        this.setCollideWorldBounds(true);

        if (angle != null) {
            this.scene.physics.velocityFromRotation(angle, this.velocity, this.body.velocity);
        } else {
            //todo utiliser un vecteur pour la direction
            switch (side) {
                case 'left':
                    this.setVelocityX(-this.velocity);
                    this.angle = 180
                    break
                case 'right':
                    this.setVelocityX(this.velocity);
                    this.angle = 0
                    break
            }
        }


    }
}


// A group of power element.
export default class Powers extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.powerName = '';
        this.count = 0;
    }

    static giveToMe(scene, index, specificity) {
        let pow = Power.fromJSON(scene, powersList[index])

        if (specificity) {
            for (var spe in specificity) {
                pow[spe] = specificity[spe]
            }
        }
        return pow
    }

    //https://www.geeksforgeeks.org/random-number-generator-in-arbitrary-probability-distribution-fashion/
    static getRandomPower() {

        var total = 0.0

        var probas = []

        for (let i = 0; i < powersList.length; i++) {
            total += powersList[i].probability
            probas[i] = {prob: total, index: i}
            console.log("prob ${i}", probas[i])
        }

        console.log("total")
        probas.forEach(el => console.log(el.prob))

        const rand = Phaser.Math.FloatBetween(0, 1);

        console.log("rand", rand)

        var closest = probas.reduce(function (prev, curr) {
            return (Math.abs(curr.prob - rand) < Math.abs(prev.prob - rand) ? curr : prev);
        });


        return closest.index

    }

    addPower(pow) {
        this.add(pow);
        this.powerName = pow.name
        this.count++;
    }

    usePower(x, y, side, angle) {
        let pow = this.getFirstDead();

        if (pow) {
            this.activeIt(pow);

            // Sound
            this.scene.powSound = this.scene.sound.add(pow.sound, {loop: false});
            this.scene.powSound.play();

            if (pow.spellType == 0) {
                pow.effect.applyEffect(this.scene.player);
            } else {
                pow.usePower(x, y, side, angle);
            }
            // collision avec le sol
            setTimeout(() => {
                pow.destroy()
            }, pow.lifespan);


            if (this.count > 0) this.count--;

        }
    }

    /**
     * Active les collisions du sprite
     * @param pow sprite power
     */
    activeIt(pow) {
        this.scene.add.existing(pow);
        this.scene.physics.add.collider(pow, this.scene.layerGround, this.handlePowerCollisionWall);
        this.scene.physics.add.collider(pow, this.scene.monsters, this.handlePowerCollision);
        this.scene.physics.add.collider(pow, this.scene.player, this.handlePowerCollision);
    }

    handlePowerCollisionWall(pow) {
        // Empty for now ...
    }

    /**
     * Gère la collision avec les entités
     * @param obj le projectile
     * @param obj2 l'entité
     */
    handlePowerCollision(obj, obj2) {
        // Case when its a demon
        if (obj2 instanceof Demon && obj.name == "fireball") {
            obj.destroy()
            return
        }

        obj.effect.applyEffect(obj2)
        // todo crée une fonction qui retourne un vecteur dans un fichier tools.js
        let vec = new Phaser.Math.Vector2(200, 200).normalize().scale(400 + obj.damage)

        obj2.incur(obj2, obj.damage, vec)

        obj.destroy()
    }


}

