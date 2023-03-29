import React from 'react';
import { useSelector } from 'react-redux';

function AudioControls({ isLoaded }) {
    const songs = useSelector(state => state.songs.allSongs)

    return (
        <div>
            <audio controls src={songs[1].content} />
        </div>
    )
}

export default AudioControls