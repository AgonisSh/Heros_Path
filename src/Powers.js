import { powersList } from "./Model";
import Effect from "./Effect";

// A group of power element.
export default class Powers extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world,scene);
        this.scene=scene;
        this.powerName='';
        this.count=0;
    }

    addPower(pow){
        /*
        this.createMultiple({
            frameQuantity: 1,
            key: pow.powerName,
            active: false,
            visible: false,
            classType: Power
        });
         */
        this.add(pow);


        this.powerName=pow.name
        this.count++;
    }

    usePower(x,y,side){
        let pow = this.getFirstDead();

        if(pow){
            this.activeIt(pow);

            // Sound
            this.scene.powSound = this.scene.sound.add(pow.sound,{ loop: false });
            this.scene.powSound.play();

            if(pow.spellType==0){
                pow.effect.applyEffect(this.scene.player);
            }else{
                pow.usePower(x,y,side);
            }
            // collision avec le sol
            setTimeout( () => { pow.destroy()}, pow.lifespan);
        
        
            if(this.count>0) this.count--;

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

    handlePowerCollisionWall(pow){
        // Empty for now ...
    }
    handlePowerCollision(obj,obj2){
        console.log(obj)
        console.log(obj2)
        obj.effect.applyEffect(obj2)
        // todo crée une fonction qui retourne un vecteur dans un fichier tools.js

        let vec = new Phaser.Math.Vector2(200, 200).normalize().scale(400+obj.damage)

        obj2.incur(obj2, obj.damage,vec)

        obj.destroy()

    }
    

}

// represent one element
export class Power extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,powerName) {
        super(scene,x,y,powerName);

        this.enableBody=false;
        this.setActive(false);
        this.setVisible(false);


        this.setScale(0.02,0.02);
        this.powerName=powerName; // powerName <=> Image
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

    static fromJSON(scene,obj){
        let pow = new Power(scene,0,0,obj.name)
        pow.damage = obj.damage
        pow.velocity = obj.velocity
        pow.lifespan = obj.lifespan
        pow.spellType = obj.spellType
        pow.effect = Effect.load(obj.effect);
        pow.sound = obj.sound;
        return pow
    }

    usePower(x,y,side){

        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);

        this.body.setBounce(1);

        if(this.spellType===1){
            this.body.setAllowGravity(false);
        }

        this.setCollideWorldBounds(true);

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

    preUpdate(time,delta){
        super.preUpdate(time,delta)
        
    }


    
}