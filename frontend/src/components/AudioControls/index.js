import React from 'react';
import { getSongs } from '../../store/songs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.css'

function AudioControls({ isLoaded }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSongs())
    }, [])


    const songs = useSelector(state => state.songs.allSongs[1].content)
    const song = useSelector(state => state.songs.singleSong)

    return (
        <AudioPlayer
            className='audio-controls-div'
            autoPlay
            src={songs}
            onPlay={e => console.log("onPlay")}
        // other props here
        />
    )
}

export default AudioControls