import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";


const READ_COMMENTS = 'comments/READ_COMMENTS'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const readComments = (comments) => {
    return {
        type: READ_COMMENTS,
        comments
    }
}


export const getCommentsBySong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`)

    if (response.ok) {
        const comments = await response.json();
        dispatch(readComments(comments))
        return comments
    }
}

export const getCommentsByUser = () => async dispatch => {
    const response = await csrfFetch('/api/comments/current')

    if (response.ok) {
        const comments = await response.json();
        dispatch(readComments(comments))
        return comments
    }
}

export const createComment = (songId, data) => async dispatch => {

    const { comment } = data

    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify({
            comment
        })
    })

    if (response.ok) {
        const songRefresh = await csrfFetch(`/api/songs/${songId}/comments`)

        if (songRefresh.ok) {
            const comments = await songRefresh.json();
            dispatch(readComments(comments))
            return comments
        }
    }
}

export const removeComment = (commentId, songId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const newRev = await csrfFetch(`/api/songs/${songId}/comments`)
        const comments = await newRev.json();
        dispatch(readComments(comments))
        return comments
    }
    // if (response.ok) {
    // }
}

const initialState = { allComments: {} }

export default function commentsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_COMMENTS: {
            newState = { allComments: {} }
            action.comments.comments.forEach(comment => newState.allComments[comment.id] = comment);
            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state }
            delete newState.allComments[action.commentId]
            return newState
        }
        default:
            newState = { ...state }
            newState.allComments = {}
            return state
    }
}