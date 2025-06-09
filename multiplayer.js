// Multiplayer functionality for Hangman game

// DOM Elements
const modeSelectionSection = document.getElementById('mode-selection');
const createRoomSection = document.getElementById('create-room-panel');
const joinRoomSection = document.getElementById('join-room-panel');
const waitingRoomSection = document.getElementById('waiting-room-panel');
const gameInterfaceSection = document.getElementById('game-interface');
const roundResultsSection = document.getElementById('round-results-panel');

const roomCodeDisplay = document.getElementById('room-code');
const joinedRoomCodeDisplay = document.getElementById('joined-room-code');
const playerListElement = document.getElementById('players-list');
const joinedPlayerListElement = document.getElementById('waiting-players-list');
const playerScoresList = document.getElementById('player-scores-list');
const winnerDisplay = document.getElementById('winner-display');
const winnerName = document.getElementById('winner-name');

const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const singlePlayerBtn = document.getElementById('single-player-btn');
const startRoundBtn = document.getElementById('start-round-btn');
const closeRoomBtn = document.getElementById('close-room-btn');
const submitJoinBtn = document.getElementById('join-room-submit-btn');
const backToMenuBtn = document.getElementById('leave-room-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const endGameBtn = document.getElementById('end-game-btn');

const roomCodeInput = document.getElementById('room-code-input');
const playerNameInput = document.getElementById('player-name-input');
const mpAnswerInput = document.getElementById('mp-answer-input');
const mpAnswerBtn = document.getElementById('mp-submit-answer');

const mpTimerProgress = document.getElementById('mp-timer-progress');
const mpTimerText = document.getElementById('mp-timer-value');
const mpScoreDisplay = document.getElementById('mp-score');
const mpNotification = document.getElementById('mp-notification');
const mpNotificationText = document.getElementById('mp-notification-text');

const joinSound = document.getElementById('join-sound');
const startRoundSound = document.getElementById('start-round-sound');

// Multiplayer state
let isMultiplayer = false;
let isHost = false;
let roomCode = null;
let players = [];
let currentPlayer = {
  id: generatePlayerId(),
  name: 'Player',
  score: 0,
  isHost: false
};
let roundActive = false;
let roundTimer = null;
let roundTimeLeft = 60; // seconds
let roundTimerInterval = null;
let currentRoundWord = '';
let currentRoundDefinition = '';
let roundStartTime = 0; // timestamp when round starts
let roundWinner = null;

// Initialize multiplayer
function initMultiplayer() {
  // Hide all sections initially except mode selection
  hideAllSections();
  modeSelectionSection.style.display = 'block';
  
  // Add event listeners
  singlePlayerBtn.addEventListener('click', startSinglePlayerMode);
  createRoomBtn.addEventListener('click', showCreateRoomSection);
  joinRoomBtn.addEventListener('click', showJoinRoomSection);
  startRoundBtn.addEventListener('click', startMultiplayerRound);
  closeRoomBtn.addEventListener('click', closeRoom);
  submitJoinBtn.addEventListener('click', joinRoom);
  backToMenuBtn.addEventListener('click', backToMenu);
  nextRoundBtn.addEventListener('click', startNextRound);
  endGameBtn.addEventListener('click', endMultiplayerGame);
  mpAnswerBtn.addEventListener('click', submitAnswer);
  mpAnswerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });
}

// Helper functions
function hideAllSections() {
  modeSelectionSection.style.display = 'none';
  createRoomSection.style.display = 'none';
  joinRoomSection.style.display = 'none';
  waitingRoomSection.style.display = 'none';
  gameInterfaceSection.style.display = 'none';
  roundResultsSection.style.display = 'none';
}

function generateRoomCode() {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generatePlayerId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function showMpNotification(message, duration = 3000) {
  mpNotificationText.textContent = message;
  mpNotification.classList.add('show');
  
  setTimeout(() => {
    mpNotification.classList.remove('show');
  }, duration);
}

// Game mode functions
function startSinglePlayerMode() {
  isMultiplayer = false;
  hideAllSections();
  gameInterfaceSection.style.display = 'block';
  
  // Hide multiplayer-specific elements
  document.getElementById('mp-score-display').style.display = 'none';
  document.getElementById('mp-round-timer').style.display = 'none';
  document.getElementById('mp-answer-container').style.display = 'none';
  
  // Reset and start the regular game
  playAgain();
}

function showCreateRoomSection() {
  hideAllSections();
  createRoomSection.style.display = 'block';
  
  // Generate and display room code
  roomCode = generateRoomCode();
  roomCodeDisplay.textContent = roomCode;
  
  // Set up as host
  isHost = true;
  isMultiplayer = true;
  currentPlayer.isHost = true;
  currentPlayer.name = 'Host';
  
  // Add host to players list
  players = [currentPlayer];
  updatePlayerList();
}

function showJoinRoomSection() {
  hideAllSections();
  joinRoomSection.style.display = 'block';
  
  // Focus on room code input
  roomCodeInput.focus();
}

function joinRoom() {
  const inputCode = roomCodeInput.value.trim().toUpperCase();
  const playerName = playerNameInput.value.trim() || 'Player';
  
  if (inputCode.length !== 6) {
    showMpNotification('Please enter a valid 6-character room code');
    return;
  }
  
  // In a real implementation, we would validate the room code with a server
  // For this demo, we'll simulate joining a room
  
  // Set player name and room code
  currentPlayer.name = playerName;
  roomCode = inputCode;
  isMultiplayer = true;
  isHost = false; // The joining player is not the host
  
  // Show waiting room
  hideAllSections();
  waitingRoomSection.style.display = 'block';
  joinedRoomCodeDisplay.textContent = roomCode;
  
  // Simulate other players (in a real implementation, this would come from the server)
  simulateOtherPlayers();
}

function simulateOtherPlayers() {
  // For demo purposes only - in a real implementation, this would be handled by the server
  // In a real implementation with Socket.io, we would receive the current players from the server
  // For now, we'll simulate as if we're joining an existing room with a host
  
  // Create a host player if we're not the host
  if (!isHost) {
    const hostPlayer = {
      id: generatePlayerId(),
      name: 'Host',
      score: 0,
      isHost: true
    };
    
    // Clear existing players array and add host and current player
    players = [];
    players.push(hostPlayer);
    players.push(currentPlayer);
  } else {
    // If we are the host, we should already be in the players array
    // This shouldn't happen in normal flow, but adding as a safeguard
    if (players.length === 0) {
      players = [currentPlayer];
    }
  }
  
  // Simulate other players joining
  setTimeout(() => {
    if (soundEnabled) joinSound.play();
    const player3 = {
      id: generatePlayerId(),
      name: 'Player 3',
      score: 0,
      isHost: false
    };
    players.push(player3);
    
    // Update both player lists to ensure host and players see the same list
    updateJoinedPlayerList();
    updatePlayerList();
    
    // Enable start button if host and enough players
    if (isHost && players.length >= 2) {
      startRoundBtn.disabled = false;
    }
    
    showMpNotification('Player 3 joined the room');
  }, 2000);
  
  setTimeout(() => {
    if (soundEnabled) joinSound.play();
    const player4 = {
      id: generatePlayerId(),
      name: 'Player 4',
      score: 0,
      isHost: false
    };
    players.push(player4);
    
    // Update both player lists to ensure host and players see the same list
    updateJoinedPlayerList();
    updatePlayerList();
    
    // Enable start button if host and enough players
    if (isHost && players.length >= 2) {
      startRoundBtn.disabled = false;
    }
    
    showMpNotification('Player 4 joined the room');
  }, 4000);
  
  // Update both player lists to ensure host and players see the same list
  updateJoinedPlayerList();
  updatePlayerList();
  
  // Enable start button if host and enough players
  if (isHost && players.length >= 2) {
    startRoundBtn.disabled = false;
  }
  
  // In a real implementation, the host would manually start the game
  // We'll show a notification that the room is ready
  setTimeout(() => {
    showMpNotification('Room is ready! Waiting for host to start the game...', 3000);
  }, 6000);
}

function updatePlayerList() {
  playerListElement.innerHTML = '';
  
  players.forEach(player => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="player ${player.isHost ? 'host' : ''}">${player.name}</span>
      ${player.isHost ? '<span class="host-badge">HOST</span>' : ''}
    `;
    playerListElement.appendChild(li);
  });
  
  // Update player count
  const playerCountElement = document.getElementById('player-count');
  if (playerCountElement) {
    playerCountElement.textContent = players.length;
  }
  
  // Enable start button if there are at least 2 players
  if (isHost && players.length >= 2) {
    startRoundBtn.disabled = false;
  }
}

function updateJoinedPlayerList() {
  joinedPlayerListElement.innerHTML = '';
  
  players.forEach(player => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="player ${player.isHost ? 'host' : ''}">${player.name}</span>
      ${player.isHost ? '<span class="host-badge">HOST</span>' : ''}
    `;
    joinedPlayerListElement.appendChild(li);
  });
  
  // Update player count if the element exists in this view
  const playerCountElement = document.getElementById('player-count');
  if (playerCountElement) {
    playerCountElement.textContent = players.length;
  }
}

function closeRoom() {
  // In a real implementation, this would notify the server to close the room
  backToMenu();
}

function backToMenu() {
  hideAllSections();
  modeSelectionSection.style.display = 'block';
  
  // Reset multiplayer state
  isMultiplayer = false;
  isHost = false;
  roomCode = null;
  players = [];
  currentPlayer.score = 0;
  currentPlayer.isHost = false;
  roundActive = false;
  clearInterval(roundTimerInterval);
}

// Multiplayer round functions
function startMultiplayerRound() {
  if (soundEnabled) startRoundSound.play();
  
  hideAllSections();
  gameInterfaceSection.style.display = 'block';
  
  // Show multiplayer-specific elements
  document.getElementById('mp-score-display').style.display = 'block';
  document.getElementById('mp-round-timer').style.display = 'block';
  document.getElementById('mp-answer-container').style.display = 'flex';
  
  // Reset game state for new round
  playable = true;
  wrongLetters = [];
  correctLetters = [];
  
  // Select a word for the round
  selectRandomWord();
  currentRoundWord = selectedWord;
  currentRoundDefinition = selectedWordDefinition;
  
  // Display the word with blanks
  displayWord();
  updateWrongLettersElement();
  
  // Reset keyboard
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.classList.remove('correct', 'wrong', 'used');
  });
  
  // Record round start time
  roundStartTime = Date.now();
  
  // Start round timer
  startRoundTimer();
  roundActive = true;
  
  // Update score display
  updateMpScoreDisplay();
  
  // Enable answer input
  mpAnswerInput.disabled = false;
  mpAnswerBtn.disabled = false;
  mpAnswerInput.value = '';
  mpAnswerInput.focus();
  
  showMpNotification('Round started! Be the first to guess the word!', 2000);
}

function startRoundTimer() {
  roundTimeLeft = 60; // Reset to 60 seconds
  updateTimerDisplay();
  
  clearInterval(roundTimerInterval); // Clear any existing interval
  
  roundTimerInterval = setInterval(() => {
    roundTimeLeft--;
    updateTimerDisplay();
    
    if (roundTimeLeft <= 0) {
      endRound(null); // No winner if time runs out
    }
  }, 1000);
}

function updateTimerDisplay() {
  const percentage = (roundTimeLeft / 60) * 100;
  mpTimerProgress.style.width = `${percentage}%`;
  mpTimerText.textContent = `${roundTimeLeft}s`;
  
  // Change color based on time left
  if (roundTimeLeft <= 10) {
    mpTimerProgress.style.background = 'linear-gradient(to right, #e74c3c, #c0392b)';
  } else if (roundTimeLeft <= 30) {
    mpTimerProgress.style.background = 'linear-gradient(to right, #f39c12, #d35400)';
  } else {
    mpTimerProgress.style.background = 'linear-gradient(to right, #2ecc71, #27ae60, #f1c40f)';
  }
}

function updateMpScoreDisplay() {
  mpScoreDisplay.textContent = currentPlayer.score;
}

function submitAnswer() {
  if (!roundActive) return;
  
  const answer = mpAnswerInput.value.trim().toLowerCase();
  const correctAnswer = selectedWord.toLowerCase();
  
  if (answer === correctAnswer) {
    // Correct answer!
    endRound(currentPlayer);
  } else {
    // Wrong answer
    showMpNotification('Incorrect answer. Try again!', 1500);
    mpAnswerInput.value = '';
    mpAnswerInput.focus();
  }
}

function endRound(winner) {
  roundActive = false;
  clearInterval(roundTimerInterval);
  
  // Disable answer input
  mpAnswerInput.disabled = true;
  mpAnswerBtn.disabled = true;
  
  // Reveal the word
  correctLetters = [...selectedWord];
  displayWord();
  showWordDefinition(true);
  
  // Update winner information
  roundWinner = winner;
  
  // Calculate time taken if there's a winner
  let timeTaken = 0;
  if (winner) {
    timeTaken = ((Date.now() - roundStartTime) / 1000).toFixed(1);
    
    // Update scores
    winner.score += 1;
    updateMpScoreDisplay();
    
    // Play win sound and create confetti
    if (soundEnabled) winSound.play();
    createConfetti();
    
    // Show notification
    showMpNotification(`${winner.name} guessed the word correctly in ${timeTaken}s!`, 3000);
  } else {
    // No winner - time ran out
    if (soundEnabled) loseSound.play();
    showMpNotification("Time's up! No one guessed the word.", 3000);
  }
  
  // Show round results after a short delay
  setTimeout(() => {
    hideAllSections();
    roundResultsSection.style.display = 'block';
    
    // Update winner display
    if (winner) {
      winnerDisplay.style.display = 'block';
      winnerName.textContent = winner.name;
      
      // Update winner time
      const winnerTimeElement = document.getElementById('winner-time');
      if (winnerTimeElement) {
        winnerTimeElement.textContent = timeTaken;
      }
    } else {
      winnerDisplay.style.display = 'none';
    }
    
    // Update player scores
    updatePlayerScoresList();
    
    // Show/hide controls based on host status
    const hostControls = document.getElementById('host-next-controls');
    const waitingMessage = document.getElementById('player-waiting-message');
    
    if (isHost) {
      hostControls.style.display = 'block';
      waitingMessage.style.display = 'none';
    } else {
      hostControls.style.display = 'none';
      waitingMessage.style.display = 'block';
    }
  }, 3000);
}

function updatePlayerScoresList() {
  playerScoresList.innerHTML = '';
  
  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  sortedPlayers.forEach(player => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="player ${player.isHost ? 'host' : ''}">${player.name}</span>
      <span class="player-score">${player.score}</span>
    `;
    playerScoresList.appendChild(li);
  });
}

function startNextRound() {
  // In a real implementation, this would notify all players via the server
  startMultiplayerRound();
}

function endMultiplayerGame() {
  // In a real implementation, this would notify all players via the server
  backToMenu();
}

// Initialize multiplayer when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Check if all required elements are available
  const requiredElements = [
    modeSelectionSection, createRoomSection, joinRoomSection, waitingRoomSection,
    gameInterfaceSection, roundResultsSection, roomCodeDisplay, joinedRoomCodeDisplay,
    playerListElement, joinedPlayerListElement, playerScoresList, winnerDisplay,
    createRoomBtn, joinRoomBtn, singlePlayerBtn, startRoundBtn, closeRoomBtn,
    submitJoinBtn, backToMenuBtn, nextRoundBtn, endGameBtn, roomCodeInput,
    playerNameInput, mpAnswerInput, mpAnswerBtn, mpTimerProgress, mpTimerText,
    mpScoreDisplay, mpNotification, mpNotificationText
  ];
  
  const missingElements = requiredElements.filter(el => !el);
  
  if (missingElements.length > 0) {
    console.error('Some required elements are missing:', missingElements);
  } else {
    console.log('Initializing multiplayer functionality...');
    initMultiplayer();
    
    // Add event listener for back button in join room panel
    const backFromJoinBtn = document.getElementById('back-from-join-btn');
    if (backFromJoinBtn) {
      backFromJoinBtn.addEventListener('click', () => {
        hideAllSections();
        modeSelectionSection.style.display = 'block';
      });
    }
    
    // Add event listener for copy code button
    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(roomCode)
          .then(() => showMpNotification('Room code copied to clipboard!'))
          .catch(err => console.error('Could not copy text: ', err));
      });
    }
  }
});
