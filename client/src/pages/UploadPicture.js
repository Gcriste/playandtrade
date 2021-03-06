import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import logo from './playLogo.png';
import { Redirect, Link } from 'react-router-dom';
// import sample from './facebook.png';

function UploadPicture() {
	const [ image, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ user, setUser ] = useState('');

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
		});
	}, []);

	useEffect(
		() => {
			axios
				.put('api/user/', {
					params: {
						// id: this.state.user.id
					},
					profilePic: image
				})
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

	return (
		<div className='App'>
			<div className='container card'>
				<div className='row'>
					<div className='col-md-12 text-center'>
						<div className='logo-container'>
							<img className='logo' src={logo} alt='logo' />
						</div>
						<h2>SELECT PROFILE PICTURE</h2>
						{/* <img src={sample} style={{ width: '300px' }} /> */}
						<input type='file' name='file' placeholder='Upload an image' onChange={uploadImage} />
						{loading ? (
							<h3>Loading...</h3>
						) : (
							<div>
								<img className='profile-upload-pic' src={image} />{' '}
							</div>
						)}
						{/* <button className='btn btn-danger' onClick={this.handleLogout}>
							Logout
						</button> */}
						<div className='row'>
							<div className='col-md-12'>
								<Link className='save-button' to={'/dashboard'}>
									SAVE AND VIEW PROFILE
								</Link>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-12'>
								<button className='button add-button'>
									<Link className='create-button-text' to={'/guitar'}>
										ADD A GUITAR
									</Link>
								</button>
							</div>
						</div>
						<div className='row'>
							<div className='col-12'>
								<button className='button add-button'>
									<p className='account-settings-button'>
										{' '}
										<Link className='back-link-text' to={'/account-settings'}>
											Account Settings
										</Link>
									</p>
								</button>
							</div>
						</div>

						{/* <Link className='back-link-text' to={'/guitar'}>
																ADD A GUITAR
															</Link> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default UploadPicture;
