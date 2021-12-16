import Monster from "./Monster";

export default class Ogre extends Monster
{
    constructor(scene,x,y,texture,animation,speed) {
        super(scene,x,y,texture,animation,speed);
    }

    playAnimationKey(key)
    {
        switch (key){
            case 0:
                this.play('idleROgre',true);
                break;
            case 1:
                this.play('runLOgre',true);
                break;
            case 2:
                this.play('runROgre',true);
                break;

        }
    }


}