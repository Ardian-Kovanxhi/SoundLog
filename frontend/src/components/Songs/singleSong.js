import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, removeSong, playSong } from '../../store/songs';
import { removeComment, createComment } from '../../store/comments';
import { getPaused } from '../../store/audioPlayerState';
// import { createLike, getLikesBySong, getLikesByUser, removeLike } from '../../store/likes';
import LoginFormModal from '../LoginFormModal';
import SongEditPage from "../SongEditPage";
import OpenModalMenuItem from '../OpenModalButton';
import CommentEditModal from '../CommentEditModal';
import CommentTesting from '../CommentFormTesting';
import './Songs.css'



export default function SingleSong() {
    const dispatch = useDispatch();
    const history = useHistory()
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

    // console.log(songId)
    // console.log(Likes)
    // console.log(Likes[songId])
    // if (Likes.songId) {
    //     console.log(Likes.songId)
    // }

    const commentArr = Object.values(Comments)


    const submitHandler = async (e) => {
        e.preventDefault()

        const newComment = await dispatch(createComment(songId, comment))

        await dispatch(getCommentsBySong(songId))

        setComment('')
    }


    const deleteHandler = async () => {
        const rem = await dispatch(removeSong(songId))
        if (rem.ok) {
            history.push('/')
        }
    }

    const commentDeleteHandler = async (commentId) => {
        dispatch(removeComment(commentId, songId))
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
                                                    {Song.name}
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
                                                <OpenModalMenuItem
                                                    // itemText="Test"
                                                    buttonText='Edit'
                                                    modalComponent={<SongEditPage />}
                                                />

                                                <button
                                                    onClick={deleteHandler}
                                                >Delete</button>

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



                    <div className='comments-gen-div'>

                        {
                            User ?
                                <form
                                    onSubmit={submitHandler}
                                    className='comment-form'
                                >
                                    <input
                                        id='comment-form-input-id'
                                        type='text'
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                        maxLength='100'
                                        required
                                        placeholder='Write a comment here'
                                    />
                                    <label className='chara-count' for="comment-form-input-id">
                                        {`${100 - comment.length} characters left`}
                                    </label>
                                    {/* <div className='chara-count'>
                                        {`${100 - comment.length} characters left`}
                                    </div> */}
                                    {/* <button>submit</button> */}
                                </form>
                                :
                                <div className='conditional-bar-button'>
                                    <OpenModalMenuItem
                                        buttonText="If you would like to leave a comment click here to login"
                                        modalComponent={<LoginFormModal />}
                                    />
                                </div>

                        }


                        <div className='all-comments-div'>

                            {commentArr.map(el => (
                                <div className='single-comment-div'>
                                    <img className='comment-pfp' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                                    <div>
                                        <div>
                                            <div className='username-conditional-div'>
                                                {el.User.username}

                                                {disabled ? el.userId === User.id ?
                                                    <div className='comments-button-div'>
                                                        <OpenModalMenuItem
                                                            buttonText='Edit'
                                                            modalComponent={<CommentEditModal commentId={el.id} songId={songId} />}
                                                        />

                                                        <button
                                                            onClick={() => commentDeleteHandler(el.id)}
                                                        >Delete</button>
                                                    </div>
                                                    : null : null}

                                            </div>
                                        </div>
                                        <div>
                                            {el.comment}
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </div>

                    </div>

                </div>
                :
                <CommentTesting />
            }
        </>

    )
}