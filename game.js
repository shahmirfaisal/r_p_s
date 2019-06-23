window.onload = () => {
  const playerScore = document.getElementById("playerScore");
  const computerScore = document.getElementById("computerScore");
  const choices = document.querySelectorAll(".choice");
  const modal = document.getElementById("modal");
  const result = document.getElementById("modal-content");
  const restart = document.getElementById("restart");

  // Scoreboard
  const scoreboard = {
    playerScore: 0,
    computerScore: 0
  };

  // Play Game
  function play(e) {
    // Showing restart button
    restart.style.display = "block";

    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
  }

  // Computer Choice
  function getComputerChoice() {
    const rand = Math.random();
    if (rand <= 0.33) {
      return "rock";
    } else if (rand <= 0.66) {
      return "paper";
    } else {
      return "scissors";
    }
  }

  // Deciding Winner
  function getWinner(p, c) {
    if (p == c) {
      return "draw";
    } else if (p == "rock") {
      if (c == "paper") {
        return "computer";
      } else {
        return "player";
      }
    } else if (p == "paper") {
      if (c == "rock") {
        return "player";
      } else {
        return "computer";
      }
    } else {
      if (c == "rock") {
        return "computer";
      } else {
        return "player";
      }
    }
  }

  // Showing Winner
  function showWinner(winner, computerChoice) {
    if (winner == "player") {
      result.innerHTML = `
      <h3 class="text-success mb-3">You Win</h3>
      <i class="choice fas fa-hand-${computerChoice}"></i>
      <p class="mt-3">
        Computer choose <strong class="text-capitalize">${computerChoice}</strong>
      </p>
      `;
      scoreboard.playerScore++;
    } else if (winner == "computer") {
      result.innerHTML = `
      <h3 class="text-danger mb-3">You Lose</h3>
      <i class="choice fas fa-hand-${computerChoice}"></i>
      <p class="mt-3">
        Computer choose <strong class="text-capitalize">${computerChoice}</strong>
      </p>
      `;
      scoreboard.computerScore++;
    } else {
      result.innerHTML = `
      <h3 class="mb-3">Its a draw</h3>
      <i class="choice fas fa-hand-${computerChoice}"></i>
      <p class="mt-3">
        Computer choose <strong class="text-capitalize">${computerChoice}</strong>
      </p>
      `;
    }

    playerScore.innerHTML = scoreboard.playerScore;
    computerScore.innerHTML = scoreboard.computerScore;
    modal.style.display = "flex";
  }

  function removeModal(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }

  function restartGame() {
    scoreboard.playerScore = 0;
    scoreboard.computerScore = 0;
    playerScore.innerHTML = "0";
    computerScore.innerHTML = "0";

    restart.style.display = "none";
  }

  // Events
  choices.forEach(choice => {
    choice.addEventListener("click", play);
  });

  // Removing Modal
  window.addEventListener("click", removeModal);

  // Restarting Game
  restart.addEventListener("click", restartGame);
};
