import React from 'react';
import { string, number, array } from 'prop-types';
import { animated, interpolate } from 'react-spring/hooks';
import Carousel from 'nuka-carousel';

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
	// const { name, year, rating, plot, pics } = data[i];
	const { make, model, value, email, id, guitarPic, guitarPicArray } = data[i];
	// console.log('guitar pic' + guitarPic);
	// console.log(data);

	const newArray = data.map((guitar) => {
		return [guitar.guitarPic];
	});

	// console.log(newArray);
	// let picArray = [];
	// picArray.push(guitarPic);

	// console.log(picArray);
	return (
		<animated.div
			key={i}
			style={{
				transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
			}}
			className='top-one'
		>
			<animated.div
				{...bind(i)}
				style={{
					transform: interpolate([rot, scale], trans)
				}}
				className='bottom-one'
			>
				<div className='card'>
					<Carousel>
						{/* {guitarPicArray.map((pic, index) => (
							<img src={guitarPic} key={data.id} alt='profilePicture' />
						))} */}

						{/* {pics.map((pic, index) => (
							<img src={pic} key={index} alt='profilePicture' />
						))} */}

						{/* {guitarPic.map((pic, index) => (
							<img src={pic} key={index} alt='profilePicture' />
						))} */}
						<img src={guitarPic} key={id} alt='profilePicture' />
						{/* <img src={guitarPic} alt='profilePicture' /> */}
					</Carousel>
					{/* <h2>{name},</h2>
          <h2>{age}</h2>
          <h5>{distance}</h5>
          <h5>{text}</h5> */}
					<span>
						<p className='MovieName'>{make},</p> <p className='MovieYear'>{model}</p>
					</span>
					<p className='MovieRating'>{value}</p>
					<p className='MoviePlot'>{email}</p>

					{/* <span>
						<p className='MovieName'>{name},</p> <p className='MovieYear'>{year}</p>
					</span>
					<p className='MovieRating'>{rating}</p>
					<p className='MoviePlot'>{plot}</p> */}
				</div>
			</animated.div>
		</animated.div>
	);
};

Card.propTypes = {
	name: string,
	year: number,
	rating: string,
	plot: string,
	pics: array,
	guitarPic: array,
	make: string,
	model: string,
	value: number,
	email: string,
	guitarPicArray: array
};

export default Card;
