console.log("hello world");


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
var newHand = new hand;

//draw from newDeck into newHand
newHand.draw(newDeck);

//print cards in newHand
console.log("newHand cards");
console.log(newHand.cards);

