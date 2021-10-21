
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let player = new Player();
canvas.heigth = 720;
canvas.weigth = 1080;
var spacePress = false;

// fonction qui rend le canvas visible ou l'inverse selon le menu ...
function play(){
    if(canvas.style.visibility === "hidden") {
        showCanvas();
    }
}

function showCanvas(){
    canvas.style.visibility = "visible";
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.heigth);

    player.update_player();
    player.draw_player();

    requestAnimationFrame(animate);
}

animate();

// TO DO : Pour x raisons on ne peut pas sauter plus se déplacer ou se déplacer puis sauter ... J'ai essayer de corriger ce bug
// mais j'ai l'impression que c'est à cause du block en bas >:-(

// gérer sa avec un controller => mieu.
window.addEventListener('keydown',function(e){
    switch(e.code){
        case 'KeyD': console.log("DROITE");
            player.goRight = true;
            break;
        case 'KeyA' : console.log("GAUCHE");
            player.goLeft = true;
            break;
    }
});
window.addEventListener('keyup',function(e){
    switch(e.code){
        case 'KeyD': console.log("DROITE");
            player.goRight = false;
            break;
        case 'KeyA' : console.log("GAUCHE");
            player.goLeft = false;
            break;
    }
});
window.addEventListener('keypress',function(e){
    switch(e.code){
        case 'Space' : console.log("JUMP");
            player.jump();
            spacePress= true;
    }
});