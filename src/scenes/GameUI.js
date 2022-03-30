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

        // Event to capture the new power
        this.gameScene.events.on('addPower', function (imageName,qt) {
            this.powerImage.setTexture(imageName)            
            // Dimension de l'image.
            this.powerImage.setScale(0.10,0.10)
            this.countPowers=qt
            this.powerQuantity.setText(this.countPowers)
        }, this);

        this.gameScene.events.on('usePower', function (qt) {

            this.countPowers=qt

            this.powerQuantity.setText(this.countPowers)

            if(this.countPowers == 0){
                this.powerImage.setTexture("")
            }
            this.powerImage.setScale(0.10,0.10)
        }, this);

        this.gameScene.events.on('restart',()=>{
            this.countPowers=0
            this.scene.restart()
        }, this);

        // Menu
        this.createMenu();
    }

    createMenu()
    {
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.esc = true;
        this.music = true;

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
        this.optionMusic = this.add.image(width / 2, height / 2 - height / 10 * 0.5, "");
        this.optionMusic.setTexture("menu_music_on");
        this.optionQuit = this.add.image(width / 2, height / 2 + height / 10 * 1.5, "");
        this.optionQuit.setTexture("menu_back");

        this.menuTitle.setScale(0.8, 0.8);
        this.menuResume.setScale(0.3, 0.3);
        this.menuOptions.setScale(0.3, 0.3);
        this.menuQuit.setScale(0.3, 0.3);
        this.optionMusic.setScale(0.3, 0.3);
        this.optionQuit.setScale(0.3, 0.3);

        this.children.bringToTop(this.menuBackground);
        this.children.bringToTop(this.menuTitle);
        this.children.bringToTop(this.menuResume);
        this.children.bringToTop(this.menuOptions);
        this.children.bringToTop(this.menuQuit);
        this.children.bringToTop(this.optionMusic);
        this.children.bringToTop(this.optionQuit);

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
            this.showOptions();
        });
        this.menuOptions.on("pointerover", (pointer) => {
            this.menuOptions.setTexture("menu_options_hover");
        });
        this.menuOptions.on("pointerout", (pointer) => {
            this.menuOptions.setTexture("menu_options");
        });

        this.menuQuit.setInteractive();
        this.menuQuit.on("pointerup", () => {
            this.gameScene.quit();
        });
        this.menuQuit.on("pointerover", (pointer) => {
            this.menuQuit.setTexture("menu_quit_hover");
        });
        this.menuQuit.on("pointerout", (pointer) => {
            this.menuQuit.setTexture("menu_quit");
        });

        this.optionMusic.setInteractive();
        this.optionMusic.on("pointerup", () => {
            if (this.music) {
                this.music = false;
                this.optionMusic.setTexture("menu_music_off_hover");
                this.gameScene.music.setVolume(0);
            } else {
                this.music = true;
                this.optionMusic.setTexture("menu_music_on_hover");
                this.gameScene.music.setVolume(0.2);
            }
        });
        this.optionMusic.on("pointerover", (pointer) => {
            if (this.music) this.optionMusic.setTexture("menu_music_on_hover");
            else this.optionMusic.setTexture("menu_music_off_hover");
        });
        this.optionMusic.on("pointerout", (pointer) => {
            if (this.music) this.optionMusic.setTexture("menu_music_on");
            else this.optionMusic.setTexture("menu_music_off");
        });

        this.optionQuit.setInteractive();
        this.optionQuit.on("pointerup", () => {
            this.hideOptions();
        });
        this.optionQuit.on("pointerover", (pointer) => {
            this.optionQuit.setTexture("menu_back_hover");
        });
        this.optionQuit.on("pointerout", (pointer) => {
            this.optionQuit.setTexture("menu_back");
        });

        this.hideMenu();
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
        this.optionMusic.visible = false;
        this.optionQuit.visible = false;
    }

    showOptions()
    {
        this.menuShown = true;
        this.menuResume.visible = false;
        this.menuOptions.visible = false;
        this.menuQuit.visible = false;
        this.optionMusic.visible = true;
        this.optionQuit.visible = true;
        this.scene.bringToTop(this.optionMusic);
        this.scene.bringToTop(this.optionQuit);
    }

    hideOptions()
    {
        this.menuResume.visible = true;
        this.menuOptions.visible = true;
        this.menuQuit.visible = true;
        this.optionMusic.visible = false;
        this.optionQuit.visible = false;
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