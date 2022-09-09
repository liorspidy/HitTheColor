const innerblocks = document.querySelectorAll('.inner');
const scoreValue = document.querySelector('.score_value');
const gameOver = document.querySelector('.gameOver');
const finalScore = document.querySelector('#yourScore');
const points5 = document.querySelector('.points5');
const points10 = document.querySelector('.points10');
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
const levelVal = document.querySelector('.level_value');
const levelTitle = document.querySelector('.level');
const levelsBytton = document.querySelector('.fa-circle-up');
const hardMode = document.querySelector('.fa-face-dizzy');
const BG = document.querySelector('.BG');

const width = screen.width;
const blocksColor = '#EBEBEB';
let dotColors = null;
let TIME_LIMIT = 60;
let level = 0;
let mode = 0;

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
    if (mode == 2){
      randomOtherBlocks();
      levelsBytton.classList.toggle('inactive');
    }
    if (mode == 1){
      randomOtherBlocksByLevel(level);
    }
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
    levelsBytton.classList.toggle('inactive');
    hardMode.classList.toggle('inactive');
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

let hg=0;
hourGlass.addEventListener('click',function(){
  hg+=1;
  startingTime.classList.toggle('visible');

  if (hg%2==1) {
    hourGlass.classList.toggle('on');
    $(BG).on('click',function(){
      startingTime.classList.toggle('visible');
      TIME_LIMIT = timeSet.value;
      document.querySelector('.base-timer__label').innerHTML = formatTime(TIME_LIMIT);
      hourGlass.classList.toggle('on');
  })
  }
  if (hg%2==0){
    hourGlass.classList.toggle('on');
  }
  timeSet.value = '';
})

if (width>=800){
  $(hourGlass).mousedown(function () {
    hourGlass.style.transform = 'scale(1.2)';
  });
  $(hourGlass).mouseup(function () {
    hourGlass.style.transform = 'scale(1.4)';
  });
}
// else{
//   $(hourGlass).mousedown(function () {
//     hourGlass.style.transform = 'scale(1.2)';
//   });
//   $(hourGlass).mouseup(function () {
//     hourGlass.style.transform = 'scale(1.4)';
//   }); 
// }

$(timeSet).keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == '13') {
    TIME_LIMIT = timeSet.value;
    document.querySelector('.base-timer__label').innerHTML = formatTime(TIME_LIMIT);
    startingTime.classList.toggle('visible');
    hourGlass.classList.toggle('on');
    timeSet.value = '';
  }
});


// ZEN MODE:
if (width>=800){
  $(zenMode).mousedown(function () {
    zenMode.style.transform = 'scale(1.2)';
  });
  $(zenMode).mouseup(function () {
    zenMode.style.transform = 'scale(1.4)';
  });
}
// else{
//   $(zenMode).mousedown(function () {
//     zenMode.style.transform = 'scale(1.2)';
//   });
//   $(zenMode).mouseup(function () {
//     zenMode.style.transform = 'scale(1.4)';
//   }); 
// }

let h=0;
let i=0;
zenMode.addEventListener('click',function(){
  h+=1;

  if (h%2==1) {
    zenMode.classList.toggle('on');
    for (heart in hearts){
      i += 1;
      if (width < 800) {
        $('#heart' + i).animate({ top: '100vh' }, 200);
        $('#heart' + i).animate({ top: '79vh' }, 200);
        $('#heart' + i).animate({ top: '82vh' }, 200);
        $('#heart' + i).animate({ top: '80vh' }, 200);
        $('#heart' + i).css('top', '80vh');
      }
      if (width >= 800) {
        $('#heart' + i).animate({ top: '100vh' }, 200);
        $('#heart' + i).animate({ top: '89vh' }, 200);
        $('#heart' + i).animate({ top: '92vh' }, 200);
        $('#heart' + i).animate({ top: '90vh' }, 200);
        $('#heart' + i).css('top', '90vh');
      }
    } 

    $('#app').fadeTo(500, 0);
  }
  if (h%2==0) {
    zenMode.classList.toggle('on');
    for (heart in hearts){
      i+=1;
      removeHeart(i);
      }
    timeSet.value = ''
    TIME_LIMIT = 60;
    document.querySelector('.base-timer__label').innerHTML = formatTime(TIME_LIMIT);
    $('#app').fadeTo(500, 0.3);      
  }
  i=0;
})

// levels mode
let l=0;
levelsBytton.addEventListener('click',function(){
  l+=1;

  if (l%2==1) {
    levelsBytton.classList.toggle('on');
    hardMode.classList.toggle('inactive');
    levelTitle.classList.toggle('on');
    levelVal.classList.toggle('on');
    mode = 1;
  }
  if (l%2==0){
    levelsBytton.classList.toggle('on');
    hardMode.classList.toggle('inactive');
    levelTitle.classList.toggle('on');
    levelVal.classList.toggle('on');
    mode = 0;
  }
})

if (width>=800){
  $(levelsBytton).mousedown(function () {
    levelsBytton.style.transform = 'scale(1.2)';
  });
  $(levelsBytton).mouseup(function () {
    levelsBytton.style.transform = 'scale(1.4)';
  });
}
// else{
//   $(levelsBytton).mousedown(function () {
//     levelsBytton.style.transform = 'scale(1.2)';
//   });
//   $(levelsBytton).mouseup(function () {
//     levelsBytton.style.transform = 'scale(1.4)';
//   });
// }

// hard mode
let hm=0
hardMode.addEventListener('click',function(){
  hm+=1;

  if (hm%2==1) {
    hardMode.classList.toggle('on');
    levelsBytton.classList.toggle('inactive');
    randomOtherBlocks();
    mode = 2;
  }
  if (hm%2==0){
    hardMode.classList.toggle('on');
    levelsBytton.classList.toggle('inactive');
    filteredInnerBlocks.forEach(r=>{
      r.style.backgroundColor=blocksColor;
    })
    mode = 0;
  }
})

if (width>=800){
  $(hardMode).mousedown(function () {
    hardMode.style.transform = 'scale(1.2)';
  });
  $(hardMode).mouseup(function () {
    hardMode.style.transform = 'scale(1.4)';
  });
}
// else{
//   $(hardMode).mousedown(function () {
//     hardMode.style.transform = 'scale(1.2)';
//   });
//   $(hardMode).mouseup(function () {
//     hardMode.style.transform = 'scale(1.4)';
//   });
// }

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
let randomColor = getRandomColor();
while (randomColor === blocksColor) {
  randomColor = getRandomColor();
}


//generate colors to different blocks 
function randomOtherBlocks(){
  let filteredInnerBlocks = [...innerblocks].filter(
    (b) => b !== innerblocks[randFactor]
  );
  filteredInnerBlocks.forEach(b => {
    let randomColor_2 = getRandomColor();
    while (randomColor_2 === blocksColor || randomColor_2 === randomColor) {
      randomColor_2 = getRandomColor();
    }
    b.style.backgroundColor = randomColor_2;
  });
}

dot.style.backgroundColor = randomColor;
randBlock.style.backgroundColor = randomColor;

//generate colors to different blocks - blocks number by level

function getBlocksByLevel(level){
  let blocks = [];
  let bArr = [];
  for (let i=0;i<level;i++){
    let r = getRandomFactor();
    while (r===randFactor || bArr.includes(r)){
      r = getRandomFactor();
    }
    bArr.push(r);
    blocks.push(innerblocks[r]);
  }
  return blocks;
}

let blocksByLevel= getBlocksByLevel(level);

function randomOtherBlocksByLevel(){
  blocksByLevel.forEach(b => {
    let randomColor_2 = getRandomColor();
    while (randomColor_2 === blocksColor || randomColor_2 === randomColor) {
      randomColor_2 = getRandomColor();
    }
    b.style.backgroundColor = randomColor_2;
  });
}

randomOtherBlocksByLevel();

let heartsNum = 3;
function addHeart(){
  for (let i=1;i<=3;i++){
    if(document.querySelector('#heart'+i).classList.contains('hide')){
      $('#heart' + i).css('color','goldenrod');
      $('#heart' + i).removeClass('hide');
      if (width < 800) {
        $('#heart' + i).animate({ top: '100vh' }, 200);
        $('#heart' + i).animate({ top: '79vh' }, 200);
        $('#heart' + i).animate({ top: '82vh' }, 200);
        $('#heart' + i).animate({ top: '80vh' }, 200);
        $('#heart' + i).css('top', '80vh');
        }
      if (width >= 800) {
        $('#heart' + i).animate({ top: '100vh' }, 200);
        $('#heart' + i).animate({ top: '89vh' }, 200);
        $('#heart' + i).animate({ top: '92vh' }, 200);
        $('#heart' + i).animate({ top: '90vh' }, 200);
        $('#heart' + i).css('top', '90vh');
        }
        heartsNum += 1;
        break;
    } 
  }
}

function removeHeart(j){
  if (width < 800) {
    $('#heart' + j).animate({ top: '80vh' }, 200);
    $('#heart' + j).animate({ top: '82vh' }, 200);
    $('#heart' + j).animate({ top: '79vh' }, 200);
    $('#heart' + j).animate({ top: '100vh' }, 200);
    $('#heart' + j).css('top', '100vh');
    $('#heart' + j).addClass('hide');
  }
  if (width >= 800) {
    $('#heart' + j).animate({ top: '90vh' }, 200);
    $('#heart' + j).animate({ top: '92vh' }, 200);
    $('#heart' + j).animate({ top: '89vh' }, 200);
    $('#heart' + j).animate({ top: '100vh' }, 200);
    $('#heart' + j).css('top', '100vh');
    $('#heart' + j).addClass('hide');
  }
}

let bCounter = 0;
let curScore = 0;
let j=3;
let oldBlocksByLevel = [];

innerblocks.forEach((block) => {
  block.addEventListener('click', function () {
    if(oldBlocksByLevel.length > 0 && mode == 1){
      oldBlocksByLevel.forEach(b=>{
        b.style.backgroundColor = blocksColor;
      });
    }
    if (this === randBlock) {
      bCounter += 1;
      if (level > 8){
        curScore = curScore + 10;
        points10.classList.toggle('visible');
        setTimeout(() => {
          points10.classList.toggle('visible');
        }, 800);
      }
      else{
      curScore = curScore + 5;
      points5.classList.toggle('visible');
      setTimeout(() => {
        points5.classList.toggle('visible');
      }, 800);
      }
      if (bCounter%10 == 0 && mode == 1){
        level+=1;
        levelVal.innerHTML = level;
        levelVal.classList.toggle('levelUp');
        setTimeout(()=>{
          levelVal.classList.toggle('levelUp');
        },1500);
        if (heartsNum < 3){
          addHeart();
          j=heartsNum;
        }
      }
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
        if(heartsNum>0){
          heartsNum -= 1;
        }
        removeHeart(j);
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

    if (mode == 2){
      randomOtherBlocks();
    }
    if (mode == 1){
      blocksByLevel= getBlocksByLevel(level);
      oldBlocksByLevel = [...blocksByLevel];
      randomOtherBlocksByLevel();
    }

    oldBlock = randBlock;

    dot.style.backgroundColor = randomColor;
    randBlock.style.backgroundColor = randomColor;

    finalScore.innerHTML = scoreValue.innerHTML;

  });
});