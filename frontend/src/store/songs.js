import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";


const READ_SONGS = 'songs/READ_SONGS'
const READ_USER_SONGS = 'songs/READ_USER_SONGS'
const READ_SONG = 'song/READ_SONG'
const PLAY_SONG = 'song/PLAY_SONG'
const PLAY_SONG_404 = 'song/PLAY_SONG_404'
const DELETE_SONG = 'song/DELETE_SONG'
const CLEAR_SONG_STORE = 'song/CLEAR_SONG_STORE'
const CLEAR_PLAYING_SONG = 'song/CLEAR_PLAYING_SONG'


const readSongs = (songs) => {
    return {
        type: READ_SONGS,
        songs
    }
}

const readUserSongs = (songs) => {
    return {
        type: READ_USER_SONGS,
        songs
    }
}

const readSong = (song) => {
    return {
        type: READ_SONG,
        song
    }
}

const playingSong = (song) => {
    return {
        type: PLAY_SONG,
        song
    }
}

const playingSong404 = (song) => {
    return {
        type: PLAY_SONG_404,
        song
    }
}

const deleteSong = () => {
    return {
        type: DELETE_SONG
    }
}

const clearStore = () => {
    return {
        type: CLEAR_SONG_STORE
    }
}

const clearPlaying = () => {
    return {
        type: CLEAR_PLAYING_SONG
    }
}





export const getSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs')

    if (response.ok) {
        const songs = await response.json();
        dispatch(readSongs(songs))
        return songs
    }
}

export const getUserSongs = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/user/${userId}`);
    // const response = await csrfFetch(`api/songs`);

    if (response.ok) {
        const songs = await response.json();
        dispatch(readUserSongs(songs));
        return songs;
    }
}

export const getSong = (songId) => async dispatch => {

    const response = await csrfFetch(`/api/songs/${songId}`)

    if (response.ok) {
        const song = await response.json();
        dispatch(readSong(song))
        return song
    }
}

export const playSong = (songId) => async dispatch => {

    const response = await csrfFetch(`/api/songs/${songId}`)

    if (response.ok) {
        const song = await response.json();
        dispatch(playingSong(song))
        return song
    }
}

export const playSong404 = (url) => async dispatch => {
    const song = {
        content: url,
        name: 'Jelly Fish Jam',
        img: 'https://media.tenor.com/UFd4D0yQGdwAAAAC/party-dance.gif'
    }
    dispatch(playingSong404(song))
    return song

}

export const submitSong = (data) => async dispatch => {

    const { userId, name, content, img, description } = data

    const formData = new FormData();
    formData.append('userId', userId)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('img', img)
    if (content) formData.append('content', content)
    const response = await csrfFetch(
        '/api/songs/',
        {
            method: 'POST',
            headers: {
                'Content-Type': "multipart/form-data",
                'XSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: formData
        }
    )

    if (response.ok) {
        const song = await response.json();
        dispatch(readSong(song))
        return song
    }
}

export const editSong = (songId, data) => async dispatch => {

    const { name, content, duration, img, description } = data

    const response = await csrfFetch(
        `/api/songs/${songId}`,
        {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
                'XSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({ name, content, duration, img, description })
        }
    )

    if (response.ok) {
        const edit = await csrfFetch(`/api/songs/${songId}`);
        const song = await edit.json();
        dispatch(readSong(song))
        return song
    }
}

export const removeSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        await dispatch(deleteSong());
        return response;
    }
};

export const clearSongStore = () => dispatch => {
    dispatch(clearStore())
}

export const clearPlayingSong = () => dispatch => {
    dispatch(clearPlaying())
}



const initialState = { allSongs: {}, singleSong: {}, playingSong: {}, userSongs: {} }

export default function songsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_SONGS: {
            newState = { ...state, allSongs: {} }
            action.songs.forEach(song => newState.allSongs[song.id] = song);
            return newState
        }
        case READ_USER_SONGS: {
            newState = { ...state, userSongs: {} };
            action.songs.forEach(song => newState.userSongs[song.id] = song);
            return newState;
        }
        case READ_SONG: {
            newState = { ...state, singleSong: {} }
            newState.singleSong = action.song
            return newState
        }
        case PLAY_SONG: {
            newState = { ...state, playingSong: {} }
            newState.playingSong = action.song
            return newState
        }
        case PLAY_SONG_404: {
            newState = { ...state, playingSong: {} }
            newState.playingSong = action.song
            return newState
        }
        case DELETE_SONG: {
            newState = { ...state }
            newState.singleSong = {};
            // if (newState.allSongs[action.song.id]) {
            //     delete newState.allSongs[action.song.id]
            // }
            return newState
        }
        case CLEAR_SONG_STORE: {
            newState = { ...state }
            newState.singleSong = {}
            return newState
        }
        case CLEAR_PLAYING_SONG: {
            newState = { ...state }
            newState.playingSong = {}
            return newState
        }
        default:
            return state;
    }
}