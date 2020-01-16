const emptyButtonColor = 'rgb(119, 19, 19)';  //hex: #771313
const hoverButtonColor = 'rgb(173, 59, 59)';  //hex: #ad3b3b
const samJack  = {
  young: 'img/sam_young.jpg',
  middle: 'img/sam_middle.jpg',
  old: 'img/sam_old.jpg',
  victory: "Sammy wins, Mutha F***a!"
};
const betWhite = {
  young: 'img/betty_young.jpg',
  middle: 'img/betty_middle.jpg',
  old: 'img/betty_old.jpg',
  victory: "Betty whooped dat a**!"
}
const gameButtonStyle = "width: 100px; height: 100px; font-size: 50px; " +
                        "background-color: " + emptyButtonColor + ";";
const xButtStyle = "width: 100px; height: 100px; " + 
                    "background-image: url(" + samJack.young + "); " + 
                    "background-position: center; background-size: contain;"
const oButtStyle = "width: 100px; height: 100px; " + 
                    "background-image: url(" + betWhite.young + "); " +
                    "background-position: center; background-size: contain;"

document.addEventListener('DOMContentLoaded', setBoard);
document.querySelector('.newGame').addEventListener('click', resetBoard);

function setBoard () {    
  /* undeclared variables that are given a value within a function are
  automatically global */
  turns = 0;
  playerChoices = [];

  gameInfo = document.querySelector('.gameInfo');  
  gameInfo.textContent = "Sammy, start the game.";
  gameButtons = Object.values(document.querySelectorAll('.gameButton'));
  
  gameButtons.forEach(function(element) {
    let btnImg = document.createElement('img');
    btnImg.className = 'btnImg';
  });
  
  winLines = [
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
  enableButtons();
}

function resetBoard () {
  playerChoices.length = 0;   // clears out the array if new game is used
  gameButtons.forEach(function(element) {
    element.className = 'gameButton';
  });
  setBoard();
}

function enableButtons(e) {
  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].textContent = null;
    gameButtons[i].addEventListener('click', buttonClick);
    gameButtons[i].addEventListener('mouseover', highlightButton);
    gameButtons[i].addEventListener('mouseout', buttonFade);
    gameButtons[i].style.cssText = gameButtonStyle;
  }  
}

function disableButtons() {
  for (let i = 0; i < gameButtons.length; i++) {    
    gameButtons[i].removeEventListener('click', buttonClick);
    gameButtons[i].removeEventListener('mouseover', highlightButton);
    gameButtons[i].removeEventListener('mouseout', buttonFade);    
  }
}

function highlightButton(e) {
  e.target.style.backgroundColor = hoverButtonColor;
}

function buttonClick(e) {
  // console.log(e.target.id + ": You clicked me!");
  
  if (turns % 2 == 0) {
    e.target.className = 'xButt';
    e.target.style.cssText = xButtStyle;    
    e.target.removeEventListener('click', buttonClick);
    gameInfo.textContent = "Betty, it's your turn now";
  } else {
    e.target.className = 'oButt';
    e.target.style.cssText = oButtStyle;    
    e.target.removeEventListener('click', buttonClick);
    gameInfo.textContent = "Sammy, it's your turn now";
  }  
  playerChoices.push(e.target);
  ageMark(e);
  removeMark();
  turns++;
  winLines.forEach(element => checkWinner(element));
}

function ageMark(e) {
  let test = document.createElement("img");
  test.src = samJack.middle;
  console.log(e.target);
  e.target.appendChild(test);
}

function checkWinner(singleLine) {
  let markOne = singleLine[0].className;
  let markTwo = singleLine[1].className;
  let markThree = singleLine[2].className;
  if (markOne === markTwo && markOne === markThree) {
    switch (markOne) {
      case 'gameButton':        
        break;
      case 'oButt':
        gameInfo.textContent = betWhite.victory;
        disableButtons();
        break;
        /* not bad, but limited for I needed. Keeping as an educational reminder
        gameButtons.forEach(element => 
        element.removeEventListener('click', buttonClick);
        break;
        */
      case 'xButt':
        gameInfo.textContent = samJack.victory;
        disableButtons();
        break;
    }
  }      
}

function removeMark() {  
  if (playerChoices.length == 7) {
    playerChoices[0].textContent = null;
    playerChoices[0].className = 'gameButton';
    playerChoices[0].addEventListener('click', buttonClick)
    playerChoices[0].style.cssText = gameButtonStyle;
    playerChoices.shift();    
  }
}

function buttonFade (e) {
  const numberOfSteps = 50; //higher number = smoother transition
  const transitionTime = 750; //0.75 seconds
  // the hover color is the starting color
  const startingColor = [179, 59, 59];
  const endingColor = [119, 19, 19];
  let transColor = startingColor.slice(0);
  let i = 0;
  let rgbIntervals = [
    [(startingColor[0] - endingColor[0]) / numberOfSteps],
    [(startingColor[1] - endingColor[1]) / numberOfSteps],
    [(startingColor[2] - endingColor[2]) / numberOfSteps],
    ];

  // where the magic happens  
  var fader = setInterval( () => {
    transColor[0] -= rgbIntervals[0];
    transColor[1] -= rgbIntervals[1];
    transColor[2] -= rgbIntervals[2];
    i++;
    let tempColor = 'rgb(' + transColor[0]+ ', ' + transColor[1] + ', ' + 
                    transColor[2] + ')'
    e.target.style.backgroundColor = tempColor;
      if (i == 50) {
        clearInterval(fader);
        i = 0;
        e.target.style.backgroundColor = emptyButtonColor;
      }
    }, 5 /* lower number = faster transition */);
}
