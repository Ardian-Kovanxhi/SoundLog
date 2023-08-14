import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, playSong } from '../../store/songs';
import { getPaused, getTime, getRawTime } from '../../store/audioPlayerState';
// import { createLike, getLikesBySong, getLikesByUser, removeLike } from '../../store/likes';
import CommentTesting from '../CommentFormTesting';
import BtnMenu from '../DropdownMenus/edit-deleteMenu';
import SongComments from '../SongComments'
import './SingleSong.css'
import ProgressBar from '../ProgressBar';



export default function SingleSong() {
    const dispatch = useDispatch();
    const { songId } = useParams();

    useEffect(() => {
        dispatch(getSong(songId))
        dispatch(getCommentsBySong(songId))
        // dispatch(getLikesBySong(songId))
        // dispatch(getLikesByUser())
    }, [])

    const Song = useSelector(state => state.songs.singleSong);
    const currSong = useSelector(state => state.songs.playingSong);
    const User = useSelector(state => state.session.user);
    const paused = useSelector(state => state.audioState.pauseState);
    const songTime = useSelector(state => state.audioState.runtimeState.str);
    let disabled = false;
    let Uploader = '';
    let time = '';



    const handleSeek = (seekTime) => {
        if (currSong.id !== Song.id) {
            dispatch(playSong(Song.id))
            dispatch(getTime(0))
            return
        }
        const newSeekTime = (seekTime / 100) * Song.duration;
        dispatch(getRawTime(newSeekTime))
    };

    if (User) {
        disabled = true
    }

    if (Song.User) {
        Uploader = Song.User.username
    }

    if (Song.duration) {
        const mins = Math.floor(Song.duration / 60)
        const secs = Song.duration - (mins * 60)

        time = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
    }

    return (
        <>
            {Song.id ?

                <div className='single-song-container-div'>

                    <div className='single-song-div'>
                        <div
                            className='blur-box'
                        >

                            <div className='filler-color-2'></div>

                            <img
                                className='blur-img'
                                src={
                                    Song.img ?
                                        Song.img
                                        :
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                                }
                            />

                        </div>

                        <div className='single-song-info-img-div'>

                            <div className='single-song-info-div'>

                                <div className='info-buttons-div'>

                                    <div>
                                        <div className='pfp-info-div'>
                                            {/* <img className='uploader-pfp' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' /> */}
                                            {currSong.id === Song.id ?

                                                paused ?

                                                    <button
                                                        className='single-univ-button single'
                                                        // onClick={handlePlayClick}
                                                        onClick={() => { dispatch(getPaused(false)) }}
                                                    >

                                                        <i className="fa-solid fa-play" />

                                                    </button> :

                                                    <button
                                                        className='single-univ-button  single'
                                                        // onClick={handlePauseClick}
                                                        onClick={() => { dispatch(getPaused(true)) }}
                                                    >

                                                        <i className="fa-solid fa-pause" />

                                                    </button> :

                                                <button
                                                    className='single-univ-button  single'
                                                    onClick={() => dispatch(playSong(Song.id))}
                                                >

                                                    <i className="fa-solid fa-play" />

                                                </button>
                                            }

                                            <div className='song-name-uploader-div'>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <div className='song-name-div'>
                                                        {Song.name}
                                                    </div>

                                                    {User ? Song.userId === User.id
                                                        || User.id === 1
                                                        ?
                                                        <div className='edit-delete-buttons-div'>
                                                            <BtnMenu />
                                                        </div>
                                                        :
                                                        null : null
                                                    }
                                                </div>

                                                <div className='song-uploader-div'>
                                                    {Uploader}
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div
                                    className={'single-song-desc ' + (!!Song.description ? '' : 'false')}
                                >
                                    {Song.description}
                                </div>

                                {/* {currSong.id === Song.id ?

                                    paused ?

                                        <button
                                            className='single-univ-button single'
                                            // onClick={handlePlayClick}
                                            onClick={() => { dispatch(getPaused(false)) }}
                                        >

                                            <i className="fa-solid fa-play" />

                                        </button> :

                                        <button
                                            className='single-univ-button  single'
                                            // onClick={handlePauseClick}
                                            onClick={() => { dispatch(getPaused(true)) }}
                                        >

                                            <i className="fa-solid fa-pause" />

                                        </button> :

                                    <button
                                        className='single-univ-button  single'
                                        onClick={() => dispatch(playSong(Song.id))}
                                    >

                                        <i className="fa-solid fa-play" />

                                    </button>
                                } */}
                                {/* {`${currSong.id === Song.id ? songTime : '00:00'}/${time}`} */}

                                <ProgressBar onSeek={handleSeek} />

                                {
                                    User ?
                                        User.id === 1 ?
                                            <div>{Song.content}</div> :
                                            '' : ''

                                }

                            </div>


                            <div
                                style={{
                                    zIndex: '2',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >

                                <img
                                    className='single-song-img'
                                    src={
                                        Song.img
                                        ||
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                                    } />

                            </div>


                        </div>

                    </div>

                    <SongComments />

                </div>
                :
                <CommentTesting />
            }

        </>

    )
}