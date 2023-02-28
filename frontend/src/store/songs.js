import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";


const READ_SONGS = 'songs/READ_SONGS'
const READ_SONG = 'song/READ_SONG'
const DELETE_SONG = 'song/DELETE_SONG'


const readSongs = (songs) => {
    return {
        type: READ_SONGS,
        songs
    }
}
const readSong = (song) => {
    return {
        type: READ_SONG,
        song
    }
}

const deleteSong = () => {
    return {
        type: DELETE_SONG
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
export const getSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`)

    if (response.ok) {
        const song = await response.json();
        dispatch(readSong(song))
        return song
    }
}

export const submitSong = (data) => async dispatch => {

    const { userId, name, content, img, description } = data

    const response = await csrfFetch(
        '/api/songs',
        {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'XSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({ userId, name, content, img, description })
        }
    )

    if (response.ok) {
        const song = await response.json();
        dispatch(readSong(song))
        return song
    }
}

export const editSong = (songId, data) => async dispatch => {

    const { name, content, img, description } = data

    const response = await csrfFetch(
        `/api/songs/${songId}`,
        {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
                'XSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({ name, content, img, description })
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



const initialState = { allSongs: {}, singleSong: {} }

export default function songsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_SONGS: {
            newState = { allSongs: {}, singleSong: {} }
            action.songs.forEach(song => newState.allSongs[song.id] = song);
            return newState
        }
        case READ_SONG: {
            newState = { ...state, singleSong: {} }
            newState.singleSong = action.song
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
        default:
            return state;
    }
}