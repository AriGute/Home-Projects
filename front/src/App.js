import Header from './components/Header';
import NevBar from './components/NevBar';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Profile from './components/Authentication/Profile';
import PostForm from './components/Posts/PostForm';
import PostView from './components/Posts/postView';

function App() {
	return (
		<div className='App'>
			<Header />
			<BrowserRouter>
				<NevBar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/profile'>
						<Profile />
					</Route>
					<Route exact path='/register'>
						<Register />
					</Route>
					<Route exact path='/addProject'>
						<PostForm></PostForm>
					</Route>
					<Route path='/postView'>
						<PostView />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
