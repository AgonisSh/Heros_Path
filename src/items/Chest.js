import Powers from "../items/Powers"

export default class Chest extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "chest")


        this.scene = scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(0.8);

        this.setBounce(0.2);
        this.body.setGravityY(800);

        this.setCollideWorldBounds(true);

        this.scene.physics.add.collider(this, this.scene.layerGround); // Collison entre layer sol et mob


    }
}