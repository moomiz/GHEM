// Canvas 설정
export const gameCanvas = document.getElementById(
  "gameCanvas"
) as HTMLCanvasElement;
var ctx = gameCanvas.getContext("2d") as CanvasRenderingContext2D;

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;

  Planet.prototype.width = window.innerWidth / 10;
  Planet.prototype.height = window.innerHeight / 5;
  Planet.prototype.x = gameCanvas.width - window.innerWidth / 10;
  Planet.prototype.y = gameCanvas.height - window.innerHeight / 5;
});

// UFO 객체 정의

type UfoType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const ufo = {
  x: 0,
  y: window.innerHeight - (window.innerHeight * 3) / 5 + 2, // 수정된 부분
  width: window.innerWidth / 10, // 수정된 부분
  height: window.innerHeight / 5 - 2, // 수정된 부분

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

ufo.draw();

// Planet 클래스 정의
class Planet {
  x: number;
  y: number;
  width: number;
  height: number;
  hp?: number;
  speed?: number;

  constructor() {
    this.x = gameCanvas.width - window.innerWidth / 10;
    this.y = Math.floor(Math.random() * 5) * (gameCanvas.height / 5); // 수정된 부분
    this.width = window.innerWidth / 10;
    this.height = window.innerHeight / 5;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getScore() {
    return 0;
  }

  decreaseHP() {
    // 체력 감소 메서드 추가
    if (this.hp && this.speed) {
      this.hp--;
      if (this.hp <= 0) {
        score += this.speed * 10;
        PlanetArray.splice(PlanetArray.indexOf(this), 1);
      }
    }
  }
}

class SmallPlanet extends Planet {
  constructor() {
    super();
    this.hp = 3;
    this.speed = 3;
  }

  draw() {
    ctx.fillStyle = "green"; // 녹색으로 변경
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getScore() {
    return 100;
  }
}

class NormalPlanet extends Planet {
  constructor() {
    super();
    this.hp = 5;
    this.speed = 2;
  }

  draw() {
    ctx.fillStyle = "yellow"; // 노란색으로 변경
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getScore() {
    return 200;
  }
}

class BigPlanet extends Planet {
  constructor() {
    super();
    this.hp = 10;
    this.speed = 1;
  }

  draw() {
    ctx.fillStyle = "orange"; // 주황색으로 변경
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getScore() {
    return 300;
  }
}

// Missle 클래스 정의
class Missle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.speed = 10;
  }

  move() {
    this.x += this.speed;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
let PlanetArray: Planet[] = [];
let MissleArray: Missle[] = [];
let animation: number;

let score = 0;
let scoreText = "Score: ";

let speedMultiplier = 1;
let PlanetCreationInterval = 400;
let timerResetInterval = 1000;
let timeToReset = timerResetInterval;

let isGameOver = false;

// 점수판 그리기 함수
function drawScoreBoard() {
  const fontSize = Math.min(gameCanvas.width, gameCanvas.height) / 20;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "black";
  const text = scoreText + score;
  const textWidth = ctx.measureText(text).width;
  ctx.fillText(text, gameCanvas.width - textWidth - 10, 30);
}

let buttonX: number, buttonY: number, buttonWidth: number, buttonHeight: number;

// 게임오버 함수
function drawGameOver() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // 캔버스 지우기 추가

  var fontSize = Math.min(gameCanvas.width, gameCanvas.height) * 0.1; // 폰트 크기를 화면 크기에 비례하게 설정
  ctx.font = fontSize + "px Arial";
  ctx.fillStyle = "black";
  var textWidth = ctx.measureText("Game Over").width;
  var textX = (gameCanvas.width - textWidth) / 2;
  var textY = (gameCanvas.height - fontSize) / 2;
  ctx.fillText("Game Over", textX, textY);

  // 다시하기 버튼 생성
  buttonWidth = textWidth;
  buttonHeight = fontSize * 0.6;
  buttonX = textX;
  buttonY = textY + buttonHeight + 20;
  ctx.fillStyle = "blue";
  ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  ctx.fillStyle = "white";
  ctx.font = fontSize * 0.6 + "px Arial";
  ctx.fillText(
    "다시하기",
    buttonX + buttonWidth / 4,
    buttonY + buttonHeight * 0.7
  );
}

function gameLoop() {
  if (isGameOver) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawGameOver();
    cancelAnimationFrame(animation);
    return;
  }
  animation = requestAnimationFrame(gameLoop);

  timer++;
  // Canvas 지우기
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  if (timer % Math.floor(PlanetCreationInterval / speedMultiplier) === 0) {
    let Planet: Planet;
    let randomNum = Math.random();
    if (randomNum < 0.33) {
      Planet = new SmallPlanet();
    } else if (randomNum < 0.66) {
      Planet = new NormalPlanet();
    } else {
      Planet = new BigPlanet();
    }
    PlanetArray.push(Planet);
  }

  // 점수판 그리기
  drawScoreBoard();

  // 시간이 지날수록 속도 증가
  timeToReset--;
  if (timeToReset <= 0) {
    speedMultiplier += 0.1; // 속도 배율을 증가시킵니다.
    timeToReset = timerResetInterval; // 다음 속도 증가까지의 시간을 재설정합니다.
  }

  PlanetArray.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }
    if (a.speed) {
      a.x -= a.speed * speedMultiplier;
    }

    checkCollision(ufo, a);

    a.draw();
  });

  ufo.draw();

  // 총알 그리기
  MissleArray.forEach((b: Missle, i, o) => {
    b.move();
    b.draw();

    if (b.x > gameCanvas.width) {
      o.splice(i, 1);
    }

    // 총알과 선인장 충돌 확인
    PlanetArray.forEach((c, j) => {
      if (isColliding(b, c)) {
        c.decreaseHP();
        o.splice(i, 1); // 총알 제거
      }
    });
  });
}

requestAnimationFrame(gameLoop);

// 충돌 확인 함수
function isColliding(obj1: UfoType, obj2: UfoType) {
  var xOverlap = obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width;
  var yOverlap = obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height;

  return xOverlap && yOverlap;
}

// 충돌 확인
function checkCollision(ufo: UfoType, Planet: Planet) {
  var xOverlap =
    ufo.x + ufo.width > Planet.x && ufo.x < Planet.x + Planet.width;
  var yOverlap =
    ufo.y + ufo.height > Planet.y && ufo.y < Planet.y + Planet.height;

  if (xOverlap && yOverlap) {
    // 3. 충돌 발생 시, 게임 오버 상태를 `true`로 변경하고 다시하기 버튼을 표시
    isGameOver = true;
  }
}

// 위 아래 키를 누를 때마다 이동
document.addEventListener("keyup", function (e) {
  var moveAmount = gameCanvas.height / 5; // 맵 사이즈의 1/5만큼 이동

  if (e.code === "ArrowUp") {
    if (ufo.y - moveAmount >= 0) {
      // 화면 위쪽 경계를 넘지 않도록 함
      ufo.y -= moveAmount;
    } else {
      ufo.y = 0;
    }
  }
  if (e.code === "ArrowDown") {
    if (ufo.y + ufo.height + moveAmount <= gameCanvas.height) {
      // 화면 아래쪽 경계를 넘지 않도록 함
      ufo.y += moveAmount;
    } else {
      ufo.y = gameCanvas.height - ufo.height;
    }
  }
  if (e.code === "Space") {
    var missle = new Missle(ufo.x + ufo.width, ufo.y + ufo.height / 2);
    MissleArray.push(missle);
  }
});

gameCanvas.addEventListener("click", function (e) {
  if (isGameOver) {
    // 전역 변수를 사용하여 클릭 위치 검사
    if (
      e.clientX >= buttonX &&
      e.clientX <= buttonX + buttonWidth &&
      e.clientY >= buttonY &&
      e.clientY <= buttonY + buttonHeight
    ) {
      // 변수 및 배열 초기화
      timer = 0;
      PlanetArray = [];
      MissleArray = [];
      score = 0;
      speedMultiplier = 1;
      timeToReset = timerResetInterval;
      isGameOver = false;

      // 게임 재시작
      gameLoop();
    }
  }
});
