import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPaused, getTime, getRawTime } from '../../store/audioPlayerState';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getSong } from '../../store/songs';
import { getCommentsBySong } from '../../store/comments';


function AudioControls() {
    const dispatch = useDispatch()
    const history = useHistory()
    const player = useRef();
    const song = useSelector(state => state.songs.playingSong)
    const pauseState = useSelector(state => state.audioState.pauseState)
    const timeSeek = useSelector(state => state.audioState.rawTime)

    const [currPause, setCurrPause] = useState(true)
    const [playerVisible, setPlayerVisible] = useState(false)
    const [boxVis, setBoxVis] = useState(false)


    useEffect(() => {

        if (song.id) {
            setPlayerVisible(true)
            setBoxVis(true)
            return
        }

        player.current.audio.current.src = ''
        player.current.audio.current.removeAttribute('src')
        setPlayerVisible(false)
        setBoxVis(false)

    }, [song])

    useEffect(() => {
        if (timeSeek === null) {
            return
        }
        player.current.audio.current.currentTime = timeSeek;
        dispatch(getRawTime(null))
        dispatch(getTime(timeSeek))
    }, [timeSeek])


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


    const singleLoader = async singleId => {
        // setLoadState(false)
        await dispatch(getSong(singleId))
        await dispatch(getCommentsBySong(singleId))
        history.push(`/songs/${singleId}`)
    }


    const playerClass = 'audio-player ' + (playerVisible ? '' : 'invisible')
    const containerClass = 'player-img-name-container' + (boxVis ? '' : ' invisible')
    const imgClass = 'player-img-actual' + (boxVis ? '' : ' invisible')


    return (
        <>

            <div className={containerClass}>

                <div className='place-container'>


                    <img
                        // className='player-img-actual'
                        className={imgClass}
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
                                onClick={() => singleLoader(song.id)}
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
                listenInterval={500}
                onListen={() => dispatch(getTime(player.current.audio.current.currentTime))}
                onSeeking={() => dispatch(getTime(player.current.audio.current.currentTime))}
            // onSeeked={() => dispatch(getRawTime(player.current.audio.current.currentTime))}
            // other props here
            />

        </>
    )
}


export default AudioControls