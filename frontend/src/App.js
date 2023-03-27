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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path={'/songs/:songId/comments/:commentId/edit'} component={CommentEditPage} />
          <Route path={'/songs/:songId/edit'} component={SongEditPage} />
          <Route path={'/songs/:songId'} component={SingleSong} />
          <Route path={'/songs'} component={SongFormPage} />
          <Route exact path={'/'} component={SelectedSong} />
        </Switch>
      )}
    </>
  );
}

export default App;