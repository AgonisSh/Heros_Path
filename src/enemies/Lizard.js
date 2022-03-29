import Monster from "./Monster";

const AGGRO_RANGE = 600;
const CLOSE_RANGE = 10;

const JUMP_STRENGTH = 200;

export default class Lizard extends Monster
{

    constructor(scene,x,y) {
        super(scene,x,y,"lizard","lizard_f_idle_anim_f0G.png",1);
        this.scene = scene;
        this.direction = 1;		// la direction du mob. 1 = droite, -1 = gauche
        this.idle = false;
        this.prevX = -1;
        this.health.value = 25;
        this.speed=400;
    }

    update()
    {

        super.update();


        if (this.onHit) {
            return
        }

        if (this.idle) {
            if (this.direction == 1) {
                this.play("idleRlizard", true);
                if (this.x > this.player.x) this.idle = false;
            } else {
                this.play("idleLlizard", true);
                if (this.player.x > this.x) this.idle = false;
            }
            this.setVelocityX(0);

            if (!this.idle) this.prevX = -1;
        }

        else {
            if (this.x < this.player.x) this.direction = 1;
            else this.direction = -1;

            if (Math.abs(this.player.x - this.x) > AGGRO_RANGE || Math.abs(this.player.x - this.x) < CLOSE_RANGE) { // If out of aggro range
                if (this.direction == 1) this.play("idleRlizard", true);
                else this.play("idleLlizard", true);
                this.setVelocityX(0);
            } else {
                if (this.direction == 1) this.play("runRlizard", true);
                else this.play("runLlizard", true);
                this.setVelocityX(this.speed * this.direction);

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
    attack(player,monster){
        super.attack(player,monster);
    }
}
