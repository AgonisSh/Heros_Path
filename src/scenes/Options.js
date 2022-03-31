export default class Options extends Phaser.Scene{
    constructor(){
        super('Options');
        
    }
    create(){
        const { width, height } = this.game.renderer;
        
        const title_option = this.add.text(width/2,height*0.2,"Options")

        title_option.setScale(100,100)

        this.optionMusic = this.add.image(width / 2, height / 2 - height / 10 * 0.5, "");
        this.optionMusic.setTexture("menu_music_on");
        this.optionQuit = this.add.image(width / 2, height / 2 + height / 10 * 1.5, "");
        this.optionQuit.setTexture("menu_back");

        this.children.bringToTop(this.optionMusic);
        this.children.bringToTop(this.optionQuit);

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
    }
}