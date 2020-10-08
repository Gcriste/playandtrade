import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import Moment from 'react-moment';
import './dashboard.css';
import logo from './playLogo.png';
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

	//submit button function
	handleUpdateSubmit = () => {
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

		return (
			<div className='container'>
				<div className='card'>
					<div className='profile-container'>
						<div className='row'>
							<div className='logo-container'>
								<img className='logo' src={logo} alt='logo' />
							</div>
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
export default Dashboard;
