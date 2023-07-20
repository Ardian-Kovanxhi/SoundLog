import React, { createContext, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
    const player = useRef();

    return (
        <AudioContext.Provider value={player}>
            {children}
        </AudioContext.Provider>
    );
};

export { AudioContext, AudioProvider };