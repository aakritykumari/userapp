import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  browserHistory
} from 'react-router-dom'
import App from './App.jsx';
import Login from './login.jsx';
import Home from './Home.jsx';
//import Dashboard from './dashboard.jsx';
 

ReactDOM.render(
<div>
	<BrowserRouter>
	<Switch>
		<Route exact path='/' component={Home}/>
		<Route exact path='/login' component={Login}/>
		<Route exact path='/app' component={App}/>
		</Switch>
	</BrowserRouter>
</div>
, document.getElementById('space'));
