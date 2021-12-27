
// represent one element
export default class Power extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,powerName) {
        super(scene,x,y,powerName);
        this.enableBody=true;
        this.setScale(0.02,0.02);

        this.damage = 0;
        this.velocity = 700;
        this.name = powerName;

        this.scene = scene;
        this.scene.add.existing(this);
    }

    usePower(x,y,side){
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);

        this.body.setBounce(1);
        this.setCollideWorldBounds(true);

        switch (side)
        {
            case 'left':
                this.setVelocityX(-this.velocity);
                break
            case 'right':
                this.setVelocityX(this.velocity);
                break
        }
    }
}

