let inputdir = { x: 0, y: 0 };
let score = 0;
let highscore = 0;
const movesound = new Audio('assets/move.mp3');
const gaqmeover = new Audio('assets/gameover.mp3');
const gamemucis = new Audio('assets/bg.mp3');
const click = new Audio('assets/bit.WAV');
// const bitsound = new Audio('assets/bit.wav');
let speed = 10;
let lastpaintTime = 0;
let snakeArr = [
    {
        x: 13, y: 15
    }
]
let food = { x: 13, y: 5 };

// game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    scorecard.innerHTML = "Score:" + score;
    // high.innerHTML = "HighScore " + highscore;

    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();


}
function iscollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
        return true;
    }

}


function gameEngine() {
    // part 1  updating the snake arry anfd food
    if (iscollide(snakeArr)) {
        gamemucis.pause();
speed=4;
        inputdir = { x: 0, y: 0 };
        gaqmeover.play();
        alert("Game over !! press any key to continue");
        snakeArr = [{ x: 13, y: 15 }];
        gamemucis.play();

        score = 0;
        // scorecard.innerHTML="Score: "+score;
    }



    // if you had eaten the food, increament th escore and regenrate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        click.play();
        score = score + 1;
if(score%5==0){
speed=speed+1;
}
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("hiscore", JSON.stringify(highscore));
            high.innerHTML="High Score:"+highscore;

        }
        // scorecard.innerHTML="score:"+score;
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;


    // part 2  display snake and food
    //  display snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //  display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logioc start here

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    highscore = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscore));
}
else {
    highscore = JSON.parse(hiscore);
    high.innerHTML = "High Score:" + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }   // start game
    gamemucis.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            console.log("ArrowDown");
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            console.log("arrowRight");
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            console.log("arrowleft");
            break;
        default:
            break;
    }

});