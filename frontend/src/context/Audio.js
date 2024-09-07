import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
    //To add (maybe)
    //loop
    //shuffle
    // playing song
    const [pauseState, setPauseState] = useState(true); //global pause/play state
    const [rawPlayTime, setRawPlayTime] = useState(0); //curr runtime in JS raw time state
    const [strPlayTime, setStrPlayTime] = useState(""); //Stringified time (replaces doing the math everywhere needed)
    const [seekTime, setSeekTime] = useState(0); //used then cleared for the seek function

    const playTimeHandler = (currRunTime) => {
        const mins = Math.floor(currRunTime / 60)
        const secs = Math.floor(currRunTime - (mins * 60))

        const time = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
        setRawPlayTime(currRunTime)
        setStrPlayTime(time)
    }


    return (
        <AudioContext.Provider value={{
            pauseState, setPauseState,
            rawPlayTime, strPlayTime,
            seekTime, setSeekTime,
            playTimeHandler
        }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    return useContext(AudioContext)
}