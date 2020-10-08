import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import Moment from 'react-moment';
import './dashboard.css';
import FilesUploadComponent from '../components/file-upload-component';
// import SavedResult from '../components/SavedList';
// import SavedRequests from '../components/SavedRequests';
import Nav from '../components/Nav';

class Dashboard extends Component {
	state = {
		redirect: false,
		user: {},
		// guitars,
		email: '',
		password: '',
		errors: {},
		firstName: '',
		lastName: '',
		message: '',
		avatar: '',
		profilePic: '',
		zipCode: '',
		country: '',
		userid: ''
	};

	handleProfileChange = (event) => {
		console.log(event.target.files[0]);
		this.setState({
			profilePic: event.target.files[0]
		});
	};

	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append('image', this.state.profilePic, this.state.profilePic.name);
		axios
			.put('api/user/', {
				params: {
					id: this.state.user.id
				},
				profilePic: this.state.profilePic
			})
			.then((response) => {
				this.setState({
					redirect: true,
					errors: {}
				});
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					errors: err.response.data
				});
			});
	};
	//submit button function
	handleUpdateSubmit = (event) => {
		// const files = event.target.files;
		// const data = new FormData();
		// data.append('file', files[0]);
		// data.append('upload_preset', 'griffin');

		// axios.post('https://api.cloudinary.com/v1_1/dr9jpgt7l/image/upload', data).then((response) => {
		// 	console.log(response);
		// 	this.setState({
		// 		profilePic: response.file.secure_url
		// 	});
		// });
		// event.preventDefault();
		// console.log('hi');

		axios
			.put('api/user/', {
				params: {
					id: this.state.user.id
				},
				profilePic: this.state.profilePic
			})
			.then((response) => {
				this.setState({
					redirect: true,
					errors: {}
				});
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					errors: err.response.data
				});
			});
	};

	componentDidMount() {
		const token = localStorage.getItem('example-app');
		if (token) {
			setAuthToken(token);
		}

		axios.get('/api/user').then((response) => {
			console.log(response.data);
			let userId = response.data.id;
			this.setState({
				firstName: response.data.firstName,
				lastName: response.data.lastName,
				email: response.data.email,
				password: response.data.password,
				zipCode: response.data.zipCode,
				country: response.data.country,
				avatar: response.data.avatar,
				user: response.data,
				userid: response.data.id,
				profilePic: response.data.profilePic
			});

			// axios.get('/api/gig/' + userId).then((res) => {
			// 	this.setState({
			// 		savedGigs: res.data
			// 	});
			// 	console.log(res.data);

			// 	axios
			// 		.get('/api/request/' + userId)
			// 		.then((res) => {
			// 			let gigId = [];
			// 			for (var i = 0; i < res.data.length; i++) {
			// 				gigId.push(res.data[i].gigid);
			// 			}
			// 			this.setState({
			// 				savedRequests: res.data
			// 			});

			// 			for (var i = 0; i < gigId.length; i++) {
			// 				console.log(gigId[i]);
			// 				axios.get('/api/gig/id/' + gigId[i]).then((res) => {
			// 					console.log(res.data);
			// 					let savedGigs = [];
			// 					savedGigs = this.state.dateForSavedRequests.concat(res.data);
			// 					this.setState({
			// 						dateForSavedRequests: savedGigs
			// 					});
			// 				});
			// 			}
			// 		})
			// 		.catch((err) => console.log(err.response));
			// });
		});
	}

	//logs out user
	handleLogout = () => {
		localStorage.removeItem('example-app');
		this.setState({
			redirect: true
		});
	};

	//removes gig by id
	// handleDeleteButton = (id) => {
	// 	console.log(id);
	// 	axios.delete('/api/gig/' + id).then((res) => this.componentDidMount()).catch((err) => console.log(err));
	// };

	// // deletes request by id
	// handleDeleteRequest = (id) => {
	// 	axios.delete('/api/request/' + id).then((res) => this.componentDidMount()).catch((err) => console.log(err));
	// };

	render() {
		const { redirect, user } = this.state;

		if (redirect) {
			return <Redirect to='/' />;
		}
		console.log(user.profilePic);
		if (user.profilePic === null) {
			console.log('profile pic is null');
			return (
				<div className='pic'>
					<div className='container'>
						<div className='card'>
							<div className='profile-container'>
								<div className='row'>
									<div className='col-md-4 col-12'>
										{/* <FilesUploadComponent /> */}
										<input
											type='file'
											// value={this.state.profilePic}
											// name='profilePic'
											onChange={this.handleProfileChange}
										/>
										<button
											type='submit'
											className='button submit-button'
											tabindex='0'
											onClick={this.fileUploadHandler}
										>
											<div className='visible content'>Submit</div>
										</button>

										<button className='btn btn-danger' onClick={this.handleLogout}>
											Logout
										</button>
									</div>
									<div className='col-md-4 col-12'>
										<h2>
											<strong>Welcome, {user.firstName}</strong>
										</h2>
									</div>
									{''}
								</div>
								<div className='row text-center'>
									<div className='col-md-4 col-12 text-center'>
										<p>
											<strong>Email Address: {user.email}</strong>
										</p>
										{''}
									</div>
								</div>
								<div className='row text-center'>
									<div className='col-md-4 col-12 text-center'>
										<p className='text-center'>
											<strong>
												Member Since: <Moment date={user.createdAt} format='MM/DD/YYYY' />
											</strong>
										</p>
										{''}
									</div>
								</div>

								<div className='col-md-4 col-12 text-center'>
									<p>
										<strong>
											Last Updated: <Moment date={user.updatedAt} format='MM/DD/YYYY' />
										</strong>
									</p>
									{''}
									{/* <div className='col-md-4 col-12 text-center'>
										<div class='container'> */}
									{/* <div class='row'> */}
									{/* <div class='col-sm-8 mt-3'> */}
									{/* <h4>Node.js upload images - bezkoder.com</h4>

													<form
														class='mt-4'
														action='/upload'
														method='POST'
														enctype='multipart/form-data'
													> */}
									{/* <div class='form-group'>
															<input
																type='file'
																name='file'
																id='input-files'
																class='form-control-file border'
															/>
														</div> */}
									{/* <button type='submit' class='btn btn-primary'>
															Submit
														</button>
													</form> */}
									{/* </div> */}
									{/* </div> */}
									{/* <hr />
											<div class='row'>
												{/* <div class='col-sm-12'>
													<div class='preview-images' />
												</div> */}
									{/* </div>
										</div>
										<input
											value={this.state.profilePic}
											type='profilePic'
											onChange={this.handleProfileChange}
											name='profilePic'
											placeholder='profilePic-ADDRESS'
										/>
									</div>  */}
									{/* <button
										type='submit'
										className='button continue-button'
										tabindex='0'
										onClick={this.handleUpdateSubmit}
									/> */}
								</div>
							</div>

							<div className='container'>
								<div className='row'>
									{/* <div className='col-md-6'>
									<SavedResult
										savedGigs={this.state.savedGigs}
										handleDeleteButton={this.handleDeleteButton}
									/>
								</div>

								<div className='col-md-6'>
									<SavedRequests
										savedRequests={this.state.savedRequests}
										dateForSavedRequests={this.state.dateForSavedRequests}
										handleDeleteRequest={this.handleDeleteRequest}
									/> */}
									{/* </div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className='container'>
					<div className='card'>
						<div className='profile-container'>
							<div className='row'>
								<div className='col-md-4 col-12'>
									{/* <h1>Home </h1> */}
									<button className='btn btn-danger' onClick={this.handleLogout}>
										Logout
									</button>
								</div>
								<div className='col-md-4 col-12'>
									<h2>
										<strong>Welcome, {user.firstName}</strong>
									</h2>
								</div>
								{''}
							</div>
							<div className='row text-center'>
								<div className='col-md-4 col-12 text-center'>
									<p>
										<strong>Email Address: {user.email}</strong>
									</p>
									{''}
								</div>
							</div>
							<div className='row text-center'>
								<div className='col-md-4 col-12 text-center'>
									<p className='text-center'>
										<strong>
											Member Since: <Moment date={user.createdAt} format='MM/DD/YYYY' />
										</strong>
									</p>
									{''}
								</div>
							</div>

							<div className='col-md-4 col-12 text-center'>
								<p>
									<strong>
										Profile Pic: <img src={this.state.profilePic} style={{ width: '300px' }} />
									</strong>
								</p>
								{''}
							</div>
						</div>

						<div className='container'>
							<div className='row'>
								<div className='col-md-6'>
									<strong>
										Last Updated: <Moment date={user.updatedAt} format='MM/DD/YYYY' />
									</strong>
								</div>

								{/* </div> */}
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
export default Dashboard;
