import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import { getLoad } from "./store/global";
import Cookies from "js-cookie";
import nightImage from './images/forest-night.jpg'
import dayImage from './images/forest-day.jpg'
import nightLoad from './images/dark-mode-load.gif'
import dayLoad from './images/light-mode-load.gif'
import Navigation from "./components/Navigation";
import SelectedSong from "./components/SongSplash";
import SongFormPage from "./components/SongFormPage";
import ErrorPage from "./components/ErrorPage";
import SingleSong from "./components/SingleSong/MainPage";
import SongEditPage from "./components/SongEditModal";
import CommentEditPage from "./components/CommentEditForm";
import AudioControls from './components/AudioControls'
// import Likes from "./components/Likes";
import Playlists from "./components/Playlists";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const playing = useSelector(state => state.songs.playingSong)
  const pageState = useSelector(state => state.global.lightState)
  const loadState = useSelector(state => state.global.loadState)
  const User = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    if (!Cookies.get('pageTheme')) Cookies.set('pageTheme', 'day', { expires: 604800 })
  }, [dispatch]);

  useEffect(() => {
    console.log(`SCREEN SIZE \n${window.innerHeight}`)
  }, [window.innerHeight])

  return (

    <div
      className='page-container-div'
      style={{
        backgroundImage: `url(${pageState ? dayImage : nightImage})`,
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
            opacity: pageState ? '100%' : 0,
            transition: 'opacity .5s'
          }}
          src={dayLoad}
        />
        <img
          // src="https://i.imgur.com/DwJvkT6.gif" 
          // src={pageState ? dayLoad : nightLoad}
          src={nightLoad}
          style={{
            opacity: pageState ? 0 : '100%',
            transition: 'opacity .5s'
          }}
        />
      </div>

      <div
        className={`filler-color ${pageState ? '' : ' night'}`}
        style={{
          zIndex: loadState ? 8 : 0
        }}
      ></div>

      {
        playing.content ?
          <div className={`bottom-filler ${pageState ? '' : ' night'}`}></div>
          :
          ''
      }

      <Navigation isLoaded={isLoaded} />
      {
        isLoaded && (
          <>
            <Switch>
              <Route path={'/songs/:songId/comments/:commentId/edit'} component={CommentEditPage} />
              <Route path={'/songs/:songId/edit'} component={SongEditPage} />
              <Route path={'/songs/:songId'} component={SingleSong} />
              <Route path={'/songs'} component={SongFormPage} />
              {/* <Route path={'/likes'} component={Likes} /> */}
              <Route path={'/playlists'} component={Playlists} />
              <Route exact path={'/'} component={SelectedSong} />
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