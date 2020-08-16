import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import authenticate from '../utils/Authenticate';
import setAuthToken from '../utils/SetAuthToken';

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
			errors: {}
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
						errors: {}
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
		const { errors, redirect } = this.state;
		if (redirect) {
			return <Redirect to={'/dashboard'} />;
		}

		return (
			<div className='login'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6 m-auto'>
							<div className='ui form'>
								<div className='card'>
									<div className='card-body'>
										<h1 className='display-4 text-center'>Log In </h1>
										<h4 className='text-center'>
											Or if you don't have an account hit the create account button
										</h4>
										<br />

										<form>
											<div className={`required field ${errors.user ? 'error' : ''}`}>
												{errors.user && <div style={styles.error}> {errors.user}</div>}
												<input
													value={this.state.email}
													type='email'
													onChange={this.handleLoginChange}
													name='email'
													placeholder='Enter Email Address'
												/>
											</div>

											<div className={`required field ${errors.password ? 'error' : ''}`}>
												{errors.password && <div style={styles.error}> {errors.password}</div>}
												<input
													value={this.state.password}
													onChange={this.handleLoginChange}
													name='password'
													type='password'
													placeholder='Enter Password'
												/>
											</div>
											<div className='row'>
												<div className='col-md-6'>
													<button
														type='submit'
														className='ui primary horizontal animated button'
														tabindex='0'
														onClick={this.handleLoginSubmit}
													>
														<div className='visible content'>Login </div>
														<div className='hidden content'>
															<i className='right arrow icon' />
														</div>
													</button>
												</div>

												<div className='col-md-6'>
													<button className='ui yellow button'>
														<Link to={'/createaccount'}>Create Account</Link>
													</button>
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
