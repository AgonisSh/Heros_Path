
// represent one element
export default class Power extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,powerName) {
        super(scene,x,y,powerName);
        this.enableBody=true;
        this.setScale(0.02,0.02);

        this.damage = 0;
        this.velocity = 700;
        this.name = powerName;
        this.lifespan = 1000 ;

        this.scene = scene;
        this.scene.add.existing(this);

        this.counter=0; // compte le nombre de collision
    }

    usePower(x,y,side){
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);

        this.body.setBounce(1);
        this.setCollideWorldBounds(true);

        switch (side) {
            case 'left':
                this.setVelocityX(-this.velocity);
                break
            case 'right':
                this.setVelocityX(this.velocity);
                break
        }
    }

    // Usefull : https://phasergames.com/how-to-get-delta-time-in-phaser-3/
    update(pow,delta){
        this.duration-=delta;
        if(this.duration <= 0){
            this.destroy();
        }

    }
}

