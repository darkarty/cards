
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

function isHandRoyalFlush(valueArray,suitArray,nameArray){
	//check for royal flush
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//will be 5 highest values for 10,J,Q,K,A, can be ANY SUIT
	//spades
	if(isValueInArray(36,valueArray) && isValueInArray(40,valueArray) && isValueInArray(44,valueArray) && isValueInArray(48,valueArray) && isValueInArray(52,valueArray)){
		console.log("royal flush");
		return true;
	}
	//hearts
	if(isValueInArray(35,valueArray) && isValueInArray(39,valueArray) && isValueInArray(43,valueArray) && isValueInArray(47,valueArray) && isValueInArray(51,valueArray)){
		console.log("royal flush");
		return true;
	}
	//diamonds
	if(isValueInArray(34,valueArray) && isValueInArray(38,valueArray) && isValueInArray(42,valueArray) && isValueInArray(46,valueArray) && isValueInArray(50,valueArray)){
		console.log("royal flush");
		return true;
	}
	//clubs
	if(isValueInArray(33,valueArray) && isValueInArray(37,valueArray) && isValueInArray(41,valueArray) && isValueInArray(45,valueArray) && isValueInArray(49,valueArray)){
		console.log("royal flush");
		return true;
	}

	console.log("not royal flush");
	return false;	
}

function isHandStraightFlush(valueArray,suitArray,nameArray){
	//check for straight flush
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//sort by value, it will have to be +4 between each one for same suit, also check a-2-3-4-5 wrap around
	if(sortedValueArray[0] == sortedValueArray[0] && sortedValueArray[1]==sortedValueArray[0]+4 && sortedValueArray[2]==sortedValueArray[0]+8 && sortedValueArray[3]==sortedValueArray[0]+12 && ortedValueArray[4]==sortedValueArray[0]+16){
		console.log("straight flush");
		return true;
	}
	//for straight flush, need to also check A-1-2-3-4-5
	if(sortedNameArray[0]=="2" && sortedNameArray[1]=="3" && sortedNameArray[2]=="4" && sortedNameArray[3]=="5" && sortedNameArray[4]=="A"){
		if(suitArray[0]==suitArray[1] && suitArray[1]==suitArray[2] && suitArray[2]==suitArray[3] && suitArray[3]==suitArray[4]){ //if suits are same, then straight flush, if not, straight
		console.log("straight flush");
		return true;
		}
	}
	else{
		console.log("not straight flush");
		return false;
	}
}

function isHandForOfAKind(valueArray,suitArray,nameArray){
	//check for four of a kind
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//can sort by name and check first 4, or last 4 are the same
	if((sortedNameArray[0]==sortedNameArray[1] && sortedNameArray[0]==sortedNameArray[2] && sortedNameArray[0]==sortedNameArray[3]) || (sortedNameArray[4]==sortedNameArray[3] && sortedNameArray[4]==sortedNameArray[2] && sortedNameArray[4]==sortedNameArray[1])){
		console.log("four of a kind");
		return true;
	}
	else{
		console.log("not four of a kind");
		return false
	}
}

function isHandFlush(valueArray,suitArray,nameArray){
	//check for flush
	//check all suits are the same
	if(suitArray[0]==suitArray[1] && suitArray[0]==suitArray[2] && suitArray[0]==suitArray[3] && suitArray[0]==suitArray[4]){
		console.log("flush");
		return true;
	}
	else{
		console.log("not flush");
		return false;
	}
}

function isHandStraight(valueArray,suitArray,nameArray){
	//check for straight
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//this checks 2,3,4,5,6 up to 6,7,8,9,10
	if(parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0]) && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+1 && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+2 && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+3 && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+4){
		console.log("straight");
		return true;
	}

	//a-1-2-3-4-5
	if(sortedNameArray[0]=="2" && sortedNameArray[1]=="3" && sortedNameArray[2]=="4" && sortedNameArray[3]=="5" && sortedNameArray[4]=="A"){
		if(suitArray[0]==suitArray[1] && suitArray[1]==suitArray[2] && suitArray[2]==suitArray[3] && suitArray[3]==suitArray[4]){ //if suits are same, then straight flush, if not, straight
			console.log("straight flush");
			return false;
		}
		else{
			console.log("straight");
			return true;
		}
	}

	//we need edge cases for 7,8,9,10,J   8,9,10,J,Q   9,10,J,Q,K   10,J,Q,K,A
	if(sortedNameArray[0]=="7" && sortedNameArray[1]=="8" && sortedNameArray[2]=="9" && sortedNameArray[3]=="10" && sortedNameArray[4]=="J"){
		console.log("straight");
		return true;
	}
	if(sortedNameArray[0]=="8" && sortedNameArray[1]=="9" && sortedNameArray[2]=="10" && sortedNameArray[3]=="J" && sortedNameArray[4]=="Q"){
		console.log("straight");
		return true;
	}
	if(sortedNameArray[0]=="9" && sortedNameArray[1]=="10" && sortedNameArray[2]=="J" && sortedNameArray[3]=="K" && sortedNameArray[4]=="Q"){
		console.log("straight");
		return true;
	}
	if(sortedNameArray[0]=="10" && sortedNameArray[1]=="A" && sortedNameArray[2]=="J" && sortedNameArray[3]=="K" && sortedNameArray[4]=="Q"){
		console.log("straight");
		return true;
	}

	console.log("not straight");
	return false;
}

function isHandThreeOfAKind(valueArray,suitArray,nameArray){
	//check for three of a kind
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//check every 3 cards in succession for sorted name array
	if((sortedNameArray[0]==sortedNameArray[1] && sortedNameArray[1]==sortedNameArray[2]) || (sortedNameArray[1]==sortedNameArray[2] && sortedNameArray[2]==sortedNameArray[3]) || (sortedNameArray[2]==sortedNameArray[3] && sortedNameArray[3]==sortedNameArray[4])){
		console.log("three of a kind");
		return true;
	}
	else{
		console.log("not three of a kind");
		return false;
	}
}

function isHandTwoPair(valueArray,suitArray,nameArray){
	//check for two pairs
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();
	var pairCounter=0;

	//check every pair, and add 1 to counter for pair
	if(sortedNameArray[0]==sortedNameArray[1]){
		pairCounter+=1;
	}
	if(sortedNameArray[1]==sortedNameArray[2]){
		pairCounter+=1;
	}
	if(sortedNameArray[2]==sortedNameArray[3]){
		pairCounter+=1;
	}
	if(sortedNameArray[3]==sortedNameArray[4]){
		pairCounter+=1;
	}
	if(pairCounter>=2 && !handFourOfAKind && !handThreeOfAKind){ //if it has matches and it is not four of a kind, then it is 2 pair
		console.log("two pair");
		return true;
	}
	else{
		console.log("not two pair");
		return false;
	}
}

function isHandPair(valueArray,suitArray,nameArray){
	//check for single pair
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();
	var pairCounter=0;

	if(sortedNameArray[0]==sortedNameArray[1]){
		pairCounter+=1;
	}
	if(sortedNameArray[1]==sortedNameArray[2]){
		pairCounter+=1;
	}
	if(sortedNameArray[2]==sortedNameArray[3]){
		pairCounter+=1;
	}
	if(sortedNameArray[3]==sortedNameArray[4]){
		pairCounter+=1;
	}
	if(pairCounter==1){
		console.log("pair");
		return true;
	}
	else{
		console.log("not pair");
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

	sortedValueArray=valueArray.slice();
	sortedValueArray.sort();
	sortedNameArray=nameArray.slice();
	sortedNameArray.sort();
	
	handRoyalFlush=isHandRoyalFlush(valueArray,suitArray,nameArray);
	handStraightFlush=isHandStraightFlush(valueArray,suitArray,nameArray);
	handFourOfAKind=isHandForOfAKind(valueArray,suitArray,nameArray);
	handFlush=isHandFlush(valueArray,suitArray,nameArray);
	handStraight=isHandStraight(valueArray,suitArray,nameArray);
	handThreeOfAKind=isHandThreeOfAKind(valueArray,suitArray,nameArray);
	handTwoPair=isHandTwoPair(valueArray,suitArray,nameArray);
	handPair=isHandPair(valueArray,suitArray,nameArray);
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
