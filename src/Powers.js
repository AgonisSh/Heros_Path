import Power from "./Power";
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
            frameQuantity: qt, // a ajouter ... 
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
            if(pow.spellType==0){
                pow.effect.applyEffect(this.scene.player);
            }else{
                pow.usePower(x,y,side);
            }
            // collision avec le sol
            setTimeout( () => { pow.destroy()}, pow.lifespan);
        }

        if(this.count>0) this.count--;
    }


    handlePowerCollision(pow){
        // Empty for now ...        
    }

    handlePowerMonster(monster,obj){
        obj.destroy()
        obj.effect.applyEffect(monster);
        monster.incur(obj.damage);
        
    }

}