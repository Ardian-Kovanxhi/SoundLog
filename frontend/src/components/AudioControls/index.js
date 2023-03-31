import React from 'react';
import { useSelector } from 'react-redux';
import './AudioControls.css'

function AudioControls({ isLoaded }) {
    const songs = useSelector(state => state.songs.allSongs)

    return (
        <div className='audio-controls-div'>
            <audio controls src={songs[1].content} />
        </div>
        // <div className='audio-controls-div'>
        //     git info
        // </div>
    )
}

export default AudioControls