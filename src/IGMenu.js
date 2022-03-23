import "phaser"

export default class IGMenu extends Phaser.Scene
{
	constructor(scene)
	{
		super("IGMenu");
		this.gameScene = scene;
	}

	create()
	{
		this.gameScene.scene.pause();

		this.background = this.add.rectangle(0, 0, this.gameScene.width, this.gameScene.height, 0xbbbbbb, 0.5);
		this.title = this.add.text("Pause");
		this.btn1 = this.add.text("Clic 01");

		this.btn1.setInteractive();
		this.btn1.on("pointerup", () => {
			console.log("clic");
		});
	}

	destroy()
	{
		this.game.scene.run();
	}
}