const gameButtons = Object.values(document.querySelectorAll('.gameButton'));

const winLines= [
  //horizontal lines
  [gameButtons[0], gameButtons[1], gameButtons[2]],
  [gameButtons[3], gameButtons[4], gameButtons[5]],
  [gameButtons[6], gameButtons[7], gameButtons[8]],
  // vertical lines
  [gameButtons[0], gameButtons[3], gameButtons[6]],
  [gameButtons[1], gameButtons[4], gameButtons[7]],
  [gameButtons[2], gameButtons[5], gameButtons[8]],
  // diagonal lines
  [gameButtons[0], gameButtons[4], gameButtons[8]],
  [gameButtons[2], gameButtons[4], gameButtons[6]],
];


//const lineOne = [gameButtons[0], gameButtons[1], gameButtons[2]];

var turns = 0;

for (let i = 0; i < gameButtons.length; i++) {
  gameButtons[i].textContent = ' ';
  gameButtons[i].addEventListener('click', buttonClick);
}

function buttonClick(e) {    
  console.log(e.target.id + ": You clicked me!");
  //e.target.className = 'clickedButton';
  //e.target.style.backgroundColor = '#b92121';
  if (turns % 2 == 0) {
    e.target.className = 'xButt';
    e.target.textContent = 'X';
    e.target.style.backgroundColor = 'green';
  } else {
    e.target.className = 'oButt';
    e.target.textContent = 'O';
    e.target.style.backgroundColor = 'blue';
  }
  turns++;
  checkWinner();
}

function checkWinner() {
  for (let i = 0; i <= winLines.length; i++) {
    let markOne = winLines[i][0];
    let markTwo = winLines[i][1];
    let markThree = winLines[i][2];
    if (markOne === markTwo && markOne === markThree) {
      alert("Awww shiiiiiiit!");
    }    
  }
  console.log("Checking...");
}