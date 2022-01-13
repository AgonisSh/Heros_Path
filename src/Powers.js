import Power from "./Power";
// A group of power element.
export default class Powers extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world,scene);
        this.scene=scene;
        this.powerName='';
        this.count=0;

    }

    addPower(pow){

        this.add(pow);
        this.count++;
    }

    usePower(x,y,side){
        this.scene.physics.add.collider(this,this.scene.layerGround,this.handlePowerCollision);

        let pow = this.getFirst();


        if(pow){
            console.log("pow lifespan : ",pow.lifespan);
            console.log(pow.name);
            pow.usePower(x,y,side);
        }
        console.log(this.   powerName," utilisé ... :",this.getTotalUsed());
        if(this.count>0) this.count--;
        this.scene.PowerDiv.innerHTML = this.powerName+": " + this.count;

    }

    handlePowerCollision(obj){
        // collision avec le sol
        if(obj.counter==6){
            obj.destroy();
        }else{
            obj.counter++;
        }
    }

    handlePowerMonster(monster,obj){
        obj.destroy();
    }

}