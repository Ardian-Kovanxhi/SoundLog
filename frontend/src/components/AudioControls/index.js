import React from 'react';
import { getSongs } from '../../store/songs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.css'
// import './style.scss'

function AudioControls({ isLoaded }) {


    // const songs = useSelector(state => state.songs.allSongs[1].content)
    const song = useSelector(state => state.songs.playingSong)

    return (
        <AudioPlayer
            className='audio-player'
            autoPlay
            src={song ? song.content : null}
            onPlay={e => console.log("onPlay")}

        // other props here
        />
    )
}

export default AudioControls