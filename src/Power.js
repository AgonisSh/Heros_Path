import { powersList } from "./Model";
import Effect from "./Effect";

// represent one element
export default class Power extends Phaser.Physics.Arcade.Sprite {
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

