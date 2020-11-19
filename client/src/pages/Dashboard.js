import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
		userid: '',
		savedGuitar: {},
		isGuitar: false,
		brand: '',
		make: '',
		model: '',
		color: '',
		year: '',
		value: '',
		condition: '',
		guitarPic: ''
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

			axios.get('/api/guitar/' + userId).then((response) => {
				if (response.data[0] == undefined) {
					const { brand, make, model, color, year, value, condition, guitarPic } = this.state;
				} else {
					this.setState({
						isGuitar: true
					});

					const { brand, make, model, color, year, value, condition, guitarPic } = response.data[0];
					this.setState({
						savedGuitar: response.data[0],
						brand,
						make,
						model,
						color,
						year,
						value,
						condition,
						guitarPic
					});
					console.log(response.data[0]);
				}
			});
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
		const {
			redirect,
			user,
			profilePic,
			isGuitar,
			brand,
			make,
			model,
			color,
			year,
			value,
			condition,
			guitarPic
		} = this.state;

		if (redirect) {
			return <Redirect to='/' />;
		}
		if (isGuitar) {
			console.log('yes guitar');
			// guitar = {{guitarPic}}
		} else {
			console.log('no guitar');
			// guitar = {{'<div>no guitars yet</div>'}}
		}
		console.log(user.profilePic);

		return (
			<div className='container'>
				<div>
					<div className='profile-container'>
						<div className='logo-container'>
							<div className='row'>
								<img className='logo' src={logo} alt='logo' />
							</div>
						</div>
						<div className='row top-profile-container'>
							<div className='col-md-6 col-6 text-right'>
								<img className='profile-pic' src={profilePic} />
							</div>
							<div className='col-md-6 col-6 text-center'>
								<h2>{user.firstName}</h2>

								<h3> {user.country}</h3>
								<h4 className='followers'> 0 FOLLOWERS</h4>
								{''}
							</div>

							{''}
						</div>
						<div className='row'>
							<div className='col-12'>
								<h3 className='current-collection'>CURRENT COLLECTION</h3>
								<div className='display-guitar-container'>
									{guitarPic ? (
										<img className='guitar-collection display-guitar' src={guitarPic} />
									) : (
										<h4 className='guitar-collection'>NO GUITARS IN YOUR COLLECTION</h4>
									)}
								</div>
							</div>
						</div>
						<div className='row text-center'>
							<div className='col-md-4 col-12 text-center'>
								<button className='button add-button'>
									<Link className='create-button-text' to={'/guitar'}>
										ADD A GUITAR
									</Link>
								</button>
							</div>
						</div>
						<div className='row text-center'>
							<div className='col-md-4 col-12 text-center'>
								<p className='text-center'>
									<h3 className='recently-added'>RECENTLY ADDED GUITARS</h3>
								</p>
								{''}
							</div>
						</div>
					</div>

					<div className='container'>
						<div className='row'>
							<div className='col-md-6' />

							<button className='btn btn-danger' onClick={this.handleLogout}>
								Logout
							</button>
							{/* </div> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
