// game.js - Main game logic

// ================ GAME CONFIGURATION ================
const gameConfig = {
  questionsPerGame: 10,
  totalEnemies: 5,
  playerMaxHealth: 100,
  enemyMaxHealth: 50,
  playerDamage: 15, // Damage done when answering correctly
  enemyDamage: 10, // Damage taken when answering incorrectly
  enemies: [
    { avatar: "👹", name: "Goblin" },
    { avatar: "🧟", name: "Zombie" },
    { avatar: "👻", name: "Ghost" },
    { avatar: "🐉", name: "Dragon" },
    { avatar: "💀", name: "Skeleton Lord" },
  ],
};

// ================ GAME STATE ================
let gameState = {
  currentQuestions: [], // The 10 selected questions for this game
  currentQuestionIndex: 0, // Current question index
  playerHealth: gameConfig.playerMaxHealth,
  enemyHealth: gameConfig.enemyMaxHealth,
  currentEnemyIndex: 0,
  selectedOption: null,
  answered: false,
  score: 0,
  enemiesDefeated: 0,
  gameOver: false,
};

// ================ DOM ELEMENTS ================
const playerHealthBar = document.getElementById("player-health-bar");
const playerHealthText = document.getElementById("player-health-text");
const enemyHealthBar = document.getElementById("enemy-health-bar");
const enemyHealthText = document.getElementById("enemy-health-text");
const enemyAvatar = document.getElementById("enemy-avatar");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const enemyCountDisplay = document.getElementById("enemy-count");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const skipButton = document.getElementById("skip-btn");
const battleLog = document.getElementById("battle-log");
const gameContent = document.getElementById("game-content");
const resultContainer = document.getElementById("result-container");
const finalScore = document.getElementById("final-score");
const performanceText = document.getElementById("performance-text");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const gameOverDisplay = document.getElementById("game-over");
const victoryDisplay = document.getElementById("victory");
const attackAnimation = document.getElementById("attack-animation");

// ================ GAME INITIALIZATION ================
function initGame() {
  // Reset game state
  gameState = {
    currentQuestions: selectRandomQuestions(
      allQuestions,
      gameConfig.questionsPerGame
    ),
    currentQuestionIndex: 0,
    playerHealth: gameConfig.playerMaxHealth,
    enemyHealth: gameConfig.enemyMaxHealth,
    currentEnemyIndex: 0,
    selectedOption: null,
    answered: false,
    score: 0,
    enemiesDefeated: 0,
    gameOver: false,
  };

  // Reset UI
  updateHealthBars();
  updateEnemyDisplay();
  gameContent.style.display = "block";
  resultContainer.style.display = "none";
  gameOverDisplay.style.display = "none";
  victoryDisplay.style.display = "none";

  // Clear battle log
  battleLog.innerHTML =
    '<div class="log-entry">Battle started! Answer questions correctly to attack!</div>';

  // Load first question
  loadQuestion();
}

// Select random questions from the pool
function selectRandomQuestions(questionPool, count) {
  // Make a copy of the question pool
  const poolCopy = [...questionPool];
  const selectedQuestions = [];

  // Shuffle the pool using Fisher-Yates algorithm
  for (let i = poolCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
  }

  // Take the first 'count' questions
  return poolCopy.slice(0, count);
}

// ================ UI UPDATES ================
function updateHealthBars() {
  // Update player health
  const playerHealthPercent =
    (gameState.playerHealth / gameConfig.playerMaxHealth) * 100;
  playerHealthBar.style.width = `${playerHealthPercent}%`;
  playerHealthText.textContent = `Health: ${gameState.playerHealth}/${gameConfig.playerMaxHealth}`;

  // Update enemy health
  const enemyHealthPercent =
    (gameState.enemyHealth / gameConfig.enemyMaxHealth) * 100;
  enemyHealthBar.style.width = `${enemyHealthPercent}%`;
  enemyHealthText.textContent = `Health: ${gameState.enemyHealth}/${gameConfig.enemyMaxHealth}`;

  // Update color based on health percentage
  if (playerHealthPercent < 25) {
    playerHealthBar.style.backgroundColor = "#ef4444"; // Red for low health
  } else if (playerHealthPercent < 50) {
    playerHealthBar.style.backgroundColor = "#f59e0b"; // Orange for medium health
  } else {
    playerHealthBar.style.backgroundColor = "#4CAF50"; // Green for good health
  }
}

function updateEnemyDisplay() {
  const currentEnemy = gameConfig.enemies[gameState.currentEnemyIndex];
  enemyAvatar.textContent = currentEnemy.avatar;
  addLogEntry(`You face a ${currentEnemy.name}!`, "enemy-action");
}

function addLogEntry(message, type = "") {
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = message;
  battleLog.appendChild(entry);
  battleLog.scrollTop = battleLog.scrollHeight; // Auto-scroll to bottom
}

// ================ QUESTION HANDLING ================
function loadQuestion() {
  // Reset state for new question
  gameState.selectedOption = null;
  gameState.answered = false;
  nextButton.disabled = true;
  feedbackElement.style.display = "none";

  // Update progress indicators
  questionCounter.textContent = `Question: ${
    gameState.currentQuestionIndex + 1
  }/${gameConfig.questionsPerGame}`;
  scoreDisplay.textContent = `Score: ${gameState.score}`;
  enemyCountDisplay.textContent = `Enemies Defeated: ${gameState.enemiesDefeated}/${gameConfig.totalEnemies}`;
  progressBar.style.width = `${
    (gameState.currentQuestionIndex / gameConfig.questionsPerGame) * 100
  }%`;

  // Load current question
  const currentQuizData =
    gameState.currentQuestions[gameState.currentQuestionIndex];
  questionText.textContent = currentQuizData.question;

  // Clear and create options
  optionsContainer.innerHTML = "";
  currentQuizData.options.forEach((option, index) => {
    const optionElement = document.createElement("button");
    optionElement.className = "option";
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(optionElement);
  });
}

function selectOption(index) {
  if (gameState.answered) return;

  const options = document.querySelectorAll(".option");

  // Clear previous selection
  options.forEach((option) => option.classList.remove("selected"));

  // Mark new selection
  options[index].classList.add("selected");
  gameState.selectedOption = index;
  nextButton.disabled = false;
}

// ================ BATTLE MECHANICS ================
function checkAnswer() {
  if (gameState.selectedOption === null) return;

  gameState.answered = true;
  const currentQuizData =
    gameState.currentQuestions[gameState.currentQuestionIndex];
  const options = document.querySelectorAll(".option");

  // Show correct and incorrect options
  options[currentQuizData.correct].classList.add("correct");

  if (gameState.selectedOption !== currentQuizData.correct) {
    // Incorrect answer
    options[gameState.selectedOption].classList.add("incorrect");
    feedbackElement.textContent = "Incorrect! " + currentQuizData.explanation;
    feedbackElement.className = "feedback incorrect-feedback";

    // Enemy attacks player
    enemyAttack();
  } else {
    // Correct answer
    gameState.score++;
    feedbackElement.textContent = "Correct! " + currentQuizData.explanation;
    feedbackElement.className = "feedback correct-feedback";

    // Player attacks enemy
    playerAttack();
  }

  feedbackElement.style.display = "block";
  scoreDisplay.textContent = `Score: ${gameState.score}`;

  // Disable option clicks after answering
  options.forEach((option) => {
    option.style.pointerEvents = "none";
  });

  skipButton.textContent = "Continue";
}

function playerAttack() {
  // Animate the attack
  attackAnimation.style.backgroundColor = "#4CAF50";
  attackAnimation.style.display = "block";
  attackAnimation.style.animation = "playerAttack 0.5s forwards";

  setTimeout(() => {
    // Deal damage to enemy
    gameState.enemyHealth -= gameConfig.playerDamage;
    if (gameState.enemyHealth < 0) gameState.enemyHealth = 0;

    // Update UI
    updateHealthBars();
    addLogEntry(
      `You deal ${gameConfig.playerDamage} damage to the ${
        gameConfig.enemies[gameState.currentEnemyIndex].name
      }!`,
      "player-action"
    );

    // Check if enemy is defeated
    if (gameState.enemyHealth <= 0) {
      enemyDefeated();
    }

    // Reset animation
    setTimeout(() => {
      attackAnimation.style.display = "none";
      attackAnimation.style.animation = "";
    }, 500);
  }, 500);
}

function enemyAttack() {
  // Animate the attack
  attackAnimation.style.backgroundColor = "#ef4444";
  attackAnimation.style.display = "block";
  attackAnimation.style.animation = "enemyAttack 0.5s forwards";

  setTimeout(() => {
    // Deal damage to player
    gameState.playerHealth -= gameConfig.enemyDamage;
    if (gameState.playerHealth < 0) gameState.playerHealth = 0;

    // Update UI
    updateHealthBars();
    addLogEntry(
      `The ${gameConfig.enemies[gameState.currentEnemyIndex].name} deals ${
        gameConfig.enemyDamage
      } damage to you!`,
      "enemy-action"
    );

    // Check if player is defeated
    if (gameState.playerHealth <= 0) {
      gameOver();
    }

    // Reset animation
    setTimeout(() => {
      attackAnimation.style.display = "none";
      attackAnimation.style.animation = "";
    }, 500);
  }, 500);
}

function enemyDefeated() {
  gameState.enemiesDefeated++;
  addLogEntry(
    `You defeated the ${gameConfig.enemies[gameState.currentEnemyIndex].name}!`,
    "player-action"
  );
  enemyCountDisplay.textContent = `Enemies Defeated: ${gameState.enemiesDefeated}/${gameConfig.totalEnemies}`;

  // Check if all enemies are defeated
  if (gameState.enemiesDefeated >= gameConfig.totalEnemies) {
    victory();
    return;
  }

  // Move to next enemy
  gameState.currentEnemyIndex++;
  gameState.enemyHealth = gameConfig.enemyMaxHealth;
  updateHealthBars();
  updateEnemyDisplay();
}

function nextQuestion() {
  gameState.currentQuestionIndex++;

  if (gameState.currentQuestionIndex < gameConfig.questionsPerGame) {
    loadQuestion();
    skipButton.textContent = "Skip Question";
  } else {
    // End of questions but enemies remain
    if (
      !gameState.gameOver &&
      gameState.enemiesDefeated < gameConfig.totalEnemies
    ) {
      showResults();
    }
  }
}

function gameOver() {
  gameState.gameOver = true;
  gameOverDisplay.style.display = "block";
  addLogEntry("You have been defeated!", "enemy-action");

  setTimeout(() => {
    showResults();
  }, 2000);
}

function victory() {
  gameState.gameOver = true;
  victoryDisplay.style.display = "block";
  addLogEntry("You have defeated all enemies!", "player-action");

  setTimeout(() => {
    showResults();
  }, 2000);
}

function showResults() {
  gameContent.style.display = "none";
  resultContainer.style.display = "block";
  finalScore.textContent = `${gameState.score}/${gameConfig.questionsPerGame}`;

  // Set performance message based on outcome and score
  let performanceMessage = "";
  const scorePercentage = (gameState.score / gameConfig.questionsPerGame) * 100;

  if (
    gameState.gameOver &&
    gameState.enemiesDefeated < gameConfig.totalEnemies
  ) {
    // Player lost
    performanceMessage =
      scorePercentage >= 50
        ? "You fought well, but were ultimately defeated. Try again!"
        : "The enemies overwhelmed you. Study your spells and try again!";
  } else {
    // Player won
    if (scorePercentage >= 90) {
      performanceMessage =
        "Incredible! You're a true master of magical knowledge!";
    } else if (scorePercentage >= 70) {
      performanceMessage = "Well done! Your magical prowess is impressive!";
    } else {
      performanceMessage =
        "Victory! With more practice, you'll become even stronger!";
    }
  }

  performanceText.textContent = performanceMessage;
}

// ================ EVENT LISTENERS ================
// Set up event listeners
skipButton.addEventListener("click", function () {
  if (gameState.answered) {
    nextQuestion();
  } else {
    // Skip without answering
    gameState.currentQuestionIndex++;

    if (gameState.currentQuestionIndex < gameConfig.questionsPerGame) {
      loadQuestion();
    } else {
      showResults();
    }
  }
});

nextButton.addEventListener("click", function () {
  if (!gameState.answered) {
    checkAnswer();
  } else {
    nextQuestion();
  }
});

restartButton.addEventListener("click", initGame);

// Initialize the game when the page loads
window.addEventListener("DOMContentLoaded", initGame);
