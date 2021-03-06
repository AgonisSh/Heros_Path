import 'phaser';
import Player from "../characters/Player";
import Powers from "../items/Powers";
import {map1Data,map2Data} from "../utils/Model";
import Chest from '../items/Chest';
import Monster from '../enemies/Monster';
import Ogre from "../enemies/Ogre";
import Demon from "../enemies/Demon"
import Lizard from "../enemies/Lizard"


export default class Game extends Phaser.Scene{
    constructor() {
        super('Game'); // game is the key of the scene
      
        this.score=0
        this.scoreDiv = document.createElement("div");
        this.nextLevel = false;
    }

    /**
     * Charge la map
     * La map mesure 32x32 bloc
     */
    loadMap(data){
        console.log(data)
        this.map = this.make.tilemap({ key: data.mapName, tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage(data.tileSetImage,data.tiles);  // Faut mettre nom de la tile dans Tiled
        //layers :
        this.layerBackground = this.map.createLayer("Background",this.tileset, 0, 0);
        this.layerBackgroundDecors = this.map.createLayer("BackgroundDecor",this.tileset, 0, 0);
        this.layerWater = this.map.createLayer("Water",this.tileset, 0, 0);
        this.layerGround = this.map.createLayer("Ground",this.tileset, 0, 0);
        this.layerGround.setCollisionByExclusion([-1]);  // on ajoute les collisions au layerGround qui est le sol ici
        // Le limite du monde :
        this.physics.world.bounds.width = this.layerBackground.width;
        this.physics.world.bounds.height = this.layerBackground.height;
    }

    loadMusic(){
        // Musique :
        this.music = this.sound.add('music1');
        this.music.play({
            volume: 0.2,
            loop: true
        });
        this.victoryMusic = this.sound.add('victory');
    }
    loadSound(){
        this.pickCoin = this.sound.add("pickupCoin",{ loop: false,volume: 0.3 });
        this.jump = this.sound.add("jump",{ loop: false, volume: 0.3 });
        this.drown = this.sound.add("drown",{ loop: false, volume: 0.3 });
        this.death = this.sound.add("player-dead",{ loop: false, volume: 0.3 });
        this.hit = this.sound.add("hit",{ loop: false, volume: 0.3 });
        this.fire = this.sound.add("fireball",{ loop: false, volume: 0.3 });
        this.hightHit= this.sound.add("hit-hight",{ loop: false, volume: 0.3 });
        this.kill = this.sound.add("monster-dead",{ loop: false, volume: 0.3 });
        this.pickPower = this.sound.add("pickPower",{ loop: false, volume: 0.3 });
    }

    /**
     * G??re la collision entre les pi??ces et le joueur
     * @param player
     * @param coins
     */
    collectCoins (player, coins)
    {
        this.pickCoin.play();
        coins.disableBody(true, true);
        this.score += 10;
        
        /**** ** ** */
        this.scoreDiv.innerHTML = 'Score: ' + this.score;
    }

    create ()
    {
        this.loadMap(this.nextLevel ? map2Data[0] : map1Data[0]);
        this.loadMusic();
        this.loadSound();

        // Les touches du clavier
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this,100,600,'player','knight_m_idle_anim_f0.png',400);

        this.events.emit('setPowerUI');


        this.coins = this.physics.add.group({
            key: 'coins',
            repeat: 20,
            setXY: { x: 100, y: 100, stepX: 1500 }
        });

        this.physics.add.collider(this.player, this.layerGround); // Collison entre layer sol et perso
        this.physics.add.collider(this.player, this.layerWater); // Collison entre player et eau

        this.physics.add.collider(this.coins, this.layerGround);
        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);

        this.coins.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        });

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // camera qui suit le joueur
        this.cameras.main.startFollow(this.player);
        // Zoom
        this.cameras.main.setZoom(1.3);

        document.getElementsByTagName("body")[0].appendChild(this.scoreDiv);
        this.scoreDiv.innerHTML = "Score: " + this.score;
        this.scoreDiv.style.align = "top";
        this.scoreDiv.style.color = "white";
        this.scoreDiv.style.fill = "#000";
        this.scoreDiv.style.fontFamily = "fantasy";
        this.scoreDiv.style.fontSize = '32px';
        this.scoreDiv.style.position = "absolute";
        this.scoreDiv.style.right = "100px";
        this.scoreDiv.style.top = "100px";
        this.scoreDiv.style.zIndex = "65532";

        
        this.monsters = this.add.group();
        this.monsters.enableBody = true;
        let monstersData = this.nextLevel ? map2Data : map1Data
        monstersData.forEach(function(e){
            let monster;
            switch (e.type){
                case "lizard" :
                    monster = new Lizard(this,e.x,e.y)
                    break
                case "ogre" :
                    monster = new Ogre(this,e.x,e.y)
                    break
                case "demon" :
                    monster = new Demon(this,e.x,e.y)
                    break
            }
            if(monster) this.monsters.add(monster)
        },this)


        this.chests = this.physics.add.group({
            classType: Chest,
            key: 'chest',
            repeat: 14,
            setXY: { x: 640, y: 100, stepX: 2000 }
        });

        this.physics.add.overlap(this.chests, this.player,this.openChest, null, this); // Collison entre le joueur et le mob.

    }

    /**
     * 
     * @param {*} obj player
     * @param {*} obj2 chest
     */
     openChest(obj, obj2) {
        let pow = Powers.giveToMe(this,Powers.getRandomPower(),null)

        obj.collectPower(pow,1)

        this.events.emit('updatePowerUI', pow.name, obj.power.count);

        obj2.destroy()
    }

    update()
    {
        if(this.player.isAlive==false){
            this.restart2();
        }

        // Endgame si fin de niveau
        if(this.player.x > this.physics.world.bounds.width - 100 ){
            this.endGame();
        }
        // mouvement joueur
        this.player.update();

        this.monsters.getChildren().forEach(function(monster){
            if(monster.isVivant == 1) monster.update();
            if(this.layerWater.getTileAtWorldXY(monster.x,monster.y) != null) monster.kill()
        },this)

        if (this.layerWater.getTileAtWorldXY(this.player.x, this.player.y) != null) this.player.kill();
        // TODO: remove after presentation
        if (this.player.x == 12.8 && this.player.y == 777.6) {
            this.player.x = 15600;
            this.player.y = 778;
        }
    }

    restart2() {
        this.music.stop();
        this.score = 0;
        this.scene.restart();
        this.events.emit('restart');
    }

    endGame() {
        this.music.stop()
        this.victoryMusic.play({
            volume:0.2,
            loop: false
        })
        this.player.kill();
        alert("Bravo !! vous avez fini le niveau 1 avec un score de : "+this.score);
        this.nextLevel = this.nextLevel ? false : true;
        this.restart2();
        if(!(this.nextLevel)) this.quit();
    }

    quit()
    {
        this.scene.stop('Game');
        this.scene.start('Menu');
        this.scene.stop('GameUI');
        this.game.sound.stopAll();
    }
}