import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import './dashboard.css';
import logo from './playLogo.png';
// import SavedResult from '../components/SavedList';
// import SavedRequests from '../components/SavedRequests';

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
		guitarPic: '',
		guitarPic2: '',
		guitarPic3: '',
		guitarArray: [],
		guitarCollection: []
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

		axios.get('/api/guitar').then((response) => {
			console.log(response.data);
			this.setState({
				guitarCollection: response.data
			});
		});

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
				console.log(response.data);
				console.log(response.data[0]);
				if (response.data[0] == undefined) {
					const {
						brand,
						make,
						model,
						color,
						year,
						value,
						condition,
						guitarPic,
						guitarPic2,
						guitarPic3
					} = this.state;
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
				if (response.data[1] == undefined) {
					this.setState({
						guitarPic2: ''
					});
				} else {
					this.setState({
						guitarPic2: response.data[1].guitarPic
					});
				}
				if (response.data[2] == undefined) {
					this.setState({
						guitarPic3: ''
					});
				} else {
					this.setState({
						guitarPic3: response.data[2].guitarPic
					});
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
			guitarPic,
			guitarPic2,
			guitarPic3
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
							<div className='col-md-6 col-6 text-left'>
								<h2 className='name-dashboard'>{user.firstName}</h2>

								<h3 className='country-dashboard'> {user.country}</h3>
								<span className='fa fa-star checked-star' />
								<span className='fa fa-star checked-star' />
								<span className='fa fa-star checked-star' />
								<span className='fa fa-star checked-star' />
								<span className='fa fa-star checked-star' />
								<h4 className='followers'> 0 FOLLOWERS</h4>
								{''}
							</div>

							{''}
						</div>
						<div className='row'>
							<h3 className='current-collection'>CURRENT COLLECTION</h3>
							<div className='display-guitar-container'>
								<div className='col-4 col-md-3 col-offset-md-1'>
									{guitarPic ? (
										<img className='guitar-collection display-guitar' src={guitarPic} />
									) : (
										<h4 className='guitar-collection'>NO GUITARS IN YOUR COLLECTION</h4>
									)}
								</div>
								<div className='col-4 col-md-3'>
									{guitarPic2 ? (
										<img className='guitar-collection display-guitar' src={guitarPic2} />
									) : (
										<h4 className='guitar-collection' />
									)}
								</div>
								<div className='col-4 col-md-3'>
									{guitarPic3 ? (
										<img className='guitar-collection display-guitar' src={guitarPic3} />
									) : (
										<h4 className='guitar-collection' />
									)}
								</div>
							</div>
						</div>
						<div className='row text-center'>
							<div className='col-12 text-center'>
								<button className='button add-button'>
									<Link className='create-button-text' to={'/guitar'}>
										ADD A GUITAR
									</Link>
								</button>
							</div>
						</div>
						<div className='row text-center'>
							<div className='col-12 text-center'>
								<button className='button add-button'>
									<Link className='create-button-text' to={'/guitarswipe'}>
										SWIPE ALL GUITARS
									</Link>
								</button>
							</div>
						</div>
						<div className='row text-center'>
							<div className='col-md-8 offset-md-2 col-12 text-center'>
								<p className='text-center'>
									<h3 className='recently-added'>RECENTLY ADDED GUITARS</h3>
								</p>
								<div className='row'>
									{this.state.guitarCollection.map((guitar, index) => (
										<div className='col-4 guitar-collection-div'>
											{guitar.guitarPic ? (
												<div>
													<h3 className='brand guitar-collection-header'>{guitar.brand}</h3>
													<h3 className='model guitar-collection-header'>{guitar.model}</h3>
													<p className='email guitar-collection-header'>
														Email: <br />
														<a href='mailto:`${guitar.email}`'>{guitar.email}</a>
													</p>
													<img className='guitar-collection-image' src={guitar.guitarPic} />
												</div>
											) : (
												<div className='no-guitar-image-div text-center'>
													<h4 className='no-guitar-image-provided'>
														NO GUITAR IMAGE PROVIDED
													</h4>
												</div>
											)}
										</div>
									))}
								</div>
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
