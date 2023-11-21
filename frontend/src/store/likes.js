import Cookies from "js-cookie";
import { csrfFetch } from "./csrf";

export const createLike = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${songId}`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
        }
    })
}