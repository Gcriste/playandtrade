import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';
import Moment from 'react-moment';
import './dashboard.css';
import SavedResult from '../components/SavedList';
import SavedRequests from '../components/SavedRequests';
import Nav from '../components/Nav';

class Dashboard extends Component {
	state = {
		redirect: false,
		user: {},
		savedGigs: [],
		savedRequests: [],
		dateForSavedRequests: [],
		gigid: '',
		userid: ''
	};

	componentDidMount() {
		const token = localStorage.getItem('example-app');
		if (token) {
			setAuthToken(token);
		}

		axios.get('/api/user').then((response) => {
			let userId = response.data.id;
			this.setState({
				user: response.data,
				userid: response.data.id
			});

			axios.get('/api/gig/' + userId).then((res) => {
				this.setState({
					savedGigs: res.data
				});
				console.log(res.data);

				axios
					.get('/api/request/' + userId)
					.then((res) => {
						let gigId = [];
						for (var i = 0; i < res.data.length; i++) {
							gigId.push(res.data[i].gigid);
						}
						this.setState({
							savedRequests: res.data
						});

						for (var i = 0; i < gigId.length; i++) {
							console.log(gigId[i]);
							axios.get('/api/gig/id/' + gigId[i]).then((res) => {
								console.log(res.data);
								let savedGigs = [];
								savedGigs = this.state.dateForSavedRequests.concat(res.data);
								this.setState({
									dateForSavedRequests: savedGigs
								});
							});
						}
					})
					.catch((err) => console.log(err.response));
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
	handleDeleteButton = (id) => {
		console.log(id);
		axios.delete('/api/gig/' + id).then((res) => this.componentDidMount()).catch((err) => console.log(err));
	};

	// deletes request by id
	handleDeleteRequest = (id) => {
		axios.delete('/api/request/' + id).then((res) => this.componentDidMount()).catch((err) => console.log(err));
	};

	render() {
		const { redirect, user } = this.state;

		if (redirect) {
			return <Redirect to='/' />;
		}

		return (
			<div className='container'>
				<div className='card'>
					<div className='profile-container'>
						<div className='profile' />
						<div className='row'>
							<div className='col-md-4'>
								{/* <h1>Home </h1> */}
								<button className='btn btn-danger' onClick={this.handleLogout}>
									Logout
								</button>
							</div>
							<div className='col-md-4'>
								<h2>
									<strong>Welcome, {user.firstName}</strong>
								</h2>
								{''}
								<img src={user.avatar} />
								{''}
							</div>
							<div className='col-md-4'>
								<p>
									<strong>Email Address: {user.email}</strong>
								</p>
								{''}
								<p>
									<strong>
										Member Since: <Moment date={user.createdAt} format='MM/DD/YYYY' />
									</strong>
								</p>
								{''}
								<p>
									<strong>
										Last Updated: <Moment date={user.updatedAt} format='MM/DD/YYYY' />
									</strong>
								</p>
								{''}
							</div>
						</div>
						<div className='container'>
							<div className='row'>
								<div className='col-md-6'>
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
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
