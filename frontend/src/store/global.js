import Cookies from "js-cookie";

const theme = Cookies.get('pageTheme') ? Cookies.get('pageTheme') === 'day' ? true : false : true

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
    lightState ? Cookies.set('pageTheme', 'day', { expires: 604800 }) : Cookies.set('pageTheme', 'night', { expires: 604800 })
    dispatch(readLight(lightState))
}

export const getLoad = (loadState) => async dispatch => {
    dispatch(readLoad(loadState))
    return 1
}

// const initialState = { lightState: true, loadState: true }
const initialState = { lightState: theme, loadState: true }

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