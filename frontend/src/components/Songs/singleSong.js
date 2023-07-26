import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, playSong } from '../../store/songs';
import { createComment } from '../../store/comments';
import { getPaused } from '../../store/audioPlayerState';
// import { createLike, getLikesBySong, getLikesByUser, removeLike } from '../../store/likes';
import CommentTesting from '../CommentFormTesting';
import BtnMenu from '../DropdownMenus/edit-deleteMenu';
import SongComments from '../SongComments'
import './Songs.css'



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
    const currSong = useSelector(state => state.songs.playingSong)
    const Comments = useSelector(state => state.comments.allComments);
    const User = useSelector(state => state.session.user)
    const paused = useSelector(state => state.audioState.pauseState)
    const [comment, setComment] = useState('');
    let disabled = false
    let Uploader = ''

    if (User) {
        disabled = true
    }

    if (Song.User) {
        Uploader = Song.User.username
    }

    const commentArr = Object.values(Comments)


    const submitHandler = async (e) => {
        e.preventDefault()

        const newComment = await dispatch(createComment(songId, comment))

        await dispatch(getCommentsBySong(songId))

        setComment('')
    }


    return (
        <>
            {Song.id ?

                <div className='single-song-container-div'>

                    <div className='single-song-div'>

                        <div className='single-song-info-img-div'>

                            <div className='single-song-info-div'>

                                <div className='info-buttons-div'>

                                    <div>
                                        <div className='pfp-info-div'>
                                            <img className='uploader-pfp' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />

                                            <div className='song-name-uploader-div'>

                                                <div className='song-name-div'>
                                                    {Song.name.length > 20 ? Song.name.substring(0, 20) + '...' : Song.name}
                                                </div>

                                                <div className='song-uploader-div'>
                                                    {Uploader}
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div>

                                        {User ? Song.userId === User.id ?
                                            <div className='edit-delete-buttons-div'>
                                                <BtnMenu />
                                            </div>
                                            :
                                            null : null
                                        }

                                        {/* {
                                            User ?
                                                !Likes[songId] ?
                                                    <button
                                                        onClick={createLike(songId)}
                                                    // onClick={() => console.log(songId)}
                                                    >
                                                        Like (actual)
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={removeLike(Likes[songId])}
                                                    >
                                                        Unlike
                                                    </button>
                                                :
                                                <OpenModalMenuItem
                                                    buttonText="Like (login)"
                                                    modalComponent={<LoginFormModal />}
                                                />
                                        } */}

                                    </div>

                                </div>

                                {currSong.id === Song.id ?

                                    paused ?

                                        <button
                                            className='univ-play-pause-button single'
                                            // onClick={handlePlayClick}
                                            onClick={() => { dispatch(getPaused(false)) }}
                                        >

                                            <i className="fa-solid fa-play" />

                                        </button> :

                                        <button
                                            className='univ-play-pause-button  single'
                                            // onClick={handlePauseClick}
                                            onClick={() => { dispatch(getPaused(true)) }}
                                        >

                                            <i className="fa-solid fa-pause" />

                                        </button> :

                                    <button
                                        className='univ-play-pause-button  single'
                                        onClick={() => dispatch(playSong(Song.id))}
                                    >

                                        <i className="fa-solid fa-play" />

                                    </button>
                                }

                                <div
                                    className={'single-song-desc ' + (!!Song.description ? '' : 'false')}
                                >
                                    {Song.description}
                                </div>

                                {/* <div>{Song.content}</div> */}

                            </div>


                            <div>

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