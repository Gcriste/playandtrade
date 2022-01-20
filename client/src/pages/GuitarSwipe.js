import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import logo from './playLogo.png';
import { Redirect, Link } from 'react-router-dom';
import { Input } from '../components/CreateAccount';
import Deck from './Deck';
import NewDeck from './NewDeck';
// import sample from './facebook.png';

function GuitarSwipe() {
	const [guitarCollection, setGuitarCollection] = useState([]);
	const [user, setUser] = useState('');
	useEffect(() => {
		const token = localStorage.getItem('example-app');
		if (token) {
			setAuthToken(token);
		}
		axios.get('/api/user').then((response) => {
			// console.log(response.data);
			setUser(response.data.id);
		});
	}, []);

	useEffect(() => {
		axios.get('/api/guitar').then((response) => {
			setGuitarCollection(response.data);
		});
	}, []);
	return (
		<div>
			{/* <Deck guitarCollection={guitarCollection} /> */}
			<NewDeck guitarCollection={guitarCollection} />
			<div className='row'>
				<div className='col-md-8 offset-md-2 col-12 text-center'>
					<Link className='save-button' to={'/dashboard'}>
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default GuitarSwipe;
