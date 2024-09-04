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

function initGame() {
    paddleX = (canvas.width - paddleWidth) / 2;
    ballX = canvas.width / 2;
    ballY = ballRadius;
    ballDx = 2;
    ballDy = 2;
    score = 0;
    restartBtn.style.display = "none"; 
    gameOverMessage.classList.add('hidden'); 
    draw();
}

canvas.addEventListener("mousemove", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
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
        } else {
            gameOver();
        }
    }
}

function gameOver() {
    finalScoreElement.textContent = score; 
    gameOverMessage.classList.remove('hidden');
    gameOverMessage.classList.add('show');
    alert("GAME OVER! Final Score: " + score);
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
    initGame();
}

initGame();
