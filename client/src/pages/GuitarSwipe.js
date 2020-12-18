import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Deck from './Deck.js';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import './dashboard.css';
import logo from './playLogo.png';

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
						<Deck />
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
