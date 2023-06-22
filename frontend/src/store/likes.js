import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";

const READ_LIKES = 'likes/READ_LIKES'
const READ_LIKE = 'like/READ_LIKE'
// const DELETE_LIKES = 'like/DELETE_LIKES'

const readLikes = (likes) => {
    return {
        type: READ_LIKES,
        likes
    }
}

const readLike = (like) => {
    return {
        type: READ_LIKE,
        like
    }
}

// const deleteLike = (like) => {
//     return {
//         type: DELETE_LIKES,
//         like
//     }
// }

export const getLikesByUser = () => async dispatch => {
    const response = await csrfFetch('/api/likes/current')
    if (response.ok) {
        const likes = await response.json();
        await dispatch(readLikes(likes))
        return likes
    }
    console.log('done')
}

export const getLikesBySong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}/likes`)
    if (response.ok) {
        const likes = await response.json();
        await dispatch(readLikes(likes))
        return likes
    }
    console.log('done')
}

export const createLike = (songId) => async dispatch => {


    const response = await csrfFetch(`/api/songs/${songId}/likes`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
        },
        // body: JSON.stringify({
        //     // comment
        //     userId: 1,
        //     songId
        // })
    })

    if (response.ok) {
        getLikesByUser()
    }

    // await getLikesByUser()
}

export const removeLike = (likeId) => async dispatch => {

    const response = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    });

    console.log('reached')
    if (response.ok) {
        getLikesByUser()
    }
}

const initialState = { userLikes: {}, songLike: {} }

export default function likesReducer(state = initialState, action) {

    let newState;

    switch (action.type) {
        case READ_LIKES: {
            newState = { userLikes: {}, songLike: {} }
            action.likes.Likes.forEach(like => newState.userLikes[like.id] = like);
            return newState
        }
        case READ_LIKE: {
            newState = { userLikes: {}, songLike: {} }
            newState.userLikes[action.likes.Likes.id] = action.likes.Likes
            return newState
        }
        // case DELETE_LIKES: {
        //     newState = { ...state }
        //     delete newState.allComments[action.commentId]
        //     return newState
        // }
        default:
            newState = { ...state }
            newState.userLikes = {}
            return state
    }
}