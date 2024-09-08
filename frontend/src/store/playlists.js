import { csrfFetch } from "./csrf";

const READ_PLAYLISTS = "playlists/READ_PLAYLISTS";
const READ_PLAYLIST = "playlist/READ_PLSYLIST";
const READ_USER_PLAYLISTS = "playlists/READ_USER_PLAYLISTS";
const DELETE_PLAYLIST = "playlist/DELETE_PLAYLIST";

const readPlaylists = (playlists) => {
    return {
        type: READ_PLAYLISTS,
        playlists
    }
}
const readPlaylist = (playlist) => {
    return {
        type: READ_PLAYLIST,
        playlist
    }
}
const readUserPlaylists = (playlists) => {
    return {
        type: READ_USER_PLAYLISTS,
        playlists
    }
}
const deletePlaylist = (playlist) => {
    return {
        playlist,
        type: DELETE_PLAYLIST
    }
}


export const getPlaylists = () => async dispatch => {
    const response = await csrfFetch(`/api/playlists`);

    if (response.ok) {
        const playlists = await response.json();
        dispatch(readPlaylists(playlists));
        return playlists;
    }
}

const initialState = { allPlaylists: {}, userPlaylists: {}, singlePlaylist: {} }

export default function playlistsReducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case READ_PLAYLISTS: {
            newState = { ...state, allPlaylists: {} };
            action.playlists.forEach(playlist => newState.allPlaylists[playlist.id] = playlist);
            return newState;
        }
        default:
            return state
    }
}