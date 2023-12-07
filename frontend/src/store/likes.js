import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";

const READ_SONG_LIKES = 'likes/READ_SONG_LIKES'
const READ_USER_LIKES = 'likes/READ_USER_LIKES'
const READ_LIKE = 'likes/READ_LIKE'

const readSongLikes = (likes) => {
    return {
        type: READ_SONG_LIKES,
        likes
    }
}
const readUserLikes = (likes) => {
    return {
        type: READ_USER_LIKES,
        likes
    }
}
const readLike = (like) => {
    return {
        type: READ_LIKE,
        like
    }
}

export const createLike = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${songId}`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
        }
    })

    if (response.ok) {

    }
}

export const getLikesByUser = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/current/${songId}`)
    if (response.ok) {
        const convert = await response.json();
        dispatch(readLike(convert.Likes));
        return convert
    }
}

export const getAllSongLikes = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${songId}`);

    if (response.ok) {
        const likes = await response.json();
        dispatch(readSongLikes(likes.Likes));
        return likes;
    }
}

export const getAllUserLikes = () => async dispatch => {
    const response = await csrfFetch('/api/likes/current')
    if (response.ok) {
        const likes = await response.json();
        dispatch(readUserLikes(likes));
        return likes;
    }
}

export const removeLike = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/current/${songId}`)
    if (response.ok) {
        const convert = await response.json()
        await csrfFetch(`/api/likes/${convert.Likes.id}`, {
            method: 'DELETE'
        });

    }
}

const initialState = { songLikes: {}, singleLike: {}, UserLikes: {}, likeCount: 0 };

export default function likesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_SONG_LIKES: {
            newState = { ...state, songLikes: {}, likeCount: 0 };
            newState.likeCount = action.likes.length
            action.likes.forEach(like => newState.songLikes[like.id] = like);
            return newState
        }
        case READ_LIKE: {
            newState = { ...state };
            newState.singleLike.like = action.like
            return newState
        }
        default: return state
    }
}