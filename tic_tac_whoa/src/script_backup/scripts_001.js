var turns = 0;
var playerChoices = [];
var gameInfo = document.querySelector('.gameInfo');
const gameButtons = Object.values(document.querySelectorAll('.gameButton'));
const winLines = [
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


for (let i = 0; i < gameButtons.length; i++) {
  gameButtons[i].textContent = null;
  gameButtons[i].addEventListener('click', buttonClick);
}

function buttonClick(e) {    
  console.log(e.target.id + ": You clicked me!");
  
  if (turns % 2 == 0) {
    e.target.className = 'xButt';
    e.target.textContent = 'X';
    e.target.style.backgroundColor = 'green';
    gameInfo.textContent = "O, it's your turn now";
  } else {
    e.target.className = 'oButt';
    e.target.textContent = 'O';
    e.target.style.backgroundColor = 'blue';
    gameInfo.textContent = "X, it's your turn now";
  }
  
  playerChoices.push(e.target);
  removeMark();
  turns++;
  winLines.forEach(element => checkWinner(element));
}

function checkWinner(singleLine) {
  let markOne = singleLine[0].className;
  //console.log(markOne);
  let markTwo = singleLine[1].className;
  let markThree = singleLine[2].className;
  if (markOne === markTwo && markOne === markThree) {
    switch (markOne) {
      case 'gameButton':        
        break;
      case 'oButt':
        gameInfo.textContent = "O Player wins!";
        gameButtons.forEach(element => 
        element.removeEventListener('click', buttonClick));
        break;
      case 'xButt':
        gameInfo.textContent = "X Player wins!";
        gameButtons.forEach(element => 
        element.removeEventListener('click', buttonClick));
        break;
    }
  }      
  //console.log("Checking...");
}

function removeMark() {
  
  if (playerChoices.length == 7) {
    playerChoices[0].textContent = null;
    playerChoices[0].className = 'gameButton';
    playerChoices.shift();
    
  }
}
