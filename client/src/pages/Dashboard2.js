import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';

function Dashboard2() {
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

	return (
		<div className='App'>
			<h1>Upload Image</h1>
			<input type='file' name='file' placeholder='Upload an image' onChange={uploadImage} />
			{loading ? (
				<h3>Loading...</h3>
			) : (
				<div>
					<img src={image} style={{ width: '300px' }} />{' '}
				</div>
			)}
		</div>
	);
}

export default Dashboard2;
