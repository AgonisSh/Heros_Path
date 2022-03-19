export class Menu extends Phaser.scene{
    constructor() {
        super();
    }
    create(){
        this.add.image(0,0,"title").setOrigin(0).setDepth(0);
    }
}