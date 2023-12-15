import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";

const READ_SONG_LIKES = 'likes/READ_SONG_LIKES'
const READ_USER_LIKES = 'likes/READ_USER_LIKES'
const READ_LOGGED_LIKES = 'likes/READ_LOGGED_LIKES'
const ADD_LIKE = 'like/ADD_LIKE';
const REMOVE_LIKE = 'like/REMOVE_LIKE';

const readSongLikes = likes => {
    return {
        type: READ_SONG_LIKES,
        likes
    }
}
const readUserLikes = likes => {
    return {
        type: READ_USER_LIKES,
        likes
    }
}
const readLoggedUserLikes = likes => {
    return {
        type: READ_LOGGED_LIKES,
        likes
    }
}

const addLike = like => {
    return {
        type: ADD_LIKE,
        like
    }
}

const removeLikeAction = (like) => {
    return {
        type: REMOVE_LIKE,
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
        const convert = await response.json();
        dispatch(addLike(convert));
        return convert;
    }
}

export const getLikesByUser = () => async dispatch => {
    // const response = await csrfFetch(`/api/likes/current/${songId}`)
    const response = await csrfFetch(`/api/likes/current`)
    if (response.ok) {
        const convert = await response.json();
        dispatch(readLoggedUserLikes(convert.Likes));
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

export const getAllUserLikes = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/user/${userId}`)
    if (response.ok) {
        const likes = await response.json();
        dispatch(readUserLikes(likes.Likes));
        return likes;
    }
}

export const removeLike = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/current/${songId}`)
    if (response.ok) {
        const convert = await response.json();
        await csrfFetch(`/api/likes/${convert.Likes.id}`, {
            method: 'DELETE'
        });
        dispatch(removeLikeAction(songId));
    }
}

const initialState = { /*songLikes: {},*/ loggedUserLikes: new Set(), viewedUserLikes: {}, likeCount: 0 };

export default function likesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_SONG_LIKES: {
            // newState = { ...state, songLikes: {}, likeCount: 0 };
            newState = { ...state, likeCount: 0 };
            newState.likeCount = action.likes.length
            // action.likes.forEach(like => newState.songLikes[like.id] = like);
            return newState
        }
        case READ_USER_LIKES: {
            newState = { ...state, viewedUserLikes: {} };
            action.likes.forEach(like => newState.viewedUserLikes[like.id] = like);
            return newState;
        }
        case ADD_LIKE: {
            const newState = { ...state };
            newState.loggedUserLikes.add(action.like.songId);
            return newState
        }
        case READ_LOGGED_LIKES: {
            newState = { ...state, loggedUserLikes: new Set() };
            action.likes.forEach(el => newState.loggedUserLikes.add(el.songId));
            return newState
        }
        case REMOVE_LIKE: {
            newState = { ...state };
            newState.loggedUserLikes.delete(action.like)
            return newState;
        }
        default: return state
    }
}