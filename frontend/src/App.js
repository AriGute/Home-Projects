import Header from './components/Menus/Header'
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
import PostView from './components/Posts/PostView';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Report from './components/Report';
import NotFoundPage from './components/404';

function App() {
	
	return (
		<div className='App'>
			<BrowserRouter>
				<Header/>
				<Switch>
					<Route exact path='/'>
						<Home/>
					</Route>
					<Route exact path='/login'>
						<Login/>
					</Route>
					<Route exact path='/profile'>
						<Profile/>
					</Route>
					<Route exact path='/register'>
						<Register/>
					</Route>
					<Route exact path='/addProject'>
						<PostForm/>
					</Route>
					<Route exact path='/editProject/'>
						<PostForm/>
					</Route>
					<Route exact path='/postView/' >
						<PostView/>
					</Route>
					<Route exact path='/report'>
					<Report/>
					</Route>
					<Route path='/postView/:id'>
						<PostView/>
					</Route>
					<Route path='/about'>
						<About/>
					</Route>
					<Route path='/contactUs'>
						<ContactUs/>
					</Route>
					<Route>
						<NotFoundPage/>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
