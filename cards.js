
function card(name, suit, value){
	this.name = name;
	this.suit= suit;
	this.value = value; //value is ranked from 2 to 14, from 2 to A. (Suits don't determine rank in poker)
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
				if(names[i]=='J'){
					value=11;
				}
				else if(names[i]=='Q'){
					value=12;
				}
				else if(names[i]=='K'){
					value=13;
				}
				else if(names[i]=='A'){
					value=14;
				}
				else{
					value=parseInt(names[i]);
				}
				this.cards.push(new card(names[i],suits[j],value));

				
			}
		}
	};
	this.shuffle = function(){

		for (var k=0;k<100;k++){	//shuffle x times to shuffle

			var newOrder=[];
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

function findMaxInArray(array){
	return Math.max.apply(null, array);
}

function isHandRoyalFlush(valueArray,suitArray,nameArray){
	//check for royal flush
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//will be 5 highest values for 10,J,Q,K,A, can be ANY SUIT(but same within a hand)
	if((isValueInArray(10,valueArray) && isValueInArray(11,valueArray) && isValueInArray(12,valueArray) && isValueInArray(13,valueArray) && isValueInArray(14,valueArray)) && (suitArray[0]==suitArray[1] && suitArray[0]==suitArray[2] && suitArray[0]==suitArray[3] && suitArray[0]==suitArray[4])){
		return true;
	}
	else{
		return false;	
	}
}

function isHandStraightFlush(valueArray,suitArray,nameArray){
	//check for straight flush
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//sort by value, it will have to be +1 between each one, and need same suit
	if((sortedValueArray[0] == sortedValueArray[0] && sortedValueArray[1]==sortedValueArray[0]+1 && sortedValueArray[2]==sortedValueArray[0]+2 && sortedValueArray[3]==sortedValueArray[0]+3 && sortedValueArray[4]==sortedValueArray[0]+4) && (suitArray[0]==suitArray[1] && suitArray[1]==suitArray[2] && suitArray[2]==suitArray[3] && suitArray[3]==suitArray[4])){
		return true;
	}
	//for straight flush, need to also check A-1-2-3-4-5
	if(sortedNameArray[0]=="2" && sortedNameArray[1]=="3" && sortedNameArray[2]=="4" && sortedNameArray[3]=="5" && sortedNameArray[4]=="A"){
		if(suitArray[0]==suitArray[1] && suitArray[1]==suitArray[2] && suitArray[2]==suitArray[3] && suitArray[3]==suitArray[4]){ //if suits are same, then straight flush, if not, straight
		return true;
		}
	}
	else{
		return false;
	}
}

function isHandForOfAKind(valueArray,suitArray,nameArray){
	//check for four of a kind
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//can sort by name and check first 4, or last 4 are the same
	if((sortedNameArray[0]==sortedNameArray[1] && sortedNameArray[0]==sortedNameArray[2] && sortedNameArray[0]==sortedNameArray[3]) || (sortedNameArray[4]==sortedNameArray[3] && sortedNameArray[4]==sortedNameArray[2] && sortedNameArray[4]==sortedNameArray[1])){
		return true;
	}
	else{
		return false
	}
}

function isHandFullHouse(valueArray,suitArray,nameArray){
	//check for full house
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//sort, and check first three are same, and last 2 are same OR first two are same, and last three are same
	if((sortedNameArray[0]==sortedNameArray[1] && sortedNameArray[1]==sortedNameArray[2] && sortedNameArray[3]==sortedNameArray[4]) || (sortedNameArray[2]==sortedNameArray[3] && sortedNameArray[3]==sortedNameArray[4] && sortedNameArray[1]==sortedNameArray[0])){
		return true;
	}
	else{
		return false;
	}
}
function isHandFlush(valueArray,suitArray,nameArray){
	//check for flush
	//check all suits are the same
	if(suitArray[0]==suitArray[1] && suitArray[0]==suitArray[2] && suitArray[0]==suitArray[3] && suitArray[0]==suitArray[4]){
		return true;
	}
	else{
		return false;
	}
}

function isHandStraight(valueArray,suitArray,nameArray){
	//check for straight
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//this checks 2,3,4,5,6 up to 6,7,8,9,10
	if(parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0]) && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+1 && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+2 && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+3 && parseInt(sortedNameArray[0])==parseInt(sortedNameArray[0])+4){
		return true;
	}

	//a-1-2-3-4-5
	if(sortedNameArray[0]=="2" && sortedNameArray[1]=="3" && sortedNameArray[2]=="4" && sortedNameArray[3]=="5" && sortedNameArray[4]=="A"){
		if(suitArray[0]==suitArray[1] && suitArray[1]==suitArray[2] && suitArray[2]==suitArray[3] && suitArray[3]==suitArray[4]){ //if suits are same, then straight flush, if not, straight
			return false;
		}
		else{
			return true;
		}
	}

	//we need edge cases for 7,8,9,10,J   8,9,10,J,Q   9,10,J,Q,K   10,J,Q,K,A
	if(sortedNameArray[0]=="7" && sortedNameArray[1]=="8" && sortedNameArray[2]=="9" && sortedNameArray[3]=="10" && sortedNameArray[4]=="J"){
		return true;
	}
	if(sortedNameArray[0]=="8" && sortedNameArray[1]=="9" && sortedNameArray[2]=="10" && sortedNameArray[3]=="J" && sortedNameArray[4]=="Q"){
		return true;
	}
	if(sortedNameArray[0]=="9" && sortedNameArray[1]=="10" && sortedNameArray[2]=="J" && sortedNameArray[3]=="K" && sortedNameArray[4]=="Q"){
		return true;
	}
	if(sortedNameArray[0]=="10" && sortedNameArray[1]=="A" && sortedNameArray[2]=="J" && sortedNameArray[3]=="K" && sortedNameArray[4]=="Q"){
		return true;
	}

	return false;
}

function isHandThreeOfAKind(valueArray,suitArray,nameArray){
	//check for three of a kind
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
	var sortedNameArray=nameArray.slice();
	sortedNameArray.sort();

	//check every 3 cards in succession for sorted name array
	if((sortedNameArray[0]==sortedNameArray[1] && sortedNameArray[1]==sortedNameArray[2]) || (sortedNameArray[1]==sortedNameArray[2] && sortedNameArray[2]==sortedNameArray[3]) || (sortedNameArray[2]==sortedNameArray[3] && sortedNameArray[3]==sortedNameArray[4])){
		return true;
	}
	else{
		return false;
	}
}

function isHandTwoPair(valueArray,suitArray,nameArray, handFourOfAKind, handThreeOfAKind){
	//check for two pairs
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
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
		return true;
	}
	else{
		return false;
	}
}

function isHandPair(valueArray,suitArray,nameArray){
	//check for single pair
	var sortedValueArray=valueArray.slice();
	sortedValueArray.sort(sortNumber);
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
		return true;
	}
	else{
		return false;
	}
}

function handHighestValue(hand){ //return highest value of a hand
	//set values for each
	var handRoyalFlush=false; //value 10
	var handStraightFlush=false; //value 9
	var handFourOfAKind=false; //value 8
	var handFullHouse=false; //value 7
	var handFlush=false; //value 5
	var handStraight=false; //value 4
	var handTwoPair=false; //value 3
	var handThreeOfAKind=false; //value 3
	var handPair=false; //value 2

	var valueArray=[];
	var suitArray=[];
	var nameArray=[];

	console.log(hand.cards);
	for(i=0;i<5;i++){
		valueArray.push(hand.cards[i].value);
		suitArray.push(hand.cards[i].suit);
		nameArray.push(hand.cards[i].name);
	}

	handRoyalFlush=isHandRoyalFlush(valueArray, suitArray, nameArray);
	handStraightFlush=isHandStraightFlush(valueArray, suitArray, nameArray);
	handFourOfAKind=isHandForOfAKind(valueArray, suitArray, nameArray);
	handFullHouse=isHandFullHouse(valueArray, suitArray, nameArray);
	handFlush=isHandFlush(valueArray, suitArray, nameArray);
	handStraight=isHandStraight(valueArray, suitArray, nameArray);
	handThreeOfAKind=isHandThreeOfAKind(valueArray, suitArray, nameArray);
	handTwoPair=isHandTwoPair(valueArray, suitArray, nameArray, handFourOfAKind, handThreeOfAKind);
	handPair=isHandPair(valueArray, suitArray, nameArray);

/*	//print true/false for checks
	console.log("royal flush "+ handRoyalFlush);
	console.log("straight flush "+ handStraightFlush);
	console.log("four of a kind "+ handFourOfAKind);
	console.log("full house "+ handFullHouse);
	console.log("flush "+ handFlush);
	console.log("straight "+ handStraight);
	console.log("three of a kind "+ handThreeOfAKind);
	console.log("two pair "+ handTwoPair);
	console.log("pair "+ handPair);
*/	
	if(handRoyalFlush){
		return 10;
	}
	else if(handStraightFlush){
		return 9;
	}
	else if(handFourOfAKind){
		return 8;
	}
	else if(handFullHouse){
		return 7
	}
	else if(handFlush){
		return 6;
	}
	else if(handStraight){
		return 5;
	}
	else if(handTwoPair){
		return 4;
	}
	else if(handThreeOfAKind){
		return 3;
	}
	else if(handPair){
		return 2;
	}
	else{ //nothing
		return 1;
	}
}

function sortNumber(a,b){
	return b-a;
}

function tieBreakerHighCard(sortedValueArrayForHand1, sortedValueArrayForHand2){
		//compare max value between arrays, if they are equal compare next highest card
		//return 1 if hand1 wins, return -1 if hand2 wins, return 0 if tie

		for(i=0;i<sortedValueArrayForHand1.length;i++){
			if(sortedValueArrayForHand1[i]>sortedValueArrayForHand2[i]){
				return 1;
			}
			if(sortedValueArrayForHand1[i]<sortedValueArrayForHand2[i]){
				return -1;
			}
		}
		return 0;

}

function tieBreakerPair(sortedValueArrayForHand1, sortedValueArrayForHand2){
	//make a var for the pair value
	//make array for the non pair values, to check high card if the pair values are equal

	//make copy of sortedValueArrays so that we can splice them later
	var sortedValueArrayForHand1Copy=sortedValueArrayForHand1.slice();
	var sortedValueArrayForHand2Copy=sortedValueArrayForHand2.slice();

	var pairForHand1;
	var nonPairArrayForHand1=[];

	var pairForHand2;
	var nonPairArrayForHand2=[];

	for(i=0;i<sortedValueArrayForHand1.length - 1;i++){
		if(sortedValueArrayForHand1[i]==sortedValueArrayForHand1[i+1]){ //this is a pair
			pairForHand1=sortedValueArrayForHand1[i];
			//remove this pair from the copy
			sortedValueArrayForHand1Copy.splice(i,1);
			sortedValueArrayForHand1Copy.splice(i,1);
		}
		if(sortedValueArrayForHand2[i]==sortedValueArrayForHand2[i+1]){ //this is a pair
			pairForHand2=sortedValueArrayForHand2[i];
			//remove this pair from the copy
			sortedValueArrayForHand2Copy.splice(i,1);
			sortedValueArrayForHand2Copy.splice(i,1);
		}
	}

	//see which value in pairArray is bigger, if equal, then we used sortedValueArrayForHandXCopy to find next high card
	if(pairForHand1>pairForHand2){
		return 1;
	}
	if(pairForHand1<pairForHand2){
		return -1;
	}
	if(pairForHand1==pairForHand2){
		return tieBreakerHighCard(sortedValueArrayForHand1Copy, sortedValueArrayForHand2Copy);
	}

}

function tieBreakerThreeOfAKind(sortedValueArrayForHand1, sortedValueArrayForHand2){
	var sortedValueArrayForHand1Copy=sortedValueArrayForHand1.slice();
	var sortedValueArrayForHand2Copy=sortedValueArrayForHand2.slice();

	var tripleForHand1;
	var nonPairArrayForHand1=[];

	var tripleForHand2;
	var nonPairArrayForHand2=[];

	for(i=0;i<sortedValueArrayForHand1.length - 1;i++){
		if(sortedValueArrayForHand1[i]==sortedValueArrayForHand1[i+1] && sortedValueArrayForHand1[i]==sortedValueArrayForHand1[i+3]){ //this is a triple
			tripleForHand1=sortedValueArrayForHand1[i];
			//remove this pair from the copy
			sortedValueArrayForHand1Copy.splice(i,1);
			sortedValueArrayForHand1Copy.splice(i,1);
			sortedValueArrayForHand1Copy.splice(i,1);
		}
		if(sortedValueArrayForHand2[i]==sortedValueArrayForHand2[i+1] && sortedValueArrayForHand1[i]==sortedValueArrayForHand1[i+3]){ //this is a triple
			tripleForHand2=sortedValueArrayForHand2[i];
			//remove this pair from the copy
			sortedValueArrayForHand2Copy.splice(i,1);
			sortedValueArrayForHand2Copy.splice(i,1);
			sortedValueArrayForHand1Copy.splice(i,1);
		}
	}

	//see which value in tripleForHand is bigger, if equal, then we used sortedValueArrayForHandXCopy to find next high card
	if(tripleForHand1>tripleForHand2){
		return 1;
	}
	if(tripleForHand1<tripleForHand2){
		return -1;
	}
	if(tripleForHand1==tripleForHand2){
		return tieBreakerHighCard(sortedValueArrayForHand1Copy, sortedValueArrayForHand2Copy);
	}

}

function tieBreakerTwoPair(sortedValueArrayForHand1, sortedValueArrayForHand2){

	//make copy of sortedValueArrays so that we can splice them later
	var sortedValueArrayForHand1Copy=sortedValueArrayForHand1.slice();
	var sortedValueArrayForHand2Copy=sortedValueArrayForHand2.slice();

	var pairsForHand1=[0,0];
	var nonPairArrayForHand1;

	var pairsForHand2=[0,0];
	var nonPairArrayForHand2;

	for(i=0;i<sortedValueArrayForHand1.length - 1;i++){
		if(sortedValueArrayForHand1[i]==sortedValueArrayForHand1[i+1]){ //this is a pair
			if(pairsForHand1[0]==0){
				pairForHand1[0]=sortedValueArrayForHand1[i];
			}
			else{
				pairForHand1[1]=sortedValueArrayForHand1[i];
			}
			//remove this pair from the copy
			sortedValueArrayForHand1Copy.splice(i,1);
			sortedValueArrayForHand1Copy.splice(i,1);
		}
		if(sortedValueArrayForHand2[i]==sortedValueArrayForHand2[i+1]){ //this is a pair
			if(pairsForHand2[0]==0){
				pairForHand2[0]=sortedValueArrayForHand2[i];
			}
			else{
				pairForHand2[1]=sortedValueArrayForHand2[i];
			}
			//remove this pair from the copy
			sortedValueArrayForHand2Copy.splice(i,1);
			sortedValueArrayForHand2Copy.splice(i,1);
		}
	}
	if((pairsForHand1[0]>pairsForHand2[0] && pairsForHand1[0]>pairsForHand2[1]) || (pairsForHand1[1]>pairsForHand2[0] && pairsForHand1[1]>pairsForHand2[1])){
		return 1;
	}
	else if((pairsForHand2[0]>pairsForHand1[0] && pairsForHand2[0]>pairsForHand1[1]) || (pairsForHand2[1]>pairsForHand1[0] && pairsForHand2[1]>pairsForHand1[1])){
		return -1;
	}
	else{
		return tieBreakerHighCard(sortedValueArrayForHand1Copy, sortedValueArrayForHand2Copy);
	}

function tieBreakerStraight(sortedValueArrayForHand1, sortedValueArrayForHand2){
	var sortedValueArrayForHand1Copy=sortedValueArrayForHand1.slice();
	var sortedValueArrayForHand2Copy=sortedValueArrayForHand2.slice();

	return tieBreakerHighCard(sortedValueArrayForHand1Copy, sortedValueArrayForHand2Copy);

}

function tieBreakerFlush(sortedValueArrayForHand1, sortedValueArrayForHand2){
	var sortedValueArrayForHand1Copy=sortedValueArrayForHand1.slice();
	var sortedValueArrayForHand2Copy=sortedValueArrayForHand2.slice();

	return tieBreakerHighCard(sortedValueArrayForHand1Copy, sortedValueArrayForHand2Copy);

}

}
function printPokerHandName(handValue){

	var output=""

	if(handValue==10){ 
		output+="royal flush";
		return output;
	}
	if(handValue==9){ 
		output+="straight flush";
		return output;
	}
	if(handValue==8){ 
		output+="four of a kind";
		return output;
	}
	if(handValue==7){ 
		output+="full house";
		return output;
	}
	if(handValue==6){ 
		output+="flush";
		return output;
	}
	if(handValue==5){
		output+="straight";
		return output;
	}
	if(handValue==4){
		output+="two pair";
		return output;
	}
	if(handValue==3){ 
		output+="three of a kind";
		return output;
	}
	if(handValue==2){
		output+="pair";
		return output;
	}
	if(handValue==1){
		output+="high card";
		return output;
	}
}
function tieBreaker(hand1, hand2, handValue){ //return 1 if hand1 wins, return -1 if hand2 wins, return 0 if tie

	console.log("tie breaker");
	var valueArrayForHand1=[];
	var suitArrayForHand1=[];
	var nameArrayForHand1=[];

	var valueArrayForHand2=[];
	var suitArrayForHand2=[];
	var nameArrayForHand2=[];

	for(i=0;i<5;i++){
		valueArrayForHand1.push(hand1.cards[i].value);
		suitArrayForHand1.push(hand1.cards[i].suit);
		nameArrayForHand1.push(hand1.cards[i].name);
	}

	for(i=0;i<5;i++){
		valueArrayForHand2.push(hand2.cards[i].value);
		suitArrayForHand2.push(hand2.cards[i].suit);
		nameArrayForHand2.push(hand2.cards[i].name);
	}

	var sortedValueArrayForHand1=valueArrayForHand1.slice();
	sortedValueArrayForHand1.sort(sortNumber);
	var sortedNameArrayForHand1=nameArrayForHand1.slice();
	sortedNameArrayForHand1.sort();

	var sortedValueArrayForHand2=valueArrayForHand2.slice();
	sortedValueArrayForHand2.sort(sortNumber);
	var sortedNameArrayForHand2=nameArrayForHand2.slice();
	sortedNameArrayForHand2.sort();

	if(handValue==10){ // both royal flush
		console.log("both royal flush, tie")
		return 0;
	}
	if(handValue==9){ //for straight flush, highest top card wins (A can be used in A-2-3-4-5, but then 5 is the top card) 

	}
	if(handValue==8){ //for four of a kind, highest name of the four cards wins, and then kicker

	}
	if(handValue==7){ //for full house, highest name of the three cards wins, if equal, rank of pair decides

	}
	if(handValue==6){ //flush, highest card wins, if equal, compare the next highest card.. and so on
		return tieBreakerFlush(sortedValueArrayForHand1, sortedValueArrayForHand2);
	}
	if(handValue==5){ //straight, compare highest card
		return tieBreakerStraight(sortedValueArrayForHand1, sortedValueArrayForHand2);	
	}
	if(handValue==4){ //two pair, highest pair compare, lower pair, kicker compare
		return tieBreakerTwoaPair(sortedValueArrayForHand1, sortedValueArrayForHand2);	
	}
	if(handValue==3){ //three of a kind, compare three, then highest of remainder 2, then lowest of reminader 2
	
		return tieBreakerThreeOfAKind(sortedValueArrayForHand1, sortedValueArrayForHand2);	
	}
	if(handValue==2){ //pair, compare pair, compare highest card, and so on..
		//compare pair, if pair equal, remove pair and compare highest cards using function written already. 

		return tieBreakerPair(sortedValueArrayForHand1, sortedValueArrayForHand2);


	}
	if(handValue==1){ //nothing, compare high card, if high card is equal, compare  second highest card.. and so on.

		return tieBreakerHighCard(sortedValueArrayForHand1,sortedValueArrayForHand2);


	}
}
function compareHands(hand1, hand2){ //return bigger hand

	var hand1Value=handHighestValue(hand1);
	var hand2Value=handHighestValue(hand2);
	var pokerHandName="";

	if(hand1Value==hand2Value){
		console.log("tie, need tie breaker");
		var tieBreakerValue=tieBreaker(hand1, hand2, hand1Value);

		if(tieBreakerValue==1){
			pokerHandName+=printPokerHandName(hand1Value);
			console.log("hand1 wins with "+ pokerHandName);
		}
		if(tieBreakerValue==-1){
			pokerHandName+=printPokerHandName(hand2Value);
			console.log("hand2 wins with "+ pokerHandName);
		}
		if(tieBreakerValue==0){
			pokerHandName+=printPokerHandName(hand1Value);
			console.log("hands are tied");
		}
	}
	if(hand1Value>hand2Value){
		pokerHandName+=printPokerHandName(hand1Value);
		console.log("hand 1 wins with " + pokerHandName);
	}
	if(hand1Value<hand2Value){
		pokerHandName+=printPokerHandName(hand2Value);
		console.log("hand 2 wins with " + pokerHandName);
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

compareHands(newHand1,newHand2);

