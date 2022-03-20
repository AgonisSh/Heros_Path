export default class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }
    init(){
        console.log("Menu clear !")
    }
    create(){
        console.log("test menu");
        this.add.image(this.game.renderer.width/2,this.game.renderer.height*0.20,"title");
        
        let playButton = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,"start-button")

        playButton.setInteractive();


        playButton.on("pointerover",()=>{
            playButton.setTint(0x000000)
        })

        playButton.on("pointerout",()=>{
            playButton.setTint(0xff0000)

        })

        playButton.on("pointerup",()=>{
            this.scene.launch("GameUI");
            this.scene.start('Game');
        })
    
    }
}