import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Doctor from './Doctor';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom';

const Index = () => {
	return (
		<HashRouter>
			<Switch>
				<Route path='/' exact>
					<Login />
				</Route>
				<Route path='/App' exact>
					<App />
				</Route>
				<Route path='/Doctor' exact>
					<Doctor />
				</Route>
			</Switch>
		</HashRouter>
	);
};

ReactDOM.render(<Index />, document.getElementById('root'));
serviceWorker.register();
