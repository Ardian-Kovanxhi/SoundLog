import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AudioPlayer from 'react-h5-audio-player';
import { getSong } from '../../../store/songs';
import { getCommentsBySong } from '../../../store/comments';
import { usePage } from '../../../context/Page';
import { useAudio } from '../../../context/Audio';
import 'react-h5-audio-player/lib/styles.css';
import './AudioControls.scss'


export default function AudioControls() {
    const dispatch = useDispatch()
    const history = useHistory()
    const player = useRef();
    const song = useSelector(state => state.songs.playingSong)

    const { lightMode } = usePage();
    const { pauseState, setPauseState, seekTime, setSeekTime, playTimeHandler } = useAudio();

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
        if (seekTime === null) {
            return
        }
        player.current.audio.current.currentTime = seekTime;
        setSeekTime(null)
        playTimeHandler(seekTime)
    }, [playTimeHandler, seekTime, setSeekTime])


    useEffect(() => {

        if (currPause === true && pauseState === false) {

            player.current.audio.current.play()
            playTimeHandler(player.current.audio.current.currentTime)
            setCurrPause(false)

        }

        else if (currPause === false && pauseState === true) {

            player.current.audio.current.pause()
            playTimeHandler(player.current.audio.current.currentTime)
            setCurrPause(true)

        }


    }, [currPause, pauseState, playTimeHandler])

    //same as splash page
    const singleLoader = async singleId => {
        // setLoadState(false)
        await dispatch(getSong(singleId))
        await dispatch(getCommentsBySong(singleId))
        history.push(`/songs/${singleId}`)
    }


    const playerClass = `audio-player ${playerVisible ? '' : 'invisible'} ${lightMode ? '' : 'night'}`
    const containerClass = `player-img-name-container ${(boxVis ? '' : ' invisible')} ${lightMode ? '' : 'night'}`
    const imgClass = 'player-img-actual' + (boxVis ? '' : ' invisible')


    return (
        <>

            <div className={containerClass}>

                <div className='place-container'>


                    <img
                        className={imgClass}
                        src={
                            song.coverImg
                            ||
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                        }
                        alt=''
                    />

                    <div className={`song-name-display ${playerVisible ? "" : "player-img-invis"}`}>
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
                        song.coverImg
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
                onPlay={() => setPauseState(false)}
                onPause={() => setPauseState(true)}
                listenInterval={500}
                onListen={() => playTimeHandler(player.current.audio.current.currentTime)}
                onSeeking={() => playTimeHandler(player.current.audio.current.currentTime)}
                onEnded={() => console.log('DONE')}
            // other props here
            />

        </>
    )
}


// export default AudioControls