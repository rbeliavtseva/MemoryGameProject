$(document).ready(function(){

let allCards = [];
let openCardsArray = [];
let lastIndex;
let counter = 0;
let moves = $('.moves');
let restart = $('.restart');
let shuffledCards;
let deck = $('.deck');
let timer = 0;
let time = $('.timer');
let numberOfMatches = 0;
let starRating = $( 'ul.stars li' );
let canClick = true;

/*
* @description Checks if the elements of the array are the same class
				Adds new classname to the matched elements
* @returns {boolean} true or false
*/
function matchCheck() {
	if (openCardsArray[0].firstElementChild.className === openCardsArray[1].firstElementChild.className) {
		$(openCardsArray).each(function (index, card) {
			$(this).addClass('match'); 
			});
		return true;
	}else {
		return false;
	};
};

allCards = $('.card');
/*
* @description Main game function. Checks every click on various conditions
*/
allCards.each(function (index, card) {
	$(this).on('click',function(){
		if(canClick){
			if($(this).attr('class')!='card open show match') {
				if(lastIndex!=index) {
					openCardsArray.push(card);
					counter+=1;
					removeStar();
					if (counter==1){
						timer = new Date();
						moves.text(counter+' Move');
					} else {
						moves.text(counter+' Moves');
					};
					$(this).addClass('open show');
					lastIndex = index;
					if(openCardsArray.length==2) {
						if(matchCheck()) {
							openCardsArray = [];
							numberOfMatches += 2;
							win();
						} else {
							canClick = false;
							setTimeout(function(){
								$.each(openCardsArray, function(index, card){
									$(this).removeClass('open show');
									});
								openCardsArray = [];
								lastIndex = null;
								canClick = true;
								}, 1000);

						};
					};
				};
			};
		};
	});
});

restart.on('click', function(){
    startOver();
});

/*
* @description Shuffless all cards, restarts star rating, moves counter, timer
*/
function startOver(){
	counter = 0;
    timer = 0;
    numberOfMatches = 0;
    time.text('00:00:00');
    moves.text(counter+' Moves');
    allCards.each(function(index, card){
    	$(this).removeClass('open show match');
    });
    allCards = shuffle(allCards);
    $('.card').detach();
	allCards.each(function(index,card){
    	deck.append(card);
    });
	while(starRating.length<3){
    	$('.stars').append('<li><i class="fa fa-star"></i></li>');
    	starRating = $( 'ul.stars li' );
    };
};

/*
* @description Removes stars 
*/
function removeStar(){
	if (counter==20 || counter==40 || counter==60){
		$( 'ul.stars li' ).eq( 1 ).detach();
		starRating = $( 'ul.stars li' );
	};
};

/*
* @description Checks if all cards are matched, creates congratulational alert 
				with the time and star rating, that asks if player wants to play again 
*/
function win(){
	if(numberOfMatches == allCards.length){
		let title = 'You win!\n Your time is '+ time.text()+'\n';
		starRating.each(function(index,star){
			title += $(star).html();
		});
		title += '\nWant to play again?';
		swal({
  			title: title,
  			showCancelButton: true,
  			confirmButtonColor: '#3085d6',
  			cancelButtonColor: '#d33',
			}).then((result) => {
	  		if (result.value) {
	    	startOver();
  			};
		});
		timer = 0;
	};
};

/*
* @description Provided shuffle function
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
	return array;
};

/*
* @description Timer function
*/
setInterval(function(){
    if (timer == 0) return;
    let ticks = (new Date - timer) / 1000;
    let hh = Math.floor(ticks / 3600);
    let mm = Math.floor((ticks % 3600) / 60);
    let ss = Math.round(ticks % 60);
	if (hh < 10) {
		hh = '0' + hh;
	};
    if (mm < 10) {
    	mm = '0' + mm;
    };
    if (ss < 10) {
    	ss = '0' + ss;
    };
	time.text(hh+':'+mm+':'+ss);
},100);

});







	
