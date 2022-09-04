const innerblocks = document.querySelectorAll('.inner');
const scoreValue = document.querySelector('.score_value');
const gameOver = document.querySelector('.gameOver');
const finalScore = document.querySelector('#yourScore');
const points5 = document.querySelector('.points5');
const pointsMinus5 = document.querySelector('.points-5');
const timeMinus10 = document.querySelector('.time-10');
const dot = document.querySelector('.dot');
const restart = document.querySelector('#restart');
const startGame = document.querySelector('.startGame');
const timer = document.querySelector('#app');
const hourGlass = document.querySelector('.fa-hourglass-end');
const startingTime = document.querySelector('.startingTime');
const timeSet = document.querySelector('#setTime');
const zenMode = document.querySelector('.fa-yin-yang');
const hearts = document.querySelectorAll('.fa-heart');

const blocksColor = '#EBEBEB';
let dotColors = null;
let TIME_LIMIT = 60;

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
    scoreValue.innerHTML = 0;
    clearInterval(dotColors);

    randBlock = innerblocks[Math.floor(Math.random() * innerblocks.length)];
    oldBlock.style.backgroundColor = blocksColor;
    dot.style.backgroundColor = randomColor;
    randBlock.style.backgroundColor = randomColor;
    oldBlock = randBlock;

    if (h%2==0){
    startTimer();
    $('#app').fadeTo(500, 1);
    }
    setTimeout(function () {
      $('.startGame').hide();
    }, 1200);

    hourGlass.classList.toggle('inactive');
    zenMode.classList.toggle('inactive');
  },
  { once: true }
);

$(startGame).mousedown(function () {
  startGame.style.transform = 'scale(0.95) translate(-52%,-52%)';
});
$(startGame).mouseup(function(){
  startGame.style.transform = 'scale(1) translate(-50%,-50%)';
});

// TIMED MODE
$(hourGlass).mousedown(function () {
  hourGlass.style.transform = 'scale(1.5) rotate(180deg)';
});
$(hourGlass).mouseup(function () {
  hourGlass.style.transform = 'scale(1.7)';
});

hourGlass.addEventListener('click',function(){
  startingTime.classList.toggle('visible');
})

$(timeSet).keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == '13') {
    TIME_LIMIT = timeSet.value;
    document.querySelector('.base-timer__label').innerHTML = formatTime(TIME_LIMIT);
    startingTime.classList.toggle('visible');
    timeSet.value = '';
  }
});

// ZEN MODE:
$(zenMode).mousedown(function () {
  zenMode.style.transform = 'scale(1.5) rotate(180deg)';
});
$(zenMode).mouseup(function () {
  zenMode.style.transform = 'scale(1.7)';
});

$(zenMode).mouseenter(function(){
  zenMode.style.rotate = '180deg';
})

$(zenMode).mouseleave(function(){
  zenMode.style.rotate = '';
})

let h=0;
let i=0;
zenMode.addEventListener('click',function(){
  h+=1;

  if (h%2==1) {
    for (heart in hearts){
      i+=1;
      $('#heart'+i).animate({top: '100vh'},200);
      $('#heart'+i).animate({top: '77vh'},200);
      $('#heart'+i).animate({top: '80vh'},200);
      $('#heart'+i).animate({top: '78vh'},200);
      $('#heart'+i).css('top','78vh');
    }
    $('#app').fadeTo(500, 0);
  }
  if (h%2==0) {
    for (heart in hearts){
      i+=1;
      $('#heart'+i).animate({top: '78vh'},200);
      $('#heart'+i).animate({top: '80vh'},200);
      $('#heart'+i).animate({top: '77vh'},200);
      $('#heart'+i).animate({top: '100vh'},200);
      $('#heart'+i).css('top','100vh');
    }
    timeSet.value = ''
    TIME_LIMIT = 60;
    document.querySelector('.base-timer__label').innerHTML = formatTime(TIME_LIMIT);
    $('#app').fadeTo(500, 0.3);      
  }
  i=0;
})

restart.addEventListener('click', function () {
  location.reload();
  startGame.classList.toggle('visible');
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

function getRandomFactor(){
  let randFactor = Math.floor(Math.random() * innerblocks.length);
  return randFactor;
}

let randFactor = getRandomFactor();
let randBlock = innerblocks[randFactor];
let oldBlock = randBlock;
let otherRandBlock;
let randomColor = getRandomColor();

while (randomColor == blocksColor) {
  randomColor = getRandomColor();
}

let factorArr = [];
factorArr.push(randBlock);
// while (!factorArr.includes(randBlock)){
// otherRandBlock = innerblocks[randFactor];
// }
// console.log(randBlock);
// console.log(otherRandBlock);

dot.style.backgroundColor = randomColor;
randBlock.style.backgroundColor = randomColor;

let curScore = 0;
let j=3;
innerblocks.forEach((block) => {
  block.addEventListener('click', function () {
    if (this === randBlock) {
      curScore = curScore + 5;
      points5.classList.toggle('visible');
      setTimeout(() => {
        points5.classList.toggle('visible');
      }, 800);
    } 
    else {
      if (timePassed <= TIME_LIMIT) {
        if (TIME_LIMIT - timePassed <= 10) {
          timePassed = timePassed + (TIME_LIMIT - timePassed - 1);
        } else {
          timePassed = timePassed + 10;
        }
      }

      document.querySelector('.outer').classList.toggle('move');
      setTimeout(function(){
        document.querySelector('.outer').classList.toggle('move');
      },300)

      if (scoreValue.innerHTML > 0) {
        curScore = curScore - 5;
        pointsMinus5.classList.toggle('visible');
        setTimeout(() => {
          pointsMinus5.classList.toggle('visible');
        }, 800);
      }
      if (h%2==0){
        timeMinus10.classList.toggle('visible');
        setTimeout(() => {
          timeMinus10.classList.toggle('visible');
        }, 800);
      }
      if (h%2==1){
        $('#heart'+j).animate({top: '85vh'},200);
        $('#heart'+j).animate({top: '86vh'},200);
        $('#heart'+j).animate({top: '83vh'},200);
        $('#heart'+j).animate({top: '100vh'},200);
        $('#heart'+j).css('top','100vh');
        j=j-1;
        if (j==0){
          setTimeout(function(){
            gameOver.classList.toggle('visible');
            toggleBlockInnerBlocks();
          },200);
          j=3;
        }
      }
    }

    oldBlock.style.backgroundColor = blocksColor;
    scoreValue.innerHTML = curScore;

    randFactor = getRandomFactor();
    randBlock = innerblocks[randFactor];

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