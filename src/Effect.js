// Effects :
/*
    - Burn : B
    - Freeze : F
    - Speed : S
*/
export default class Effect {
    
    constructor(name,level){
        this.name=name
        this.level=level
    }

    static load(chaine){
        let c = chaine.split("+").join('-').split('-');
        let generatedEffect = new Effect(c[0],c[1])
        return generatedEffect
    }

    burn(entity){
        
        let interval = window.setInterval(()=>{
            entity.incur(this.level*10*0.15);
        }, 100);

        return interval
        
    }

    slow(entity){
        entity.speed *= 0.25
        let interval = window.setInterval(()=>{
            entity.incur(this.level*0.35);
        }, 100);
        return interval
    }

    applyEffect(entity){
        let initSpeed = entity.speed;
        let interval
        switch(this.name){
            case 'B':
                interval = this.burn(entity);
                break;
            case 'F':
                interval = this.slow(entity);      
                break;
            case 'S':
                entity.speed = entity.speed*this.level*0.7;

                break;
            default:
                console.log("Aucun effet ?!")
        }
        setTimeout(()=>{
            // reset :l
            entity.speed=initSpeed;
            clearInterval(interval) 
        }, 2500*this.level);
        

    }

}
