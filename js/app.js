//Declare all global variables
var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
var click = 0;
var deck = document.querySelector(".deck");
var moves = 0;
var openedCards = [];
var matchedCardsCounter = 0;
var stars = document.querySelector(".stars");
var sHors = "0" + 0;
var sMins = "0" + 0;
var sSecs = -1;
var clock = false;
var timer = "";

clock1.innerHTML = "0" + 0 + ":" + "0" + 0 + ":" + "0" + 0;
deck.innerHTML = "";
shuffle(cards);
play();

//distribute the shuffled cards on game screem
cards.forEach(function(card) {
  var htmlCode = '<li class="card"><i class="' + card + '"></i></li>';
  deck.innerHTML += htmlCode;
});

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
  startClock();
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

//lock a card
function lockCard(card) {
  card.className += " match";
  openedCards[0].className += " match";
  openedCards = [];
  matchedCardsCounter += 1;
  if (matchedCardsCounter === 8) {
    displayMsg();
    stopClock();
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
// fix to display stars instead number
function displayMsg() {
  var z = document.getElementsByClassName("fa-star").length;
  if (confirm("\nYou won in " + moves + " moves with " + z + " stars" + "\nYour time: " + sHors + ":" + sMins + ":" + sSecs + "\n\nPlay again?")) {
    location.reload(); //change that when fix restartCards
  } else {
    stopClock();
  }
};

//set default starts and moves
function play() {
  stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(3);
  document.querySelector(".moves").innerHTML = 0;
};

// game restart button
document.querySelector(".restart").onclick = function restart() {
  location.reload(); //change that later
};

// timer
function getSecs() {
  if (clock == true) {
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
    clock1.innerHTML = sHors + "<font color=#000000>:</font>" + sMins + "<font color=#000000>:</font>" + sSecs;
  }
  timer = setTimeout('getSecs()', 1000);
};

// start timer
function startClock() {
  clock = true;
};

//stop timer
function stopClock() {
  clearTimeout(timer);
};

//reset timer
function restClock() {
  clock1.innerHTML = "0" + 0 + ":" + "0" + 0 + ":" + "0" + 0;
  clock = false;
};
