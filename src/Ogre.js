import Monster from "./Monster";

const OGRE_MAX_SPEED = 100;

export default class Ogre extends Monster
{

    constructor(scene,x,y,texture,animation,speed) {
        super(scene,x,y,texture,animation,speed);
        this.xSpeed = 0;
        this.ySpeed = 0;
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

    update()
    {
        /* Les déplacements de l'ogre */
        // stop if out of aggro range
        if(this.player.x - this.x > 600){
            this.play('idleROgre',true);
            //if (this.XSpeed < 0) this.XSpeed += OGRE_SPEED_INCREASE;
            //if (this.XSpeed > 0) this.XSpeed -= OGRE_SPEED_INCREASE;
			//this.setVelocityX(this.XSpeed);
			this.setVelocityX(0);

        }
        else if(this.x - this.player.x > 600){
            this.play('idleLOgre',true);
            //if (this.XSpeed < 0) this.XSpeed += OGRE_SPEED_INCREASE;
            //if (this.XSpeed > 0) this.XSpeed -= OGRE_SPEED_INCREASE;
            //this.setVelocityX(this.XSpeed);
			this.setVelocityX(0);
        }
        // stop when too close of player on x axis
        else if (this.player.x - this.x < 10 && this.player.x - this.x > 0){
            this.play('idleROgre',true);
            //if (this.XSpeed < 0) this.XSpeed += OGRE_SPEED_INCREASE;
            //if (this.XSpeed > 0) this.XSpeed -= OGRE_SPEED_INCREASE;
            //this.setVelocityX(this.XSpeed);
			this.setVelocityX(0);
        } else if (this.x - this.player.x < 10 && this.x - this.player.x > 0) {
            this.play('idleLOgre', true);
            //if (this.XSpeed < 0) this.XSpeed += OGRE_SPEED_INCREASE;
            //if (this.XSpeed > 0) this.XSpeed -= OGRE_SPEED_INCREASE;
            //this.setVelocityX(this.XSpeed);
			this.setVelocityX(0);
        }
        // move
        else if(this.player.x < this.x){
            //if (this.XSpeed > -OGRE_MAX_SPEED) this.XSpeed -= OGRE_SPEED_INCREASE;
            //this.setVelocityX(this.XSpeed);
			this.setVelocityX(-OGRE_MAX_SPEED);
            this.play('runLOgre',true);
            // jump if blocked
            if (this.body.blocked.left && this.body.onFloor()) this.setVelocityY(-300);
        }
        else if(this.player.x > this.x){
            //if (this.XSpeed < OGRE_MAX_SPEED) this.XSpeed += OGRE_SPEED_INCREASE;
            //this.setVelocityX(this.XSpeed);
			this.setVelocityX(OGRE_MAX_SPEED);
            this.play('runROgre',true);
            // jump if blocked
            if (this.body.blocked.right && this.body.onFloor()) this.setVelocityY(-300);
        }
    }
}