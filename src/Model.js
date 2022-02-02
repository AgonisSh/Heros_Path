 // SpellType:
// -0 : Effet sur le joueur
// -1 : Normal
// -2 : avec Rebond
var powersList=[
    {id:0,name:"fireball",damage:35,velocity:700,lifespan:6000,effect:"B+1",spellType:2},
    {id:1,name:"freezer",damage:25,velocity:150,lifespan:5000,effect:"F+3",spellType:1},
    {id:2,name:"getsugaTensho",damage:150, velocity:750,lifespan:4500,effect:"B+4",spellType:1},
    {id:3,name:"ghost",damage:0,velocity:0,lifespan:2500,effect:"S+2",spellType:0}
]

export {powersList};
