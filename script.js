const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
const figureParts = document.querySelectorAll(".figure-part");
const wordInfoElement = document.getElementById("word-info"); // Element to show word info
const timerElement = document.getElementById("timer"); // Timer element
const streakCountElement = document.getElementById("streak-count"); // Streak counter element
const difficultyElement = document.getElementById("difficulty-level"); // Difficulty level element
const keyboardContainer = document.getElementById("keyboard-container"); // Virtual keyboard
const keys = document.querySelectorAll(".key"); // All keyboard keys
const particlesContainer = document.getElementById("particles-container"); // Particles container
const tooltip = document.getElementById("word-tooltip"); // Word definition tooltip
const tooltipTitle = document.getElementById("tooltip-title"); // Tooltip title
const tooltipDefinition = document.getElementById("tooltip-definition"); // Tooltip definition

// Sound elements
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

const words = [
    // Easier Words
    { word: "apple", info: "A round fruit with red, green, or yellow skin and a sweet taste." },
    { word: "dog", info: "A domesticated carnivorous mammal often kept as a pet." },
    { word: "school", info: "An institution for educating children or adults." },
    { word: "computer", info: "An electronic device used for storing and processing data." },
    { word: "book", info: "A set of written, printed, or blank pages fastened together and bound in covers." },
    { word: "car", info: "A motor vehicle with four wheels used for driving on roads." },
    { word: "bottle", info: "A container, usually made of glass or plastic, for holding liquids." },
    { word: "guitar", info: "A musical instrument with strings played by strumming or plucking." },
    { word: "ladder", info: "A portable device with steps used for climbing." },
    { word: "basket", info: "A container made of woven materials used for carrying or storing items." },
    { word: "helmet", info: "A protective covering worn on the head for safety." },
    { word: "camera", info: "A device used to capture photographs or video." },
    { word: "napkin", info: "A small cloth or paper used to wipe the mouth or hands." },
    { word: "cake", info: "A sweet baked food made from flour, sugar, and other ingredients." },
    { word: "pencil", info: "A tool used for writing or drawing, usually made of wood and graphite." },
    { word: "basketball", info: "A sport played with a ball and hoops, often indoors." },
    { word: "blanket", info: "A large piece of soft fabric used to keep warm." },
    { word: "scarf", info: "A piece of fabric worn around the neck for warmth or fashion." },
    { word: "mirror", info: "A surface, usually glass, that reflects an image." },
    { word: "window", info: "An opening in a wall or roof for letting in light or air." },
    
    // Medium Words
    { word: "planet", info: "Orbits a star like the Sun." },
    { word: "guitar", info: "A stringed musical instrument." },
    { word: "castle", info: "A large fortified building." },
{ word: "danger", info: "Exposure to harm or risk." },
{ word: "circle", info: "A round shape with no corners." },
{ word: "rocket", info: "Flies into space with engines." },
{ word: "banana", info: "A yellow fruit with soft flesh." },
{ word: "dragon", info: "Mythical creature with wings and fire." },
{ word: "rescue", info: "To save from danger." },
{ word: "silver", info: "A shiny grayish-white metal." },
{ word: "rabbit", info: "A hopping animal with long ears." },
{ word: "window", info: "An opening to let in light." },
{ word: "camera", info: "Captures photographs or video." },
{ word: "ladder", info: "Used to climb to high places." },
{ word: "butter", info: "Spread made from milk or cream." },
{ word: "magnet", info: "Attracts iron and steel." },
{ word: "wallet", info: "Used to carry money or cards." },
{ word: "singer", info: "Performs songs using their voice." },
{ word: "pirate", info: "A thief who robs ships." },
{ word: "mirror", info: "Reflects your appearance." },
{ word: "temple", info: "A place of religious worship." },
{ word: "rocket", info: "Launches into the sky or space." },
{ word: "vacuum", info: "Used to clean carpets and floors." },
{ word: "chorus", info: "Repeated part of a song." },
{ word: "garage", info: "Where cars are parked or fixed." },
{ word: "police", info: "Enforces laws and keeps order." },
{ word: "shelter", info: "Protection from bad weather or danger." },
{ word: "glider", info: "An aircraft with no engine." },
{ word: "island", info: "Land surrounded by water." },
{ word: "wallet", info: "Holds cash and cards." },
{ word: "artist", info: "Creates visual or performance art." },
{ word: "vacancy", info: "An unoccupied room or position." },
{ word: "college", info: "Provides higher education after school." },
{ word: "library", info: "A place to borrow books." },
{ word: "journey", info: "A long trip or travel." },
{ word: "stadium", info: "Large arena for sports or concerts." },
{ word: "prisoner", info: "A person held in jail." },
{ word: "butcher", info: "Sells meat products." },
{ word: "engineer", info: "Designs machines, buildings, or systems." },
{ word: "banquet", info: "A large formal meal." },
{ word: "dancer", info: "Performs movements to music." },
{ word: "jacket", info: "Worn for warmth or style." },
{ word: "mobile", info: "A portable communication device." },
{ word: "parade", info: "Celebratory public procession." },
{ word: "theater", info: "Place to watch performances or films." },
{ word: "mailbox", info: "Receives letters and packages." },
{ word: "harvest", info: "Collecting mature crops." },
{ word: "doctor", info: "Treats people who are ill." },
{ word: "barber", info: "Cuts and styles hair." },
{ word: "button", info: "Fastens clothing together." },
{ word: "window", info: "Glass panel in a wall." },
{ word: "laptop", info: "Portable personal computer." },
{ word: "trophy", info: "Award for winning." },
{ word: "crayon", info: "Used for coloring." },
{ word: "locker", info: "Stores personal belongings securely." },
{ word: "signal", info: "Indicates action or communication." },
{ word: "pirate", info: "Steals on the sea." },
{ word: "rocket", info: "Launched into space." },
{ word: "bucket", info: "Used to carry liquids." },
{ word: "bottle", info: "Stores liquid for drinking." },
{ word: "planet", info: "Orbits a star." },
{ word: "shovel", info: "Used to dig." },
{ word: "candle", info: "Gives light when lit." },
{ word: "pillow", info: "Supports your head during sleep." },
{ word: "window", info: "You look through it." },
{ word: "helmet", info: "Protects your head." },
{ word: "castle", info: "Old fort-like building." },
{ word: "vacuum", info: "Cleans your floor." },
{ word: "singer", info: "Performs with voice." },
{ word: "rescue", info: "Save someone in danger." },
{ word: "butter", info: "Spread from cream." },
{ word: "mirror", info: "Reflects images." },
{ word: "magnet", info: "Attracts metal." },
{ word: "wallet", info: "Holds money." },
{ word: "chorus", info: "Repeated part in a song." },
{ word: "garage", info: "Place to park a car." },
{ word: "artist", info: "Creates paintings or drawings." },
{ word: "journey", info: "Long trip or travel." },
{ word: "stadium", info: "Huge sports ground." },
{ word: "prisoner", info: "Held in prison." },
{ word: "mailbox", info: "Where letters arrive." },
{ word: "temple", info: "Sacred place for prayer." },
{ word: "theater", info: "Stage for acting." },
{ word: "glider", info: "Plane without engine." },
{ word: "ladder", info: "Used for climbing." },
{ word: "chorus", info: "Song's repeating section." },
{ word: "college", info: "Post-school education place." },
{ word: "vacancy", info: "Empty room or job." },
{ word: "banana", info: "Yellow curved fruit." },
{ word: "planet", info: "Like Earth or Mars." },
{ word: "rabbit", info: "Long-eared hopper." },
{ word: "danger", info: "Risk of harm." },
{ word: "window", info: "Lets light in." },
{ word: "mirror", info: "Shows reflection." },
{ word: "pirate", info: "Sea thief." },
{ word: "camera", info: "Takes pictures." },
{ word: "circle", info: "Round shape." },
{ word: "castle", info: "Old fortress home." },

  
    // HardWords
    { word: "archive", info: "A collection of historical records or documents." },
    { word: "turbine", info: "A machine that produces power using rotating blades and steam, water, or gas." },
    { word: "compass", info: "A tool used for navigation and finding directions." },
    { word: "gravity", info: "The force that pulls objects toward Earth." },
    { word: "fossil", info: "Preserved remains or traces of ancient living organisms." },
    { word: "horizon", info: "The line where the earth or sea seems to meet the sky." },
    { word: "galaxy", info: "A system of stars, gas, dust, and dark matter bound together by gravity." },
    { word: "volcano", info: "An opening in Earth's surface that erupts lava, ash, and gases." },
    { word: "radar", info: "A system that uses waves to detect objects and measure their distance." },
    { word: "pyramid", info: "A monumental structure with a square base and triangular sides, found in Egypt." },
    { word: "telescope", info: "An instrument used to view distant objects, like stars and planets." },
    { word: "calendar", info: "A chart showing days, weeks, and months of the year." },
    { word: "chlorine", info: "A chemical element often used for purifying water." },
    { word: "oxygen", info: "A gas essential for most forms of life on Earth." },
    { word: "cylinder", info: "A three-dimensional geometric shape with circular ends and straight sides." },
    { word: "triangle", info: "A shape with three straight sides and three angles." },
    { word: "spectrum", info: "A range of different positions, opinions, or qualities." },
    { word: "symmetry", info: "The quality of being made up of exactly similar parts facing each other or around an axis." },
    { word: "compass", info: "A device used to determine direction." },
    { word: "granite", info: "A hard, durable rock often used in construction." },
    { word: "barrier", info: "Something that blocks movement or access." },
    { word: "oasis", info: "A fertile area in a desert where water is available." },
    { word: "harvest", info: "The process of gathering crops." },
    { word: "justice", info: "Fair treatment and behavior toward others." },
    { word: "orbit", info: "The path one object takes around another in space." },
    { word: "vacuum", info: "A space entirely devoid of matter." },
    { word: "prairie", info: "A large, open area of grassland." },
    { word: "caravan", info: "A group of travelers journeying together, often in the desert." },
    { word: "quartz", info: "A hard mineral found in many types of rocks." },
    { word: "voyage", info: "A long journey by sea or in space." },
    { word: "pioneer", info: "A person who explores or settles in a new area." },
    { word: "lantern", info: "A portable light with a protective cover." },
    { word: "meadow", info: "A field of grass and wildflowers." },
    { word: "glacier", info: "A large mass of ice that moves slowly over land." },
    { word: "orbit", info: "The curved path of an object around a star, planet, or moon." },
    { word: "marble", info: "A type of hard, smooth stone often used in sculpture and architecture." },
    { word: "antique", info: "An object that is old and often valuable." },
    { word: "lantern", info: "A portable light source, often with a flame or bulb inside." },
    { word: "canyon", info: "A deep gorge, typically with a river flowing through it." },
    { word: "admiral", info: "A high-ranking officer in the navy." },
    { word: "alchemy", info: "An ancient practice that aimed to turn base metals into gold." },
    { word: "algebra", info: "A branch of mathematics dealing with symbols and the rules for manipulating them." },
    { word: "amber", info: "A yellowish-brown fossilized tree resin." },
    { word: "anagram", info: "A word or phrase formed by rearranging the letters of another." },
    { word: "aviator", info: "A pilot of an aircraft." },
    { word: "ballast", info: "Heavy material placed to improve stability, especially in a ship." },
  { word: "beacon", info: "A light or signal that guides or warns." },
  { word: "botany", info: "The scientific study of plants." },
  { word: "brewery", info: "A place where beer is made." },
  { word: "cadence", info: "A rhythmic flow of sounds or words." },
  { word: "cavalry", info: "Soldiers who fight on horseback." },
  { word: "chateau", info: "A large French country house or castle." },
  { word: "citadel", info: "A fortress protecting a city." },
  { word: "corsair", info: "A pirate or privateer, especially from the Mediterranean." },
  { word: "crimson", info: "A deep red color." },
  { word: "decibel", info: "A unit used to measure the intensity of sound." },
  { word: "dynasty", info: "A sequence of rulers from the same family or group." },
  { word: "emblem", info: "A symbol or design representing an idea or organization." },
  { word: "equinox", info: "The time when day and night are of equal length." },
  { word: "fresco", info: "A painting done on freshly laid wet plaster." },
  { word: "galleon", info: "A large sailing ship used between the 15th and 17th centuries." },
  { word: "granary", info: "A storehouse for grain." },
  { word: "hammock", info: "A bed made of canvas or rope and suspended by cords." },
  { word: "harpoon", info: "A spear-like weapon used to hunt whales." },
  { word: "hermit", info: "A person living in solitude for religious reasons." },
  { word: "horizon", info: "The line where the earth or sea seems to meet the sky." },
  { word: "hurricane", info: "A tropical storm with strong winds and heavy rain." },
  { word: "ignition", info: "The process of starting a fire or engine." },
  { word: "infantry", info: "Soldiers who fight on foot." },
  { word: "isotope", info: "Atoms of the same element with different numbers of neutrons." },
  { word: "javelin", info: "A light spear thrown in a sport or battle." },
  { word: "keystone", info: "The central stone at the top of an arch." },
  { word: "lagoon", info: "A shallow body of water separated from a larger sea." },
  { word: "lattice", info: "A framework consisting of crossed strips of wood or metal." },
  { word: "lozenge", info: "A diamond-shaped figure or object." },
  { word: "manor", info: "A large country house with lands." },
  { word: "mariner", info: "A sailor." },
  { word: "meander", info: "To follow a winding or indirect course." },
  { word: "monsoon", info: "A seasonal wind bringing rain in tropical regions." },
  { word: "nebula", info: "A cloud of gas and dust in space." },
  { word: "nomad", info: "A person who moves from place to place without a fixed home." },
  { word: "obelisk", info: "A tall, four-sided, narrow monument that ends in a pyramid-like shape." },
  { word: "octave", info: "A series of eight notes in music." },
  { word: "omen", info: "An event or sign thought to predict the future." },
  { word: "pavilion", info: "A large tent or structure used for events or exhibitions." },
  { word: "pebble", info: "A small, rounded stone." },
  { word: "platoon", info: "A small military unit of soldiers." },
  { word: "precinct", info: "A district or division of a city or town." },
  { word: "quarry", info: "A place where stone is extracted from the ground." },
  { word: "rapier", info: "A thin, light, sharp-pointed sword." },
  { word: "ripple", info: "A small wave or series of waves on the surface of water." },
  { word: "sapphire", info: "A precious blue gemstone." },
  { word: "sergeant", info: "A rank in the military or police." },
  { word: "sierra", info: "A range of mountains with a jagged outline." },
  { word: "silhouette", info: "A dark outline of a person or object against a lighter background." },
  { word: "solstice", info: "The time when the sun is at its greatest distance from the equator." },
  { word: "strait", info: "A narrow passage of water connecting two seas or large bodies of water." },
  { word: "tundra", info: "A vast, treeless region in the Arctic." },
  { word: "turquoise", info: "A blue-green mineral used as a gemstone." },
  { word: "vortex", info: "A whirlpool or whirlwind." },
  ];
  

// Game state variables
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;
let timerInterval = null;
let timeLeft = 60; // Starting time in seconds
let streak = 0; // Streak counter
let difficulty = 1; // Current difficulty level (1: easy, 2: medium, 3: hard)
let lastWordIndex = -1; // Track the last word index to avoid repetition
let soundEnabled = true; // Sound effects toggle
let particlesEnabled = true; // Particle effects toggle
let backgroundTransitionTimeout = null; // For background color transitions

const correctLetters = [];
const wrongLetters = [];

// Start the timer
function startTimer() {
  // Clear any existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  // Reset time based on difficulty
  timeLeft = difficulty === 1 ? 60 : difficulty === 2 ? 45 : 30;
  timerElement.textContent = timeLeft;
  
  // Update timer display every second
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    // Change color when time is running low
    if (timeLeft <= 10) {
      timerElement.style.color = 'var(--accent-color)';
    } else {
      timerElement.style.color = 'var(--warning-color)';
    }
    
    // Time's up
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      finalMessage.innerText = "Time's up! 😕";
      finalMessageRevealWord.innerText = `...the word was: ${selectedWord.word}`;
      popup.style.display = "flex";
      playable = false;
      streak = 0; // Reset streak on loss
      updateStreakDisplay();
    }
  }, 1000);
}

// Update streak counter display
function updateStreakDisplay() {
  // Ensure streak is a number
  if (typeof streak !== 'number') {
    streak = 0;
  }
  
  // Update the display
  streakCountElement.textContent = streak;
  
  // Add animation effect when streak increases
  streakCountElement.classList.add('highlight');
  
  // Store the streak in localStorage to persist between page refreshes
  localStorage.setItem('hangmanStreak', streak);
  
  setTimeout(() => {
    streakCountElement.classList.remove('highlight');
  }, 500);
}

// Select a word based on current difficulty
function selectWordByDifficulty() {
  let wordPool = [];
  
  // Filter words by difficulty
  if (difficulty === 1) {
    // Easy words (shorter words)
    wordPool = words.filter(word => word.word.length <= 5);
  } else if (difficulty === 2) {
    // Medium words (medium length)
    wordPool = words.filter(word => word.word.length > 5 && word.word.length <= 7);
  } else {
    // Hard words (longer words)
    wordPool = words.filter(word => word.word.length > 7);
  }
  
  // If no words match the criteria, use all words
  if (wordPool.length === 0) {
    wordPool = words;
  }
  
  // Keep track of previously used words to avoid repetition
  const previousWord = selectedWord ? selectedWord.word : null;
  
  // Select a random word, avoiding the previous word if possible
  let newWord;
  let attempts = 0;
  const maxAttempts = 10; // Prevent infinite loop
  
  do {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    newWord = wordPool[randomIndex];
    attempts++;
    
    // Break the loop if we've tried too many times or found a different word
    if (attempts >= maxAttempts || !previousWord || newWord.word !== previousWord) {
      break;
    }
  } while (wordPool.length > 1);
  
  return newWord;
}

function displayWord() {
  // Create letter elements with staggered animation for newly revealed letters
  const letterElements = selectedWord.word.split('').map((letter, index) => {
    const isRevealed = correctLetters.includes(letter);
    const wasRevealed = document.querySelectorAll('.letter')[index]?.textContent.trim() === letter;
    
    // Only add animation for newly revealed letters
    const animation = isRevealed && !wasRevealed ? 
      `animation: letterReveal 0.5s ease-in-out ${index * 0.1}s forwards;` : '';
    
    // If this is a newly revealed letter, create particle effects and play sound
    if (isRevealed && !wasRevealed) {
      // Play correct sound
      if (soundEnabled) {
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log('Error playing sound:', e));
      }
      
      // Create particles for the letter
      if (particlesEnabled) {
        setTimeout(() => {
          createParticles(letter, index);
        }, index * 100);
      }
    }
    
    return `
      <span class="letter" style="${animation}">
        ${isRevealed ? letter : ""}
      </span>
    `;
  });
  
  wordElement.innerHTML = letterElements.join('');
  
  // Update background color based on progress
  updateBackgroundColor();
  
  // Check for win condition
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord.word) {
    clearInterval(timerInterval); // Stop the timer
    
    // Play win sound
    if (soundEnabled) {
      winSound.currentTime = 0;
      winSound.play().catch(e => console.log('Error playing sound:', e));
    }
    
    // Add confetti effect for winning
    createConfetti();
    
    // Set background to success color
    document.body.style.background = `linear-gradient(135deg, #27ae60, #2ecc71)`;
    
    // Delay popup to allow animations to complete
    setTimeout(() => {
      finalMessage.innerText = "Congratulations! You won! 😃";
      finalMessageRevealWord.innerText = "";
      popup.style.display = "flex";
      popup.style.animation = "fadeIn 0.5s ease-in-out";
      playable = false;
      
      // Increase streak and potentially difficulty
      streak++;
      updateStreakDisplay();
      
      // Increase difficulty every 3 consecutive wins
      if (streak % 3 === 0 && difficulty < 3) {
        difficulty++;
        difficultyElement.textContent = difficulty;
        difficultyElement.classList.add('level-up');
        
        // Remove the animation class after it completes
        setTimeout(() => {
          difficultyElement.classList.remove('level-up');
        }, 800);
      }
      
      // Show word definition tooltip with full info since game is over
      showWordDefinition(true);
    }, 1000);
  }
}

// Function to create particles for correct letter guesses
function createParticles(letter, letterIndex) {
  // Get the position of the letter element
  const letterElement = document.querySelectorAll('.letter')[letterIndex];
  if (!letterElement) return;
  
  const rect = letterElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create 10 particles
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 8 + 4;
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = Math.random() * 60 + 20; // Random distance
    const duration = Math.random() * 1 + 0.5; // Random duration
    
    // Calculate position
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    // Set styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${duration}s`;
    
    // Random color based on difficulty
    let color;
    if (difficulty === 1) {
      color = 'var(--success-color)';
    } else if (difficulty === 2) {
      color = 'var(--warning-color)';
    } else {
      color = 'var(--accent-color)';
    }
    particle.style.backgroundColor = color;
    
    // Add to container and remove after animation
    particlesContainer.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
}

// Function to update background color based on game progress
function updateBackgroundColor() {
  // Clear any existing timeout
  if (backgroundTransitionTimeout) {
    clearTimeout(backgroundTransitionTimeout);
  }
  
  // Calculate progress
  const totalLetters = [...new Set(selectedWord.word.split(''))].length;
  const correctGuessed = [...new Set(correctLetters)].filter(letter => 
    selectedWord.word.includes(letter)
  ).length;
  
  const progress = correctGuessed / totalLetters;
  
  // Set background color based on progress
  let background;
  if (progress === 0) {
    background = `linear-gradient(135deg, var(--primary-color), #1a2530)`;
  } else if (progress < 0.5) {
    background = `linear-gradient(135deg, #2c3e50, #3498db)`;
  } else if (progress < 1) {
    background = `linear-gradient(135deg, #3498db, #2980b9)`;
  }
  
  // Apply the background with transition
  document.body.style.background = background;
  
  // Set a timeout to prevent too many updates
  backgroundTransitionTimeout = setTimeout(() => {
    backgroundTransitionTimeout = null;
  }, 500);
}

// Function to show word definition tooltip
function showWordDefinition(showFullInfo = false) {
  // Set tooltip content based on game state
  if (showFullInfo || !playable) {
    // Show full info including the word when game is over or explicitly requested
    tooltipTitle.textContent = selectedWord.word;
    tooltipDefinition.textContent = selectedWord.info;
  } else {
    // During gameplay, only show a hint, not the actual word
    tooltipTitle.textContent = "Word Hint";
    tooltipDefinition.textContent = selectedWord.info;
  }
  
  // Position tooltip near the word info element
  const infoRect = wordInfoElement.getBoundingClientRect();
  tooltip.style.left = `${infoRect.left + infoRect.width / 2 - 175}px`;
  tooltip.style.top = `${infoRect.bottom + 15}px`;
  
  // Show tooltip with animation
  tooltip.classList.add('show');
  
  // Hide tooltip after delay
  setTimeout(() => {
    tooltip.classList.remove('show');
  }, 5000);
}

// Function to create confetti effect on win
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';
  document.body.appendChild(confettiContainer);
  
  // Create multiple confetti pieces
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random properties for each confetti piece
    const size = Math.random() * 10 + 5;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${left}%`;
    confetti.style.animationDuration = `${animationDuration}s`;
    
    confettiContainer.appendChild(confetti);
  }
  
  // Remove confetti after animation completes
  setTimeout(() => {
    confettiContainer.remove();
  }, 5000);
}

function updateWrongLettersElement() {
  // Update wrong letters display with animation
  if (wrongLetters.length > 0) {
    const letterElements = wrongLetters.map((letter, index) => {
      // Add delay for each letter to create a staggered effect
      const delay = index * 0.2;
      return `<span style="animation: fadeIn 0.5s ease-in-out ${delay}s both">${letter}</span>`;
    });
    
    wrongLettersElement.innerHTML = `
      <p style="animation: shake 0.5s ease-in-out">Wrong</p>
      ${letterElements.join('')}
    `;
    
    // Play wrong sound for the latest wrong letter
    if (soundEnabled && wrongLetters.length > 0) {
      wrongSound.currentTime = 0;
      wrongSound.play().catch(e => console.log('Error playing sound:', e));
    }
    
    // Update virtual keyboard for wrong letter
    updateKeyboardState();
  } else {
    wrongLettersElement.innerHTML = '';
  }
  
  // Update figure parts with animation
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      // Remove classes first to restart animation if needed
      part.classList.remove('show');
      // Use setTimeout to create a small delay before adding the class back
      setTimeout(() => {
        part.classList.add('show');
      }, 10);
    } else {
      part.classList.remove('show');
    }
  });
  
  // Update background color based on wrong guesses
  const wrongRatio = wrongLetters.length / figureParts.length;
  if (wrongRatio > 0.5) {
    document.body.style.background = `linear-gradient(135deg, #c0392b, #e74c3c)`;
  }
  
  // Check for game over
  if (wrongLetters.length === figureParts.length) {
    clearInterval(timerInterval); // Stop the timer
    
    // Play lose sound
    if (soundEnabled) {
      loseSound.currentTime = 0;
      loseSound.play().catch(e => console.log('Error playing sound:', e));
    }
    
    // Set background to failure color
    document.body.style.background = `linear-gradient(135deg, #c0392b, #e74c3c)`;
    
    // Add a small delay before showing the popup for better UX
    setTimeout(() => {
      finalMessage.innerText = "Unfortunately you lost. 😕";
      finalMessageRevealWord.innerText = `...the word was: ${selectedWord.word}`;
      popup.style.display = "flex";
      popup.style.animation = "fadeIn 0.5s ease-in-out";
      playable = false;
      streak = 0; // Reset streak on loss
      updateStreakDisplay();
      localStorage.setItem('hangmanStreak', 0);
      
      // Show word definition tooltip with full info since game is over
      showWordDefinition(true);
    }, 500);
  }
}

// Function to update virtual keyboard state
function updateKeyboardState() {
  // Update all keys based on correct and wrong letters
  keys.forEach(key => {
    const letter = key.textContent.toLowerCase();
    
    // Reset classes first
    key.classList.remove('correct', 'wrong', 'used');
    
    if (correctLetters.includes(letter)) {
      key.classList.add('correct', 'used');
    } else if (wrongLetters.includes(letter)) {
      key.classList.add('wrong', 'used');
    }
  });
}

function showNotification() {
  // Add shake animation to notification
  notification.style.animation = "shake 0.5s ease-in-out";
  notification.classList.add("show");
  
  // Reset animation after it completes
  setTimeout(() => {
    notification.style.animation = "";
  }, 500);
  
  // Hide notification after delay
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Function to handle letter input (from keyboard or virtual keyboard)
function handleLetterInput(letter) {
  if (playable && letter >= "a" && letter <= "z") {
    if (selectedWord.word.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
    
    // Update keyboard state after each input
    updateKeyboardState();
  }
}

// Physical keyboard event listener
window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    handleLetterInput(letter);
  }
});

// Virtual keyboard event listeners
keys.forEach(key => {
  key.addEventListener('click', () => {
    if (playable) {
      const letter = key.textContent.toLowerCase();
      handleLetterInput(letter);
    }
  });
});

playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  
  // Reset background color
  document.body.style.background = `linear-gradient(135deg, var(--primary-color), #1a2530)`;
  
  // Select a word based on current difficulty
  selectedWord = selectWordByDifficulty();
  
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
  wordInfoElement.innerHTML = selectedWord.info; // Display the word info
  
  // Reset virtual keyboard
  keys.forEach(key => {
    key.classList.remove('correct', 'wrong', 'used');
  });
  
  // Hide tooltip if visible
  tooltip.classList.remove('show');
  
  // Start a new timer
  startTimer();
  
  // Note: We don't reset the streak here as it should persist between games
  // Only reset on loss (handled in updateWrongLettersElement function)
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .highlight {
    animation: pulse 0.5s ease-in-out;
    color: var(--success-color) !important;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes popIn {
    0% { transform: scale(0); opacity: 0; }
    70% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .confetti-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
    overflow: hidden;
  }
  
  .confetti {
    position: absolute;
    top: -10px;
    border-radius: 0;
    animation: fall linear forwards;
  }
  
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Load saved streak from localStorage if available
const savedStreak = localStorage.getItem('hangmanStreak');
if (savedStreak !== null) {
  streak = parseInt(savedStreak, 10);
  // If parsing fails, reset to 0
  if (isNaN(streak)) {
    streak = 0;
  }
}

// Initialize the game
displayWord();
wordInfoElement.innerHTML = selectedWord.info; // Display the word info when the game starts
updateStreakDisplay(); // Initialize streak display
difficultyElement.textContent = difficulty; // Initialize difficulty display
startTimer(); // Start the timer
updateKeyboardState(); // Initialize keyboard state

// Add event listener for word info to show tooltip on click
wordInfoElement.addEventListener('click', () => {
  // Only show hint during gameplay, not the actual word
  showWordDefinition(false);
});

// Add sound toggle functionality
const toggleSound = () => {
  soundEnabled = !soundEnabled;
  // Visual feedback for sound toggle
  document.body.classList.toggle('sound-off', !soundEnabled);
};

// Add particle toggle functionality
const toggleParticles = () => {
  particlesEnabled = !particlesEnabled;
};

// Initialize with a welcome message
console.log('Welcome to the enhanced Hangman game!');

// Responsive design adjustments
window.addEventListener('resize', () => {
  // Reposition tooltip if it's visible
  if (tooltip.classList.contains('show')) {
    const wordRect = wordElement.getBoundingClientRect();
    tooltip.style.left = `${wordRect.left + wordRect.width / 2 - 150}px`;
    tooltip.style.top = `${wordRect.bottom + 20}px`;
  }
});

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
  // Escape key closes popup
  if (e.key === 'Escape' && popup.style.display === 'flex') {
    playAgainButton.click();
  }
  
  // Space or Enter on focused key triggers click
  if ((e.key === ' ' || e.key === 'Enter') && document.activeElement.classList.contains('key')) {
    document.activeElement.click();
    e.preventDefault(); // Prevent page scroll on space
  }
});

// Make virtual keyboard keys focusable for accessibility
keys.forEach(key => {
  key.setAttribute('tabindex', '0');
  key.setAttribute('aria-label', `Letter ${key.textContent}`);
});
