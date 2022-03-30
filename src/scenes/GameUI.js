export default class GameUI extends Phaser.Scene {

    constructor ()
    {
        super('GameUI');
        this.countPowers=0;
        
    }

    create ()
    {
        let { width, height } = this.sys.game.canvas;

        this.powerImage = this.add.image(width*0.12-25, height*0.11-25, '').setInteractive();
        this.powerImage.setScale(0.10,0.10)

        // Display power
        let powerInfo = this.add.text(width*0.015, height*0.10-25, 'Power:',{ fontFamily: 'Arial', fontSize: 24, color: '#00ff00' })
        this.powerQuantity= this.add.text(width*0.10-25, height*0.10-25,this.countPowers,{ fontFamily: 'Arial', fontSize: 64, color: '#00ff00' })

        this.gameScene = this.scene.get('Game')

        this.gameScene.events.on('setPowerUI', function () {
            this.powersController = this.gameScene.player.power
        }, this);

        // Event to capture the new power
        this.gameScene.events.on('updatePowerUI', function (imageName,qt) {
            /*
            this.powerImage.setTexture(imageName)            
            // Dimension de l'image.
            this.powerImage.setScale(0.10,0.10)
            this.countPowers=qt
            this.powerQuantity.setText(this.countPowers)
            */
            console.log("ok",this.powersController.children.length)

            this.powerImage.setTexture(this.powersController.getFirst() == null ? "" : this.powersController.getFirst().powerName)
            
            this.powerImage.setScale(0.10,0.10)
            this.powerQuantity.setText(this.powersController.count)
            

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
        this.menuTitle.setScale(0.8, 0.8);
        this.menuResume.setScale(0.3, 0.3);
        this.menuOptions.setScale(0.3, 0.3);
        this.menuQuit.setScale(0.3, 0.3);

        this.children.bringToTop(this.menuBackground);
        this.children.bringToTop(this.menuTitle);
        this.children.bringToTop(this.menuResume);
        this.children.bringToTop(this.menuOptions);
        this.children.bringToTop(this.menuQuit);
        this.menuResume.setInteractive();
        this.menuResume.on("pointerup", () => {
            this.hideMenu();
        });
        this.menuResume.on("pointerover", (pointer) => {
            this.menuResume.setTexture("menu_resume_hover");
        });
        this.menuResume.on("pointerout", (pointer) => {
            this.menuResume.setTexture("menu_resume");
        });
        this.menuOptions.setInteractive();
        this.menuOptions.on("pointerup", () => {
            this.hideMenu();
        });
        this.menuOptions.on("pointerover", (pointer) => {
            this.menuOptions.setTexture("menu_options_hover");
        });
        this.menuOptions.on("pointerout", (pointer) => {
            this.menuOptions.setTexture("menu_options");
        });
        this.menuQuit.setInteractive();
        this.menuQuit.on("pointerup", () => {
            //this.hideMenu();
            this.scene.start('Menu');
        });
        this.menuQuit.on("pointerover", (pointer) => {
            this.menuQuit.setTexture("menu_quit_hover");
        });
        this.menuQuit.on("pointerout", (pointer) => {
            this.menuQuit.setTexture("menu_quit");
        });
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.hideMenu();
        this.esc = true;
    }

    showMenu()
    {
        console.log("showMenu");
        this.gameScene.scene.pause();
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
        this.gameScene.scene.resume('Game');
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