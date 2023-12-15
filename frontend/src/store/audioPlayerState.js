const READ_PAUSED = 'paused/READ_PAUSED'
const READ_TIME = 'time/READ_TIME'
const RAW_TIME = 'time/RAW_TIME'
// const READ_LOOP = 'loop/READ_LOOP'
// const READ_LOOP_TYPE = 'loopType/READ_LOOP_TYPE'

const readPaused = (paused) => {
    return {
        type: READ_PAUSED,
        paused
    }
}

const readTime = (time) => {
    return {
        type: READ_TIME,
        time
    }
}

const rawTime = (time) => {
    return {
        type: RAW_TIME,
        time
    }
}

export const getPaused = (pauseState) => dispatch => {
    dispatch(readPaused(pauseState))
}

export const getTime = (playbackTime) => dispatch => {
    // const mins = Math.floor(playbackTime / 60)
    // const secs = Math.floor(playbackTime - (mins * 60))

    // const time = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
    // dispatch(readTime(time))
    dispatch(readTime(playbackTime))
}

export const getRawTime = (playbackTime) => dispatch => {
    dispatch(rawTime(playbackTime))
}


const initialState = { pauseState: true, runtimeState: { raw: 0, str: '' }, rawTime: 0, /*loopState: { loop: false, loopType: 'all' }*/ }

export default function audioPlayerReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_TIME: {
            newState = { ...state }
            const mins = Math.floor(action.time / 60)
            const secs = Math.floor(action.time - (mins * 60))

            const time = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
            newState.runtimeState.raw = action.time
            newState.runtimeState.str = time
            return newState
        }
        case READ_PAUSED: {
            newState = { ...state }
            newState.pauseState = action.paused
            return newState
        }
        case RAW_TIME: {
            newState = { ...state }
            newState.rawTime = action.time
            return newState
        }
        default:
            return state
    }
}