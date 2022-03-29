 // SpellType:
// -0 : Effet sur l'entité utilisant le sort
// -1 : Normal (sans rebond)
// -2 : avec gravité + Rebond

// B+5 : Brûlure niveau 5
 //  /!\  The name of the power == image name
var powersList=[
    {id:0,name:"fireball",sound:"fireball",damage:35,velocity:635,lifespan:6000,effect:"B+1",spellType:2,scale: 0.05,probability:0.2},
    {id:1,name:"freezer",sound:"freezer",damage:25,velocity:150,lifespan:5000,effect:"F+3",spellType:1, scale: 0.1,probability:0.2},
    {id:2,name:"getsugaTensho",sound:"drown",damage:150, velocity:700,lifespan:6000,effect:"B+5",spellType:1, scale: 0.30,probability:0.1},
    {id:3,name:"ghost",sound:"pickPower",damage:0,velocity:0,lifespan:2500,effect:"S+2",spellType:0, scale: 0.25,probability:0.1},
    {id:4,name:"astralInfusion",sound:"heal",damage:0,velocity:0,lifespan:1500,effect:"H+1",spellType:0, scale: 0.25,probability:0.4}
]

 // Position of the monsters for the first map
 var monstersMap1 = [
     {id: 0, type: "lizard", x: 700, y: 700},
     {id: 1, type: "ogre", x: 1350, y: 700},
     {id: 2, type: "ogre", x: 3000, y: 700},
     {id: 3, type: "demon", x: 6000, y: 800},
     {id: 4, type: "ogre", x: 11000, y: 700},
     {id: 5, type: "ogre", x: 11500, y: 700},
     {id: 6, type: "ogre", x: 12000, y: 700},
     {id: 7, type: "demon", x: 14500, y: 900}
 ]


 var monstersMap2 = [
     {id: 0, type: "ogre", x: 700, y: 700},
     {id: 1, type: "ogre", x: 1350, y: 700},
     {id: 2, type: "ogre", x: 3000, y: 700},
     {id: 3, type: "demon", x: 4000, y: 800},
 ]


export {powersList};
export {monstersMap1,monstersMap2};
