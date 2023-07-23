const READ_PAUSED = 'paused/READ_PAUSED'
const READ_TIME = 'time/READ_TIME'
const READ_DURATION = 'duration/READ_DURATION'

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

const readDuration = (duration) => {
    return {
        type: READ_DURATION,
        duration
    }
}

export const getPaused = (pauseState) => dispatch => {
    dispatch(readPaused(pauseState))
}

export const getTime = (playbackTime) => dispatch => {
    dispatch(readTime(playbackTime))
}

export const getDuration = (songDuration) => dispatch => {
    dispatch(readDuration(songDuration))
}


// Paused: player.current.audio.current.paused
// Current Time: player.current.audio.current.currentTime
// Duration: player.current.audio.current.duration


const initialState = { pauseState: true, runtimeState: 0, durationState: 0 }

export default function audioPlayerReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_TIME: {
            newState = { ...state }
            newState.runtimeState = action.time
            return newState
        }
        case READ_PAUSED: {
            newState = { ...state }
            newState.pauseState = action.paused
            return newState
        }
        case READ_DURATION: {
            newState = { ...state }
            newState.durationState = action.duration
            return newState
        }
        default:
            newState = { ...state }
            newState.allComments = {}
            return state
    }
}