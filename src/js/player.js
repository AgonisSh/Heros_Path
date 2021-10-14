class Player{
    constructor() {
        this.x = 10;
        this.y = 120;
        this.vx=0;
        this.vy=0;
        this.weight = 1; // graviter ( Rq : A mettre dans une autre classe ? Ex: world ? )
        this.velocity =1; // déplacement
        this.width = 15;
        this.height = 15;
    }

    /**
     * Met a jours les attributs du joueur a chaques secondes.
     */
     update_player() {
        player.vy += player.weight;
        this.x += this.vx;
        this.y += this.vy;
        console.log("Cordo y : " + this.y
            + " vecteur y " + this.vy
            + " vecteur x " + this.vx);
        // collision avec le sol du niveau

        // Résistance au mouvement qui se produit entre le joueur et le sol . => cool : ajoute du réalisme
        if(player.vy!==0){
            player.vy*=0.95;
        }
        if(player.vx!==0){
            player.vx*=0.95;
        }

        if (this.y > (canvas.heigth / 6)) {
            this.y = (canvas.heigth / 6);
            this.vy = 0;
        }
    }

    draw_player(){
        ctx.fillStyle="blue";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    jump(){if (this.vy === 0 && this.onGround()) this.vy = -20;}

    onGround() {return this.y===(canvas.heigth/6);}

    right() {
        this.vx +=0.5 ;
    }

    left() {
        this.vx -=0.5 ;
    }
}

