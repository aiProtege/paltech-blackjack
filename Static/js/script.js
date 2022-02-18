// Challenge 1: 
function stickPerYear(){
    var noOfSticks = prompt('How many sticks of cigarette you smoke everyday... my friend?');
    var sticksPerYear = (noOfSticks * 365) / 20;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('Youve`ve been smoking ' + sticksPerYear + ' Packs of cigarette in one year.');
    h1.setAttribute('id', 'stickPerYear');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('stickPerYear').remove();
}
// Challenge 2:
function catGenerator(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-container');
    image.src = 'https://thecatapi.com/api/images/get?format=src&type=gif&size=true'
    div.appendChild(image);
}

//Challenge 3:
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
// humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
//  alert(botChoice);
// result = decideWinner(humanChoice, botChoice); // [0,1] Human lost | bot won
// message = finalMessage(result); // {'message': 'You won!', 'color': 'green'}
rpsFrontEnd(yourChoice.id, botChoice, Message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);    
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'] [number]

}

function decideWinner(yourChoice, cumputerChoice) {
    var rpsDatabase = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0},
    }

    var yourScore = rpsDatabase[yourChoice][cumputerChoice];
    var computerScore = rpsDatabase [computerChoice][yourChoice];
}


//Challenge 4:

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
    
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonsReset();
    } else if (buttonThingy.value === 'random') {
        buttonsRandom();
    }
}

function buttonsRed() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);       
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);       
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom() {
    var choices =  ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

for (let i=0; i <all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge 5: BlackJack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A',],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A':[1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,

};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);


function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card,  YOU);
    updateScore(card, YOU);
    showScore(YOU);
    }
}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
   }
}

function blackjackDeal() {
   //showResult(computeWinner());
    if (blackjackGame['turnsOver'] === true) {


    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
        
    for (i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';        

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
   }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];

        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));    
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;


    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER); 
    await sleep(1000);
}
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();        showResult(winner);
    console.log(blackjackGame['turnsOver']);
}    


function computeWinner() {
    let winner;

    if (YOU['score'] <=21) {
        
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <=21) {
        blackjackGame['losses']++;
        winner = DEALER;


    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['DRAW']++;
    }

        console.log(blackjackGame);
        return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

    

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();


        } else if (winner === DEALER) {
            
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();

        } else {
            
            document.querySelector('#draw').textContent = blackjackGame['draw'];
            message = 'You Drew!';
            messageColor = 'black';

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        }
    }
}