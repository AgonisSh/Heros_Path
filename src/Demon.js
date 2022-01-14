import Monster from "./Monster";

const AGGRO_RANGE = 1500;
const CLOSE_RANGE = 10;

const SPEED = 200;
const JUMP_STRENGTH = 400;

export default class Demon extends Monster
{

    constructor(scene,x,y) {
        super(scene,x,y,"demon","big_demon_idle_anim_f0G.png",1);

        this.direction = -1;		// la direction du mob. 1 = droite, -1 = gauche
        this.idle = false;
        this.prevX = -1;
        this.hp = 2;
    }

    update()
    {
        if (this.idle) {
            if (this.direction == 1) {
                this.play("idleRDemon", true);
                if (this.x > this.player.x) this.idle = false;
                console.log("!!!");
            } else {
                this.play("idleLDemon", true);
                if (this.player.x > this.x) this.idle = false;
            }
            this.setVelocityX(0);

            if (!this.idle) this.prevX = -1;
        }

        else {
            if (this.x < this.player.x) this.direction = 1;
            else this.direction = -1;

            if (Math.abs(this.player.x - this.x) > AGGRO_RANGE || Math.abs(this.player.x - this.x) < CLOSE_RANGE) {		// If out of aggro range
                if (this.direction == 1) this.play("idleRDemon", true);
                else this.play("idleLDemon", true);
                this.setVelocityX(0);
            } else {
                if (this.direction == 1) this.play("runRDemon", true);
                else this.play("runLDemon", true);
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
}