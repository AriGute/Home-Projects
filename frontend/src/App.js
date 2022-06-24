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

function App() {
	
	return (
		<div className='App'>
			<BrowserRouter>
				<Header/>
				<Switch>
					<Route exact path='/'>
						<Home></Home>
					</Route>
					<Route exact path='/login'>
						<Login></Login>
					</Route>
					<Route exact path='/profile'>
						<Profile></Profile>
					</Route>
					<Route exact path='/register'>
						<Register></Register>
					</Route>
					<Route exact path='/addProject'>
						<PostForm></PostForm>
					</Route>
					<Route exact path='/editProject/'>
						<PostForm></PostForm>
					</Route>
					<Route exact path='/postView/' >
						<PostView></PostView>
					</Route>
					<Route exact path='/report'>
					<Report></Report>
					</Route>
					<Route path='/postView/:id'>
						<PostView></PostView>
					</Route>
					<Route path='/about'>
						<About></About>
					</Route>
					<Route path='/contactUs'>
						<ContactUs></ContactUs>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
