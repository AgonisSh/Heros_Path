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
        let pow = this.getFirst();

        if(pow){
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

    handlePowerCollision(pow){
        // Empty for now ...        
    }

    handlePowerMonster(obj,obj2){
        obj2.destroy()
        obj2.effect.applyEffect(obj)
        // todo crée une fonction qui retourne un vecteur dans un fichier tools.js

        let vec = new Phaser.Math.Vector2(200, 200).normalize().scale(400+obj2.damage)
        console.log("DEBUG handlePowerMonster:",obj2)
        console.log("DEBUG handlePowerMonster:",obj)
        obj.incur(obj, obj2.damage,vec)
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
        this.scene.add.existing(this);
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
        this.scene.physics.add.collider(this,this.scene.layerGround,this.handlePowerCollision);

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
}