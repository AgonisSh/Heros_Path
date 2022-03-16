import Monster from "./Monster";
import Powers from "./Powers";
import {Power} from "./Powers";

import { powersList } from './Model';

const AGGRO_RANGE = 1500;
const CLOSE_RANGE = 10;

const JUMP_STRENGTH = 400;

export default class Demon extends Monster
{

    constructor(scene,x,y) {
        super(scene,x,y,"demon","big_demon_idle_anim_f0G.png",1);

        this.direction = -1;		// la direction du mob. 1 = droite, -1 = gauche
        this.idle = false;
        this.prevX = -1;

        this.health.value = 150;

        this.power = new Powers(this.scene);

        this.damage = 60;
        this.speed=90;

    }

    update()
    {
        super.update();


        if (this.onHit) {
            return
        }

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
                this.setVelocityX(this.speed * this.direction);
                console.log("Joueur proche")
                this.throwBall(this.player);

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

    throwBall(entity){

        // Get the angle between the player and the monster
        // https://phasergames.com/get-the-angle-between-2-objects-in-phaser/
        // ou https://phaser.io/examples/v3/view/physics/arcade/velocity-from-angle
        //var angleRadians = Math.atan2(entity.y - this.y, entity.x - this.x)
        var angleRadians = Phaser.Math.Angle.BetweenPoints(this,this.player);

        if(this.power.getLength()<=1){
            this.chargePower()
        }

        this.power.usePower(this.direction == -1 ? this.x-25 : this.x+25 , this.y+5, this.direction==1 ? "left":"right",angleRadians+100)
    }

    chargePower() {
        let pow = Power.fromJSON(this.scene,powersList[0]);
        pow.damage = 10;
        pow.velocity=300;
        pow.lifespan=2000;
        this.power.addPower(pow)
    }

    attack(player,monster){
        super.attack(player,monster);
    }


    incur(obj1, obj2, vector) {
        super.incur(obj1,obj2,vector);
    }

}