import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import NoMatch from './components/NoMatch';
import UploadPicture from './pages/UploadPicture';
import CreateAccount from './pages/CreateAccount';
import Guitar from './pages/Guitar';
import GuitarSwipe from './pages/GuitarSwipe';

// import Nav from './components/Nav';
// import Post from './pages/Post';
// import PostRequest from './pages/Request';
// import IncomingRequest from './pages/IncomingRequest';
// import DiscussionBoard from './pages/DiscussionBoard';
// import Comment from './pages/Comment';

function App() {
	return (
		<Router>
			<div>
				{/* <Nav /> */}
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/createaccount' component={CreateAccount} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/uploadpicture' component={UploadPicture} />
					<PrivateRoute exact path='/guitar' component={Guitar} />
					<PrivateRoute exact path='/guitarswipe' component={GuitarSwipe} />
					{/*<PrivateRoute exact path='/post' component={Post} />
					<PrivateRoute exact path='/post/:id' component={Post} />
					<PrivateRoute exact path='/request' component={PostRequest} />
					<PrivateRoute exact path='/request/:id' component={PostRequest} />
					<PrivateRoute exact path='/discussionboard' component={DiscussionBoard} />
					<PrivateRoute exact path='/comment/:id' component={Comment} />
					<PrivateRoute exact path='/incomingrequest' component={IncomingRequest} />
					<PrivateRoute exact path='/search' component={SearchGigs} /> */}
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
}
export default App;
