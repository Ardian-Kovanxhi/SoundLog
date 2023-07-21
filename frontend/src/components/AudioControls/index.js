import React, { createContext, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.css'

export const PlayerContext = createContext();

function AudioControls({ isLoaded }) {

    const player = useRef();

    const playAudio = () => {


        player.current.audio.current.play();

    };
    const pauseAudio = () => {


        player.current.audio.current.pause();

    };

    const song = useSelector(state => state.songs.playingSong)

    const [playState, setPlayState] = useState(true)

    const playerClass = 'audio-player ' + (playState ? '' : 'invisible')

    return (
        <>
            {/* <PlayerContext.Provider value={player}> */}

            {/* <button
                className='test-button'
                onClick={() => (playState ? setPlayState(false) : setPlayState(true))}
            >test</button> */}

            <button className='test-button' onClick={playAudio}>play</button>
            <button className='test-button' onClick={pauseAudio}>pause</button>
            {/* <AudioButton /> */}

            <AudioPlayer
                className={playerClass}
                id='player'
                ref={player}
                autoPlay
                src={song ? song.content : null}
                onPlay={e => console.log("onPlay")}
            // other props here
            />

            {/* </PlayerContext.Provider> */}
        </>
    )
}

function AudioButton({ playAudio }) {

    const buttonHandler = () => {
        playAudio()
    }

    return (
        <button className='test-button' onClick={buttonHandler}>
            play
        </button>
    )
}


export default AudioControls