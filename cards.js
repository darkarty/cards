
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



function isValueInArray(value,array){ //check if value is in array
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
	handStraight=false;
	handTwoPair=false;
	handThreeOfAKind=false;
	handPair=false;

	var valueArray=[];
	var suitArray=[];
	var nameArray=[];

	console.log(hand.cards);
	for(i=0;i<5;i++){
		valueArray.push(hand.cards[i].value);
		suitArray.push(hand.cards[i].suit);
		nameArray.push(hand.cards[i].name);
	}

	sortedValueArray=valueArray;
	sortedValueArray.sort();
	sortedNameArray=nameArray;
	sortedNameArray.sort();
	
	//check for royal flush
	//will be 5 highest values for Spades 10,J,Q,K,A
	if(isValueInArray(48,valueArray) && isValueInArray(49,valueArray) && isValueInArray(50,valueArray) && isValueInArray(51,valueArray) && isValueInArray(52,valueArray)){
		handRoyalFlush=true;
		console.log("royal flush");
	}
	else{
		console.log("not royal flush");
		handRoyalFlush=false;
	}

	//check for straight flush
	//sort by value, it will have to be +4 between each one for same suit and increasing number
	if(sortedValueArray[0] == sortedValueArray[0] && sortedValueArray[1]==sortedValueArray[0]+4 && sortedValueArray[2]==sortedValueArray[0]+8 && sortedValueArray[3]==sortedValueArray[0]+12 && ortedValueArray[4]==sortedValueArray[0]+16){
		handStraightFlush=true;
		console.log("straight flush");
	}
	else{
		handStraightFlush=false;
		console.log("not straight flush");
	}
	//for straight flush, need to also check A-1-2-3-4-5
	//insert code here
	//
	//
	//

	//check for four of a kind
	//can sort by name and check first 4, or last 4 are the same
	if((sortedNameArray[0]==sortedNameArray[1] && sortedNameArray[0]==sortedNameArray[2] && sortedNameArray[0]==sortedNameArray[3]) || (sortedNameArray[4]==sortedNameArray[3] && sortedNameArray[4]==sortedNameArray[2] && sortedNameArray[4]==sortedNameArray[1])){
		handFourOfAKind=true;
		console.log("four of a kind");
	}
	else{
		handFourOfAKind=false;
		console.log("not four of a kind");
	}

	//check for flush
	//check all suits are the same
	if(suitArray[0]==suitArray[1] && suitArray[0]==suitArray[2] && suitArray[0]==suitArray[3] && suitArray[0]==suitArray[4]){
		handFlush=true;
		console.log("flush");
	}
	else{
		handFlush=false;
		console.log("not flush");
	}

	//check for straight
	//need to also check a-1-2-3-4-5
	//insert code here
	//
	//
	//

	//check for two pairs
	//check every pair, and add 1 to counter for pair
	var pairCounter=0;
	if(nameArray[0]==nameArray[1]){
		pairCounter+=1;
	}
	if(nameArray[1]==nameArray[2]){
		pairCounter+=1;
	}
	if(nameArray[2]==nameArray[3]){
		pairCounter+=1;
	}
	if(nameArray[3]==nameArray[4]){
		pairCounter+=1;
	}
	if(pairCounter>=2 && !handFourOfAKind){ //if it has matches and it is not four of a kind, then it is 2 pair
		handTwoPair=true;
		console.log("two pair");
	}
	else{
		handTwoPair=false;
		console.log("not two pair");
	}

	//check for three of a kind
	//check every 3 cards in succession for sorted name array
	if((nameArray[0]==nameArray[1] && nameArray[1]==nameArray[2]) || (nameArray[1]==nameArray[2] && nameArray[2]==nameArray[3]) || (nameArray[2]==nameArray[3] && nameArray[3]==nameArray[4])){
		handThreeOfAKind=true;
		console.log("three of a kind");
	}
	else{
		handThreeOfAKind=false;
		console.log("not three of a kind");
	}

	//check for single pair
	pairCounter=0;
	if(nameArray[0]==nameArray[1]){
		pairCounter+=1;
	}
	if(nameArray[1]==nameArray[2]){
		pairCounter+=1;
	}
	if(nameArray[2]==nameArray[3]){
		pairCounter+=1;
	}
	if(nameArray[3]==nameArray[4]){
		pairCounter+=1;
	}
	if(pairCounter==1){
		handPair=true;
		console.log("pair");
	}
	else{
		handPair=false;
		console.log("not pair");
	}

}

function compareHands(hand1, hand2){ //return bigger hand

	//for straight flush, highest top card wins (A can be used in A-2-3-4-5, but then 5 is the top card)
	//for four of a kind, highest name of the four cards wins, and then kicker
	//for full house, highest name of the three cards wins, if equal, rank of pair decides
	//flush, highest card wins, if equal, compare the next highest card.. and so on
	//straight, compare highest card
	//three of a kind, compare three, then highest of remainder 2, then lowest of reminader 2
	//two pair, highest pair compare, lower pair, kicker compare
	//pair, compare pair, compare highest card, and so on..
	//nothing, compare high card
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
