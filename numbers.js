let digitPlaces = 1;
let sumMax = 9;
let topNumber = 0;
let bottomNumber = 0;
let answer = topNumber + bottomNumber;
let enteredAnswer = null;

function ChangeTopNumber(input) {
  let numberStr = leftPad(input, digitPlaces);
  let hundreds = document.getElementById('topHundreds');
  let tens = document.getElementById('topTens');
  let ones = document.getElementById('topOnes');
  hundreds.innerText = numberStr[0];
  tens.innerText = numberStr[1];
  ones.innerText = numberStr[2];
}

function ChangeBottomNumber(input) {
  let numberStr = leftPad(input, digitPlaces);

  let hundreds = document.getElementById('bottomHundreds');
  let tens = document.getElementById('bottomTens');
  let ones = document.getElementById('bottomOnes');
  hundreds.innerText = numberStr[0];
  tens.innerText = numberStr[1];
  ones.innerText = numberStr[2];
}
function ChangeAnswer(input) {
  let numberStr = leftPad(parseInt(enteredAnswer), digitPlaces);
  let hundreds = document.getElementById('answerHundreds');
  let tens = document.getElementById('answerTens');
  let ones = document.getElementById('answerOnes');
  hundreds.innerText = numberStr[0];
  tens.innerText = numberStr[1];
  ones.innerText = numberStr[2];
}

function resetAnswer() {
  enteredAnswer = null;
  let hundreds = document.getElementById('answerHundreds');
  let tens = document.getElementById('answerTens');
  let ones = document.getElementById('answerOnes');
  
  hundreds.style.backgroundColor = 'transparent';
  tens.style.backgroundColor = 'transparent';
  ones.style.backgroundColor = 'transparent';
  hundreds.innerText = ' ';
  tens.innerText = ' ';
  ones.innerText = ' ';
}

function generateRandomNumber() {
  let limit = 0;
  switch (digitPlaces) {
    case 1:
      limit = 10;
      break;
    case 2:
      limit = 100;
      break;
    case 3:
      limit = 1000;
      break;
    default:
      limit = 9;
  }
  let output = Math.floor(Math.random() * limit);
  return output;
}

function leftPad(number, targetLength) {
  let numberStr = number.toString();

  let pad = 3 - numberStr.length;
  if (pad <= 0) {
    console.log('-' + numberStr);
    return numberStr;
  }
  let output = ' '.repeat(pad) + numberStr;
  return output;
}

function newProblem() {
  topNumber = generateRandomNumber();
  bottomNumber = generateRandomNumber();
  answer = topNumber + bottomNumber;
  if (answer > sumMax) {
    newProblem();
    return;
  }
  ChangeTopNumber(topNumber);
  ChangeBottomNumber(bottomNumber);
  resetAnswer();
}

function digitKeyPressed(digit) {
  console.log(digit);
  if (enteredAnswer === null) {
    enteredAnswer = parseInt(digit);
    ChangeAnswer(enteredAnswer);
  } else {
    enteredAnswer = enteredAnswer + digit;
    ChangeAnswer(enteredAnswer);
  }
  console.table({ enteredAnswer, answer });
}
document.getElementById('keyboard').addEventListener('click', function (event) {
  let key = event.target;
  console.log(key.children);
  console.log(key.id)
  if (key.innerText !== undefined) {
    digitKeyPressed(key.innerText);
    return;
  }
  if (key.id === 'clear' || key.id === 'keyClear') {
    resetAnswer();
    return;
  }
  if (key.id === 'enter' || key.id === 'keyEnter') {
    let hundreds = document.getElementById('answerHundreds');
    let tens = document.getElementById('answerTens');
    let ones = document.getElementById('answerOnes');
    if (parseInt(enteredAnswer) === answer) {
      console.log('correct');
      hundreds.style.backgroundColor = 'green';
      tens.style.backgroundColor = 'green';
      ones.style.backgroundColor = 'green';
      setTimeout(() => {
        newProblem();
      }, 2000);
    } else {
      console.log('incorrect');
      hundreds.style.backgroundColor = 'red';
      tens.style.backgroundColor = 'red';
      ones.style.backgroundColor = 'red';
      setTimeout(() => {
        resetAnswer();
      }, 2000);
    }
    return;
  }

  console.log(key.id);
});
newProblem();
