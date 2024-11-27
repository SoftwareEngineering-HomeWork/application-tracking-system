import './static/App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import ApplicationPage from './application/ApplicationPage';
import SearchPage from './search/SearchPage';
import ExtensionDetails from './extensiondetails/Extensiondetails';
import LoginPage from './login/LoginPage';
import ManageResumePage from './resume/ManageResumePage';
import ProfilePage from './profile/ProfilePage';
import MatchesPage from './matches/MatchesPage';
import axios from 'axios';
import SWEListings from './swe_list/SWE_Listings';
import DirectJobListingPage from './directjoblistings/DirectJobListingPage';

const App = () => {
	const [currentPage, setCurrentPage] = useState(<LoginPage />);
	const [userProfile, setUserProfile] = useState(null);
	const [sidebar, setSidebar] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');

		if (token && userId) {
			axios
				.get('http://localhost:5001/profile', {
					headers: {
						userid: userId,
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					setUserProfile(res.data);
					setCurrentPage(<ProfilePage profile={res.data} updateProfile={updateProfile} />);
					setSidebar(true);
				})
				.catch((err) => console.log(err.message));
		} else {
			setCurrentPage(<LoginPage />);
		}
	}, []);

	const updateProfile = (profile) => {
		console.log('Update Request: ', profile);
		setUserProfile(profile);
		setCurrentPage(<ProfilePage profile={profile} updateProfile={updateProfile} />);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('chrome-extension');
		setSidebar(false);
		setCurrentPage(<LoginPage />);
	};

	const switchPage = (pageName) => {
		switch (pageName) {
			case 'ProfilePage':
				setCurrentPage(<ProfilePage profile={userProfile} updateProfile={updateProfile} />);
				break;
			case 'ApplicationPage':
				setCurrentPage(<ApplicationPage />);
				break;
			case 'SearchPage':
				setCurrentPage(<SearchPage />);
				break;
			case 'ExtensionPage':
				setCurrentPage(<ExtensionDetails />);
				break;
			case 'ManageResumePage':
				setCurrentPage(<ManageResumePage />);
				break;
			case 'DirectJobListingPage':
				setCurrentPage(<DirectJobListingPage />);
				break;
			case 'MatchesPage':
				setCurrentPage(<SWEListings />);
				break;
			default:
				setCurrentPage(<ProfilePage profile={userProfile} updateProfile={updateProfile} />);
		}
	};

	return (
		<Router>
			<div className='main-page'>
				{sidebar && <div className="sidebar-container"><Sidebar switchPage={switchPage} handleLogout={handleLogout} /></div>}
				<div className='main'>
					<div className='content'>
						<Routes>
							<Route path="/application" element={<ApplicationPage />} />
							<Route path="/search" element={<SearchPage />} />
							<Route path="/manage-resume" element={<ManageResumePage />} />
							<Route path="/matches" element={<MatchesPage />} />
							<Route path="/profile" element={<ProfilePage profile={userProfile} updateProfile={updateProfile} />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/recruiter/login" element={<LoginPage />} />
							<Route path="/" element={currentPage} />
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</div>
				</div>
			</div>
		</Router>
	);
};

export default App;
