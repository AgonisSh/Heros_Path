export default class Options extends Phaser.Scene{
    constructor(){
        super('Options');
        
    }
    create(){
        const { width, height } = this.game.renderer;
        
        const title_option = this.add.text(width/2,height*0.2,"Options")

        title_option.setScale(100,100)

        


    }
}