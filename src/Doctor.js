import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

let users = [
	{
		firstName: 'Cierra',
		lastName: 'Vega',
	},
	{
		firstName: 'Alden',
		lastName: 'Cantrell',
	},
	{
		firstName: 'Pierre',
		lastName: 'Cox',
	},
];

const Doctor = () => {
	const [red, setRed] = useState('');
	const redirect = () => {
		setRed('/');
	};
	return red !== '' ? (
		<Redirect to='/' />
	) : (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<div
				className='cool-shadow'
				style={{
					width: '720px',
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					margin: '0 auto',
					padding: '2rem 4rem',
				}}>
				<h1 style={{ marginTop: '1rem' }}>Welcome! Doctor,</h1>
				<h3 style={{ marginTop: '1rem' }}>Your Patient's: </h3>
				<ul style={{ marginTop: '1rem' }} className='patient-list'>
					{users.map(({ firstName, lastName }) => (
						<li className='user cool-shadow'>
							<div className='fall-back-image'>
								<span> {firstName[0] + lastName[0]} </span>
							</div>
							<h3 className='first-name'>{firstName + ' ' + lastName}</h3>
						</li>
					))}
				</ul>
				<button
					style={{ marginTop: '1rem' }}
					onClick={() => {
						redirect();
					}}>
					Go Back
				</button>
			</div>
		</div>
	);
};

export default Doctor;
