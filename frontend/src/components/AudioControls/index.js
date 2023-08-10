import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPaused, getTime, getDuration } from '../../store/audioPlayerState';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AudioControls() {
    const dispatch = useDispatch()
    const history = useHistory()
    const player = useRef();
    const song = useSelector(state => state.songs.playingSong)
    const pauseState = useSelector(state => state.audioState.pauseState)

    const [currPause, setCurrPause] = useState(true)
    const [playerVisible, setPlayerVisible] = useState(false)
    const [boxVis, setBoxVis] = useState(false)


    useEffect(() => {

        if (song.content) {
            setPlayerVisible(true)
            setBoxVis(true)
            return
        }

        player.current.audio.current.src = ''
        player.current.audio.current.removeAttribute('src')
        setPlayerVisible(false)

    }, [song])


    useEffect(() => {

        if (currPause === true && pauseState === false) {

            player.current.audio.current.play()
            dispatch(getTime(player.current.audio.current.currentTime))
            dispatch(getDuration(player.current.audio.current.duration))
            setCurrPause(false)

        }

        else if (currPause === false && pauseState === true) {

            player.current.audio.current.pause()
            dispatch(getTime(player.current.audio.current.currentTime))
            dispatch(getDuration(player.current.audio.current.duration))
            setCurrPause(true)

        }


    }, [pauseState])


    const playerStateCheck = () => {


        // player.current.audio.current.play();
        console.log(`Paused: ${player.current.audio.current.paused}`);
        console.log(`Current Time: ${player.current.audio.current.currentTime}`);
        console.log(`Duration: ${player.current.audio.current.duration}`);

    };



    const playerClass = 'audio-player ' + (playerVisible ? '' : 'invisible')
    const containerClass = 'player-img-name-container' + (boxVis ? '' : ' invisible')


    return (
        <>

            <div className={containerClass}>


                <div className='place-container'>


                    <img
                        className='player-img-actual'
                        src={
                            song.img
                            ||
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

                        } />

                    <div className='name-test'>
                        <div
                            style={{
                                zIndex: '20',
                                maxHeight: '40px',
                                overflow: 'hidden'
                            }}

                        >
                            <div
                                className='currSong-redirect'
                                onClick={() => history.push(`/songs/${song.id}`)}
                            >
                                {song.name}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            {/* <img
                className='player-img-testing'
                src={
                    song ?
                        song.img
                        ||
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                        :
                        null
                } /> */}

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