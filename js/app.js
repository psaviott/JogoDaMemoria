//Declare all global variables
var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
  "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle",
  "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt",
  "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"
];

var deck = document.querySelector(".deck");
var moves = 0;
var openedCards = [];
var matchedCardsCounter = 0;
var stars = document.querySelector(".stars");
var sHors = "0" + 0;
var sMins = "0" + 0;
var sSecs = 0;
var clock = false;
var timer = "";

play();

// restart game button
document.querySelector(".restart").onclick = play;

//distribute the shuffled cards on game screem
function distCards() {
  cards.forEach(function(card) {
    var htmlCode = '<li class="card"><i class="' + card + '"></i></li>';
    deck.innerHTML += htmlCode;
  })
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};


//starts functions when a click
deck.onclick = function(e) {
  if (e.target.nodeName !== "LI" || e.target.className.indexOf("match") > -1) {
    return;
  }
  showCard(e.target);
  handleOpenedCards(e.target);
  decStars();
  clock = true;
};

//add move to moves variable
function incMoves() {
  moves += 1;
  document.querySelector(".moves").innerHTML = moves;
};

//show a card
function showCard(card) {
  card.className = "card open show";
};


//hide or lock a card
function handleOpenedCards(card) {
  if (openedCards.length === 1) {
    if (openedCards[0] === card) {
      return;
    }
    incMoves();
    if (openedCards[0].children[0].className === card.children[0].className) {
      lockCard(card);
    } else {
      hideCard(card);
    }
  } else {
    openedCards.push(card);
  }
};

//lock a matched card
function lockCard(card) {
  card.className += " match";
  openedCards[0].className += " match";
  openedCards = [];
  matchedCardsCounter += 1;
  if (matchedCardsCounter === 1) { // alterar para 8 para voltar ao normal
    displayMsg();
  }
};

//hide a card
function hideCard(card) {
  setTimeout(function() {
    card.className = "card";
    openedCards[0].className = "card";
    openedCards.pop();
  }, 300);
};

// add stars to rate the game
function decStars() {
  if (moves > 22) {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
  } else if (moves > 15) {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(2);
  }
};

// show message when finish the game
//fix -- display stars until number
function displayMsg() {
  var z = document.getElementsByClassName("fa-star").length;
  if (confirm("\nYou won in " + moves + " moves with " + z + " stars" + "\nYour time: " + sHors + ":" + sMins + ":" + sSecs + "\n\nPlay again?")) {
    play(); //fix -- relogio esta iniciando ao clicar em ok
  } else {
    clearTimeout(timer); //fix -- timer nao reinicia apos clicar em "cancel"
  }
};

//set default variables, shuffle cards and distribute cards on deck
function play() {
  stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(3);
  document.querySelector(".moves").innerHTML = 0;
  clock1.innerHTML = "0" + 0 + ":" + "0" + 0 + ":" + "0" + 0;
  deck.innerHTML = "";
  moves = 0;
  openedCards = [];
  matchedCardsCounter = 0;
  timer = "";
  clock = false;
  sHors = "0" + 0;
  sMins = "0" + 0;
  sSecs = 0;
  shuffle(cards);
  distCards();
};

// timer
function getSecs() {
  if (clock) {
    sSecs++;
    if (sSecs == 60) {
      sSecs = 0;
      sMins++;
      if (sMins <= 9) sMins = "0" + sMins;
    }
    if (sMins == 60) {
      sMins = "0" + 0;
      sHors++;
      if (sHors <= 9) sHors = "0" + sHors;
    }
    if (sSecs <= 9) sSecs = "0" + sSecs;
    clock1.innerHTML = sHors + ":" + sMins + ":" + sSecs;
  }
  timer = setTimeout('getSecs()', 1000);
};
