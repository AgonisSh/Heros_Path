import Monster from "./Monster";

const AGGRO_RANGE = 600;
const CLOSE_RANGE = 10;

const SPEED = 100;
const JUMP_STRENGTH = 300;

export default class Ogre extends Monster
{

    constructor(scene,x,y) {
        super(scene,x,y,"ogre","ogre_idle_anim_f0G.png",1);

		this.direction = 1;		// la direction du mob. 1 = droite, -1 = gauche
		this.idle = false;
		this.prevX = -1;
    }

    update()
    {
		if (this.idle) {
		if (this.direction == 1) {
			this.play("idleROgre", true);
			if (this.x < this.player.x) this.idle = false;
			else return;
		} else {
			this.play("idleLOgre", true);
			if (this.player.x < this.x) this.idle = false;
			else return;
		}
		this.setVelocityX(0);

		if (!this.idle) this.prevX = -1;
	}

		if (this.x < this.player.x) this.direction = 'R';
		else this.direction = 'L';

		if (Math.abs(this.player.x - this.x) > AGGRO_RANGE || Math.abs(this.player.x - this.x) < CLOSE_RANGE) {		// If out of aggro range
			if (this.direction == 1) this.play("idleROgre", true);
			else this.play("idleLOgre", true);
			this.setVelocityX(0);
		} else {
			if (this.direction == 1) this.play("runROgre", true);
			else this.play("runLOgre", true);
			this.setVelocityX(SPEED * this.direction);

			if (this.body.onFloor()) {
				if ((this.direction == 1 && this.body.blocked.right) || (this.direction == -1 && this.body.blocked.left)) {
					if (this.prevX == this.x) this.idle = true;		// if in front of too high wall
					else {
						this.setVelocityY(-JUMP_STRENGTH);
						this.prevX = this.x;
					}
				}
			}
		}
	}
}