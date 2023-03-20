const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 5;

const leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 2, dy: 2 };

function drawPaddle(x, y) {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function update() {
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for collisions
  // Paddle collisions
  if (ball.y + ballRadius >= leftPaddle.y && ball.y - ballRadius <= leftPaddle.y + paddleHeight &&
      ball.x - ballRadius <= leftPaddle.x + paddleWidth) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ballRadius >= rightPaddle.y && ball.y - ballRadius <= rightPaddle.y + paddleHeight &&
      ball.x + ballRadius >= rightPaddle.x) {
    ball.dx = -ball.dx;
  }

  // Wall collisions
  if (ball.y - ballRadius <= 0 || ball.y + ballRadius >= canvas.height) {
    ball.dy = -ball.dy;
  }

  // Paddle movement
  document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW') {
      leftPaddle.dy = -4;
    }
    if (event.code === 'KeyS') {
      leftPaddle.dy = 4;
    }
    if (event.code === 'ArrowUp') {
      rightPaddle.dy = -4;
    }
    if (event.code === 'ArrowDown') {
      rightPaddle.dy = 4;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW' || event.code === 'KeyS') {
      leftPaddle.dy = 0;
    }
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      rightPaddle.dy = 0;
    }
  });

  // Keep paddles within the canvas
  if (leftPaddle.y < 0) {
    leftPaddle.y = 0;
  } else if (leftPaddle.y + paddleHeight > canvas.height) {
    leftPaddle.y = canvas.height - paddleHeight;
  }

  if (rightPaddle.y < 0) {
    rightPaddle.y = 0;
  } else if (rightPaddle.y + paddleHeight > canvas.height) {
    rightPaddle.y = canvas.height - paddleHeight;
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle.x, leftPaddle.y);
    drawPaddle(rightPaddle.x, rightPaddle.y);
    drawBall(ball.x, ball.y);
}

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();