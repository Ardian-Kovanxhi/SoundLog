import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";


const READ_COMMENTS = 'comments/READ_COMMENTS'
const READ_COMMENT = 'comment/READ_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const readComments = (comments) => {
    return {
        type: READ_COMMENTS,
        comments
    }
}

const readComment = (comment) => {
    return {
        type: READ_COMMENT,
        comment
    }
}


export const getCommentsBySong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/songs/${songId}`)


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

export const getCommentById = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${+commentId}`)

    if (response.ok) {
        const comment = await response.json();
        dispatch(readComment(comment))
        return comment
    }
}

export const createComment = (songId, data) => async dispatch => {

    // const { comment } = data

    const response = await csrfFetch(`/api/comments/songs/${songId}`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify({
            // comment
            comment: data
        })
    })

    if (response.ok) {
        const songRefresh = await csrfFetch(`/api/comments/songs/${songId}`)

        if (songRefresh.ok) {
            const comments = await songRefresh.json();
            dispatch(readComments(comments))
            return comments
        }
    }
}

export const editComment = (commentId, data) => async dispatch => {

    const { comment } = data

    const response = await csrfFetch(
        `/api/comments/${commentId}`,
        {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json',
                'XSRF-Token': Cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({ comment })
        }
    )

    if (response.ok) {
        const edit = await csrfFetch(`/api/comments/${commentId}`);
        const comment = await edit.json();
        dispatch(readComment(comment))
        return comment
    }
}

export const removeComment = (commentId, songId) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const newRev = await csrfFetch(`/api/comments/songs/${songId}`)
        const comments = await newRev.json();
        dispatch(readComments(comments))
        return comments
    }
}

const initialState = { allComments: {}, singleComment: {} }

export default function commentsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_COMMENTS: {
            newState = { allComments: {}, singleComment: {} }
            action.comments.comments.forEach(comment => newState.allComments[comment.id] = comment);
            return newState
        }
        case READ_COMMENT: {
            newState = { ...state, singleComment: {} }
            newState.singleComment = action.comment
            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state }
            delete newState.allComments[action.commentId]
            return newState
        }
        default:
            return state
    }
}