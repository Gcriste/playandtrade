import React, { Component } from 'react';
import axios from 'axios';
import { Input, PostButton } from '../components/CreateAccount';
import { Redirect, Link } from 'react-router-dom';

const styles = {
	error: {
		color: 'red',
		fontSize: '0.8rem',
		margin: 0
	}
};

class CreateAccount extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
			email: '',
			password: '',
			errors: {},
			firstName: '',
			lastName: '',
			message: '',
			avatar: '',
			zipCode: '',
			country: ''
		};
	}

	handleCreateChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	//submit button function
	handleCreateSubmit = (event) => {
		event.preventDefault();
		console.log('hi');

		const newUser = {
			email: this.state.email,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			avatar: this.state.avatar,
			zipCode: this.state.zipCode,
			country: this.state.country
		};
		axios
			.post('api/user', newUser)
			.then((response) => {
				this.setState({
					message: alert('You successfully created an account'),
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

	render() {
		const { errors, redirect } = this.state;

		if (redirect) {
			return <Redirect to='/dashboard' />;
		}
		return (
			<div>
				<div className='createaccount'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-6 m-auto'>
								<div className='card'>
									<div className='card-body'>
										<h4 className='display-4 text-center'>Create Account </h4>

										<br />

										<form>
											<div className=''>
												<div className='field'>
													<div className='account-info'>
														<p className='account'>ACCOUNT INFO:</p>
													</div>
												</div>
												<div className='field'>
													<Input
														value={this.state.firstName}
														onChange={this.handleCreateChange}
														name='firstName'
														placeholder='FIRST NAME'
														type='name'
													/>
												</div>
												<div className='field'>
													<Input
														value={this.state.lastName}
														onChange={this.handleCreateChange}
														name='lastName'
														placeholder='LAST NAME'
														type='name'
													/>
												</div>
												<div className='field'>
													<Input
														value={this.state.zipCode}
														onChange={this.handleCreateChange}
														name='zipCode'
														placeholder='ZIP CODE'
														type='zipCode'
													/>
												</div>
												<div className='field'>
													<Input
														value={this.state.country}
														onChange={this.handleCreateChange}
														name='country'
														placeholder='COUNTRY'
														type='country'
													/>
												</div>
												<div className='field'>
													<div className='log-in-info'>
														<p className='log-in'>LOG-IN INFO:</p>
													</div>
												</div>
												<div className={`field ${errors.email ? 'error' : ''}`}>
													{errors.email && <div style={styles.error}> {errors.email}</div>}
													<Input
														value={this.state.email}
														onChange={this.handleCreateChange}
														name='email'
														placeholder='EMAIL'
														type='email'
													/>
												</div>
												<div className='field'>
													<Input
														value={this.state.password}
														onChange={this.handleCreateChange}
														name='password'
														placeholder='PASSWORD'
														type='password'
													/>
												</div>
												<div className='field'>
													<Input
														value={this.state.password}
														onChange={this.handleCreateChange}
														name='password'
														placeholder='CONFIRM PASSWORD'
														type='password'
													/>
												</div>
												<div className='field col-md-6 checkbox-container'>
													<input className='checkbox' type='checkbox' />
													<span className='checkmark' />
													<p className='checkbox-text'>I AM 18 YEARS OR OLDER</p>
												</div>
												<div className='row'>
													<div className='field col-md-6'>
														<button
															type='submit'
															className='button continue-button'
															tabindex='0'
															onClick={this.handleCreateSubmit}
														>
															<div className='visible content'>CONTINUE</div>
														</button>
													</div>

													<div className='field col-md-6'>
														<p className='back-link'>
															{' '}
															<Link className='back-link-text' to={'/'}>
																back
															</Link>
														</p>
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

export default CreateAccount;
