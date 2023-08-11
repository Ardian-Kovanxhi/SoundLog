import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSongs, playSong, getSong, clearSongStore } from '../../store/songs';
import { getCommentsBySong } from '../../store/comments';
import { getPaused } from '../../store/audioPlayerState';
import './Songs.css'

export default function SelectedSong() {
    const dispatch = useDispatch();
    const Songs = useSelector(state => state.songs.allSongs);
    const song = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const history = useHistory()

    const [loadState, setLoadState] = useState(true)


    useEffect(() => {
        dispatch(getSongs())
        dispatch(clearSongStore())
    }, [])

    const singleLoader = async singleId => {
        setLoadState(false)
        await dispatch(getSong(singleId))
        await dispatch(getCommentsBySong(singleId))
        history.push(`/songs/${singleId}`)
    }


    const songArr = Object.values(Songs)
    let count = 0;

    return (
        <>
            {
                loadState ?
                    <div className='all-songs-div-container'>
                        <div className='all-songs-div'>
                            {songArr.map(el => {



                                const btnClass = 'univ-play-pause-button hovered'
                                // + 
                                // (hoverState ? ' hovered' : '')

                                return (
                                    <>
                                        <div
                                            className='all-songs-single'

                                        >
                                            <div className='all-song-img-btn-div'>

                                                <img
                                                    className='all-songs-single-img'
                                                    onClick={() => singleLoader(el.id)}
                                                    src={el.img ||
                                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />

                                                {song.id === el.id ?
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

                                                <div className='all-songs-song-name'>
                                                    {/* {
                                                    el.name.length > 15 ?
                                                        <>
                                                            {el.name}
                                                        </>
                                                        :
                                                        el.name
                                                } */}
                                                    {el.name}
                                                </div>
                                                <div className='all-songs-username'>
                                                    {/* {el.User.username.length > 15 ? el.User.username.substring(0, 15) + '...' : el.User.username} */}
                                                    {el.User.username}
                                                </div>

                                            </div>
                                        </div>
                                        {/* {song.id === el.id ?

                            paused ?
                                // isPlaying ?

                                // <button onClick={() => setPlaying(false)}>

                                // <button onClick={() => setPlaying(true)}>
                                <button onClick={handlePlayClick}>

                                    <i className="fa-solid fa-play" />

                                </button> :

                                <button onClick={handlePauseClick}>

                                    <i className="fa-solid fa-pause" />

                                </button> :

                            <button onClick={() =>
                                dispatch(playSong(el.id))
                                    .then(dispatch(getPaused(true)))
                                // .then(dispatch(getDuration(1)))
                            }>

                                <i className="fa-solid fa-play" />

                            </button>
                        } */}
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <div className="loader">
                        <img src="https://i.imgur.com/DwJvkT6.gif" />
                    </div>
            }
        </>
    )
}
