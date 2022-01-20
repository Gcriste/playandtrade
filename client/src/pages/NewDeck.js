import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './deck.css';

const NewDeck = ({ guitarCollection }) => {
	const [lastDirection, setLastDirection] = useState();

	const swiped = (direction, nameToDelete) => {
		// console.log('removing: ' + nameToDelete);
		console.log(direction);
		setLastDirection(direction);
	};

	const outOfFrame = (name) => {
		console.log(name + ' left the screen!');
	};

	const makeFirstLetterCapital = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	const addDollarSign = (word) => {
		return `$${word}`;
	};

	return (
		<div className='deckContainer'>
			<link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
			<link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
			<h1>React Tinder Card</h1>
			<div className='cardContainer'>
				{guitarCollection.map((guitar, index) => (
					<TinderCard
						className='swipe'
						key={guitar.name}
						onSwipe={(dir) => swiped(dir, guitar.id)}
						onCardLeftScreen={() => outOfFrame(guitar.id)}
						preventSwipe={['up', 'down']}
						// flickOnSwipe={true}
					>
						<div className='card-container'>
							<div className='card'>
								<img src={guitar.guitarPic} key={guitar.id} alt='profilePicture' />
								<div classsName='first-row'>
									<h3 className='guitar-make'>{makeFirstLetterCapital(guitar.make)},</h3>
									<h3 className='guitar-model'>{makeFirstLetterCapital(guitar.model)}</h3>
								</div>
								<div className='second-row'>
									<h3 className='guitar-value'>{addDollarSign(guitar.value)}</h3>
									<h3 className='guitar-user-email'>{makeFirstLetterCapital(guitar.email)}</h3>
								</div>
							</div>
						</div>
					</TinderCard>
				))}
			</div>
			{lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
		</div>
	);
};

export default NewDeck;
