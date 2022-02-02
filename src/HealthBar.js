export default class HealthBar {

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this._value; // this._  <=> private
        this._max=100;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    set value(val){
        this._value = val;
        this._max=val;
        this.p = 76 / this._max;
    }

    decrease (amount){
        this._value -= amount;

        if (this._value < 0)
        {
            this._value = 0;
        }

        this.draw();

        return (this._value === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  Background
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, (80*this._max)/100, 16);

        //  Health
        this.bar.fillStyle(0xffffff); // 76 == 100 | x == 50 -> x = 76*50/100
        this.bar.fillRect(this.x + 2, this.y + 2, (76*this._max)/100, 12);

        if (this._value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this._value);

        this.bar.fillRect(this.x + 2, this.y + 2, (d*this._max)/100, 12);
    }

    follow(x,y){
        this.x=x;
        this.y=y;
        this.draw()
    }

    destroy(){
        this.bar.destroy(true);
    }


}