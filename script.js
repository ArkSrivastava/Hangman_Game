const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");
const wordInfoElement = document.getElementById("word-info"); // Element to show word info

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
    
    // Cricket Words
    { word: "bat", info: "A flat, elongated piece of wood used for hitting the ball." },
    { word: "pitch", info: "The central strip of ground where the ball is bowled." },
    { word: "stumps", info: "Three vertical posts that form the wicket." },
    { word: "bails", info: "Small wooden pieces that sit on top of the stumps." },
    { word: "boundary", info: "The edge of the playing field in cricket." },
    { word: "six", info: "When the ball is hit over the boundary without touching the ground." },
    { word: "over", info: "A set of six legal deliveries bowled by a bowler." },
    { word: "run", info: "A single unit of scoring in cricket." },
    { word: "wicket", info: "A term used when a batsman is dismissed or the stumps are hit." },
    { word: "spin", info: "A type of bowling where the ball is made to turn sharply." },
    { word: "catch", info: "When a fielder catches the ball before it touches the ground." },
    { word: "field", info: "The area where the game is played or players try to stop the ball." },
    { word: "umpire", info: "The official who enforces the rules and makes decisions on the field." },
    { word: "crease", info: "The lines marking the batting and bowling areas." },
    { word: "bowler", info: "The player who delivers the ball to the batsman." },
    { word: "allrounder", info: "A player skilled at both batting and bowling." },
    { word: "century", info: "A score of 100 runs by a batsman in one inning." },
    { word: "duck", info: "A batsman getting out without scoring any runs." },
    { word: "powerplay", info: "An early phase of limited-overs matches with fielding restrictions." },
    { word: "yorker", info: "A ball bowled at the batsman’s feet, difficult to play." },
  
    // More Challenging Words
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
  

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord.word
      .split("") // to array
      .map(
        (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")} 
    `; // to string
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord.word) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord.word}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
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
    }
  }
});

playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
  wordInfoElement.innerHTML = selectedWord.info; // Display the word info
});

// Init
displayWord();
wordInfoElement.innerHTML = selectedWord.info; // Display the word info when the game starts
