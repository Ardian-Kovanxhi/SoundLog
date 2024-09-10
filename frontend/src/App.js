import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Cookies from "js-cookie";
import nightImage from './images/forest-night.jpg'
import dayImage from './images/forest-day.jpg'
import nightLoad from './images/dark-mode-load.gif'
import dayLoad from './images/light-mode-load.gif'
import Navigation from "./components/Global/Navigation";
import SongSplash from "./components/SongSplash";
// import AllSongs from "./components/SongSplash/Songs";
import UserPage from "./components/UserPage";
import SongFormPage from "./components/SongFormPage";
import ErrorPage from "./components/ErrorPage";
import SingleSong from "./components/SingleSong";
import SinglePlaylist from "./components/SinglePlaylist";
import AudioControls from './components/Global/AudioControls'
import { getLikesByUser } from "./store/likes";
import { usePage } from "./context/Page";


function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const playing = useSelector(state => state.songs.playingSong)
	const User = useSelector(state => state.session.user)

	const { lightMode, loadState } = usePage()


	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
		if (!Cookies.get('pageTheme')) Cookies.set('pageTheme', 'day', { expires: 604800 })
	}, [dispatch]);

	useEffect(() => {
		if (User) dispatch(getLikesByUser());
	}, [User, dispatch])

	return (

		<div
			className='page-container-div'
			style={{
				backgroundImage: `url(${lightMode ? dayImage : nightImage})`,
				backgroundSize: 'cover',
				backgroundPosition: '50% 50%',
				transition: 'background-image .5s ease'
			}}
		>

			<div
				className="loader"
				style={{
					zIndex: loadState ? 9 : 0
				}}
			>
				<img
					style={{
						position: 'absolute',
						opacity: lightMode ? '100%' : 0,
						transition: 'opacity .5s'
					}}
					alt="loader"
					src={dayLoad}
				/>
				<img
					src={nightLoad}
					style={{
						opacity: lightMode ? 0 : '100%',
						transition: 'opacity .5s'
					}}
					alt="loader"
				/>
			</div>

			<div
				className={`filler-color ${lightMode ? '' : ' night'}`}
				style={{
					zIndex: loadState ? 8 : 0
				}}
			></div>

			{
				playing.content ?
					<div className={`bottom-filler ${lightMode ? '' : ' night'}`}></div>
					:
					''
			}

			<Navigation isLoaded={isLoaded} />
			{
				isLoaded && (
					<>
						<Switch>
							<Route path={'/songs/:songId'} component={SingleSong} />
							<Route path={'/songs'} component={SongFormPage} />
							<Route path={'/playlists/:playlistId'} component={SinglePlaylist} />
							<Route path={'/users/:userId'} component={UserPage} />
							<Route exact path={'/'} component={SongSplash} />
							<Route path={'*'} component={ErrorPage} />
						</Switch>
					</>
				)
			}

			<AudioControls />
		</div >
	);
}

export default App;
