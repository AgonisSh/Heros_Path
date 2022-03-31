import Phaser from 'phaser'


export class Button extends Phaser.GameObjects.Container
{
    
    constructor(scene,x,y,text) {
        super(scene,x,y)

        
        this.image = scene.add.image(x,y,"button")

        this.text = scene.add.text(x,y,text)

        this.text.setFontSize(30);
        this.text.setOrigin(0.5);

        this.setSize(this.image.width,this.image.height)
        
        
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
                this.image.setTint(0xff0000)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                this.image.setTint(0xffffff)
            })
    }

}

export default class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
        
    }
    preload(){
        this.load.image('title','assets/img/title.png',100,100);
        this.load.image('button','assets/img/button.png',20,20);
    }

    create(){

        
        this.add.image(this.game.renderer.width/2,this.game.renderer.height*0.20,"title");

        const { width, height } = this.game.renderer;


        this.add.text(width*0.005,height-20,"Powered by Phaser3")
        this.add.text(width*0.005,height-50,"Made by Shala,Karim,Imaloui,Stirnemann")


        const playButton = new Button(this,width/2,height/2,"Play")
        const optionButton = new Button(this,width/2,height/2+115,"Options")
        const contactButton = new Button(this,width/2,height/2+115*2,"Contact")

        this.add.existing(playButton)
        this.add.existing(optionButton)
        this.add.existing(contactButton)


        playButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
                this.scene.launch("GameUI");
                this.scene.start('Game');
            })

        optionButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start('Options');
        })
        contactButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start('Contact');
        })
    }
}