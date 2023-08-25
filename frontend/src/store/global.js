const READ_LIGHT = 'light/READ_LIGHT'
const READ_LOAD = 'load/READ_LOAD'


const readLight = (light) => {
    return {
        type: READ_LIGHT,
        light
    }
}

const readLoad = (load) => {
    return {
        type: READ_LOAD,
        load
    }
}


export const getLight = (lightState) => dispatch => {
    dispatch(readLight(lightState))
}

export const getLoad = (loadState) => dispatch => {
    dispatch(readLoad(loadState))
}

const initialState = { lightState: true, loadState: true }

export default function globalReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_LIGHT: {
            newState = { ...state }
            newState.lightState = action.light
            return newState
        }
        case READ_LOAD: {
            newState = { ...state }
            newState.loadState = action.load
            return newState
        }
        default:
            return state
    }
}