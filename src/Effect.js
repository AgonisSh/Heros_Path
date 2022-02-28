// Effects :
/*
    - Burn : B
    - Freeze : F
    - Speed : S
    - Heal : H
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

    burn(entity,dmg){
        // tous les 100ms faire =>
        let interval = window.setInterval(()=>{
            entity.incur(this.level*dmg*0.15);
        }, 100);
        return interval
    }

    slow(entity){
        entity.speed *= 0.25;
        return this.burn(entity,0.1)
    }
    heal(entity){
        let interval = window.setInterval(()=>{
            entity.health.increase(this.level*0.7);
        }, 100);
        return interval
    }

    applyEffect(entity){
        let initSpeed = entity.speed;
        let interval
        switch(this.name){
            case 'B':
                interval = this.burn(entity,10);
                break;
            case 'F':
                interval = this.slow(entity);      
                break;
            case 'S':
                entity.speed = entity.speed*this.level*0.7;
                break;
            case 'H':
                interval = this.heal(entity)
            default:
                console.log("Aucun effet ?!")
        }
        setTimeout(()=>{
            entity.speed=initSpeed;
            clearInterval(interval) 
        }, 2500*this.level);
    }

}
