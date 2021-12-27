import Power from "./Power";
// A group of power element.
export default class Powers extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world,scene);
        this.scene=scene;
    }


    addPower(pow){
        this.add(pow);
        console.log("fireball restant :",this.getLength());
    }

    usePower(x,y,side){
        this.scene.physics.add.collider(this,this.scene.layerGround,this.handlePowerCollision);
        let pow = this.getFirst();
        if(pow){
            console.log(pow.name);
            pow.usePower(x,y,side)
        }
        console.log("fireball utilisé ... :",this.getTotalUsed());
    }

    handlePowerCollision(obj){
        // collision avec le sol
    }

    handlePowerMonster(monster,obj){
        obj.destroy();
    }

}