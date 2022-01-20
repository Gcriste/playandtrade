import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './deck.css';

const NewDeck = ({ guitarCollection }) => {
	const [lastDirection, setLastDirection] = useState();

	const swiped = (direction, nameToDelete) => {
		console.log('removing: ' + nameToDelete);
		setLastDirection(direction);
	};

	const outOfFrame = (name) => {
		console.log(name + ' left the screen!');
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
						onSwipe={(dir) => swiped(dir, guitar.name)}
						onCardLeftScreen={() => outOfFrame(guitar.name)}
					>
						<div className='card'>
							<img src={guitar.guitarPic} key={guitar.id} alt='profilePicture' />
							{/* <img src={guitar.guitarPic} alt='profilePicture' /> */}

							<span>
								<p className='MovieName'>{guitar.make},</p> <p className='MovieYear'>{guitar.model}</p>
							</span>
							<p className='MovieRating'>{guitar.value}</p>
							<p className='MoviePlot'>{guitar.email}</p>
						</div>
					</TinderCard>
				))}
			</div>
			{lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
		</div>
	);
};

export default NewDeck;
