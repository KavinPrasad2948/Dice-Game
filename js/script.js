const PlayerNumSpan = document.querySelector(".player-num"); // Corrected selector
const PlayerOneScoreSpan = document.getElementById("player-1-score");
const PlayerTwoScoreSpan = document.getElementById("player-2-score");
const PlayerOneButton = document.getElementById("Player-1-btn");
const PlayerTwoButton = document.getElementById("Player-2-btn");
const ResetButton = document.querySelector(".reset-btn");
const DiceImg = document.getElementById("dice-img");

const data = {
    currentPlayer: 1,
    PlayerOneScore: 0,
    PlayerTwoScore: 0
};

const setCurrentPlayer = () => {
    if (data.currentPlayer === 1) {
        PlayerNumSpan.innerText = "Player-1 To Play"; // Fixed typo in text
        PlayerOneButton.removeAttribute("disabled");
        PlayerOneButton.classList.remove("disabled");
        PlayerTwoButton.setAttribute("disabled", "disabled");
        PlayerTwoButton.classList.add("disabled");
    } else {
        PlayerNumSpan.innerText = "Player-2 To Play"; // Fixed typo in text
        PlayerTwoButton.removeAttribute("disabled");
        PlayerTwoButton.classList.remove("disabled");
        PlayerOneButton.setAttribute("disabled", "disabled");
        PlayerOneButton.classList.add("disabled");
    }
};

const startGame = () => {
    data.currentPlayer = Math.ceil(Math.random() * 2);
    data.PlayerOneScore = 0;
    data.PlayerTwoScore = 0;
    PlayerNumSpan.innerText = `Player-${data.currentPlayer}`;
    PlayerOneScoreSpan.innerText = data.PlayerOneScore;
    PlayerTwoScoreSpan.innerText = data.PlayerTwoScore;
    setCurrentPlayer();
    ResetButton.setAttribute("disabled", "disabled");
};

const rollTheDice = () => {
    const randomNum = Math.ceil(Math.random() * 6);
    for(let i = 0; i <= 6; i++) {
        DiceImg.src =`./Public/Dice-${i}.png`;}
        setTimeout(() => {
            DiceImg.src = `./Public/Dice-${randomNum}.png`;
        }, 200);     
    if (data.currentPlayer === 1) {
        data.PlayerOneScore += randomNum;
        PlayerOneScoreSpan.innerText = data.PlayerOneScore;
    } else {
        data.PlayerTwoScore += randomNum;
        PlayerTwoScoreSpan.innerText = data.PlayerTwoScore;
    }
};

PlayerOneButton.addEventListener("click", () => {
    console.log("Player 1 button clicked");
    rollTheDice();
    if(data.PlayerOneScore >= 30) {
        setTimeout(() => {
            alert("Player 1 won the game");
        }, 200);
        PlayerOneButton.setAttribute("disabled", "disabled");
        ResetButton.removeAttribute("disabled");
    } else {
        data.currentPlayer = 2;
        setCurrentPlayer();
    }
});

PlayerTwoButton.addEventListener("click", () => {
    console.log("Player 2 button clicked");
    rollTheDice();
    if(data.PlayerTwoScore >= 30) {
        setTimeout(() => {
            alert("Player 2 won the game");
        }, 200);
        PlayerTwoButton.setAttribute("disabled", "disabled");
        ResetButton.removeAttribute("disabled");
    } else {
        data.currentPlayer = 1;
        setCurrentPlayer();
    }
});

ResetButton.addEventListener("click", () => {
    console.log("Reset button clicked");
    startGame();
});

window.onload = () => {
    startGame(); // Initialize the game when the script is loaded
}
