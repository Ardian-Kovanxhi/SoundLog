import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SelectedSong from "./components/Songs";
import SongFormPage from "./components/SongFormPage";
import CommentTesting from "./components/CommentFormTesting";
import SingleSong from "./components/Songs/singleSong";
import SongEditPage from "./components/SongEditPage";
import CommentEditPage from "./components/CommentEditForm";
import AudioControls from './components/AudioControls'
import Likes from "./components/Likes";
import Playlists from "./components/Playlists";
import BtnMenu from "./components/Songs/edit-deleteMenu";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="page-container-div">
      <div className="back-img-div">

        {/* <img
          onContextMenu={e => e.preventDefault()}
          className="back-img-actual"
          src="https://images6.alphacoders.com/712/712437.jpg"
        /> */}
        <img
          onContextMenu={e => e.preventDefault()}
          className="back-img-actual"
          src="https://images.hdqwalls.com/download/firewatch-trees-pic-2560x1440.jpg"
        />

      </div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          {/* <BtnMenu /> */}
          <Switch>
            <Route path={'/songs/:songId/comments/:commentId/edit'} component={CommentEditPage} />
            <Route path={'/songs/:songId/edit'} component={SongEditPage} />
            <Route path={'/songs/:songId'} component={SingleSong} />
            <Route path={'/songs'} component={SongFormPage} />
            <Route path={'/likes'} component={Likes} />
            <Route path={'/playlists'} component={Playlists} />
            <Route exact path={'/'} component={SelectedSong} />
            <Route path={'*'} component={CommentTesting} />
          </Switch>
          <AudioControls />
        </>
      )}

      <div className="filler-color">
      </div>

    </div>
  );
}

export default App;