import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import getAllUsers from './utils/getUsers';

const Login = () => {
	const [goto, setGoto] = useState('current');
	const [err, setErr] = useState('no Error');
	const [users] = useState(getAllUsers());
	const nameRef = useRef(0);
	const passwordRef = useRef(0);
	const checkUser = () => {
		const username = nameRef.current.value;
		const password = passwordRef.current.value;
		const user = users.filter(
			(e) => e.username === username && e.password === password
		).length;
		if (user === 1) {
			if (username === users[1].username) setGoto('/App');
			else setGoto('/Doctor');
		} else setErr('Invalid User Account!');
	};

	return goto === 'current' ? (
		<div className='sudo'>
			<div className='container'>
				<div className='login-container'>
					<div className='error'>{err !== 'no Error' && err}</div>
					<label>
						Username: <input type='text' ref={nameRef} />
					</label>
					<label>
						Password: <input type='password' ref={passwordRef} />
					</label>
					<button onClick={() => checkUser()}>LogIn</button>
				</div>
				<div className='side-section'>
					<h1>I Speak</h1>
					<p>Let the eyes speak.</p>
				</div>
			</div>
		</div>
	) : (
		<Redirect to={goto} />
	);
};

export default Login;
