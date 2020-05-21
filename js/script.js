const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, 
	secondCard;

const flipCard = e => {
	//console.log(e.target.parentElement) //search element
	if(boardLocked) return;

	const target = e.target.parentElement;

	target.classList.add('flip');

	if(!hasFlippedCard) {
		//first click

		hasFlippedCard = true;
		firstCard = target;
	} else {
		//second click

		hasFlippedCard = false;
		secondCard = target;

		//check for match
		checkForMatch();
	}

}

const checkForMatch = () => {
	if(firstCard.dataset.framework === secondCard.dataset.framework){
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);
	} else {
		boardLocked = true;
		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');

			boardLocked = false;
		}, 1000);
	}
}

cards.forEach(card => {
	//add Event Listener to ever card
	card.addEventListener('click', flipCard);
});

//TIMECODE 1:10:45