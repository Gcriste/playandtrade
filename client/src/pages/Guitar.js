import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import logo from './playLogo.png';
import { Redirect, Link } from 'react-router-dom';
import { Input } from '../components/CreateAccount';
// import sample from './facebook.png';

function Guitar() {
	const [ image, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ user, setUser ] = useState('');
	const [ userid, setUserId ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ make, setMake ] = useState('');
	const [ model, setModel ] = useState('');
	const [ color, setColor ] = useState('');
	const [ year, setYear ] = useState('');
	const [ value, setValue ] = useState('');
	const [ condition, setCondition ] = useState('');

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'griffin');
		setLoading(true);
		const res = await fetch('	https://api.cloudinary.com/v1_1/dr9jpgt7l/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();

		// axios.get('https://api.cloudinary.com/v1_1/dr9jpgt7l/image/upload').then((response) => {
		// 	console.log(response);
		// 	const file = response.json();
		// 	axios.post(data).then((response) => {
		// 		console.log('second response ' + response);
		// 		setImage(file.secure_url);
		// 		setLoading(false);
		// 	});
		// });

		setImage(file.secure_url);
		setLoading(false);
	};

	useEffect(() => {
		const token = localStorage.getItem('example-app');
		if (token) {
			setAuthToken(token);
		}
		axios.get('/api/user').then((response) => {
			console.log(response.data);
			setUser(response.data.id);
			// setEmail(response.data.email);
		});
	}, []);

	useEffect(
		() => {
			axios
				.post('api/guitar')
				.then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ uploadImage ]
	);

	// handleLogout = () => {
	// 	localStorage.removeItem('example-app');
	// 	this.setState({
	// 		redirect: true
	// 	});
	// };

	const SaveGuitar = () => {
		const newGuitar = {};
	};

	return (
		<div className='App'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12 text-center'>
						<div className='logo-container'>
							<img className='logo' src={logo} alt='logo' />
						</div>
						<h2>Guitars</h2>

						<form>
							<div className='field'>
								<div className='account-info'>
									<p className='account'>ACCOUNT INFO:</p>
								</div>
							</div>
							<div className='field'>
								<Input
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
									name='brand'
									placeholder='BRAND'
									type='name'
								/>
							</div>
							<div className='field'>
								<Input
									value={make}
									onChange={(e) => setMake(e.target.value)}
									name='make'
									placeholder='MAKE'
									type='name'
								/>
							</div>
							<div className='field'>
								<Input
									value={model}
									onChange={(e) => setModel(e.target.value)}
									name='model'
									placeholder='MODEL'
									type='name'
								/>
							</div>
							<div className='field'>
								<Input
									value={color}
									onChange={(e) => setColor(e.target.value)}
									name='color'
									placeholder='COLOR'
									type='name'
								/>
							</div>
							<div>
								<Input
									value={year}
									onChange={(e) => setYear(e.target.value)}
									name='year'
									placeholder='YEAR'
									type='name'
								/>
							</div>
							<div className='field'>
								<Input
									value={value}
									onChange={(e) => setValue(e.target.value)}
									name='value'
									placeholder='VALUE'
									type='name'
								/>
							</div>
							<div className='field'>
								<Input
									value={condition}
									onChange={(e) => setCondition(e.target.value)}
									name='condition'
									placeholder='CONDITION'
									type='condition'
								/>
							</div>
							{/* <img src={sample} style={{ width: '300px' }} /> */}
							<input type='file' name='file' placeholder='Upload an image' onChange={uploadImage} />
							{loading ? (
								<h3>Loading...</h3>
							) : (
								<div>
									<img className='profile-pic' src={image} />{' '}
								</div>
							)}
							{/* <button className='btn btn-danger' onClick={this.handleLogout}>
							Logout
						</button> */}
							<button onClick={SaveGuitar}>Save Guitar</button>
							<Link className='continue-button' to={'/dashboard'}>
								SAVE AND VIEW PROFILE
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Guitar;
