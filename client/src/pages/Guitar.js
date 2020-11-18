import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import logo from './playLogo.png';
import { Redirect, Link } from 'react-router-dom';
import { Input } from '../components/CreateAccount';
// import sample from './facebook.png';

function Guitar() {
	const [ guitarPic, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ userid, setUserId ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ make, setMake ] = useState('');
	const [ model, setModel ] = useState('');
	const [ color, setColor ] = useState('');
	const [ year, setYear ] = useState('');
	const [ value, setValue ] = useState('');
	const [ condition, setCondition ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ redirect, setRedirect ] = useState(false);

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
			setUserId(response.data.id);
			setEmail(response.data.email);
			// setEmail(response.data.email);
		});
	}, []);

	// useEffect(
	// 	() => {
	// 		axios
	// 			.post('api/guitar')
	// 			.then((response) => {
	// 				console.log(response.data);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	},
	// 	[ uploadImage ]
	// );

	// handleLogout = () => {
	// 	localStorage.removeItem('example-app');
	// 	this.setState({
	// 		redirect: true
	// 	});
	// };

	const SaveGuitar = (event) => {
		event.preventDefault();
		const newGuitar = {
			make,
			model,
			brand,
			color,
			year,
			value,
			userid,
			condition,
			email,
			guitarPic
		};
		axios
			.post('api/guitar', newGuitar)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});

		setRedirect(true);
	};

	//logs out user
	const handleLogout = () => {
		localStorage.removeItem('example-app');
		setRedirect(true);
		if (redirect) {
			return <Redirect to='/' />;
		}
	};

	if (redirect) {
		return <Redirect to='/dashboard' />;
	}

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
									<img className='profile-pic' src={guitarPic} />{' '}
								</div>
							)}

							<Link to={'/dashboard'}>
								<button className='save-guitar-button' onClick={SaveGuitar}>
									SAVE AND VIEW PROFILE
								</button>
							</Link>
						</form>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6' />

						<button className='btn btn-danger' onClick={handleLogout}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Guitar;
