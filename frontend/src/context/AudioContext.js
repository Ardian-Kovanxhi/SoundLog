import React, { createContext, useState, useRef } from 'react';

const AudioContext = React.createContext();

const AudioProvider = ({ children }) => {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);

    const pauseAudio = () => {
        console.log(audioRef)
        console.log(isPlaying)
        if (audioRef.current) {
            console.log('hi2')
            audioRef.current.audio.current.pause();
            setIsPlaying(false);
        }
    };

    const playAudio = () => {
        console.log(audioRef)
        console.log(isPlaying)
        console.log('hi1')
        if (audioRef.current) {
            console.log('hi2')
            audioRef.current.audio.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, pauseAudio, playAudio }}>
            {children}
        </AudioContext.Provider>
    );
};

export { AudioContext, AudioProvider };