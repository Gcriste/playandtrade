import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard2() {
	const [ image, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ user, setUser ] = useState(false);

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

		setImage(file.secure_url);
		setLoading(false);
	};

	const fetchImages = async () => {
		const res = await axios.get('https://api.cloudinary.com/v1_1/dr9jpgt7l/image/upload');
		setUser(res.data);
	};

	useEffect(() => {
		fetchImages(user);
	}, user);

	return (
		<div className='App'>
			<h1>Upload Image</h1>
			<input type='file' name='file' placeholder='Upload an image' onChange={uploadImage} />
			{loading ? <h3>Loading...</h3> : <img src={image} style={{ width: '300px' }} />}
		</div>
	);
}

export default Dashboard2;
