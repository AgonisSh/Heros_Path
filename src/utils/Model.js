 // SpellType:
// -0 : Effet sur l'entité utilisant le sort
// -1 : Normal (sans rebond)
// -2 : avec gravité + Rebond

// B+5 : Brûlure niveau 5
 //  /!\  The name of the power == image name
var powersList=[
    {id:0,name:"fireball",sound:"fireball",damage:35,velocity:635,lifespan:6000,effect:"B+1",spellType:2,scale: 0.05},
    {id:1,name:"freezer",sound:"freezer",damage:25,velocity:150,lifespan:5000,effect:"F+3",spellType:1, scale: 0.1},
    {id:2,name:"getsugaTensho",sound:"drown",damage:150, velocity:700,lifespan:6000,effect:"B+5",spellType:1, scale: 0.30},
    {id:3,name:"ghost",sound:"pickPower",damage:0,velocity:0,lifespan:2500,effect:"S+2",spellType:0, scale: 0.25},
    {id:4,name:"astralInfusion",sound:"heal",damage:0,velocity:0,lifespan:1500,effect:"H+1",spellType:0, scale: 0.25}
]

export {powersList};
