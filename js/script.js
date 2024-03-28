// Get DOM elements
const PlayerNumSpan = document.querySelector(".player-num");
const PlayerOneScoreSpan = document.getElementById("player-1-score");
const PlayerTwoScoreSpan = document.getElementById("player-2-score");
const PlayerOneButton = document.getElementById("Player-1-btn");
const PlayerTwoButton = document.getElementById("Player-2-btn");
const resetButton = document.querySelector(".reset-btn");
const DiceImg = document.getElementById("dice-img");
const Result = document.getElementById("Result");

// Game data
const data = {
  currentPlayer: 1,
  PlayerOneScore: 0,
  PlayerTwoScore: 0,
};

// Function to set current player
const setCurrentPlayer = (playerNum) => {
  data.currentPlayer = playerNum;
  PlayerNumSpan.innerText = `Player ${data.currentPlayer} To Play`;
  if (data.currentPlayer === 1) {
    PlayerOneButton.removeAttribute("disabled");
    PlayerTwoButton.setAttribute("disabled", "disabled");
  } else {
    PlayerOneButton.setAttribute("disabled", "disabled");
    PlayerTwoButton.removeAttribute("disabled");
  }
};

// Function to Start the game
const startGame = () => {
  setCurrentPlayer(Math.ceil(Math.random() * 2));
  data.PlayerOneScore = 0;
  data.PlayerTwoScore = 0;
  PlayerOneScoreSpan.innerText = data.PlayerOneScore;
  PlayerTwoScoreSpan.innerText = data.PlayerTwoScore;
};
// Function to roll the dice
const rollDice = () => {
  const addintervel = setInterval(() => {
    const randomNum = Math.ceil(Math.random() * 6);
    DiceImg.src = `./Public/dice-${randomNum}.jpeg`;
  }, 50);
  setTimeout(() => {
    clearInterval(addintervel);
    const randomNum = Math.ceil(Math.random() * 6);
    DiceImg.src = `./Public/dice-${randomNum}.jpeg`;
    if (data.currentPlayer === 1) {
      data.PlayerOneScore += randomNum;
      PlayerOneScoreSpan.innerText = data.PlayerOneScore;
    } else {
      data.PlayerTwoScore += randomNum;
      PlayerTwoScoreSpan.innerText = data.PlayerTwoScore;
    }
  }, 1000);
};
//  Add Event Listener to Player one Button
PlayerOneButton.addEventListener("click", () => {
  rollDice();
  setTimeout(() => {
    if (data.PlayerOneScore >= 30) {
      Result.innerText = "Player 1 Won The Match !!!! ";
      PlayerOneButton.setAttribute("disabled", "disabled");
      PlayerTwoButton.setAttribute("disabled", "disabled");
      resetButton.removeAttribute("disabled", "disabled");
       // Start fireworks animation
      // startFireworks();
    } else {
      setCurrentPlayer(2);
    }
  }, 1000);
});
//  Add Event Listener to Player two Button
PlayerTwoButton.addEventListener("click", () => {
  rollDice();
  setTimeout(() => {
    if (data.PlayerTwoScore >= 30) {
      Result.innerText = "Player 2 Won The Match !!!! ";
      PlayerTwoButton.setAttribute("disabled", "disabled");
      PlayerOneButton.setAttribute("disabled", "disabled");
      resetButton.removeAttribute("disabled", "disabled");
       // Start fireworks animation
      //  startFireworks()
    } else {
      setCurrentPlayer(1);
    }
  }, 1000);
});
//  Add Event Listener to Reset Button
resetButton.addEventListener("click", () => {
  startGame();
  Result.innerText = " ";
  resetButton.setAttribute("disabled", "disabled");
  PlayerOneButton.removeAttribute("disabled");
  PlayerTwoButton.removeAttribute("disabled");
});
//
document.addEventListener('keydown', (event) => {
  if(event.key === " "){
    if(!resetButton.disabled){
      resetButton.click();
    }else{
      if(data.currentPlayer === 1 && !data.currentPlayer.disabled){
        PlayerOneButton.click();
       }else//(data.currentPlayer === 2 && !data.currentPlayer.disabled)
      {
        PlayerTwoButton.click();
      }
    }
    }
    // console.log("event: " + event.key);
});
// Function to start fireworks animation
// function startFireworks() {
//   // Trigger fireworks animation on the entire body
//   $('body').fireworks({
//     opacity: 0.4, // Optional parameter: set the opacity of the fireworks
//     width: '100%', // Optional parameter: set the width of the fireworks
//     height: '100%' // Optional parameter: set the height of the fireworks
//   });
// }

window.onload = () => {
  startGame();
};

