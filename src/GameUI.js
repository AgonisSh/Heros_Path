export default class GameUI extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'UIScene', active: true });
        this.countPowers=0;
    }

    create ()
    {

        this.powerImage = this.add.image(110, 25, '').setInteractive();

        // Display power
        let powerInfo = this.add.text(10, 10, 'Power:',{ fontFamily: 'Arial', fontSize: 24, color: '#00ff00' })
        this.powerQuantity= this.add.text(110,10,this.countPowers,{ fontFamily: 'Arial', fontSize: 64, color: '#00ff00' })

        this.game = this.scene.get('Game')

        // Event to capture the new power
        this.game.events.on('addPower', function (imageName,qt) {
            this.powerImage.setTexture(imageName)            
            // Dimension de l'image.
            this.powerImage.setScale(0.10,0.10)
            this.countPowers=qt
            this.powerQuantity.setText(this.countPowers)
        }, this);

        this.game.events.on('usePower', function (qt) {

            this.countPowers=qt

            this.powerQuantity.setText(this.countPowers)

            if(this.countPowers == 0){
                this.powerImage.setTexture("")
            }
            this.powerImage.setScale(0.10,0.10)
        }, this);

        this.game.events.on('restart',()=>{
            this.countPowers=0
            this.scene.restart()
        }, this);
    }
}