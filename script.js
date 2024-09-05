const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

canvas.width = canvas.offsetWidth; 
canvas.height = 320;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX;
let ballRadius = 10;
let ballX;
let ballY;
let ballDx;
let ballDy;
let score;
let speedIncreaseFactor = 1.1; 
let isDragging = false;
let rightPressed = false;
let leftPressed = false;

function initGame() {
    paddleX = (canvas.width - paddleWidth) / 2;
    ballX = canvas.width / 2;
    ballY = ballRadius;
    ballDx = 2;
    ballDy = 2;
    score = 0;
    isDragging = false;
    rightPressed = false;
    leftPressed = false;
    restartBtn.style.display = "none"; 
    gameOverMessage.classList.add('hidden'); 
    draw();
}


canvas.addEventListener("touchstart", (e) => {
    const relativeX = e.touches[0].clientX - canvas.offsetLeft;
    if (relativeX > paddleX && relativeX < paddleX + paddleWidth) {
        isDragging = true;
    }
});

canvas.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const relativeX = e.touches[0].clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
});

canvas.addEventListener("touchend", () => {
    isDragging = false;
});

// Mouse drag control for desktop
canvas.addEventListener("mousedown", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > paddleX && relativeX < paddleX + paddleWidth) {
        isDragging = true;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
    isDragging = false;
});


function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function moveBall() {
    ballX += ballDx;
    ballY += ballDy;

    if (ballX + ballDx > canvas.width - ballRadius || ballX + ballDx < ballRadius) {
        ballDx = -ballDx;
    }

    if (ballY + ballDy < ballRadius) {
        ballDy = -ballDy;
    } else if (ballY + ballDy > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDy = -ballDy;
            score++;

            // Increase ball speed after each score
            ballDx *= speedIncreaseFactor;
            ballDy *= speedIncreaseFactor;
        } else {
            gameOver();
        }
    }
}


function gameOver() {
    finalScoreElement.textContent = score; 
    gameOverMessage.classList.remove('hidden');
    gameOverMessage.classList.add('show');
    // alert("GAME OVER! Final Score: " + score);
    restartBtn.style.display = "block";
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    moveBall();

    if (ballY + ballDy <= canvas.height - ballRadius || (ballX > paddleX && ballX < paddleX + paddleWidth)) {
        requestAnimationFrame(draw);
    }
}

function restartGame() {
    gameOverMessage.classList.remove('show');
    gameOverMessage.classList.add('hidden');
    initGame();
}

initGame();
