const cards = document.querySelectorAll('.memory-card'); // array DOM-elem

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, 
	secondCard;

const flipCard = e => {
	//console.log(e.target.parentElement) //search element
	if(boardLocked) return;

	const target = e.target.parentElement;

	if(target === firstCard) return;

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
	const isEqual = firstCard.dataset.framework === secondCard.dataset.framework

	// if(isEqual) {
	// 	disabledCards();
	// } else {
	// 	unflipCards();
	// }

	//тернарные операторы -- ? = if, : = else
	isEqual ? disabledCards() : unflipCards();
}

const disabledCards = () => {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}

const unflipCards = () => {
	boardLocked = true;
		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');

			resetBoard();
		}, 1000);
}

const resetBoard = () => {
	// too heavy (spread)
	// [hasFlippedCard, boardLocked] = [false, false]; //спред оператор
	// [firstCard, secondCard] = [null, null];

	// better (double insertation)
	hasFlippedCard = boardLocked = false;
	firstCard = secondCard = null;
}

cards.forEach(card => {
	//add Event Listener to ever card
	card.addEventListener('click', flipCard);

	const randomIndex = Math.floor(Math.random() * cards.length);
	card.style.order = randomIndex;
});

