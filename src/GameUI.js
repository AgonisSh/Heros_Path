export default class GameUI extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'UIScene', active: true });
        this.countPowers=0;
    }

    create ()
    {
        let { width, height } = this.sys.game.canvas;

        this.powerImage = this.add.image(width*0.12-25, height*0.11-25, '').setInteractive();

        // Display power
        let powerInfo = this.add.text(width*0.015, height*0.10-25, 'Power:',{ fontFamily: 'Arial', fontSize: 24, color: '#00ff00' })
        this.powerQuantity= this.add.text(width*0.10-25, height*0.10-25,this.countPowers,{ fontFamily: 'Arial', fontSize: 64, color: '#00ff00' })

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

        // Menu
        this.createMenu();
    }

    createMenu()
    {
        let width = this.sys.game.canvas.width;
        let height = this.sys.game.canvas.height;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.menuBackground = this.add.rectangle(0, 0, width * 2, height * 2, 0x777777, 0.7);
        this.menuTitle = this.add.image(width / 2, height / 2 - height / 10 * 2.5, "");
        this.menuTitle.setTexture("menu_title");
        this.menuResume = this.add.image(width / 2, height / 2 - height / 10 * 0.5, "");
        this.menuResume.setTexture("menu_resume");
        this.menuOptions = this.add.image(width / 2, height / 2 + height / 10 * 0.5, "");
        this.menuOptions.setTexture("menu_options");
        this.menuQuit = this.add.image(width / 2, height / 2 + height / 10 * 1.5, "");
        this.menuQuit.setTexture("menu_quit");
        this.menuTitle.setScale(1.5, 1.5);
        this.menuResume.setScale(1, 1);
        this.menuOptions.setScale(1, 1);
        this.menuQuit.setScale(1, 1);

        this.children.bringToTop(this.menuBackground);
        this.children.bringToTop(this.menuTitle);
        this.children.bringToTop(this.menuResume);
        this.children.bringToTop(this.menuOptions);
        this.children.bringToTop(this.menuQuit);
        this.menuResume.setInteractive();
        this.menuResume.on("pointerup", () => {
            this.hideMenu();
        });
        this.menuOptions.setInteractive();
        this.menuOptions.on("pointerup", () => {
            this.hideMenu();
        });
        this.menuQuit.setInteractive();
        this.menuQuit.on("pointerup", () => {
            this.hideMenu();
        });
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.hideMenu();
        this.esc = true;
    }

    showMenu()
    {
        console.log("showMenu");
        this.game.scene.pause();
        this.menuShown = true;
        this.menuBackground.visible = true;
        this.menuTitle.visible = true;
        this.menuResume.visible = true;
        this.menuOptions.visible = true;
        this.menuQuit.visible = true;
        this.scene.bringToTop(this.menuBackground);
        this.scene.bringToTop(this.menuTitle);
        this.scene.bringToTop(this.menuResume);
        this.scene.bringToTop(this.menuOptions);
        this.scene.bringToTop(this.menuQuit);
    }

    hideMenu()
    {
        console.log("hideMenu");
        this.game.scene.resume('Game');
        this.menuShown = false;
        this.menuBackground.visible = false;
        this.menuTitle.visible = false;
        this.menuResume.visible = false;
        this.menuOptions.visible = false;
        this.menuQuit.visible = false;
    }

    update()
    {
        if (this.keyEsc.isDown && this.esc) {
            if (!this.menuShown) this.showMenu();
            else this.hideMenu();
            this.esc = false
        }
        if (this.keyEsc.isUp) {
            this.esc = true;
        }
    }
}