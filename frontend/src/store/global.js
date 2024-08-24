const READ_LOAD = 'load/READ_LOAD'

const readLoad = (load) => {
    return {
        type: READ_LOAD,
        load
    }
}


export const getLoad = (loadState) => async dispatch => {
    dispatch(readLoad(loadState))
    return 1
}

// const initialState = { lightState: true, loadState: true }
const initialState = { loadState: true }

export default function globalReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_LOAD: {
            newState = { ...state }
            newState.loadState = action.load
            return newState
        }
        default:
            return state
    }
}