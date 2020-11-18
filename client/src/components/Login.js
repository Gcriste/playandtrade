import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { Input } from './CreateAccount';
import authenticate from '../utils/Authenticate';
import setAuthToken from '../utils/SetAuthToken';
import facebook from './assets/facebook.png';
import youtube from './assets/youtube.png';
import instagram from './assets/instagram.png';
import logo from './assets/playLogo.png';

const styles = {
	error: {
		color: 'red',
		fontSize: '0.8rem',
		margin: 0
	}
};

class Login extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
			email: '',
			password: '',
			errors: {},
			profilePic: ''
		};
	}

	componentDidMount() {
		const token = localStorage.getItem('example-app');

		if (authenticate(token)) {
			this.setState({
				redirect: true
			});
		}
	}

	handleLoginChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleLoginSubmit = (event) => {
		event.preventDefault();

		const newUser = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(newUser);
		axios
			.post('api/user/login', newUser)
			.then((response) => {
				console.log(response.data);

				if (response.data.token) {
					const { token } = response.data;

					localStorage.setItem('example-app', token);
					setAuthToken(token);

					this.setState({
						redirect: true,
						errors: {},
						profilePic: response.data.profilePic
					});
				}
			})
			.catch((err) => {
				this.setState({
					errors: err.response.data
				});
			});
	};

	render() {
		const { errors, redirect, profilePic } = this.state;
		if (redirect && (profilePic === null || profilePic == '')) {
			return <Redirect to={'/uploadpicture'} />;
		} else if (redirect && profilePic !== null) {
			return <Redirect to={'dashboard'} />;
		}

		return (
			<div className='login'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6 m-auto'>
							<div className=''>
								<div>
									<div>
										{/* <h1 className='display-4 text-center'>Play and Trade Guitars </h1> */}
										<div className='logo-container'>
											<img className='logo' src={logo} alt='logo' />
										</div>
										<br />

										<form>
											<div className={`required field ${errors.user ? 'error' : ''}`}>
												{errors.user && <div style={styles.error}> {errors.user}</div>}
												<Input
													value={this.state.email}
													type='email'
													onChange={this.handleLoginChange}
													name='email'
													placeholder='EMAIL-ADDRESS'
												/>
											</div>

											<div className={`required field ${errors.password ? 'error' : ''}`}>
												{errors.password && <div style={styles.error}> {errors.password}</div>}
												<Input
													value={this.state.password}
													onChange={this.handleLoginChange}
													name='password'
													type='password'
													placeholder='PASSWORD'
												/>
											</div>
											<div className='row'>
												<div className='col-md-6 col-12'>
													<button
														type='submit'
														className='button enter-button'
														tabindex='0'
														onClick={this.handleLoginSubmit}
													>
														<div className='visible content'>ENTER</div>
													</button>
													<div className='forgot-div'>
														<p className='forgot'>Forgot password</p>
													</div>
												</div>

												<div className='col-md-6 col-12'>
													<div className='new-container'>
														<div className='new-user'>
															<p class='new-user-text'>NEW USER?</p>
														</div>
														<button className='button create-button'>
															<Link className='create-button-text' to={'/createaccount'}>
																CREATE ACCOUNT
															</Link>
														</button>
													</div>
												</div>
												<div className='col-md-6 col-4 text-center'>
													<div className='facebook-container'>
														<div className='icon-container'>
															<img className='icon' src={facebook} alt='facebook' />
														</div>
													</div>
												</div>
												<div className='col-md-6 col-4 text-center'>
													<div className='youtube-container'>
														<div className='icon-container'>
															<img className='icon' src={youtube} alt='youtube' />
														</div>
													</div>
												</div>
												<div className='col-md-6 col-4 text-center'>
													<div className='instagram-container'>
														<div className='icon-container'>
															<img className='icon' src={instagram} alt='instagram' />
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
