import HeaderNew from './components/HeaderNew'
import NavBar from './components/NavBar';
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
import { Drawer } from '@mui/material';
import { useState } from 'react';

function App() {
	const [drawer, setDrawer] = useState(false);
	return (
		<div className='App'>
			<BrowserRouter>
				<HeaderNew/>
				<Drawer
					sx={{
						'& .MuiDrawer-paperAnchorLeft': {
							overflowY: 'clip !important',
						},
					}}
					anchor='left'
					open={drawer}
					onClose={() => setDrawer(false)}
					children={
						<NavBar setDrawer={setDrawer}></NavBar>
					}></Drawer>
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
