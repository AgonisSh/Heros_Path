import Monster from "./Monster";

const OGRE_SPEED = 100;
const OGRE_JUMP_STRENGTH = 300;

export default class Ogre extends Monster
{

    constructor(scene,x,y,texture,animation,speed) {
        super(scene,x,y,texture,animation,speed);
        this.xSpeed = 0;
        this.ySpeed = 0;
		this.direction = 0;		// la direction du mob, utile pour s'il se trouve face à un mur
		this.prevX = 0;		// l'emplacement du mob avant qu'il ne saute, à comparer avec son x après le saut
		this.locked = false;
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
		if (this.locked) {
			if (this.direction == 0) {
				this.play('idleLOgre', true);
				this.setVelocityX(0);
				if (this.player.x > this.x) this.locked = false;
			} else {
				this.play('idleROgre', true);
				this.setVelocityX(0);
				if (this.player.x < this.x) this.locked = false;
			}
		}
				/* Les déplacements de l'ogre */
        // stop if out of aggro range
        else if(this.player.x - this.x > 600){
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
			this.setVelocityX(-OGRE_SPEED);
            this.play('runLOgre',true);
			this.direction = 0;
            // jump if blocked
            if (this.body.blocked.left && this.body.onFloor()) {
				if (this.prevX == this.x) this.locked = true;
				this.setVelocityY(-OGRE_JUMP_STRENGTH);
				this.prevX = this.x;
			}
        }
        else if(this.player.x > this.x){
            //if (this.XSpeed < OGRE_MAX_SPEED) this.XSpeed += OGRE_SPEED_INCREASE;
            //this.setVelocityX(this.XSpeed);
			this.setVelocityX(OGRE_SPEED);
            this.play('runROgre',true);
			this.direction = 1;
            // jump if blocked
            if (this.body.blocked.right && this.body.onFloor()) {
				if (this.prevX == this.x) this.locked = true;
				this.setVelocityY(-OGRE_JUMP_STRENGTH);
				this.prevX = this.x;
			}
        }
    }
}