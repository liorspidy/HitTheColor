const innerblocks = document.querySelectorAll('.inner');
const scoreValue = document.querySelector('.score_value');
const gameOver = document.querySelector('.gameOver');
const finalScore = document.querySelector('#yourScore');
const points5 = document.querySelector('.points5');
const pointsMinus5 = document.querySelector('.points-5');
const dot = document.querySelector('.dot');
const restart = document.querySelector('#restart');
const startGame = document.querySelector('.startGame');
const timer = document.querySelector('#app');
const hourGlass = document.querySelector('.fa-hourglass-end');
const startingTime = document.querySelector('.startingTime');
const timeSet = document.querySelector('#setTime');

const blocksColor = '#FAD897';
let dotColors = null;
let TIME_LIMIT = 60;
let x=0;

function changeDotColors() {
  dotColors = setInterval(() => {
    randomColor = getRandomColor();
    dot.style.backgroundColor = randomColor;
  }, 600);
}
changeDotColors();

function toggleBlockInnerBlocks(){
innerblocks.forEach((block) => {
  block.classList.toggle('inactive');
});
}

toggleBlockInnerBlocks();

startGame.addEventListener(
  'click',
  function () {
    startGame.classList.toggle('visible');
    toggleBlockInnerBlocks();
    $('#app').fadeTo(500, 1);
    scoreValue.innerHTML = 0;
    clearInterval(dotColors);

    randBlock = innerblocks[Math.floor(Math.random() * innerblocks.length)];
    oldBlock.style.backgroundColor = blocksColor;
    dot.style.backgroundColor = randomColor;
    randBlock.style.backgroundColor = randomColor;
    oldBlock = randBlock;

    startTimer();
    setTimeout(function () {
      $('.startGame').hide();
    }, 1200);

    hourGlass.classList.toggle('inactive');
  },
  { once: true }
);

$(startGame).mousedown(function () {
  startGame.style.transform = 'scale(0.95) translate(-52%,-52%)';
});
$(startGame).mouseup(function(){
  startGame.style.transform = 'scale(1) translate(-50%,-50%)';
});

$(hourGlass).mousedown(function () {
  hourGlass.style.transform = 'scale(1.6) rotate(180deg)';
});
$(hourGlass).mouseup(function () {
  hourGlass.style.transform = 'scale(1.7)';
});

hourGlass.addEventListener('click',function(){
  startingTime.classList.toggle('visible');
})

restart.addEventListener('click', function () {
  location.reload();
  startGame.classList.toggle('visible');
});

$(timeSet).keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == '13') {
    TIME_LIMIT = timeSet.value;
    document.querySelector('.base-timer__label').innerHTML = formatTime(TIME_LIMIT);
    startingTime.classList.toggle('visible');

  }
});

function clickEffect(e) {
  var d = document.createElement('div');
  d.className = 'clickEffect';
  d.style.top = e.clientY + 'px';
  d.style.left = e.clientX + 'px';
  document.body.appendChild(d);
  d.addEventListener(
    'animationend',
    function () {
      d.parentElement.removeChild(d);
    }.bind(this)
  );
}
document.addEventListener('click', clickEffect);

//timer:
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById('app').innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
  gameOver.classList.toggle('visible');
  toggleBlockInnerBlocks();
  $('#app').fadeTo(1000, 0.3);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById('base-timer-label').innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById('base-timer-path-remaining')
      .classList.remove(warning.color);
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById('base-timer-path-remaining')
      .classList.remove(info.color);
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById('base-timer-path-remaining')
    .setAttribute('stroke-dasharray', circleDasharray);
}

// end timer

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let randBlock = innerblocks[Math.floor(Math.random() * innerblocks.length)];
let oldBlock = randBlock;

let randomColor = getRandomColor();
while (randomColor == blocksColor) {
  randomColor = getRandomColor();
}

dot.style.backgroundColor = randomColor;
randBlock.style.backgroundColor = randomColor;

let curScore = 0;

innerblocks.forEach((block) => {
  block.addEventListener('click', function () {
    if (this === randBlock) {
      curScore = curScore + 5;
      points5.classList.toggle('visible');
      setTimeout(() => {
        points5.classList.toggle('visible');
      }, 800);
    } else {
      if (timePassed <= TIME_LIMIT) {
        console.log(timePassed);
        if (TIME_LIMIT - timePassed <= 10) {
          timePassed = timePassed + (TIME_LIMIT - timePassed - 1);
        } else {
          timePassed = timePassed + 10;
        }
      }

      if (scoreValue.innerHTML > 0) {
        curScore = curScore - 5;
        pointsMinus5.classList.toggle('visible');
        setTimeout(() => {
          pointsMinus5.classList.toggle('visible');
        }, 800);
      }

    }

    oldBlock.style.backgroundColor = blocksColor;
    scoreValue.innerHTML = curScore;

    randBlock = innerblocks[Math.floor(Math.random() * innerblocks.length)];

    randomColor = getRandomColor();
    while (randomColor == blocksColor) {
      randomColor = getRandomColor();
    }

    oldBlock = randBlock;

    oldBlock.style.backgroundColor = blocksColor;
    dot.style.backgroundColor = randomColor;
    randBlock.style.backgroundColor = randomColor;

    finalScore.innerHTML = scoreValue.innerHTML;
  });
});     