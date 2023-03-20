const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

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

  if (leftPaddle.y < 0) leftPaddle.y = 0;
  if (leftPaddle.y + paddleHeight > canvas.height) leftPaddle.y = canvas.height - paddleHeight;
  if (rightPaddle.y < 0) rightPaddle.y = 0;
  if (rightPaddle.y + paddleHeight > canvas.height) rightPaddle.y = canvas.height - paddleHeight;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
    ball.dy = -ball.dy;
  }

  if ((ball.x - ballRadius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
      (ball.x + ballRadius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)) {
    ball.dx = -ball.dx;
  }

  if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
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

gameLoop();


// Add keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    rightPaddle.dy = -4;
  } else if (e.key === 'ArrowDown') {
    rightPaddle.dy = 4;
  } else if (e.key === 'w') {
    leftPaddle.dy = -4;
  } else if (e.key === 's') {
    leftPaddle.dy = 4;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    rightPaddle.dy = 0;
  } else if (e.key === 'w' || e.key === 's') {
    leftPaddle.dy = 0;
  }
});

// Add touch controls for mobile
function getRelativeTouchPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.touches[0].clientX - rect.left) * scaleX,
    y: (e.touches[0].clientY - rect.top) * scaleY
  };
}

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touchPos = getRelativeTouchPosition(e);

  if (touchPos.x < canvas.width / 2) {
    leftPaddle.dy = touchPos.y < leftPaddle.y + paddleHeight / 2 ? -4 : 4;
  } else {
    rightPaddle.dy = touchPos.y < rightPaddle.y + paddleHeight / 2 ? -4 : 4;
  }
});

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  leftPaddle.dy = 0;
  rightPaddle.dy = 0;
});