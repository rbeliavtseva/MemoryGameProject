/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *   
  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

$(document).ready(function(){

var allCards;
var openCardsArray = [];
var lastIndex;
var counter = 0;
var moves = $('.moves');


function matchCheck() {
	if (openCardsArray[0].firstElementChild.className === openCardsArray[1].firstElementChild.className) {
		console.log("Match!");
		$(openCardsArray).each(function (index, card) {
			$(this).addClass('match'); 
			});
		return true;

	}else {
		console.log("Not a match");
		return false;
	};
};




allCards = $('.card');

allCards.each(function (index, card) {
	$(this).on('click',function(){
		if(lastIndex!=index) {
			openCardsArray.push(card);
			console.log('click');
			counter+=1;
			
			if (counter==1){
				moves.text(counter+' Move');
			}else{
				moves.text(counter+' Moves');
			};
			
			$(this).addClass('open show');
			lastIndex = index;
			console.log(openCardsArray.length);
			if(openCardsArray.length==2)
			{
				if(matchCheck())
				{
					openCardsArray = [];
					console.log(openCardsArray);
				}
				else
				{
					setTimeout(function(){
						$.each(openCardsArray, function(index, card){
							$(this).removeClass('open show');
							});
						openCardsArray = [];
						lastIndex = null;
						console.log(openCardsArray);
						}, 1000);

				};
			};
		};
	});
});


});







	
