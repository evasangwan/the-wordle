const form = document.querySelector(".guess-form");
const input = form.querySelector("input");
const tiles = document.querySelectorAll(".tile");
const newGameButton = document.querySelector(".new-game-button");
const keys = document.querySelectorAll(".key");
const message = document.querySelector(".message");
const modal = document.querySelector(".modal");
const modalMessage = document.querySelector(".modal-message");
const modalButton = document.querySelector(".modal-button");

let gameOver = false;
let currentRow = 0;

const wordLength = 5;
const maxGuesses = 7;

const answers = [
  "CRANE","PLANT","BRAVE","CLOUD","TRACK","OCEAN","BREAD","FLAME","SHINE","DRIVE",
  "STONE","LIGHT","SMILE","BRICK","WATER","TRAIN","APPLE","BLEND","COVER","RIVER",
  "MATCH","FIELD","SWEET","ANGLE","QUEST","ROUND","POWER","CORAL","MOUNT","LEVEL",
  "BEACH","NURSE","LAUGH","MAGIC","SHIELD","ARMOR","FINAL","BEGIN","HAPPY","RELAX",
  "PEACE","NIGHT","MONTH","QUICK","EARLY","LATER","SLOW","BLOOM","GREEN","FRUIT",
  "BERRY","LEMON","PEACH","TIGER","ZEBRA","PANDA","HORSE","SNAKE","ROBOT","LASER",
  "SOLAR","METAL","RADAR","CLOCK","ALARM","TIMER","COUNT","SCORE","SPELL","CROWN",
  "CYCLE","CANDY","CANAL","CARRY","CARGO","CATER","CAUSE","CEDAR","CHAIN","CHANT",
  "CHAOS","CHARM","CHASE","CHEAP","CHEAT","CHECK","CHEER","CHEST","CHIEF","CHILD",
  "CHILL","CHIME","CHOIR","CHOKE","CHORD","CHUNK","CHURN","CIDER","CIGAR","CIVIC",
  "CIVIL","CLAIM","CLAMP","CLASH","CLASP","CLASS","CLEAN","CLEAR","CLERK","CLICK",
  "CLIFF","CLIMB","CLING","CLOSE","CLOTH","CLOVE","CLOWN","COACH","COAST","COBRA",
  "COCOA","COLON","COMET","COMIC","COURT","COVET","CRACK","CRAFT","CRANK","CRASH",
  "CRATE","CRAVE","CRAWL","CRAZE","CREAK","CREAM","CREEK","CREEP","CREST","CRIME",
  "CROAK","CROOK","CROWD","CRUDE","CRUEL","CRUMB","CRUSH","CRYPT",

  "BASIC","BASIL","BASIN","BATCH","BATHE","BATON","BAYOU","BEADY","BEARD","BEAST",
  "BEECH","BEFIT","BEGUN","BEING","BELLY","BELOW","BENCH","BIBLE","BIRTH","BISON","BLACK","BLADE","BLAME","BLAND","BLANK",
  "BLAST","BLAZE","BLEAK","BLEED","BLIND","BLISS","BLOCK","BLOOD","BLUFF","BLUNT",
  "BLURT","BLUSH","BOARD","BOAST","BONUS","BOOST","BOOTH","BOOZE","BOUND","BOWEL",
  "BOXER","BRACE","BRAID","BRAIN","BRAKE","BRAND","BRASS","BRAWN","BREAK","BREED",

  "DREAM","DRINK","DRIFT","DRILL","DRONE","DROVE","DROOP","DROWN","DRUNK","DRAPE",
  "DRAWL","DRAWN","DREAD","DRESS","DRIED","DRIER","DRIVE","DROLL","DRAMA","DRAIN",

  "EAGER","EAGLE","EARTH","ELBOW","ELDER","ELITE","ENJOY","ENTER","ENTRY","EPOCH",
  "EQUAL","ERROR","ESSAY","EVENT","EVERY","EXACT","EXILE","EXIST","EXTRA","EXULT",

  "FAITH","FALSE","FANCY","FAULT","FEAST","FEVER","FIBER","FIELD","FIERY","FIFTH",
  "FIFTY","FIGHT","FINAL","FIRST","FLAIR","FLAKE","FLARE","FLASH","FLEET","FLESH",
  "FLICK","FLING","FLOAT","FLOOD","FLOOR","FLORA","FLOUR","FLUID","FLUTE","FOCUS",

  "GIANT","GHOST","GIVEN","GLADE","GLASS","GLIDE","GLOBE","GLOOM","GLORY","GLOVE",
  "GOING","GRACE","GRADE","GRAIN","GRAND","GRANT","GRAPE","GRAPH","GRASP","GRASS",

  "HABIT","HAPPY","HARDY","HASTE","HEART","HEAVY","HEDGE","HELLO","HONEY","HONOR",
  "HORSE","HOUSE","HUMAN","HUMID","HURRY","IDEAL","IMAGE","IMPLY","INDEX","INNER",

  "JELLY","JEWEL","JOINT","JOKER","JUDGE","JUICE","JUICY","JUMBO","KARMA","KNIFE",
  "KNOCK","KNOWN","LABEL","LABOR","LARGE","LASER","LATER","LAUGH","LAYER","LEARN",

  "MEDIA","MERIT","METAL","MIGHT","MINOR","MODEL","MONEY","MONTH","MORAL","MOTOR",
  "MOUNT","MOUSE","MOUTH","MOVIE","MUSIC","NAKED","NERVE","NIGHT","NOBLE","NOISE",

  "OCCUR","OCEAN","OFFER","OFTEN","ORDER","ORGAN","OTHER","OUTER","OWNER","OXIDE",
  "PANEL","PANIC","PAPER","PARTY","PAUSE","PEACE","PHASE","PHONE","PHOTO","PIANO",

  "QUEEN","QUERY","QUEST","QUICK","QUIET","QUITE","RADIO","RAISE","RANGE","RAPID",
  "REACH","READY","REALM","REBEL","REFER","RELAX","RENEW","REPLY","RHYME","RIDER",

  "SAINT","SALAD","SAUCE","SCALE","SCENE","SCOPE","SCORE","SCOUT","SERVE","SEVEN",
  "SHAPE","SHARE","SHARP","SHELF","SHELL","SHIFT","SHINE","SHOCK","SHOOT","SHORT",

  "TABLE","TAKEN","TASTE","TEACH","TEETH","TENSE","THANK","THEME","THERE","THICK",
  "THING","THINK","THIRD","THROW","TIGER","TITLE","TODAY","TOKEN","TOTAL","TOUCH",

  "UNION","UNITE","UNITY","UNTIL","UPPER","URBAN","USUAL","UTTER","VAGUE","VALID",
  "VALUE","VIDEO","VIRUS","VISIT","VITAL","VOICE","WAGON","WAIST","WASTE","WATCH",

  "WATER","WEIGH","WEIRD","WHILE","WHITE","WHOLE","WOMAN","WORLD","WORRY","WORTH",
  "WRITE","WRONG","YIELD","YOUNG","YOUTH","ZEBRA"
];

let answer = getRandomAnswer();

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^a-zA-Z]/g, "").toUpperCase();

  const guess = input.value;

  for (let i = 0; i < wordLength; i++) {
    const tileIndex = currentRow * wordLength + i;
    tiles[tileIndex].textContent = guess[i] || "";
  }
});

function showModal(text) {
  modalMessage.textContent = text;
  modal.classList.remove("hidden");
}

function getRandomAnswer() {
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}

function showMessage(text) {
  message.textContent = text;
}

function updateKey(letter, result) {
  const priority = {
    wrong: 1,
    present: 2,
    correct: 3
  };

  for (let key of keys) {
    if (key.textContent === letter) {
      const currentResult = key.dataset.result;

      if (!currentResult || priority[result] > priority[currentResult]) {
        key.dataset.result = result;
        key.className = "key " + result;
      }
    }
  }
}

function scoreGuess(guess) {
  const result = ["wrong", "wrong", "wrong", "wrong", "wrong"];
  const remainingLetters = {};

  for (let i = 0; i < wordLength; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
    } else {
      const answerLetter = answer[i];

      if (remainingLetters[answerLetter]) {
        remainingLetters[answerLetter] = remainingLetters[answerLetter] + 1;
      } else {
        remainingLetters[answerLetter] = 1;
      }
    }
  }

  for (let i = 0; i < wordLength; i++) {
    if (result[i] === "correct") {
      continue;
    }

    const guessLetter = guess[i];

    if (remainingLetters[guessLetter] > 0) {
      result[i] = "present";
      remainingLetters[guessLetter] = remainingLetters[guessLetter] - 1;
    }
  }

  return result;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (gameOver) {
    showMessage("Game is already over. Click New Game.");
    return;
  }

  const guess = input.value.toUpperCase();

  if (guess.length !== wordLength) {
    showMessage("Guess must be 5 letters.");
    return;
  }

  if (currentRow >= maxGuesses) {
  gameOver = true;
  showModal("The word was " + answer);
}

  const result = scoreGuess(guess);

  for (let i = 0; i < guess.length; i++) {
    const tileIndex = currentRow * wordLength + i;

    tiles[tileIndex].textContent = guess[i];
    tiles[tileIndex].className = "tile " + result[i];

    updateKey(guess[i], result[i]);
  }

  if (guess === answer) {
    gameOver = true;
    showMessage("Correct!");
    input.value = "";
    return;
  }

  currentRow = currentRow + 1;
  input.value = "";

  if (currentRow >= maxGuesses) {
    gameOver = true;
    showModal("The word was " + answer);
    return;
  }
});

newGameButton.addEventListener("click", () => {
  currentRow = 0;
  gameOver = false;
  input.value = "";
  answer = getRandomAnswer();
  showMessage("");

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].textContent = "";
    tiles[i].className = "tile";
  }

  for (let key of keys) {
    key.className = "key";
    key.dataset.result = "";
  }
  modal.classList.add("hidden");
});

modalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  newGameButton.click();
});

//pink idea
// const form = document.querySelector(".guess-form");
// const input = form.querySelector("input");
// const tiles = document.querySelectorAll(".tile");
// const newGameButton = document.querySelector(".new-game-button");
// const keys = document.querySelectorAll(".key");
// const message = document.querySelector(".message");
// const knownCorrectPositions = ["", "", "", "", ""];

// let gameOver = false;
// let currentRow = 0;
// const wordLength = 5;
// const maxGuesses = 7;
// const answers = [
//   "CRANE","PLANT","BRAVE","CLOUD","TRACK","OCEAN","BREAD","FLAME","SHINE","DRIVE",
//   "STONE","LIGHT","SMILE","BRICK","WATER","TRAIN","APPLE","BLEND","COVER","RIVER",
//   "MATCH","FIELD","SWEET","ANGLE","QUEST","ROUND","POWER","CORAL","MOUNT","LEVEL",
//   "BEACH","NURSE","LAUGH","MAGIC","SHIELD","ARMOR","FINAL","BEGIN","HAPPY","RELAX",
//   "PEACE","NIGHT","MONTH","QUICK","EARLY","LATER","SLOW","BLOOM","GREEN","FRUIT",
//   "BERRY","LEMON","PEACH","TIGER","ZEBRA","PANDA","HORSE","SNAKE","ROBOT","LASER",
//   "SOLAR","METAL","RADAR","CLOCK","ALARM","TIMER","COUNT","SCORE","SPELL","CROWN",
//   "CYCLE","CANDY","CANAL","CARRY","CARGO","CATER","CAUSE","CEDAR","CHAIN","CHANT",
//   "CHAOS","CHARM","CHASE","CHEAP","CHEAT","CHECK","CHEER","CHEST","CHIEF","CHILD",
//   "CHILL","CHIME","CHOIR","CHOKE","CHORD","CHUNK","CHURN","CIDER","CIGAR","CIVIC",
//   "CIVIL","CLAIM","CLAMP","CLASH","CLASP","CLASS","CLEAN","CLEAR","CLERK","CLICK",
//   "CLIFF","CLIMB","CLING","CLOSE","CLOTH","CLOVE","CLOWN","COACH","COAST","COBRA",
//   "COCOA","COLON","COMET","COMIC","COURT","COVET","CRACK","CRAFT","CRANK","CRASH",
//   "CRATE","CRAVE","CRAWL","CRAZE","CREAK","CREAM","CREEK","CREEP","CREST","CRIME",
//   "CROAK","CROOK","CROWD","CRUDE","CRUEL","CRUMB","CRUSH","CRYPT",

//   "BASIC","BASIL","BASIN","BATCH","BATHE","BATON","BAYOU","BEADY","BEARD","BEAST",
//   "BEECH","BEFIT","BEGUN","BEING","BELLY","BELOW","BENCH","BERTH","BIBLE","BILGE",
//   "BILLY","BIPED","BIRCH","BIRTH","BISON","BLACK","BLADE","BLAME","BLAND","BLANK",
//   "BLAST","BLAZE","BLEAK","BLEED","BLIND","BLISS","BLOCK","BLOOD","BLUFF","BLUNT",
//   "BLURT","BLUSH","BOARD","BOAST","BONUS","BOOST","BOOTH","BOOZE","BOUND","BOWEL",
//   "BOXER","BRACE","BRAID","BRAIN","BRAKE","BRAND","BRASS","BRAWN","BREAK","BREED",

//   "DREAM","DRINK","DRIFT","DRILL","DRONE","DROVE","DROOP","DROWN","DRUNK","DRAPE",
//   "DRAWL","DRAWN","DREAD","DRESS","DRIED","DRIER","DRIVE","DROLL","DRAMA","DRAIN",

//   "EAGER","EAGLE","EARTH","ELBOW","ELDER","ELITE","ENJOY","ENTER","ENTRY","EPOCH",
//   "EQUAL","ERROR","ESSAY","EVENT","EVERY","EXACT","EXILE","EXIST","EXTRA","EXULT",

//   "FAITH","FALSE","FANCY","FAULT","FEAST","FEVER","FIBER","FIELD","FIERY","FIFTH",
//   "FIFTY","FIGHT","FINAL","FIRST","FLAIR","FLAKE","FLARE","FLASH","FLEET","FLESH",
//   "FLICK","FLING","FLOAT","FLOOD","FLOOR","FLORA","FLOUR","FLUID","FLUTE","FOCUS",

//   "GIANT","GHOST","GIVEN","GLADE","GLASS","GLIDE","GLOBE","GLOOM","GLORY","GLOVE",
//   "GOING","GRACE","GRADE","GRAIN","GRAND","GRANT","GRAPE","GRAPH","GRASP","GRASS",

//   "HABIT","HAPPY","HARDY","HASTE","HEART","HEAVY","HEDGE","HELLO","HONEY","HONOR",
//   "HORSE","HOUSE","HUMAN","HUMID","HURRY","IDEAL","IMAGE","IMPLY","INDEX","INNER",

//   "JELLY","JEWEL","JOINT","JOKER","JUDGE","JUICE","JUICY","JUMBO","KARMA","KNIFE",
//   "KNOCK","KNOWN","LABEL","LABOR","LARGE","LASER","LATER","LAUGH","LAYER","LEARN",

//   "MEDIA","MERIT","METAL","MIGHT","MINOR","MODEL","MONEY","MONTH","MORAL","MOTOR",
//   "MOUNT","MOUSE","MOUTH","MOVIE","MUSIC","NAKED","NERVE","NIGHT","NOBLE","NOISE",

//   "OCCUR","OCEAN","OFFER","OFTEN","ORDER","ORGAN","OTHER","OUTER","OWNER","OXIDE",
//   "PANEL","PANIC","PAPER","PARTY","PAUSE","PEACE","PHASE","PHONE","PHOTO","PIANO",

//   "QUEEN","QUERY","QUEST","QUICK","QUIET","QUITE","RADIO","RAISE","RANGE","RAPID",
//   "REACH","READY","REALM","REBEL","REFER","RELAX","RENEW","REPLY","RHYME","RIDER",

//   "SAINT","SALAD","SAUCE","SCALE","SCENE","SCOPE","SCORE","SCOUT","SERVE","SEVEN",
//   "SHAPE","SHARE","SHARP","SHELF","SHELL","SHIFT","SHINE","SHOCK","SHOOT","SHORT",

//   "TABLE","TAKEN","TASTE","TEACH","TEETH","TENSE","THANK","THEME","THERE","THICK",
//   "THING","THINK","THIRD","THROW","TIGER","TITLE","TODAY","TOKEN","TOTAL","TOUCH",

//   "UNION","UNITE","UNITY","UNTIL","UPPER","URBAN","USUAL","UTTER","VAGUE","VALID",
//   "VALUE","VIDEO","VIRUS","VISIT","VITAL","VOICE","WAGON","WAIST","WASTE","WATCH",

//   "WATER","WEIGH","WEIRD","WHILE","WHITE","WHOLE","WOMAN","WORLD","WORRY","WORTH",
//   "WRITE","WRONG","YIELD","YOUNG","YOUTH","ZEBRA"
// ];
// let answer = getRandomAnswer();
// let pinksUsed = 0;
// const maxPinks = 3;

// input.addEventListener("input", () => {
//   input.value = input.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
//   const guess = input.value;
//   for (let i = 0; i < wordLength; i++){
//     const tileIndex = currentRow * wordLength + i;
//     tiles[tileIndex].textContent = guess[i] || "";
//   }
// });


// function getRandomAnswer() {
//   const randomIndex = Math.floor(Math.random() * answers.length);
//   return answers[randomIndex];
// }
// function showMessage(text) {
//   message.textContent = text;
// }

// function updateKey(letter, result){
//   const priority = {
//     wrong: 1,
//     present: 2,
//     mystery: 3,
//     correct: 4
//   };

//   for (let key of keys){
//     if (key.textContent === letter){
//       const currentResult = key.dataset.result;
//       if (!currentResult || priority[result] > priority[currentResult]){
//         key.dataset.result = result;
//         key.className = "key " + result;
//       }
//     }
//   }
// }


// form.addEventListener("submit", (event) =>{
//   event.preventDefault();
//   if (gameOver){
//     showMessage("Game is already over. Click New Game.");
//   return;
// }

//   const guess = input.value.toUpperCase();

//   if (guess.length !== wordLength){
//     showMessage("Guess must be 5 letters");
//     return;
//   }

//   if (currentRow >= maxGuesses){
//     showMessage("The word was " + answer + ".");
//     return;
//   }

// const result = ["wrong", "wrong", "wrong", "wrong", "wrong"];
// const remainingLetters = {};

// for (let i = 0; i < wordLength; i++){
//   if (guess[i] === answer[i]){
//     result[i] = "correct";
//   } 
//   else{
//     const answerLetter = answer[i];
//     if (remainingLetters[answerLetter]){
//       remainingLetters[answerLetter] = remainingLetters[answerLetter] + 1;
//     } 
//     else{
//       remainingLetters[answerLetter] = 1;
//     }
//   }
// }

// for (let i = 0; i < wordLength; i++){
//   if (result[i] === "correct"){
//     continue;
//   }

//   const guessLetter = guess[i];

//   if (remainingLetters[guessLetter] > 0){
//     result[i] = "present";
//     remainingLetters[guessLetter] = remainingLetters[guessLetter] - 1;
//   }
// }


// const hitIndexes = [];

// for (let i = 0; i < result.length; i++){
//   const alreadyKnownGreen = result[i] === "correct" && knownCorrectPositions[i] === guess[i];
//   if ((result[i] === "correct" || result[i] === "present") && !alreadyKnownGreen){
//     hitIndexes.push(i);
//   }
// }

// const shouldTryPink = currentRow >= 1 && pinksUsed < maxPinks;

// if (shouldTryPink && hitIndexes.length > 0){
//   const randomSpot = Math.floor(Math.random() * hitIndexes.length);
//   const mysteryIndex = hitIndexes[randomSpot];

//   result[mysteryIndex] = "mystery";
//   pinksUsed = pinksUsed + 1;
// }

// for (let i = 0; i < result.length; i++){
//   if (result[i] === "correct"){
//     knownCorrectPositions[i] = guess[i];
//   }
// }

//  for (let i = 0; i < guess.length; i++){
//   const tileIndex = currentRow * wordLength + i;
//   tiles[tileIndex].textContent = guess[i];
//   tiles[tileIndex].className = "tile " + result[i];

//  updateKey(guess[i], result[i]);
// }

//   if (guess === answer){
//         gameOver = true;
//         showMessage("CORRECT!");
//         input.value = "";
//         return;
//     }

//   currentRow = currentRow + 1;
//   input.value = "";
//   if (currentRow >= maxGuesses){
//   gameOver = true;
//   alert("The word was " + answer);
// }
// });

// newGameButton.addEventListener("click", () => {
//   currentRow = 0;
//   pinksUsed = 0;
//   gameOver = false;
//   input.value = "";
//   answer = getRandomAnswer();
//   for (let i = 0; i < tiles.length; i++){
//     tiles[i].textContent = "";
//     tiles[i].className = "tile";
//   }
//   for (let key of keys){
//     key.className = "key";
//     key.dataset.result = "";
//     }
// for (let i = 0; i < knownCorrectPositions.length; i++){
//   knownCorrectPositions[i] = "";
// }
// });
