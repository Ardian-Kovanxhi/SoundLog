import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentsReducer from './comments';
import sessionReducer from './session';
import songsReducer from './songs';
import likesReducer from './likes';
import playlistsReducer from './playlists';
import searchReducer from './search';

const rootReducer = combineReducers({
    comments: commentsReducer,
    likes: likesReducer,
    session: sessionReducer,
    songs: songsReducer,
    playlists: playlistsReducer,
    search: searchReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;