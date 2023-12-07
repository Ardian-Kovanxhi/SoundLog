import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSongs, playSong, getSong, clearSongStore } from '../../store/songs';
import { getCommentsBySong } from '../../store/comments';
import { getAllSongLikes } from '../../store/likes';
import { getPaused } from '../../store/audioPlayerState';
import { getLoad } from '../../store/global';
import placeholderImg from '../../images/song-placeholder.png'
import './Songs.css'

export default function AllSongs() {
    const dispatch = useDispatch();
    const Songs = useSelector(state => state.songs.allSongs);
    const song = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const pageState = useSelector(state => state.global.lightState)
    const history = useHistory()

    const [hoveredIndex, setHoveredIndex] = useState(null)

    async function fetchData() {
        dispatch(getLoad(true))
        await dispatch(getSongs())
        await dispatch(clearSongStore())
        dispatch(getLoad(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId))
        await dispatch(getCommentsBySong(singleId))
        await dispatch(getAllSongLikes(singleId))
        await dispatch(getAllSongLikes(singleId))
        history.push(`/songs/${singleId}`)
    }

    const songArr = Object.values(Songs);

    return (
        <div className='all-songs-div-container'>
            <div className='all-songs-div'>
                {songArr.map((el, index) => {

                    const btnClass = `univ-play-pause-button ${hoveredIndex === index ? 'hovered' : ''} ${pageState ? '' : ' night'}`


                    return (
                        <div key={index}>
                            <div
                                // className='all-songs-single'
                                className={`all-songs-single ${pageState ? '' : ' night'}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                key={index}
                            >
                                <div className='all-song-img-btn-div'>

                                    <img
                                        className='all-songs-single-img'
                                        onClick={() => {
                                            dispatch(getLoad(true))
                                            singleLoader(el.id)
                                        }}
                                        src={el.img || placeholderImg}
                                        alt='Album Cover'
                                    />

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

                                    <div className={`all-songs-song-name ${pageState ? '' : ' night'}`}>

                                        {el.name}
                                    </div>
                                    <div className={`all-songs-username ${pageState ? '' : ' night'}`}>
                                        {el.User.username}
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
