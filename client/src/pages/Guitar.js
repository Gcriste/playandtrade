import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import logo from './playLogo.png';
import { Redirect, Link } from 'react-router-dom';
import { Input } from '../components/CreateAccount';
import Deck from './Deck';
// import sample from './facebook.png';

function Guitar() {
	return (
		<div>
			<Deck />
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

export default Guitar;
