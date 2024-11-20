import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { getToken, signUp, storeToken } from '../api/loginHandler';

const LoginPage = (props) => {
	const [authWrapper] = useState({
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		textAlign: 'left',
		marginTop: '5vh'
	});

	const [authInner] = useState({
		width: '450px',
		margin: 'auto',
		background: '#ffffff',
		boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
		padding: '40px 55px 45px 55px',
		borderRadius: '15px',
		transition: 'all .3s'
	});

	const handleLogin = (uname, pwd) => {
		console.log('Login click');
		let obj = {
			username: uname,
			password: pwd
		};
		getToken(obj)
			.then((res) => {
				console.log("This is the result",res);
				if (res['error']) throw new Error('Wrong username or password');
				storeToken({ ...res, userId: res.profile.id });
			})
			.then((res) => {
				window.location.assign('http://localhost:3000/')
			})
			.catch((error) => {
				console.log(error);
				alert('Error while login ! Wrong username or password');
			});
	};

	const handleSignup = (fullname, uname, pwd) => {
		console.log('Signup click');
		let obj = {
			username: uname,
			password: pwd,
			fullName: fullname
		};
		signUp(obj)
			.then((res) => {
				alert('Sign up successfull! Proceed to Login');
			})
			.catch((error) => {
				alert('Error while signing up. Maybe  User already exists');
			});
	};


	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			const query = new URLSearchParams(window.location.search);
			const token = query.get('token');
			const expiry = query.get('expiry');
			const userId = query.get('userId');
			let obj = {
				token: token,
				expiry: expiry,
				userId: userId
			};
			if (token) {
				storeToken(obj);
				window.location.assign('http://localhost:3000/application-tracking-system');
			}
		}
	}, []);

	return (
		<div className='auth-wrapper' style={authWrapper}>
			<div className='auth-inner' style={authInner}>
				<Tabs
					defaultActiveKey='login'
					id='logintab'
					className='mx-auto'
					style={{ paddingLeft: '25%' }}
				>
					<Tab eventKey='login' title='Login'>
						<form>
							<div className='form-group my-4'>
								<label>Username</label>
								<input
									type='text'
									className='form-control'
									id='uname'
									placeholder='Enter username'
								/>
							</div>

							<div className='form-group my-4'>
								<label>Password</label>
								<input
									type='password'
									className='form-control'
									id='pwd'
									placeholder='Enter password'
								/>
							</div>
							<div className='d-flex justify-content-center'>
								<button
									type='submit'
									onClick={(e) => {
										e.preventDefault();
										let uname = document.querySelector('#uname').value;
										let pwd = document.querySelector('#pwd').value;
										handleLogin(uname, pwd);
									}}
									className='custom-btn px-3 py-2 mx-2'
								>
									Login
								</button>
							</div>
						</form>
					</Tab>
					<Tab eventKey='signup' title='Signup'>
						<form>
							<div className='form-group my-4'>
								<label>Full name</label>
								<input
									type='text'
									className='form-control'
									id='fullname'
									placeholder='Full name'
								/>
							</div>
							<div className='form-group my-4'>
								<label>Username</label>
								<input
									type='text'
									className='form-control'
									id='suname'
									placeholder='Enter username'
								/>
							</div>
							<div className='form-group my-4'>
								<label>Password</label>
								<input
									type='password'
									className='form-control'
									id='spwd'
									placeholder='Enter password'
								/>
							</div>
							<div className='d-flex justify-content-center'>
								<button
									type='submit'
									onClick={(e) => {
										e.preventDefault();
										let name = document.querySelector('#fullname').value;
										let uname = document.querySelector('#suname').value;
										let pwd = document.querySelector('#spwd').value;
										handleSignup(name, uname, pwd);
									}}
									className='custom-btn px-3 py-2 mx-2'
								>
									Sign Up
								</button>
							</div>
						</form>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default LoginPage;
