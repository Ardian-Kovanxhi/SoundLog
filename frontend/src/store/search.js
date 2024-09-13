import { csrfFetch } from "./csrf";

const READ_SEARCH = "results/READ_SEARCH";

const readSearch = (results) => {
    return {
        type: READ_SEARCH,
        results
    }
}

export const getSearch = (keywords, filter = "") => async dispatch => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    const keyStrs = keywords.join("+")
    console.log(keyStrs)
    const response = await csrfFetch(`/api/search?phrase=${keyStrs}&filter=${filter}`)

    if (response.ok) {
        const results = await response.json();
        console.log(results)
        dispatch(readSearch(results))
        return results
    }
}

const initialState = { searchResults: {} };

export default function searchReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case READ_SEARCH: {
            newState = { searchResults: action.results }
            return newState;
        }
        default:
            return state;
    }
}