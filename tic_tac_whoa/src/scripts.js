const emptyButtonColor = 'rgb(119, 19, 19)';  //hex: #771313
const hoverButtonColor = 'rgb(173, 59, 59)';  //hex: #ad3b3b
const middleOpacity = 0.66;
const oldOpacity = 0.33;
const samJack  = {
  young: 'img/sam_young.jpg',
  middle: 'img/sam_middle.jpg',
  old: 'img/sam_old.jpg',
  dead: 'img/rip.jpg',
  color: 'rgb(19, 77, 119)',                  //hex: #134d77
  victory: "Sammy wins, Mutha F***a!"
};
const betWhite = {
  young: 'img/betty_young.jpg',
  middle: 'img/betty_middle.jpg',
  old: 'img/betty_old.jpg',
  dead: 'img/rip.jpg',
  color: 'rgb(119, 84, 19)',                 //hex: #775413
  victory: "Betty whooped dat a**!"
}
const gameButtonStyle = "width: 100px; height: 100px; font-size: 50px; " +
                        "background-color: " + emptyButtonColor + ";";
                        
const xButtStyle = "width: 100px; height: 100px; " + 
                    "background-color: " + samJack.color + ";";

const oButtStyle = "width: 100px; height: 100px; " + 
                    "background-color: " + betWhite.color + ";";

document.addEventListener('DOMContentLoaded', setBoard);
document.querySelector('.newGame').addEventListener('click', resetBoard);

function setBoard () {    
  /* undeclared variables that are given a value within a function are
  automatically global */
  turns = 0;
  playerChoices = [];
  xChoices = [];
  oChoices = [];

  gameInfo = document.querySelector('.gameInfo');  
  gameInfo.textContent = "Sammy, start the game.";
  gameButtons = Object.values(document.querySelectorAll('.gameButton'));
  
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
  playerChoices.length = 0;  // clears out the array if new game is used
  xChoices.length = 0;
  oChoices.length = 0;
  gameButtons.forEach(function(element) {
    element.className = 'gameButton';
  });
  setBoard();
}

// adds the button elements so I can easily manipulate them later
function beautifyButton(e, plyr) {    
    let sumBtnImg = document.createElement("img");
    sumBtnImg.style.position = 'relative';
    sumBtnImg.style.top = '5px'; // images are 90px and buttons are 100px
    sumBtnImg.className = 'sumBtn';
    // sumBtnImg.style.opacity = '.5';
    e.target.appendChild(sumBtnImg);
}

function enableButtons() {
  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].textContent = null;
    gameButtons[i].addEventListener('click', buttonClick);
    gameButtons[i].addEventListener('mouseover', highlightButton);
    gameButtons[i].addEventListener('mouseout', buttonFade);
    gameButtons[i].style.cssText = gameButtonStyle;
    gameButtons[i].style.cursor = 'pointer';
  }  
}

function disableButtons() {
  for (let i = 0; i < gameButtons.length; i++) {    
    gameButtons[i].removeEventListener('click', buttonClick);
    gameButtons[i].removeEventListener('mouseover', highlightButton);
    gameButtons[i].removeEventListener('mouseout', buttonFade);
    gameButtons[i].style.cursor = 'default';
  }
}

function highlightButton(e) {
  e.target.style.backgroundColor = hoverButtonColor;
}

function buttonClick(e) {
  // console.log(e.target.id + ": You clicked me!");
  
  if (turns % 2 == 0) {
    //removeMark(xChoices);
    e.target.className = 'xButt';
    e.target.style.cssText = xButtStyle;    
    e.target.removeEventListener('click', buttonClick);
    e.target.removeEventListener('mouseover', highlightButton);
    e.target.removeEventListener('mouseout', buttonFade);
    e.target.style.background = samJack.color;
    e.target.style.cursor = 'none';
    gameInfo.textContent = "Betty, it's your turn now";
    xChoices.push(e.target);    
    beautifyButton(e, samJack);
    ageMark(samJack, xChoices);
  } else {
    //removeMark(oChoices);
    e.target.className = 'oButt';
    e.target.style.cssText = oButtStyle;    
    e.target.removeEventListener('click', buttonClick);
    e.target.removeEventListener('mouseover', highlightButton);
    e.target.removeEventListener('mouseout', buttonFade);
    e.target.style.background = betWhite.color;
    e.target.style.cursor = 'none';
    gameInfo.textContent = "Sammy, it's your turn now";
    oChoices.push(e.target);
    beautifyButton(e, betWhite);
    ageMark(betWhite, oChoices);
  }  
  playerChoices.push(e.target);
  // ageMark(e);
  (turns % 2 == 0) ? removeMark(xChoices) : removeMark(oChoices);
  turns++;
  winLines.forEach(element => checkWinner(element));
}

function ageMark(plyr, plyrChoices) {  
  console.log(plyrChoices[0]);
  switch (plyrChoices.length) {
    case 1:
      plyrChoices[0].querySelector('.sumBtn').src = plyr.young;
      break;
    case 2:
      plyrChoices[0].querySelector('.sumBtn').src = plyr.middle;
      plyrChoices[0].querySelector('.sumBtn').style.opacity = middleOpacity;
      plyrChoices[1].querySelector('.sumBtn').src = plyr.young;
      plyrChoices[1].querySelector('.sumBtn').style.opacity = 1;
      break;
    case 3:
      plyrChoices[0].querySelector('.sumBtn').src = plyr.old;
      plyrChoices[0].querySelector('.sumBtn').style.opacity = oldOpacity;
      plyrChoices[1].querySelector('.sumBtn').src = plyr.middle;
      plyrChoices[1].querySelector('.sumBtn').style.opacity = middleOpacity;
      plyrChoices[2].querySelector('.sumBtn').src = plyr.young;
      plyrChoices[2].querySelector('.sumBtn').style.opacity = 1;
      break;
    case 4:
      plyrChoices[0].querySelector('.sumBtn').src = plyr.dead;    // one day...
      plyrChoices[1].querySelector('.sumBtn').src = plyr.old;
      plyrChoices[1].querySelector('.sumBtn').style.opacity = oldOpacity;
      plyrChoices[2].querySelector('.sumBtn').src = plyr.middle;
      plyrChoices[2].querySelector('.sumBtn').style.opacity = middleOpacity;
      plyrChoices[3].querySelector('.sumBtn').src = plyr.young;
      plyrChoices[3].querySelector('.sumBtn').style.opacity = 1;
      break;
  }  
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

function removeMark(plyChc) {  
  if (playerChoices.length == 7) {
    playerChoices[0].textContent = null;
    playerChoices[0].className = 'gameButton';
    playerChoices[0].addEventListener('click', buttonClick)
    playerChoices[0].style.cssText = gameButtonStyle;
    playerChoices[0].addEventListener('click', buttonClick);
    playerChoices[0].addEventListener('mouseover', highlightButton);
    playerChoices[0].addEventListener('mouseout', buttonFade);
    playerChoices[0].style.cursor = 'pointer';
    // playerChoices[0].querySelector('.sumBtn').remove();
    playerChoices.shift();    // .shift() removes the first element in an array
  }
  
  if (plyChc.length == 3) {
    // plyChc[0].querySelector('.sumBtn').remove();
    plyChc.shift();
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
