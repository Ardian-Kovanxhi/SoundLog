import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSongs, playSong, getSong, clearSongStore } from '../../store/songs';
import { getCommentsBySong } from '../../store/comments';
import { getPaused } from '../../store/audioPlayerState';
import { getLoad } from '../../store/global';
import './Songs.css'

export default function SelectedSong() {
    const dispatch = useDispatch();
    const Songs = useSelector(state => state.songs.allSongs);
    const song = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const pageState = useSelector(state => state.global.lightState)
    const history = useHistory()

    const [loadState, setLoadState] = useState(true)
    const [hoveredIndex, setHoveredIndex] = useState(null)

    async function fetchData() {
        await dispatch(getSongs())
        await dispatch(clearSongStore())
    }

    useEffect(() => {
        dispatch(getLoad(true))
        fetchData()
        dispatch(getLoad(false))
    }, [])

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId))
        await dispatch(getCommentsBySong(singleId))
        history.push(`/songs/${singleId}`)
    }

    const songArr = Object.values(Songs)

    return (
        <div className='all-songs-div-container'>
            <div className='all-songs-div'>
                {songArr.map((el, index) => {

                    const btnClass = `univ-play-pause-button ${hoveredIndex === index ? 'hovered' : ''} ${pageState ? '' : ' night'}`


                    return (

                        <>
                            <div
                                // className='all-songs-single'
                                className={`all-songs-single ${pageState ? '' : ' night'}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className='all-song-img-btn-div'>

                                    <img
                                        className='all-songs-single-img'
                                        onClick={() => {
                                            dispatch(getLoad(true))
                                            singleLoader(el.id)
                                        }}
                                        src={el.img ||
                                            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />

                                    {
                                        // hoveredIndex === index ?
                                        song.id === el.id ?
                                            paused ?
                                                <button
                                                    className={btnClass}
                                                    onClick={() => { dispatch(getPaused(false)) }}
                                                >

                                                    <i className="fa-solid fa-play" />

                                                </button> :

                                                <button
                                                    className={`pause ${btnClass}`}
                                                    onClick={() => { dispatch(getPaused(true)) }}
                                                >

                                                    <i className="fa-solid fa-pause" />

                                                </button> :

                                            <button
                                                className={btnClass}
                                                onClick={() => dispatch(playSong(el.id))}
                                            >

                                                <i className="fa-solid fa-play" />

                                            </button>
                                    }

                                </div>
                                <div
                                    onClick={() => singleLoader(el.id)}
                                >

                                    {/* <div className='all-songs-song-name'> */}
                                    <div className={`all-songs-song-name ${pageState ? '' : ' night'}`}>

                                        {el.name}
                                    </div>
                                    <div className={`all-songs-username ${pageState ? '' : ' night'}`}>
                                        {/* {el.User.username.length > 15 ? el.User.username.substring(0, 15) + '...' : el.User.username} */}
                                        {el.User.username}
                                    </div>

                                </div>
                            </div>

                        </>
                    )
                })}
            </div>
        </div>
    )
}
