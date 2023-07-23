import React, { createContext, useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPaused, getTime, getDuration } from '../../store/audioPlayerState';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.css'

export const PlayerContext = createContext();

function AudioControls({ isLoaded }) {
    const dispatch = useDispatch()
    const player = useRef();
    const song = useSelector(state => state.songs.playingSong)
    const pauseState = useSelector(state => state.audioState.pauseState)

    const [currPause, setCurrPause] = useState(true)


    useEffect(() => {

        if (currPause === true && pauseState === false) {

            player.current.audio.current.play()
            dispatch(getTime(player.current.audio.current.currentTime))
            setCurrPause(false)

        }

        else if (currPause === false && pauseState === true) {

            player.current.audio.current.pause()
            dispatch(getTime(player.current.audio.current.currentTime))
            setCurrPause(true)

        }


    }, [pauseState])


    const playerStateCheck = () => {


        // player.current.audio.current.play();
        console.log(`Paused: ${player.current.audio.current.paused}`);
        console.log(`Current Time: ${player.current.audio.current.currentTime}`);
        console.log(`Duration: ${player.current.audio.current.duration}`);

    };


    const [playerVisible, setPlayerVisible] = useState(true)

    const playerClass = 'audio-player ' + (playerVisible ? '' : 'invisible')

    return (
        <>

            {/* <button
                className='test-button'
                onClick={() => (playerVisible ? setPlayerVisible(false) : setPlayerVisible(true))}
            >test</button> */}

            {/* <button className='test-button' onClick={playerStateCheck}>Player State</button> */}

            <AudioPlayer
                className={playerClass}
                id='player'
                ref={player}
                autoPlay
                src={song ? song.content : null}
                onPlay={e => dispatch(getPaused(false))}
                onPause={e => dispatch(getPaused(true))}
            // other props here
            />

        </>
    )
}


export default AudioControls