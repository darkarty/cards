//test git commit and push

//console.log("hello world");


function card(name, suit, value){
	this.name = name;
	this.suit= suit;
	this.value = value; //value is ranked from 1 to 52.  values increase from 2 to A, and from Diamonds to Spades.
}

function deck(){
	this.cards=[];
	this.create = function(){
		names = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']; //ordered in order of value
		suits = ['Diamonds','Clubs','Hearts','Spades']; // ordered in order of value
		var value=1;
		for (var i=0; i<names.length;i++){ //for each name..
			for (var j =0; j<suits.length;j++){ //for each suit..
				//push new card into deck
				this.cards.push(new card(names[i],suits[j],value));
				value=value+1;
			}
		}
	};
	this.shuffle = function(){

		for (var k=0;k<100;k++){	//shuffle x times to shuffle

			newOrder=[];
			var numberOfCards = this.cards.length;

			for(var i=0;i<52;i++){
				//find random number between 51 and 0
				var randomNumber = Math.floor((Math.random() * (numberOfCards-1) + 0));
				//console.log("randomNumber " + randomNumber);
				//place this.cards[randomNumber] into first of newOrder;
				newOrder.push(this.cards[randomNumber]);

				//remove this.cards[randomNumber] from this.cards
				this.cards.splice(randomNumber,1);

				numberOfCards--;		
			}
			newOrder.reverse(); //reverse array as part of shuffling
			this.cards=newOrder;
		}
	}
}

function hand(){
	this.cards=[]
	this.draw = function(deck){
		this.cards.push(deck.cards.pop());
	}
}



function isValueInArray(value,array){
	if(array.indexOf(value) > -1){
		return true;
	}
	else{
		return false;
	}
}

function handHighestValue(hand){ //return highest value of a hand
	handRoyalFlush=false;
	handStraightFlush=false;
	handFourOfAKind=false;
	handFlush=false;
	handTwoPair=false;
	handThreeOfAKind=false;
	handPair=false;

	valueArray=[];
	suitArray=[];
	nameArray=[];

	console.log(hand.cards);
	for(i=0;i<5;i++){
		valueArray.push(hand.cards[i].value);
		suitArray.push(hand.cards[i].suit);
		nameArray.push(hand.cards[i].name);
	}
	//console.log(valueArray);
	//console.log(suitArray);
	//console.log(nameArray);

	//check for royal flush
	if(isValueInArray(48,valueArray) && isValueInArray(49,valueArray) && isValueInArray(50,valueArray) && isValueInArray(51,valueArray) && isValueInArray(52,valueArray)){
		handRoyalFlush=true;
		console.log("royal flush");
	}
	else{
		console.log("no royal flush");
		handRoyalFlush=false;
	}
}

function compareHands(hand1, hand2){ //return bigger hand

}

//create a new deck
var newDeck = new deck;
newDeck.create();

//print new deck
//console.log("new deck");
//console.log(newDeck.cards);

//shuffle new deck
newDeck.shuffle();

//print shuffled deck
//console.log("shuffled deck");
//console.log(newDeck.cards);

//create a new hand
var newHand1 = new hand;


//draw 5 cards for hand1
for(i=0;i<5;i++){
	newHand1.draw(newDeck);
}

var newHand2 = new hand;

//draw 5 cards for hand2
for(i=0;i<5;i++){
	newHand2.draw(newDeck);
}

//print cards in newHand1
//console.log("newHand1 cards");
//console.log(newHand1.cards);

//print cards in newHand2
//console.log("newHand2 cards");
//console.log(newHand2.cards);

handHighestValue(newHand1);
