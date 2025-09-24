const canvas = document.getElementById('table');
const ctx = canvas.getContext("2d");

const start = document.getElementById("start");
const score = document.getElementById("score");
let sco=0;

const largeur=75;
const longueur =10;

             // position de la balle (axe des abscisses X)

let paddleX=(canvas.width /2)-75/2 ;
let paddleY=canvas.height-15;

let ballX = canvas.width / 2;
let ballY = paddleY -20;       

  // centrage vertical dans le canvas
let speedX = -2;  
let speedY = 2;               // vitesse de la balle
let rafId;                       // identifiant de la boucle d'animation


let isLeftPressed = false;
let isRightPressed = false;
let perdue = false;

ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = "white";
ctx.beginPath();
ctx.fillRect(paddleX, paddleY,largeur, longueur);
ctx.fill();



function drawBall() {
     // efface l'écran
    ctx.fillStyle = "red";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddle() {
    
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fillRect(paddleX, paddleY,largeur, longueur);
    ctx.fill();
}

function update() {
    ballX += speedX;
    ballY += speedY;
    const coef = 1.05;
    let nbCoef=0;
    if (ballX > canvas.width-15 && nbCoef<5 ){ speedX*=-coef;speedY*=coef;nbCoef++}
   
    if (ballX < 15 && nbCoef<5 ){ speedX*=-coef;speedY*=coef;nbCoef++}

    if (ballY > canvas.height-15 ){ perdue=true;} //speedY*=-1;
   
    if (ballY < 15 && nbCoef<5 ){ speedY*=-coef;speedX*=coef;nbCoef++}

    if (ballY + 15 >= canvas.height - 15 && ballX >= paddleX && ballX <= paddleX + 75 ) {
        if(nbCoef<5 ){
        speedY *= -coef; 
        speedX *= coef;
        nbCoef++;}
        sco += 1;
        //score.textContent="score " + sco;
    }

    if (isLeftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    if (isRightPressed && paddleX < canvas.width - 25) {
        paddleX += 5;
    }

    
}

function loop() {
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(); 
    drawPaddle();
    temps = Math.floor((performance.now() - startTime) / 1000); // secondes 
    score.textContent = "score : " + temps ;
    rafId = requestAnimationFrame(loop); // planifie la prochaine frame
    if(perdue==true){
        reset();
        cancelAnimationFrame(rafId);
    }
}


function reset(){
    paddleX=(canvas.width /2)-75/2 ; //reset de la position X de la raquette
    paddleY=canvas.height-15; // reset de la position Y de la raquette

    ballX = canvas.width / 2; //reset de la ball au centre X du canvas
    ballY = paddleY -20;       

    speedX = 2;  // reset de la vitesse X
    speedY = -2;   //reset de la vitesse Y
    sco = 0; //reset du score
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
}

start.addEventListener('click', () => {
    startTime = performance.now();
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    reset();

    loop();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        isLeftPressed = true;
    } 
    if (event.key === 'ArrowRight') {
        isRightPressed = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        isLeftPressed = false;
    }  
    if (event.key === 'ArrowRight') {
        isRightPressed = false;
    }
});






